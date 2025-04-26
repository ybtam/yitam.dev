'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui'
import { cn } from '@repo/ui/lib'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTRPC } from '@repo/sdk'
import { useState } from 'react'

type Props = {
  value?: string
  onChange: (value?: string) => void
}

export function CompanyAutocomplete({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = useState<string>()
  const [selected, setSelected] = useState<string>()

  const trpc = useTRPC()
  const { data, isPending, refetch } = useQuery(
    trpc.companies.getList.queryOptions({ name: input }),
  )

  const onSelect = (data: { name: string }) => {
    setOpen(false)
    setSelected(data.name)
    setInput(undefined)
  }

  const createCompanyMutation = useMutation(
    trpc.companies.create.mutationOptions({
      onSuccess: async data => {
        onChange(data.id.toString())

        onSelect(data)
        await refetch()
      },
    }),
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? selected : 'Select company'}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search company..." value={input} onValueChange={setInput} />
          <CommandList>
            <CommandEmpty>
              <p>No Company found.</p>
              <Button
                onClick={() => {
                  if (input)
                    createCompanyMutation.mutate({
                      name: input,
                    })
                }}
                disabled={createCompanyMutation.isPending}
              >
                {createCompanyMutation.isPending ? 'Creating...' : 'Create'} {input}
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {data?.map(company => (
                <CommandItem
                  key={company.id}
                  value={company.id.toString()}
                  onSelect={currentValue => {
                    onChange(currentValue === value ? '' : currentValue)
                    onSelect(company)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === company.id.toString() ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {company.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
