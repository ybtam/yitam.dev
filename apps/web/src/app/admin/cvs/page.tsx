'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { columns } from './_components/columns'
import { CVForm } from './_components/cv-form'
import { Heading } from '@/app/admin/_components/heading.tsx'
import { Button, DataTable, Separator } from '@repo/ui'

export default function CVsPage() {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const { data: cvs = [], isLoading } = useQuery({
    queryKey: ['cvs'],
    queryFn: async () => {
      const response = await fetch('/api/cvs')
      if (!response.ok) {
        throw new Error('Failed to fetch CVs')
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
        <Heading title={`CVs (${cvs.length})`} description="Manage your CV versions" />
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns({ onEdit })} data={cvs} isLoading={isLoading} searchKey="name" />
      <CVForm open={open} onClose={onClose} editingId={editingId} />
    </div>
  )
}
