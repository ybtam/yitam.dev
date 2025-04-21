import Image from "next/image"
import { Experience } from '@/app/about/_components/experience.tsx'
import { Education } from "./_components/education"
import { Skills } from '@/app/about/_components/skills.tsx'
import { MyStory } from '@/app/about/_components/my-story.tsx'

export default function AboutPage() {
  return (
    <div className="mx-auto container py-12 md:py-16 lg:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Learn more about my background, skills, and experience.
          </p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-[300px] w-[300px] rounded-full overflow-hidden border-4 border-primary">
            <Image src="https://media.licdn.com/dms/image/v2/C5603AQGkfXxDKIcxdA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1571825990259?e=1750896000&v=beta&t=Lz4uxBEtrdt2GtHxTf7dv2Y8e9q8t_vB6AynK12Ni5A" alt="Your Name" fill className="object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Yi Tam</h2>
            <p className="text-muted-foreground">Software Engineer / Full Stack Developer / Project Manager</p>
          </div>
          <Skills/>
        </div>

        <div className="space-y-8">
          <MyStory/>
          <Experience/>
          <Education/>
        </div>
      </div>
    </div>
  )
}

