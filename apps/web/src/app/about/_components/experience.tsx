'use client'

import { Badge, Card, CardContent } from '@repo/ui'
import { Briefcase } from 'lucide-react'
import { useTRPC } from '@repo/sdk'
import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { AboutSection } from '@/app/about/_components/section.tsx'

export const Experience = () => {
  return (
    <AboutSection title={'Experience'}>
      <div className="space-y-4">
        <Suspense>
          <Loader />
        </Suspense>
      </div>
    </AboutSection>
  )
}

const Loader = () => {
  const trpc = useTRPC()

  const { data: experiences } = useSuspenseQuery(trpc.cv.experience.queryOptions())

  return (
    <>
      {experiences.map((experience, index) => (
        <Card key={index} className={'break-inside-avoid-page p-6 print:p-4'}>
          <CardContent className="p-0">
            <div className="flex items-start gap-4 print:gap-2">
              <Briefcase className="text-primary mt-1 size-6 print:size-4" />
              <div className="w-full">
                <h3 className="text-muted-foreground print:text-sm">{experience.company}</h3>
                <div className={'flex flex-col gap-2 print:gap-1'}>
                  {experience.history.map(job => (
                    <div key={job.title}>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold print:text-sm">{job.title}</h4>
                        <Badge variant="outline" className={'print:text-sm'}>
                          {job.years}
                        </Badge>
                      </div>
                      <p className={'mb-2 print:text-xs'}>{job.description}</p>
                      <ul className="list-inside list-disc space-y-1 text-sm print:text-xs">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
