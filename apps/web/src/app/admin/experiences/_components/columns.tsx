'use client'

import { createColumnHelper } from '@tanstack/react-table'
import { MoreHorizontal, Pencil } from 'lucide-react'
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@repo/ui'
import { DeleteExperienceButton } from './delete-experience-button'
import { format } from 'date-fns'
import { useExperienceForm } from '@/app/admin/experiences/_components/experience-form/context.tsx'
import { RouterOutput } from '@apps/api'

const columnHelper = createColumnHelper<RouterOutput['positions']['getList'][0]>()

export const columns = () => [
  columnHelper.accessor('jobTitle', {
    id: 'jobTitle',
    header: 'Job Title',
  }),
  columnHelper.accessor('company.name', {
    header: 'Company',
  }),
  columnHelper.accessor(row => format(new Date(row.startDate), 'MMM yyyy'), {
    header: 'Start',
  }),
  columnHelper.accessor(
    row => (row.endDate ? format(new Date(row.endDate), 'MMM yyyy') : 'Present'),
    {
      header: 'End',
    },
  ),
  columnHelper.accessor('isCurrent', {
    header: 'Current',
    cell: ({ getValue }) => (getValue() ? <Badge variant="default">Current</Badge> : undefined),
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const { setExperienceId, setOpen } = useExperienceForm()

      const experience = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setExperienceId(experience.id)
                setOpen(true)
              }}
            >
              <Pencil className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DeleteExperienceButton id={experience.id} title={experience.jobTitle} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
]
