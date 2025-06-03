'use client'

import { Badge, Spinner } from '@repo/ui'
import { Fragment, Suspense } from 'react'
import { useTRPC } from '@repo/sdk'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Skills = () => {
  return (
    <div className="flex flex-col justify-center space-y-4">
      <h3 className="text-xl font-bold">Skills</h3>
      <div className="flex flex-wrap gap-2">
        <Suspense fallback={<Spinner />}>
          <Loader />
        </Suspense>
      </div>
    </div>
  )
}

const Loader = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.cv.skills.queryOptions())

  return (
    <>
      {data.map(skill => (
        <Fragment key={skill.label}>
          {skill.values.map(value => (
            <Badge key={value}>{value}</Badge>
          ))}
        </Fragment>
      ))}
    </>
  )
}
