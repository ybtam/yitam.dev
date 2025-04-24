'use client'

import { Badge, Separator } from '@repo/ui'
import { useTRPC } from '@repo/sdk'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Fragment, Suspense } from 'react'

export const Skills = () => {
  return (
    <div className={'grid grid-cols-[auto_1fr] gap-2 gap-x-4 print:gap-1 print:gap-x-3'}>
      <Suspense>
        <Loader />
      </Suspense>
    </div>
  )
}

const Loader = () => {
  const trpc = useTRPC()
  const { data: skills } = useSuspenseQuery(trpc.cv.skills.queryOptions())

  return (
    <>
      {skills.map(skill => (
        <Fragment key={skill.label}>
          <p className={'self-center print:text-xs'}>{skill.label}</p>
          <div className={'flex flex-wrap gap-1'}>
            {skill.values.map(value => (
              <Badge className={'print:text-xs'} key={value}>
                {value}
              </Badge>
            ))}
          </div>
          <Separator className={'col-span-2'} />
        </Fragment>
      ))}
    </>
  )
}
