'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import {
  Button,
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
  Textarea,
  toast,
} from '@repo/ui'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().nullable(),
})

type FormValues = z.infer<typeof formSchema>

interface CVFormProps {
  open: boolean
  onClose: () => void
  editingId: string | null
}

export function CVForm({ open, onClose, editingId }: CVFormProps) {
  const queryClient = useQueryClient()
  const isEditing = !!editingId

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  // Fetch CV data if editing
  const { data: cv } = useQuery({
    queryKey: ['cv', editingId],
    queryFn: async () => {
      if (!editingId) return null
      const response = await fetch(`/api/cvs/${editingId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch CV')
      }
      return response.json()
    },
    enabled: isEditing,
  })

  // Update form values when CV data is loaded
  useEffect(() => {
    if (cv) {
      form.reset({
        name: cv.name,
        description: cv.description,
      })
    } else {
      form.reset({
        name: '',
        description: '',
      })
    }
  }, [cv, form])

  // Create or update CV mutation
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const url = isEditing ? `/api/cvs/${editingId}` : '/api/cvs'
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
        throw new Error(error.message || 'Failed to save CV')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cvs'] })
      if (isEditing) {
        queryClient.invalidateQueries({ queryKey: ['cv', editingId] })
      }
      toast(`CV ${isEditing ? 'updated' : 'created'} successfully`)
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

  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit CV' : 'Create CV'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the CV details' : 'Add a new CV to your portfolio'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="CV Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of this CV"
                      {...field}
                      value={field.value || ''}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
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
      </DialogContent>
    </Dialog>
  )
}
