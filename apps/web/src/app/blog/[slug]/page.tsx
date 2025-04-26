'use client'

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Badge } from '@repo/ui'
// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    content: `
      <p>Next.js is a React framework that enables server-side rendering and static site generation for React applications. It's designed to make it easy to build fast, SEO-friendly web applications with React.</p>
      
      <h2>Why Next.js?</h2>
      <p>Next.js provides a number of benefits over a traditional React application:</p>
      <ul>
        <li>Server-side rendering for improved performance and SEO</li>
        <li>Automatic code splitting for faster page loads</li>
        <li>Simple client-side routing</li>
        <li>API routes to build API endpoints with serverless functions</li>
        <li>Built-in CSS and Sass support</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js app, run the following command:</p>
      <pre><code>npx create-next-app@latest my-next-app</code></pre>
      
      <p>This will create a new Next.js app in the my-next-app directory with a default template. You can then navigate to the directory and start the development server:</p>
      <pre><code>cd my-next-app
npm run dev</code></pre>
      
      <p>Your Next.js app will be running at http://localhost:3000.</p>
      
      <h2>Pages in Next.js</h2>
      <p>In Next.js, a page is a React component exported from a file in the pages directory. Each page is associated with a route based on its file name.</p>
      
      <p>For example, if you create a file at pages/about.js that exports a React component like this:</p>
      <pre><code>export default function About() {
  return <div>About Page</div>
}</code></pre>
      
      <p>Then it will be accessible at /about.</p>
      
      <h2>Conclusion</h2>
      <p>Next.js is a powerful framework that makes it easy to build modern web applications with React. It provides a number of features out of the box that would otherwise require complex configuration, making it a great choice for both small and large projects.</p>
    `,
    date: 'April 1, 2023',
    author: 'Your Name',
    category: 'Web Development',
    slug: 'getting-started-with-nextjs',
  },
  {
    id: 2,
    title: 'The Power of TypeScript',
    content: `
      <p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.</p>
      
      <h2>Why TypeScript?</h2>
      <p>TypeScript adds static types to JavaScript, which can help prevent many common bugs and make your code more maintainable. Here are some benefits of using TypeScript:</p>
      <ul>
        <li>Catch errors early in development</li>
        <li>Better IDE support with autocompletion and navigation</li>
        <li>Safer refactoring</li>
        <li>More explicit code documentation</li>
        <li>Enhanced collaboration in teams</li>
      </ul>
      
      <h2>Getting Started with TypeScript</h2>
      <p>To start using TypeScript, you first need to install it:</p>
      <pre><code>npm install -g typescript</code></pre>
      
      <p>Once installed, you can create a TypeScript file with a .ts extension and compile it to JavaScript:</p>
      <pre><code>// hello.ts
function greet(name: string) {
  return \`Hello, \${name}!\`;
}

console.log(greet("TypeScript"));</code></pre>
      
      <p>To compile this file to JavaScript, run:</p>
      <pre><code>tsc hello.ts</code></pre>
      
      <p>This will generate a hello.js file that you can run with Node.js.</p>
      
      <h2>TypeScript in React</h2>
      <p>TypeScript works great with React. You can create React components with proper type definitions for props and state:</p>
      <pre><code>// Button.tsx
import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;</code></pre>
      
      <h2>Conclusion</h2>
      <p>TypeScript is a powerful tool that can help you write more robust JavaScript code. While it does have a learning curve, the benefits it provides in terms of code quality and developer experience make it well worth the investment.</p>
    `,
    date: 'March 15, 2023',
    author: 'Your Name',
    category: 'JavaScript',
    slug: 'power-of-typescript',
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(post => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12 md:py-16 lg:py-24">
      <Link href="/blog" className="text-primary mb-8 flex items-center hover:underline">
        <ArrowLeft className="mr-2 size-4" />
        Back to Blog
      </Link>

      <article className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <User className="mr-2 size-4" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 size-4" />
              {post.date}
            </div>
          </div>
        </div>

        <div className="relative mb-8 aspect-video">
          <Image
            src={`/placeholder.svg?height=400&width=800&text=${post.slug.replace(/-/g, '+')}`}
            alt={post.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}
