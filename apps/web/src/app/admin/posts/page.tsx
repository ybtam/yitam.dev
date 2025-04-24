import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Edit, Plus, Trash2 } from 'lucide-react'

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    status: 'published',
    date: 'April 1, 2023',
    views: 1245,
    slug: 'getting-started-with-nextjs',
  },
  {
    id: 2,
    title: 'The Power of TypeScript',
    status: 'published',
    date: 'March 15, 2023',
    views: 980,
    slug: 'power-of-typescript',
  },
  {
    id: 3,
    title: 'Building a RESTful API with Node.js',
    status: 'draft',
    date: 'February 28, 2023',
    views: 0,
    slug: 'building-restful-api-nodejs',
  },
  {
    id: 4,
    title: 'CSS Grid Layout: A Complete Guide',
    status: 'published',
    date: 'February 10, 2023',
    views: 756,
    slug: 'css-grid-layout-guide',
  },
  {
    id: 5,
    title: 'Introduction to Docker for Developers',
    status: 'published',
    date: 'January 25, 2023',
    views: 612,
    slug: 'introduction-to-docker',
  },
]

export default function AdminPostsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts here.</p>
        </div>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>A list of all your blog posts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map(post => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className="text-right">{post.views}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/posts/${post.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
