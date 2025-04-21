'use client'

import { Badge, Separator } from '@repo/ui'
import { useTRPC } from '@repo/sdk'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'

export const Skills = () => {
  return <div className="w-full">
    <h3 className="font-bold mb-2">Skills</h3>
    <div className={'grid grid-cols-[auto_1fr] gap-2 gap-x-4'}>
      <Suspense>
        <Loader/>
      </Suspense>
    </div>
  </div>
}

const Loader = () => {
  const trpc = useTRPC()
  const {data: skills} = useSuspenseQuery(trpc.cv.skills.queryOptions())

  return <>
    {skills.map(skill => (
      <>
        <p className={'self-center'}>{skill.label}</p>
        <div className={'flex flex-wrap gap-1'}>
          {skill.values.map(value => <Badge>{value}</Badge>)}
        </div>
        <Separator className={'col-span-2'}/>
      </>
      ))}
  </>
}
