"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ArrowDown, ArrowUp, ChevronRight, Trash } from "lucide-react"
import type { Position } from "@/lib/types"
import { format } from "date-fns"

interface PositionWithCompany extends Position {
  company: {
    name: string
  }
}

interface CVPosition {
  id: string
  cvId: string
  positionId: string
  order: number
  position: PositionWithCompany
}

interface PositionsSelectorProps {
  cvId: string
}

export function PositionsSelector({ cvId }: PositionsSelectorProps) {
  const queryClient = useQueryClient()

  // Fetch all positions
  const { data: allPositions = [], isLoading: isLoadingAll } = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const response = await fetch("/api/positions")
      if (!response.ok) {
        throw new Error("Failed to fetch positions")
      }
      return response.json()
    },
  })

  // Fetch positions for this CV
  const { data: cvPositions = [], isLoading: isLoadingCV } = useQuery({
    queryKey: ["cv-positions", cvId],
    queryFn: async () => {
      const response = await fetch(`/api/cvs/${cvId}/positions`)
      if (!response.ok) {
        throw new Error("Failed to fetch CV positions")
      }
      return response.json()
    },
  })

  // Add position mutation
  const addMutation = useMutation({
    mutationFn: async (positionId: string) => {
      const response = await fetch(`/api/cvs/${cvId}/positions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          positionId,
          order: cvPositions.length,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to add position")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-positions", cvId] })
      toast({
        title: "Position added",
        description: "Position has been added to the CV.",
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

  // Remove position mutation
  const removeMutation = useMutation({
    mutationFn: async (cvPositionId: string) => {
      const response = await fetch(`/api/cvs/${cvId}/positions/${cvPositionId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to remove position")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-positions", cvId] })
      toast({
        title: "Position removed",
        description: "Position has been removed from the CV.",
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

  // Reorder position mutation
  const reorderMutation = useMutation({
    mutationFn: async ({ id, direction }: { id: string; direction: "up" | "down" }) => {
      const response = await fetch(`/api/cvs/${cvId}/positions/${id}/reorder`, {
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
        throw new Error(error.message || "Failed to reorder position")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-positions", cvId] })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  // Filter out positions that are already in the CV
  const availablePositions = allPositions.filter(
    (position: PositionWithCompany) => !cvPositions.some((cvPos: CVPosition) => cvPos.positionId === position.id),
  )

  const isLoading = isLoadingAll || isLoadingCV

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Available Positions</CardTitle>
          <CardDescription>Select positions to add to your CV</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading positions...</div>
          ) : availablePositions.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No available positions</div>
          ) : (
            <ul className="space-y-2">
              {availablePositions.map((position: PositionWithCompany) => (
                <li key={position.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">{position.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {position.company.name} • {format(new Date(position.startDate), "MMM yyyy")} -
                      {position.endDate ? format(new Date(position.endDate), " MMM yyyy") : " Present"}
                    </div>
                  </div>
                  <Button size="sm" onClick={() => addMutation.mutate(position.id)} disabled={addMutation.isPending}>
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
          <CardTitle>Selected Positions</CardTitle>
          <CardDescription>Positions that will appear on your CV</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading selected positions...</div>
          ) : cvPositions.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No positions selected</div>
          ) : (
            <ul className="space-y-2">
              {cvPositions
                .sort((a: CVPosition, b: CVPosition) => a.order - b.order)
                .map((cvPosition: CVPosition, index: number) => (
                  <li key={cvPosition.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <div className="font-medium">{cvPosition.position.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {cvPosition.position.company.name} •{" "}
                        {format(new Date(cvPosition.position.startDate), "MMM yyyy")} -
                        {cvPosition.position.endDate
                          ? format(new Date(cvPosition.position.endDate), " MMM yyyy")
                          : " Present"}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => reorderMutation.mutate({ id: cvPosition.id, direction: "up" })}
                        disabled={index === 0 || reorderMutation.isPending}
                      >
                        <ArrowUp className="h-4 w-4" />
                        <span className="sr-only">Move up</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => reorderMutation.mutate({ id: cvPosition.id, direction: "down" })}
                        disabled={index === cvPositions.length - 1 || reorderMutation.isPending}
                      >
                        <ArrowDown className="h-4 w-4" />
                        <span className="sr-only">Move down</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeMutation.mutate(cvPosition.id)}
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
