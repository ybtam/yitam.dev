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
  Textarea,
  toast,
} from '@repo/ui'
import { format } from 'date-fns'
import { useExperienceForm } from '@/app/admin/experiences/_components/experience-form/context.tsx'

const formSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().min(1, 'Description is required'),
  technologies: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function ExperienceForm() {
  const { open, experienceId, setExperienceId, setOpen } = useExperienceForm()

  const onClose = () => {
    setOpen(false)
    setExperienceId(undefined)
  }

  const queryClient = useQueryClient()
  const isEditing = !!experienceId

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      technologies: '',
    },
  })

  // Fetch experience data if editing
  const { data: experience } = useQuery({
    queryKey: ['experience', experienceId],
    queryFn: async () => {
      if (!experienceId) return null
      const response = await fetch(`/api/experiences/${experienceId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch experience')
      }
      return response.json()
    },
    enabled: isEditing,
  })

  // Update form values when experience data is loaded
  useEffect(() => {
    if (experience) {
      form.reset({
        title: experience.title,
        company: experience.company,
        location: experience.location,
        startDate: experience.startDate ? format(new Date(experience.startDate), 'yyyy-MM-dd') : '',
        endDate: experience.endDate ? format(new Date(experience.endDate), 'yyyy-MM-dd') : '',
        isCurrent: experience.isCurrent,
        description: experience.description,
        technologies: experience.technologies || '',
      })
    } else {
      form.reset({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        technologies: '',
      })
    }
  }, [experience, form])

  // Handle isCurrent checkbox changes
  useEffect(() => {
    const isCurrent = form.watch('isCurrent')
    if (isCurrent) {
      form.setValue('endDate', null)
    }
  }, [form.watch('isCurrent'), form])

  // Create or update experience mutation
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const url = isEditing ? `/api/experiences/${experienceId}` : '/api/experiences'
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
        throw new Error(error.message || 'Failed to save experience')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] })
      if (isEditing) {
        queryClient.invalidateQueries({ queryKey: ['experience', experienceId] })
      }
      toast(`Experience ${isEditing ? 'updated' : 'created'} successfully`)
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Experience' : 'Create Experience'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the experience details' : 'Add a new experience to your portfolio'}
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
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
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your responsibilities and achievements"
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies Used</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="React, Node.js, TypeScript, etc."
                      {...field}
                      value={field.value || ''}
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
