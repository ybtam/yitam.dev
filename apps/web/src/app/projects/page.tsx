import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import { Badge, Button, Card, CardContent } from '@repo/ui'

// Mock projects data
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description:
      'A full-featured e-commerce platform built with Next.js, TypeScript, and Stripe integration.',
    image: '/placeholder.svg?height=200&width=400&text=E-commerce+Platform',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS', 'MongoDB'],
    github: 'https://github.com/yourusername/ecommerce-platform',
    demo: 'https://ecommerce-platform-demo.vercel.app',
    slug: 'ecommerce-platform',
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team features.',
    image: '/placeholder.svg?height=200&width=400&text=Task+Management+App',
    technologies: ['React', 'Firebase', 'Redux', 'Material UI'],
    github: 'https://github.com/yourusername/task-management-app',
    demo: 'https://task-management-app-demo.vercel.app',
    slug: 'task-management-app',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description:
      'A weather dashboard that displays current and forecasted weather data from multiple sources.',
    image: '/placeholder.svg?height=200&width=400&text=Weather+Dashboard',
    technologies: ['JavaScript', 'OpenWeather API', 'Chart.js', 'Bootstrap'],
    github: 'https://github.com/yourusername/weather-dashboard',
    demo: 'https://weather-dashboard-demo.vercel.app',
    slug: 'weather-dashboard',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects and skills (this website).',
    image: '/placeholder.svg?height=200&width=400&text=Portfolio+Website',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/yourusername/portfolio-website',
    demo: '#',
    slug: 'portfolio-website',
  },
  {
    id: 5,
    title: 'Recipe Finder',
    description: 'A web application that helps users find recipes based on available ingredients.',
    image: '/placeholder.svg?height=200&width=400&text=Recipe+Finder',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Spoonacular API'],
    github: 'https://github.com/yourusername/recipe-finder',
    demo: 'https://recipe-finder-demo.vercel.app',
    slug: 'recipe-finder',
  },
  {
    id: 6,
    title: 'Budget Tracker',
    description: 'A personal finance application for tracking income, expenses, and savings goals.',
    image: '/placeholder.svg?height=200&width=400&text=Budget+Tracker',
    technologies: ['Vue.js', 'Firebase', 'Vuex', 'D3.js'],
    github: 'https://github.com/yourusername/budget-tracker',
    demo: 'https://budget-tracker-demo.vercel.app',
    slug: 'budget-tracker',
  },
]

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-12 md:py-16 lg:py-24">
      <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Projects</h1>
          <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A collection of my recent work and personal projects.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <Card key={project.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={project.image || '/placeholder.svg'}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="text-muted-foreground mt-2 text-sm">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/projects/${project.slug}`}>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </Link>
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                </Link>
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
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
    </div>
  )
}
