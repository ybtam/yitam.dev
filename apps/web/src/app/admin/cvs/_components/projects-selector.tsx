"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ArrowDown, ArrowUp, ChevronRight, Trash } from "lucide-react"
import type { Project } from "@/lib/types"
import { format } from "date-fns"

interface CVProject {
  id: string
  cvId: string
  projectId: string
  order: number
  project: Project
}

interface ProjectsSelectorProps {
  cvId: string
}

export function ProjectsSelector({ cvId }: ProjectsSelectorProps) {
  const queryClient = useQueryClient()

  // Fetch all projects
  const { data: allProjects = [], isLoading: isLoadingAll } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects")
      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }
      return response.json()
    },
  })

  // Fetch projects for this CV
  const { data: cvProjects = [], isLoading: isLoadingCV } = useQuery({
    queryKey: ["cv-projects", cvId],
    queryFn: async () => {
      const response = await fetch(`/api/cvs/${cvId}/projects`)
      if (!response.ok) {
        throw new Error("Failed to fetch CV projects")
      }
      return response.json()
    },
  })

  // Add project mutation
  const addMutation = useMutation({
    mutationFn: async (projectId: string) => {
      const response = await fetch(`/api/cvs/${cvId}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          order: cvProjects.length,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to add project")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-projects", cvId] })
      toast({
        title: "Project added",
        description: "Project has been added to the CV.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  // Remove project mutation
  const removeMutation = useMutation({
    mutationFn: async (cvProjectId: string) => {
      const response = await fetch(`/api/cvs/${cvId}/projects/${cvProjectId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to remove project")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-projects", cvId] })
      toast({
        title: "Project removed",
        description: "Project has been removed from the CV.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  // Reorder project mutation
  const reorderMutation = useMutation({
    mutationFn: async ({ id, direction }: { id: string; direction: "up" | "down" }) => {
      const response = await fetch(`/api/cvs/${cvId}/projects/${id}/reorder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          direction,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to reorder project")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-projects", cvId] })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  // Filter out projects that are already in the CV
  const availableProjects = allProjects.filter(
    (project: Project) => !cvProjects.some((cvProject: CVProject) => cvProject.projectId === project.id),
  )

  const isLoading = isLoadingAll || isLoadingCV

  const formatDate = (date: string | null) => {
    if (!date) return null
    return format(new Date(date), "MMM yyyy")
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Available Projects</CardTitle>
          <CardDescription>Select projects to add to your CV</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading projects...</div>
          ) : availableProjects.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No available projects</div>
          ) : (
            <ul className="space-y-2">
              {availableProjects.map((project: Project) => (
                <li key={project.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {project.startDate && formatDate(project.startDate)}
                      {project.startDate && project.endDate && " - "}
                      {project.endDate ? formatDate(project.endDate) : project.startDate ? "Present" : ""}
                    </div>
                  </div>
                  <Button size="sm" onClick={() => addMutation.mutate(project.id)} disabled={addMutation.isPending}>
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
          <CardTitle>Selected Projects</CardTitle>
          <CardDescription>Projects that will appear on your CV</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading selected projects...</div>
          ) : cvProjects.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No projects selected</div>
          ) : (
            <ul className="space-y-2">
              {cvProjects
                .sort((a: CVProject, b: CVProject) => a.order - b.order)
                .map((cvProject: CVProject, index: number) => (
                  <li key={cvProject.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <div className="font-medium">{cvProject.project.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {cvProject.project.startDate && formatDate(cvProject.project.startDate)}
                        {cvProject.project.startDate && cvProject.project.endDate && " - "}
                        {cvProject.project.endDate
                          ? formatDate(cvProject.project.endDate)
                          : cvProject.project.startDate
                            ? "Present"
                            : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => reorderMutation.mutate({ id: cvProject.id, direction: "up" })}
                        disabled={index === 0 || reorderMutation.isPending}
                      >
                        <ArrowUp className="h-4 w-4" />
                        <span className="sr-only">Move up</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => reorderMutation.mutate({ id: cvProject.id, direction: "down" })}
                        disabled={index === cvProjects.length - 1 || reorderMutation.isPending}
                      >
                        <ArrowDown className="h-4 w-4" />
                        <span className="sr-only">Move down</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeMutation.mutate(cvProject.id)}
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
