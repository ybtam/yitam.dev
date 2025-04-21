'use client'

import { Badge, Card, CardContent } from '@repo/ui'
import { GraduationCap } from 'lucide-react'
import { useTRPC } from '@repo/sdk'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'

export const Education = () => {
  return           <section>
    <h2 className="text-2xl font-bold mb-4">Education</h2>
    <Suspense>
      <Loader/>
    </Suspense>
  </section>
}

const Loader = () => {
  const trpc = useTRPC()

  const {data:educations} = useSuspenseQuery(trpc.cv.education.queryOptions())

  return (
    <>
      {
        educations.map((education) => (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 w-full">
                <GraduationCap className="h-6 w-6 text-primary mt-1" />
                <div className={'w-full'}>
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-bold">{education.course}</h3>
                    <Badge variant="outline">{education.start} - {education.end}</Badge>
                  </div>
                  <p className="text-muted-foreground">{education.school}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </>
  )
}
