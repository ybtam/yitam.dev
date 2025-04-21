import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Badge, Card, CardContent } from '@repo/ui'

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js, the React framework for production.",
    date: "April 1, 2023",
    category: "Web Development",
    slug: "getting-started-with-nextjs",
  },
  {
    id: 2,
    title: "The Power of TypeScript",
    excerpt: "Discover how TypeScript can improve your JavaScript development experience with static typing.",
    date: "March 15, 2023",
    category: "JavaScript",
    slug: "power-of-typescript",
  },
  {
    id: 3,
    title: "Building a RESTful API with Node.js",
    excerpt: "A comprehensive guide to creating a RESTful API using Node.js, Express, and MongoDB.",
    date: "February 28, 2023",
    category: "Backend",
    slug: "building-restful-api-nodejs",
  },
  {
    id: 4,
    title: "CSS Grid Layout: A Complete Guide",
    excerpt: "Master CSS Grid Layout with this comprehensive guide covering all the essential concepts.",
    date: "February 10, 2023",
    category: "CSS",
    slug: "css-grid-layout-guide",
  },
  {
    id: 5,
    title: "Introduction to Docker for Developers",
    excerpt: "Learn the basics of Docker and how it can simplify your development workflow.",
    date: "January 25, 2023",
    category: "DevOps",
    slug: "introduction-to-docker",
  },
  {
    id: 6,
    title: "State Management in React with Context API",
    excerpt: "Explore how to manage state in React applications using the Context API.",
    date: "January 10, 2023",
    category: "React",
    slug: "state-management-react-context",
  },
]

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Blog</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Thoughts, ideas, and insights on software development and technology.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={`/placeholder.svg?height=200&width=400&text=${post.slug.replace(/-/g, "+")}`}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block">
                <span className="text-primary hover:underline flex items-center">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

