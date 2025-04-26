'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { columns } from './_components/columns'
import { CompanyForm } from './_components/company-form'
import { Button, DataTable, Separator } from '@repo/ui'
import { Heading } from '@/app/admin/_components/heading.tsx'

export default function CompaniesPage() {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const { data: companies = [], isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await fetch('/api/companies')
      if (!response.ok) {
        throw new Error('Failed to fetch companies')
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
        <Heading title={`Companies (${companies.length})`} description="Manage your companies" />
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns({ onEdit })}
        data={companies}
        isLoading={isLoading}
        searchKey="name"
      />
      <CompanyForm open={open} onClose={onClose} editingId={editingId} />
    </div>
  )
}
