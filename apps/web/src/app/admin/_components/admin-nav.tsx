'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart, FileText, Home, LogOut, Settings, Users } from 'lucide-react'
import { Button } from '@repo/ui'
import { cn } from '@repo/ui/lib'

export function AdminNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: Home,
      active: pathname === '/admin',
    },
    {
      href: '/admin/posts',
      label: 'Blog Posts',
      icon: FileText,
      active: pathname === '/admin/posts' || pathname.startsWith('/admin/posts/'),
    },
    {
      href: '/admin/settings',
      label: 'Settings',
      icon: Settings,
      active: pathname === '/admin/settings',
    },
  ]

  return (
    <div className="bg-muted/40 flex flex-col border-r">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <span className="text-primary">Admin</span>
          Dashboard
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                route.active ? 'bg-primary/10 text-primary' : 'text-muted-foreground',
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Link href="/">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Back to Site
          </Button>
        </Link>
      </div>
    </div>
  )
}
