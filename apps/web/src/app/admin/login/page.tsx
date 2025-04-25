'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  toast,
} from '@repo/ui'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500))

    // For demo purposes, always succeed
    toast.success('Login successful!', {
      description: 'Welcome back to your admin dashboard.',
    })

    router.push('/admin')
  }

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <Link href="#" className="text-primary text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          <div className="mt-4 text-center text-sm">
            <Link href="/" className="text-primary hover:underline">
              Back to website
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
