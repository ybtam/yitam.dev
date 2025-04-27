'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { useExperienceForm } from '@/app/admin/experiences/_components/experience-form/context.tsx'
import { CompanyAutocomplete } from '@/app/admin/experiences/_components/experience-form/company-autocomplete.tsx'
import { useTRPC } from '@repo/sdk'
import { ResponsibilitiesInput } from '@/app/admin/experiences/_components/experience-form/responsibilities-input.tsx'
import { createPositionSchema } from '@apps/api/zod'

export function ExperienceForm() {
  const { open, experienceId, setExperienceId, setOpen } = useExperienceForm()

  const onClose = () => {
    setOpen(false)
    setExperienceId(undefined)
  }

  const isEditing = !!experienceId

  const { form, onSubmit, isPending } = useFormSubmit({ isEditing })

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
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="jobTitle"
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
                  <FormControl>
                    <CompanyAutocomplete {...field} />
                  </FormControl>
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
            {/*todo need to wrap it in form*/}
            <ResponsibilitiesInput />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const useFormSubmit = ({ isEditing }: { isEditing: boolean }) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { setOpen } = useExperienceForm()

  const form = useForm({
    resolver: zodResolver(createPositionSchema),
    defaultValues: {
      jobTitle: '',
      companyId: 0,
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      responsibilities: [],
    },
  })

  // Handle isCurrent checkbox changes
  useEffect(() => {
    const isCurrent = form.watch('isCurrent')
    if (isCurrent) {
      form.setValue('endDate', null)
    }
  }, [form.watch('isCurrent'), form])

  // Create or update experience mutation
  const { mutate, isPending } = useMutation(
    trpc.positions.create.mutationOptions({
      onSuccess: async data => {
        toast.success('Experience created successfully', {
          description: `${data.jobTitle} | ${data.companyId}`,
        })
        form.reset()
        await queryClient.invalidateQueries({
          queryKey: trpc.positions.getList.queryKey(),
        })
        setOpen(false)
      },
      onError: error => {
        toast.error('Error creating experience', {
          description: error.message,
        })
        console.error(error)
      },
    }),
  )

  return {
    form,
    onSubmit: form.handleSubmit(value => {
      mutate(value)
    }),
    isPending,
  }
}
