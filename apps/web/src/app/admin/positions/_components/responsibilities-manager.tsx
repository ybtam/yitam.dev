'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2, ArrowUp, ArrowDown, Plus } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Input,
  toast,
} from '@repo/ui'

interface ResponsibilitiesManagerProps {
  positionId: string
}

export function ResponsibilitiesManager({ positionId }: ResponsibilitiesManagerProps) {
  const [newResponsibility, setNewResponsibility] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // Fetch responsibilities
  const { data: responsibilities = [], isLoading } = useQuery({
    queryKey: ['responsibilities', positionId],
    queryFn: async () => {
      const response = await fetch(`/api/positions/${positionId}/responsibilities`)
      if (!response.ok) {
        throw new Error('Failed to fetch responsibilities')
      }
      return response.json()
    },
  })

  // Add responsibility mutation
  const addMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/positions/${positionId}/responsibilities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: newResponsibility,
          order: responsibilities.length,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to add responsibility')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['responsibilities', positionId] })
      setNewResponsibility('')
      toast('Responsibility added')
    },
    onError: error => {
      toast('Error', {
        description: error.message,
      })
    },
  })

  // Update responsibility mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, description }: { id: string; description: string }) => {
      const response = await fetch(`/api/positions/${positionId}/responsibilities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update responsibility')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['responsibilities', positionId] })
      setEditingId(null)
      setEditText('')
      toast('Responsibility updated')
    },
    onError: error => {
      toast('Error', {
        description: error.message,
      })
    },
  })

  // Delete responsibility mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/positions/${positionId}/responsibilities/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete responsibility')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['responsibilities', positionId] })
      setDeleteId(null)
      toast('Responsibility deleted')
    },
    onError: error => {
      toast('Error', {
        description: error.message,
      })
    },
  })

  // Reorder responsibility mutation
  const reorderMutation = useMutation({
    mutationFn: async ({ id, direction }: { id: string; direction: 'up' | 'down' }) => {
      const response = await fetch(`/api/positions/${positionId}/responsibilities/${id}/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          direction,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to reorder responsibility')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['responsibilities', positionId] })
    },
    onError: error => {
      toast('Error', {
        description: error.message,
      })
    },
  })

  const handleAdd = () => {
    if (!newResponsibility.trim()) return
    addMutation.mutate()
  }

  const startEdit = (responsibility: any) => {
    setEditingId(responsibility.id)
    setEditText(responsibility.description)
  }

  const handleUpdate = () => {
    if (!editingId || !editText.trim()) return
    updateMutation.mutate({ id: editingId, description: editText })
  }

  const handleReorder = (id: string, direction: 'up' | 'down') => {
    reorderMutation.mutate({ id, direction })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Add a new responsibility"
          value={newResponsibility}
          onChange={e => setNewResponsibility(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <Button
          onClick={handleAdd}
          disabled={!newResponsibility.trim() || addMutation.isPending}
          size="icon"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      {isLoading ? (
        <div>Loading responsibilities...</div>
      ) : responsibilities.length === 0 ? (
        <div className="text-muted-foreground py-4 text-center">No responsibilities added yet</div>
      ) : (
        <ul className="space-y-2">
          {responsibilities.map((responsibility: any) => (
            <li key={responsibility.id} className="flex items-center gap-2 rounded-md border p-2">
              {editingId === responsibility.id ? (
                <>
                  <Input
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleUpdate()}
                    autoFocus
                  />
                  <Button
                    onClick={handleUpdate}
                    disabled={!editText.trim() || updateMutation.isPending}
                    size="sm"
                  >
                    Save
                  </Button>
                  <Button onClick={() => setEditingId(null)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <span className="flex-1">{responsibility.description}</span>
                  <Button onClick={() => startEdit(responsibility)} variant="ghost" size="icon">
                    <span className="sr-only">Edit</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </Button>
                  <Button
                    onClick={() => setDeleteId(responsibility.id)}
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                  >
                    <span className="sr-only">Delete</span>
                    <Trash2 className="size-4" />
                  </Button>
                  <Button
                    onClick={() => handleReorder(responsibility.id, 'up')}
                    variant="ghost"
                    size="icon"
                    disabled={responsibility.order === 0}
                  >
                    <span className="sr-only">Move up</span>
                    <ArrowUp className="size-4" />
                  </Button>
                  <Button
                    onClick={() => handleReorder(responsibility.id, 'down')}
                    variant="ghost"
                    size="icon"
                    disabled={responsibility.order === responsibilities.length - 1}
                  >
                    <span className="sr-only">Move down</span>
                    <ArrowDown className="size-4" />
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={open => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this responsibility. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
