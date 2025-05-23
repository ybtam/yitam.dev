import type React from 'react'
import { Inter } from 'next/font/google'
import '@/style/globals.css'
import { ThemeProvider } from 'next-themes'
import { MainNav } from '@/app/_copmponents/main-nav.tsx'
import { Footer } from '@/app/_copmponents/footer.tsx'
import { Toaster } from '@repo/ui'
import { Provider } from '@/providers/provider.tsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your Name - Software Engineer',
  description: 'Portfolio and blog of a passionate software engineer',
  generator: 'v0.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <div className="flex min-h-screen w-full flex-col">
              <MainNav />
              <main className={'flex-1'}>{children}</main>
              <Footer />
            </div>
          </Provider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
