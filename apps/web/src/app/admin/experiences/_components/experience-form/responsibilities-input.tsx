'use client'

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { createPositionSchema } from '@apps/api/zod'
import { Button, FormControl, FormField, FormItem, FormMessage, Textarea } from '@repo/ui'
import { GripVertical } from 'lucide-react'

type CreatePositionType = z.infer<typeof createPositionSchema>

export const ResponsibilitiesInput = () => {
  const form = useFormContext<CreatePositionType>()

  const responsibilitiesFieldArray = useFieldArray({
    control: form.control,
    name: 'responsibilities',
  })

  const [items, setItems] = useState([1, 2, 3])

  const { sensors, handleDragEnd } = useSortableEvent({ fieldArray: responsibilitiesFieldArray })

  return (
    <div className={'flex flex-col gap-1'}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={responsibilitiesFieldArray.fields}
          strategy={verticalListSortingStrategy}
        >
          {responsibilitiesFieldArray.fields.map((responsibility, index) => (
            <SortableItem key={responsibility.id} {...responsibility} index={index} />
          ))}
        </SortableContext>
      </DndContext>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          responsibilitiesFieldArray.append({
            text: '',
            order: 0,
          })
        }}
      >
        Add Responsibility
      </Button>
    </div>
  )
}

const useSortableEvent = ({
  fieldArray,
}: {
  fieldArray: ReturnType<typeof useFieldArray<CreatePositionType>>
}) => {
  const { fields, move } = fieldArray

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex(field => field.id === active.id)
      const newIndex = fields.findIndex(field => field.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        move(oldIndex, newIndex) // Use RHF's move function
      }
    }
  }

  return {
    sensors,
    handleDragEnd,
  }
}

const SortableItem = ({ index, id }: { index: number; id: string }) => {
  const form = useFormContext<CreatePositionType>()

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id as string,
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: 50,
  }

  return (
    <div ref={setNodeRef} style={style} className={'flex w-full items-center gap-2'}>
      <FormField
        render={({ field }) => (
          <FormItem className={'w-full'}>
            <FormControl>
              <Textarea {...field} className={'bg-white'} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        name={`responsibilities.${index}.text`}
        control={form.control}
      />
      <Button size={'icon'} variant={'ghost'} type={'button'} {...attributes} {...listeners}>
        <GripVertical />
      </Button>
    </div>
  )
}
