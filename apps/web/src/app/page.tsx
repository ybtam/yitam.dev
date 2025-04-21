import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, FileText, Github } from "lucide-react"
import { Badge, Button, Card, CardContent } from '@repo/ui'
import { Skills } from '@/app/_copmponents/skills.tsx'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between gap-10 max-w-[1100px] mx-auto">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Hi, I'm <span className="text-primary">Yi Tam</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A passionate software engineer specializing in building exceptional digital experiences.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/projects">
                  <Button>
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Contact Me</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full overflow-hidden border-4 border-primary">
                <Image
                  src="https://media.licdn.com/dms/image/v2/C5603AQGkfXxDKIcxdA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1571825990259?e=1750896000&v=beta&t=Lz4uxBEtrdt2GtHxTf7dv2Y8e9q8t_vB6AynK12Ni5A"
                  alt="Your Name"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I'm a software engineer with a passion for creating elegant solutions to complex problems. With
                expertise in web development, I build applications that are both functional and user-friendly.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Experience</h3>
                    <p className="text-muted-foreground">
                      Over X years of experience in software development, working with various technologies and
                      frameworks.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Education</h3>
                    <p className="text-muted-foreground">
                      Bachelor's/Master's degree in Computer Science from University Name.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Interests</h3>
                    <p className="text-muted-foreground">
                      When I'm not coding, I enjoy hiking, reading, and exploring new technologies.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <Skills/>
          </div>
        </div>
      </section>

      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Here are some of my recent projects. Check out my projects page for more.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=Project+${i}`}
                    alt={`Project ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold">Project {i}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    A brief description of project {i} and the technologies used.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Link href={`/projects/${i}`}>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/projects">
              <Button>
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Blog Posts</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Thoughts, ideas, and insights on software development and technology.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=Blog+Post+${i}`}
                    alt={`Blog Post ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Category</Badge>
                    <span className="text-xs text-muted-foreground">April 1, 2023</span>
                  </div>
                  <h3 className="text-xl font-bold">Blog Post Title {i}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    A brief summary of the blog post to give readers an idea of what it's about.
                  </p>
                  <Link href={`/blog/post-${i}`} className="mt-4 inline-block">
                    <Button variant="link" className="p-0">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/blog">
              <Button>
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get In Touch</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or just want to say hello? Feel free to reach out.
              </p>
            </div>
            <div className="w-full max-w-sm">
              <Link href="/contact">
                <Button className="w-full">
                  Contact Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

