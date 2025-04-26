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
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  website: z.string().url('Must be a valid URL').optional().nullable(),
})

type FormValues = z.infer<typeof formSchema>

interface CompanyFormProps {
  open: boolean
  onClose: () => void
  editingId: string | null
}

export function CompanyForm({ open, onClose, editingId }: CompanyFormProps) {
  const queryClient = useQueryClient()
  const isEditing = !!editingId

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
      description: '',
      website: '',
    },
  })

  // Fetch company data if editing
  const { data: company } = useQuery({
    queryKey: ['company', editingId],
    queryFn: async () => {
      if (!editingId) return null
      const response = await fetch(`/api/companies/${editingId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch company')
      }
      return response.json()
    },
    enabled: isEditing,
  })

  // Update form values when company data is loaded
  useEffect(() => {
    if (company) {
      form.reset({
        name: company.name,
        location: company.location,
        description: company.description,
        website: company.website,
      })
    } else {
      form.reset({
        name: '',
        location: '',
        description: '',
        website: '',
      })
    }
  }, [company, form])

  // Create or update company mutation
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const url = isEditing ? `/api/companies/${editingId}` : '/api/companies'
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
        throw new Error(error.message || 'Failed to save company')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
      if (isEditing) {
        queryClient.invalidateQueries({ queryKey: ['company', editingId] })
      }
      toast.success(`Company ${isEditing ? 'updated' : 'created'} successfully`)
      onClose()
    },
    onError: error => {
      toast.error('Error', {
        description: error.message,
      })
    },
  })

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Company' : 'Create Company'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the company details' : 'Add a new company to your portfolio'}
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
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} value={field.value || ''} />
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
                      placeholder="Brief description of the company"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} value={field.value || ''} />
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
