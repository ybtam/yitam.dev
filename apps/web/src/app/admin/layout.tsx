import type React from 'react'
import type { ReactNode } from 'react'
import { AdminNav } from './_components/admin-nav'
import { auth } from '@repo/sdk'
import { cn } from '@repo/ui/lib'

export default async function AdminLayout({
  children,
  login,
}: {
  children: ReactNode
  login: ReactNode
}) {
  const session = await auth()

  return (
    <div
      className={cn(
        'h-full flex-1',
        session?.user && 'grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]',
      )}
    >
      {session?.user && <AdminNav />}
      <div className="flex flex-col">
        <main className="flex-1 p-6 pt-6 md:p-8">{session?.user ? children : login}</main>
      </div>
    </div>
  )
}
