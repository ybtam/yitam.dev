import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="flex items-center justify-center border-t print:hidden">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="text-center md:text-left">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Yi Tam. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <Github className="text-muted-foreground hover:text-foreground h-5 w-5 transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="text-muted-foreground hover:text-foreground h-5 w-5 transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
            <Twitter className="text-muted-foreground hover:text-foreground h-5 w-5 transition-colors" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
