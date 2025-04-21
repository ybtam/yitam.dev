import Image from "next/image"
import { Briefcase, GraduationCap, Award } from "lucide-react"
import { Badge, Card, CardContent } from '@repo/ui'
import { Experience } from '@/app/about/_components/experience.tsx'
import { Education } from "./_components/education"

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

      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-[300px] w-[300px] rounded-full overflow-hidden border-4 border-primary">
            <Image src="/placeholder.svg?height=300&width=300" alt="Your Name" fill className="object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Your Name</h2>
            <p className="text-muted-foreground">Software Engineer</p>
          </div>
          <div className="w-full">
            <h3 className="font-bold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>JavaScript</Badge>
              <Badge>TypeScript</Badge>
              <Badge>React</Badge>
              <Badge>Next.js</Badge>
              <Badge>Node.js</Badge>
              <Badge>Python</Badge>
              <Badge>SQL</Badge>
              <Badge>MongoDB</Badge>
              <Badge>AWS</Badge>
              <Badge>Docker</Badge>
              <Badge>Git</Badge>
              <Badge>CI/CD</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">My Story</h2>
            <div className="space-y-4">
              <p>
                Hello! I'm a passionate software engineer with X years of experience in building web applications. My
                journey in software development began when I was in college, where I discovered my love for creating
                things with code.
              </p>
              <p>
                Throughout my career, I've worked on a variety of projects, from small websites to large-scale
                enterprise applications. I'm particularly interested in creating user-friendly interfaces and solving
                complex problems with elegant solutions.
              </p>
              <p>
                When I'm not coding, you can find me hiking, reading, or exploring new technologies. I'm always looking
                to learn and grow, both as a developer and as a person.
              </p>
            </div>
          </section>

          <Experience/>
          <Education/>
        </div>
      </div>
    </div>
  )
}

