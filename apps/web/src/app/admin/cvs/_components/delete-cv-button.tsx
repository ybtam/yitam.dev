'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  DropdownMenuItem,
  toast,
} from '@repo/ui'

interface DeleteCVButtonProps {
  id: string
  name: string
}

export function DeleteCVButton({ id, name }: DeleteCVButtonProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/cvs/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete CV')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cvs'] })
      toast('CV deleted', {
        description: `${name} has been deleted successfully.`,
      })
      setOpen(false)
    },
    onError: error => {
      toast('Error', {
        description: error.message,
      })
    },
  })

  return (
    <>
      <DropdownMenuItem
        onSelect={e => {
          e.preventDefault()
          setOpen(true)
        }}
        className="text-destructive focus:text-destructive"
      >
        <Trash className="mr-2 size-4" />
        Delete
      </DropdownMenuItem>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the CV "{name}" and all its associated content. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {mutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
