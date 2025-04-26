'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { columns } from './_components/columns'
import { ExperienceForm } from './_components/experience-form'
import { Heading } from '@/app/admin/_components/heading.tsx'
import { Button, DataTable, Separator } from '@repo/ui'

export default function ExperiencesPage() {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const response = await fetch('/api/experiences')
      if (!response.ok) {
        throw new Error('Failed to fetch experiences')
      }
      return response.json()
    },
  })

  const onEdit = (id: string) => {
    setEditingId(id)
    setOpen(true)
  }

  const onClose = () => {
    setEditingId(null)
    setOpen(false)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Experiences (${experiences.length})`}
          description="Manage your work experiences"
        />
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns({ onEdit })}
        data={experiences}
        isLoading={isLoading}
        searchKey="title"
      />
      <ExperienceForm open={open} onClose={onClose} editingId={editingId} />
    </div>
  )
}
