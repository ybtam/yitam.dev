'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { columns } from './_components/columns'
import { PositionForm } from './_components/position-form'
import { Heading } from '@/app/admin/_components/heading.tsx'
import { Button, DataTable, Separator } from '@repo/ui'

export default function PositionsPage() {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const { data: positions = [], isLoading } = useQuery({
    queryKey: ['positions'],
    queryFn: async () => {
      const response = await fetch('/api/positions')
      if (!response.ok) {
        throw new Error('Failed to fetch positions')
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
          title={`Positions (${positions.length})`}
          description="Manage your work experience"
        />
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns({ onEdit })}
        data={positions}
        isLoading={isLoading}
        searchKey="title"
      />
      <PositionForm open={open} onClose={onClose} editingId={editingId} />
    </div>
  )
}
