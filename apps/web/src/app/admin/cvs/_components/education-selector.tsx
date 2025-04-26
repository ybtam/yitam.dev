"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ArrowDown, ArrowUp, ChevronRight, Trash } from "lucide-react"
import type { Education } from "@/lib/types"
import { format } from "date-fns"

interface CVEducation {
  id: string
  cvId: string
  educationId: string
  order: number
  education: Education
}

interface EducationSelectorProps {
  cvId: string
}

export function EducationSelector({ cvId }: EducationSelectorProps) {
  const queryClient = useQueryClient()

  // Fetch all education entries
  const { data: allEducation = [], isLoading: isLoadingAll } = useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const response = await fetch("/api/education")
      if (!response.ok) {
        throw new Error("Failed to fetch education")
      }
      return response.json()
    },
  })

  // Fetch education for this CV
  const { data: cvEducation = [], isLoading: isLoadingCV } = useQuery({
    queryKey: ["cv-education", cvId],
    queryFn: async () => {
      const response = await fetch(`/api/cvs/${cvId}/education`)
      if (!response.ok) {
        throw new Error("Failed to fetch CV education")
      }
      return response.json()
    },
  })

  // Add education mutation
  const addMutation = useMutation({
    mutationFn: async (educationId: string) => {
      const response = await fetch(`/api/cvs/${cvId}/education`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          educationId,
          order: cvEducation.length,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to add education")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-education", cvId] })
      toast({
        title: "Education added",
        description: "Education has been added to the CV.",
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

  // Remove education mutation
  const removeMutation = useMutation({
    mutationFn: async (cvEducationId: string) => {
      const response = await fetch(`/api/cvs/${cvId}/education/${cvEducationId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to remove education")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-education", cvId] })
      toast({
        title: "Education removed",
        description: "Education has been removed from the CV.",
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

  // Reorder education mutation
  const reorderMutation = useMutation({
    mutationFn: async ({ id, direction }: { id: string; direction: "up" | "down" }) => {
      const response = await fetch(`/api/cvs/${cvId}/education/${id}/reorder`, {
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
        throw new Error(error.message || "Failed to reorder education")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-education", cvId] })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  // Filter out education that is already in the CV
  const availableEducation = allEducation.filter(
    (education: Education) => !cvEducation.some((cvEdu: CVEducation) => cvEdu.educationId === education.id),
  )

  const isLoading = isLoadingAll || isLoadingCV

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Available Education</CardTitle>
          <CardDescription>Select education to add to your CV</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading education...</div>
          ) : availableEducation.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No available education</div>
          ) : (
            <ul className="space-y-2">
              {availableEducation.map((education: Education) => (
                <li key={education.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">{education.institution}</div>
                    <div className="text-sm text-muted-foreground">
                      {education.degree} {education.fieldOfStudy ? `in ${education.fieldOfStudy}` : ""} •
                      {format(new Date(education.startDate), "yyyy")} -
                      {education.endDate ? format(new Date(education.endDate), "yyyy") : "Present"}
                    </div>
                  </div>
                  <Button size="sm" onClick={() => addMutation.mutate(education.id)} disabled={addMutation.isPending}>
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
          <CardTitle>Selected Education</CardTitle>
          <CardDescription>Education that will appear on your CV</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading selected education...</div>
          ) : cvEducation.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No education selected</div>
          ) : (
            <ul className="space-y-2">
              {cvEducation
                .sort((a: CVEducation, b: CVEducation) => a.order - b.order)
                .map((cvEdu: CVEducation, index: number) => (
                  <li key={cvEdu.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <div className="font-medium">{cvEdu.education.institution}</div>
                      <div className="text-sm text-muted-foreground">
                        {cvEdu.education.degree}{" "}
                        {cvEdu.education.fieldOfStudy ? `in ${cvEdu.education.fieldOfStudy}` : ""} •
                        {format(new Date(cvEdu.education.startDate), "yyyy")} -
                        {cvEdu.education.endDate ? format(new Date(cvEdu.education.endDate), "yyyy") : "Present"}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => reorderMutation.mutate({ id: cvEdu.id, direction: "up" })}
                        disabled={index === 0 || reorderMutation.isPending}
                      >
                        <ArrowUp className="h-4 w-4" />
                        <span className="sr-only">Move up</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => reorderMutation.mutate({ id: cvEdu.id, direction: "down" })}
                        disabled={index === cvEducation.length - 1 || reorderMutation.isPending}
                      >
                        <ArrowDown className="h-4 w-4" />
                        <span className="sr-only">Move down</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeMutation.mutate(cvEdu.id)}
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
