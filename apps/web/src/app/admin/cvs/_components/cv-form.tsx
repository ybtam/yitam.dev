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
import { useTRPC } from '@repo/sdk'
import { insertCvsSchema } from '@apps/db/zod'

interface CVFormProps {
  open: boolean
  onClose: () => void
  editingId?: number
}

export function CVForm({ open, onClose, editingId }: CVFormProps) {
  const isEditing = !!editingId

  const { form } = useCvForm({ editingId })
  const { onSubmit, mutation } = useCvFormSubmit({ editingId, onClose })

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

const useCvForm = ({ editingId }: { editingId?: number }) => {
  const isEditing = !!editingId

  const trpc = useTRPC()

  const form = useForm({
    resolver: zodResolver(insertCvsSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  // Fetch CV data if editing
  const { data: cv } = useQuery(
    trpc.cv.get.queryOptions(
      {
        id: editingId!,
      },
      {
        enabled: isEditing,
      },
    ),
  )

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

  return { form }
}

const useCvFormSubmit = ({ editingId, onClose }: { editingId?: number; onClose: () => void }) => {
  const queryClient = useQueryClient()
  const trpc = useTRPC()

  const isEditing = !!editingId

  const mutation = useMutation(
    trpc.cv.create.mutationOptions({
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
    }),
  )
  const onSubmit = (values: z.infer<typeof insertCvsSchema>) => {
    mutation.mutate(values)
  }

  return {
    onSubmit,
    mutation,
  }
}
