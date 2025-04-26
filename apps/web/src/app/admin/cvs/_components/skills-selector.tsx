'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowDown, ArrowUp, ChevronRight, Trash } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  toast,
} from '@repo/ui'

interface SkillsSelectorProps {
  cvId: string
}

export function SkillsSelector({ cvId }: SkillsSelectorProps) {
  const queryClient = useQueryClient()

  // Fetch all skills
  const { data: allSkills = [], isLoading: isLoadingAll } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const response = await fetch('/api/skills')
      if (!response.ok) {
        throw new Error('Failed to fetch skills')
      }
      return response.json()
    },
  })

  // Fetch skills for this CV
  const { data: cvSkills = [], isLoading: isLoadingCV } = useQuery({
    queryKey: ['cv-skills', cvId],
    queryFn: async () => {
      const response = await fetch(`/api/cvs/${cvId}/skills`)
      if (!response.ok) {
        throw new Error('Failed to fetch CV skills')
      }
      return response.json()
    },
  })

  // Add skill mutation
  const addMutation = useMutation({
    mutationFn: async (skillId: string) => {
      const response = await fetch(`/api/cvs/${cvId}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skillId,
          order: cvSkills.length,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to add skill')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cv-skills', cvId] })
      toast('Skill added', {
        description: 'Skill has been added to the CV.',
      })
    },
    onError: error => {
      toast('Error', {
        description: error.message,
      })
    },
  })

  // Remove skill mutation
  const removeMutation = useMutation({
    mutationFn: async (cvSkillId: string) => {
      const response = await fetch(`/api/cvs/${cvId}/skills/${cvSkillId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to remove skill')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cv-skills', cvId] })
      toast({
        title: 'Skill removed',
        description: 'Skill has been removed from the CV.',
      })
    },
    onError: error => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  // Reorder skill mutation
  const reorderMutation = useMutation({
    mutationFn: async ({ id, direction }: { id: string; direction: 'up' | 'down' }) => {
      const response = await fetch(`/api/cvs/${cvId}/skills/${id}/reorder`, {
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
        throw new Error(error.message || 'Failed to reorder skill')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cv-skills', cvId] })
    },
    onError: error => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  // Filter out skills that are already in the CV
  const availableSkills = allSkills.filter(
    (skill: any) => !cvSkills.some(cvSkill => cvSkill.skillId === skill.id),
  )

  const isLoading = isLoadingAll || isLoadingCV

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Available Skills</CardTitle>
          <CardDescription>Select skills to add to your CV</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading skills...</div>
          ) : availableSkills.length === 0 ? (
            <div className="text-muted-foreground py-4 text-center">No available skills</div>
          ) : (
            <ul className="space-y-2">
              {availableSkills.map(skill => (
                <li
                  key={skill.id}
                  className="flex items-center justify-between rounded-md border p-2"
                >
                  <div>
                    <div className="font-medium">{skill.name}</div>
                    {skill.category && (
                      <Badge variant="outline" className="mt-1">
                        {skill.category.name}
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addMutation.mutate(skill.id)}
                    disabled={addMutation.isPending}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Add</span>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Selected Skills</CardTitle>
          <CardDescription>Skills that will appear on your CV</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading selected skills...</div>
          ) : cvSkills.length === 0 ? (
            <div className="text-muted-foreground py-4 text-center">No skills selected</div>
          ) : (
            <ul className="space-y-2">
              {cvSkills
                .sort((a, b) => a.order - b.order)
                .map((cvSkill, index) => (
                  <li
                    key={cvSkill.id}
                    className="flex items-center justify-between rounded-md border p-2"
                  >
                    <div>
                      <div className="font-medium">{cvSkill.skill.name}</div>
                      {cvSkill.skill.category && (
                        <Badge variant="outline" className="mt-1">
                          {cvSkill.skill.category.name}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => reorderMutation.mutate({ id: cvSkill.id, direction: 'up' })}
                        disabled={index === 0 || reorderMutation.isPending}
                      >
                        <ArrowUp className="h-4 w-4" />
                        <span className="sr-only">Move up</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          reorderMutation.mutate({ id: cvSkill.id, direction: 'down' })
                        }
                        disabled={index === cvSkills.length - 1 || reorderMutation.isPending}
                      >
                        <ArrowDown className="h-4 w-4" />
                        <span className="sr-only">Move down</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeMutation.mutate(cvSkill.id)}
                        disabled={removeMutation.isPending}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
