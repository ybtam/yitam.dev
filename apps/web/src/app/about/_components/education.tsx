'use client'

import { Badge, Card, CardContent } from '@repo/ui'
import { GraduationCap } from 'lucide-react'
import { useTRPC } from '@repo/sdk'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { AboutSection } from '@/app/about/_components/section.tsx'

export const Education = () => {
  return (
    <AboutSection title={'Education'}>
      <Suspense>
        <Loader />
      </Suspense>
    </AboutSection>
  )
}

const Loader = () => {
  const trpc = useTRPC()

  const { data: educations } = useSuspenseQuery(trpc.cv.education.queryOptions())

  return (
    <>
      {educations.map(education => (
        <Card className={'p-6 print:p-4'} key={education.school + education.course}>
          <CardContent className="p-0">
            <div className="flex w-full items-start gap-4">
              <GraduationCap className="text-primary mt-1 size-6 print:size-4" />
              <div className={'w-full'}>
                <div className="flex w-full items-center justify-between">
                  <h3 className="font-bold">{education.course}</h3>
                  <Badge variant="outline">
                    {education.start} - {education.end}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{education.school}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
