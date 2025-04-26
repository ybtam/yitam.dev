'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
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

interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  isCurrent: boolean
  description: string
  technologies: string
  createdAt: string
  updatedAt: string
}

interface ColumnsProps {
  onEdit: (id: string) => void
}

export const columns = ({ onEdit }: ColumnsProps): ColumnDef<Experience>[] => [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Job Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const date = row.getValue('startDate') as string
      return format(new Date(date), 'MMM yyyy')
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const date = row.getValue('endDate') as string | null
      if (!date) return 'Present'
      return format(new Date(date), 'MMM yyyy')
    },
  },
  {
    accessorKey: 'isCurrent',
    header: 'Current',
    cell: ({ row }) => {
      const isCurrent = row.getValue('isCurrent') as boolean
      return isCurrent ? <Badge variant="default">Current</Badge> : null
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const experience = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(experience.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DeleteExperienceButton id={experience.id} title={experience.title} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
