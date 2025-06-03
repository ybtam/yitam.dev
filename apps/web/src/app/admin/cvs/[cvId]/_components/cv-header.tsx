'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, Save } from 'lucide-react'
import { Button, Card, CardContent, Input, Textarea, toast } from '@repo/ui'

interface CVHeaderProps {
  cv: any
}

export function CVHeader({ cv }: CVHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(cv.name)
  const [description, setDescription] = useState(cv.description || '')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/cvs/${cv.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update CV')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cv', cv.id] })
      queryClient.invalidateQueries({ queryKey: ['cvs'] })
      toast('CV updated', {
        description: 'CV details have been updated successfully.',
      })
      setIsEditing(false)
    },
    onError: error => {
      toast('Error', {
        description: error.message,
      })
    },
  })

  const handleSave = () => {
    if (!name.trim()) {
      toast('Error', {
        description: 'Name is required',
      })
      return
    }

    mutation.mutate()
  }

  return (
    <Card>
      <CardContent className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setName(cv.name)
                  setDescription(cv.description || '')
                  setIsEditing(false)
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={mutation.isPending}>
                <Save className="mr-2 size-4" />
                {mutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{cv.name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                <Edit className="size-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </div>
            {cv.description && <p className="text-muted-foreground mt-2">{cv.description}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
