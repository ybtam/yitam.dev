import { PropsWithChildren } from 'react'
import { cn } from '@repo/ui/lib'

export const AboutSection = ({
  children,
  className,
  title,
}: PropsWithChildren<{ title: string; className?: string }>) => {
  return (
    <div className={cn('w-full', className)}>
      <h2 className="text-2xl font-bold not-print:mb-2 print:text-lg">{title}</h2>
      {children}
    </div>
  )
}
