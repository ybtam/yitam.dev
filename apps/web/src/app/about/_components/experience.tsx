'use client'

import { Badge, Card, CardContent } from '@repo/ui'
import { Briefcase } from 'lucide-react'
import { useTRPC } from '@repo/sdk'
import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Experience = () => {

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      <div className="space-y-4">
        <Suspense>
          <Loader/>
        </Suspense>
      </div>
    </section>
  )
}

const Loader = () => {
  const trpc = useTRPC()

  const {data: experiences} = useSuspenseQuery(trpc.cv.experience.queryOptions())

  return <>
    {experiences.map((experience, index) => (
      <Card key={index}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Briefcase className="h-6 w-6 text-primary mt-1" />
            <div className="w-full">
              <p className="text-muted-foreground">
                {experience.company}
              </p>
              <div className={'flex flex-col gap-2'}>
                {
                  experience.history.map(job => (
                    <div key={job.title}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold">{job.title}</h3>
                        <Badge variant="outline">{job.years}</Badge>
                      </div>
                      <p>{job.description}</p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                }
              </div>

            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </>
}
