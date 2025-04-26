'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Button,
  Badge,
} from '@repo/ui'
import { DeletePositionButton } from './delete-position-button'
import { format } from 'date-fns'

interface ColumnsProps {
  onEdit: (id: string) => void
}

export const columns = ({ onEdit }: ColumnsProps): ColumnDef<any>[] => [
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
    accessorKey: 'company.name',
    header: 'Company',
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
      const position = row.original

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
            <DropdownMenuItem onClick={() => onEdit(position.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DeletePositionButton id={position.id} title={position.title} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
