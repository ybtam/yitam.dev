'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { columns } from './_components/columns'
import { ExperienceForm } from './_components/experience-form/form.tsx'
import { Heading } from '@/app/admin/_components/heading.tsx'
import { Button, DataTable, Separator } from '@repo/ui'
import {
  ExperienceFormProvider,
  useExperienceForm,
} from '@/app/admin/experiences/_components/experience-form/context.tsx'
import { useTRPC } from '@repo/sdk'

export default function ExperiencesPage() {
  const trpc = useTRPC()

  const { data: experiences = [], isLoading } = useQuery(trpc.positions.getList.queryOptions())

  return (
    <ExperienceFormProvider>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Experiences (${experiences.length})`}
            description="Manage your work experiences"
          />
          <AddNewButton />
        </div>
        <Separator />
        <DataTable columns={columns()} data={experiences} isLoading={isLoading} searchKey="title" />
        <ExperienceForm />
      </div>
    </ExperienceFormProvider>
  )
}

const AddNewButton = () => {
  const { setOpen } = useExperienceForm()

  return (
    <Button onClick={() => setOpen(true)}>
      <Plus className="mr-2 size-4" />
      Add New
    </Button>
  )
}
