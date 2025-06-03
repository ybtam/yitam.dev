'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { CVHeader } from '../_components/cv-header.tsx'
import { PositionsSelector } from '../../_components/positions-selector'
import { EducationSelector } from '../../_components/education-selector'
import { SkillsSelector } from '../../_components/skills-selector'
import { ProjectsSelector } from '../../_components/projects-selector'
import { Button, Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui'
import { Heading } from '@/app/admin/_components/heading.tsx'

export default function EditCVPage() {
  const params = useParams()
  const router = useRouter()
  const cvId = params.cvId as string

  const { data: cv, isLoading } = useQuery({
    queryKey: ['cv', cvId],
    queryFn: async () => {
      const response = await fetch(`/api/cvs/${cvId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch CV')
      }
      return response.json()
    },
  })

  if (isLoading) {
    return <div className="p-8">Loading CV details...</div>
  }

  if (!cv) {
    return <div className="p-8">CV not found</div>
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/cvs')}>
          <ArrowLeft className="size-4" />
          <span className="sr-only">Back</span>
        </Button>
        <Heading title={`Edit CV: ${cv.name}`} description="Customize the content of your CV" />
      </div>
      <Separator />

      <CVHeader cv={cv} />

      <Tabs defaultValue="positions" className="w-full">
        <TabsList>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="positions" className="mt-4">
          <PositionsSelector cvId={cvId} />
        </TabsContent>
        <TabsContent value="education" className="mt-4">
          <EducationSelector cvId={cvId} />
        </TabsContent>
        <TabsContent value="skills" className="mt-4">
          <SkillsSelector cvId={cvId} />
        </TabsContent>
        <TabsContent value="projects" className="mt-4">
          <ProjectsSelector cvId={cvId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
