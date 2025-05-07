import type React from 'react'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui'
import { LoginForm } from '@/app/admin/@login/_components/login-form'

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col">
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
