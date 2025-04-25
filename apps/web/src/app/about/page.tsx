import Image from 'next/image'
import { Experience } from '@/app/about/_components/experience.tsx'
import { Education } from './_components/education'
import { Skills } from '@/app/about/_components/skills.tsx'
import { MyStory } from '@/app/about/_components/my-story.tsx'
import { AboutSection } from '@/app/about/_components/section.tsx'
import { Card, CardContent } from '@repo/ui'
import { Consent } from '@/app/about/_components/consent.tsx'
import { AdditionalSkills } from '@/app/about/_components/additional-skills.tsx'
import { Intro } from '@/app/about/_components/intro.tsx'

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 md:py-16 lg:py-24 print:p-0">
      <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center print:hidden">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h1>
          <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Learn more about my background, skills, and experience.
          </p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <Intro />

        <div className="space-y-8 print:space-y-4">
          <MyStory />
          <Experience />
          <Education />
          <AboutSection className={'break-inside-avoid-page not-print:hidden'} title={'Skills'}>
            <Card className={'p-6 print:p-4'}>
              <CardContent className={'p-0'}>
                <Skills />
              </CardContent>
            </Card>
          </AboutSection>
          <AboutSection title={'Languages'} className={'not-print:hidden'}>
            <Card className={'p-6 print:p-4'}>
              <CardContent className={'p-0'}>
                <AdditionalSkills />
              </CardContent>
            </Card>
          </AboutSection>
          {/*<AboutSection title={'Extra-Curricular Activities'}>*/}
          {/*  <ExtraActivities />*/}
          {/*</AboutSection>*/}
        </div>
      </div>
      <Consent />
    </div>
  )
}
