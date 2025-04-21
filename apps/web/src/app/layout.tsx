import type React from "react"
import { Inter } from "next/font/google"
import "@/style/globals.css"
import {ThemeProvider} from 'next-themes'
import { MainNav } from '@/app/_copmponents/main-nav.tsx'
import { Footer } from '@/app/_copmponents/footer.tsx'
import { Toaster } from '@repo/ui'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Your Name - Software Engineer",
  description: "Portfolio and blog of a passionate software engineer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col w-full">
            <MainNav />
            <main className={'flex-1'}>{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

