'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@repo/ui/lib'
import { Button, Sheet, SheetContent, SheetTrigger } from '@repo/ui'
import { ModeToggle } from './mode-toggle'

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: '/',
      label: 'Home',
      active: pathname === '/',
    },
    {
      href: '/about',
      label: 'About',
      active: pathname === '/about',
    },
    {
      href: '/projects',
      label: 'Projects',
      active: pathname === '/projects',
    },
    {
      href: '/blog',
      label: 'Blog',
      active: pathname === '/blog' || pathname.startsWith('/blog/'),
    },
    {
      href: '/contact',
      label: 'Contact',
      active: pathname === '/contact',
    },
  ]

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur print:hidden">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="text-xl font-bold">
            <span className="text-primary">Yi</span> Tam
          </Link>
          <nav className="hidden gap-6 md:flex">
            {routes.map(route => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'hover:text-primary text-sm font-medium transition-colors',
                  route.active ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="mt-8 flex flex-col gap-4">
                {routes.map(route => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      'hover:text-primary text-sm font-medium transition-colors',
                      route.active ? 'text-foreground' : 'text-muted-foreground',
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
