'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from '@repo/ui'
import { ResponsibilitiesManager } from './responsibilities-manager'
import { format } from 'date-fns'

const formSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  companyId: z.string().min(1, 'Company is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

interface PositionFormProps {
  open: boolean
  onClose: () => void
  editingId: string | null
}

export function PositionForm({ open, onClose, editingId }: PositionFormProps) {
  const queryClient = useQueryClient()
  const isEditing = !!editingId

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      companyId: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
    },
  })

  const { data: companies = [] } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await fetch('/api/companies')
      if (!response.ok) {
        throw new Error('Failed to fetch companies')
      }
      return response.json()
    },
  })

  // Fetch position data if editing
  const { data: position } = useQuery({
    queryKey: ['position', editingId],
    queryFn: async () => {
      if (!editingId) return null
      const response = await fetch(`/api/positions/${editingId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch position')
      }
      return response.json()
    },
    enabled: isEditing,
  })

  // Update form values when position data is loaded
  useEffect(() => {
    if (position) {
      form.reset({
        title: position.title,
        companyId: position.companyId,
        startDate: position.startDate ? format(new Date(position.startDate), 'yyyy-MM-dd') : '',
        endDate: position.endDate ? format(new Date(position.endDate), 'yyyy-MM-dd') : '',
        isCurrent: position.isCurrent,
      })
    } else {
      form.reset({
        title: '',
        companyId: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
      })
    }
  }, [position, form])

  // Handle isCurrent checkbox changes
  useEffect(() => {
    const isCurrent = form.watch('isCurrent')
    if (isCurrent) {
      form.setValue('endDate', null)
    }
  }, [form.watch('isCurrent'), form])

  // Create or update position mutation
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const url = isEditing ? `/api/positions/${editingId}` : '/api/positions'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save position')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] })
      if (isEditing) {
        queryClient.invalidateQueries({ queryKey: ['position', editingId] })
      }
      toast(`Position ${isEditing ? 'updated' : 'created'} successfully`)
      onClose()
    },
    onError: error => {
      toast('Error', {
        description: error.message,
      })
    },
  })

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values)
  }

  // @ts-ignore
  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Position' : 'Create Position'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the position details'
              : 'Add a new position to your work experience'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies.map((company: any) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value || ''}
                        disabled={form.watch('isCurrent')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="isCurrent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Current Position</FormLabel>
                    <p className="text-muted-foreground text-sm">
                      Check this if you currently work in this position
                    </p>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        {isEditing && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium">Responsibilities</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Manage the responsibilities for this position
            </p>
            <ResponsibilitiesManager positionId={editingId} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
