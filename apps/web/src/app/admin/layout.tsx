import type React from 'react'
import { redirect } from 'next/navigation'
import { AdminNav } from './_components/admin-nav'

// This is a mock authentication check
// In a real application, you would use a proper authentication system
function isAuthenticated() {
  // For demo purposes, always return true
  // In a real app, this would check if the user is authenticated
  return true
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated
  const authenticated = isAuthenticated()

  // If not authenticated, redirect to login page
  if (!authenticated) {
    redirect('/admin/login')
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminNav />
      <div className="flex flex-col">
        <main className="flex-1 p-6 pt-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
