import { Fragment } from 'react'
import { Badge, Separator } from '@repo/ui'

const languages = [
  {
    language: 'Polish',
    level: 'Native',
  },
  {
    language: 'English',
    level: 'C2',
  },
  {
    language: 'German',
    level: 'A2',
  },
]

export const AdditionalSkills = () => {
  return (
    <div className={'flex gap-4'}>
      {languages.map(({ language, level }) => (
        <div className={'flex gap-3 border-r pr-4 last:border-r-0'} key={language}>
          <p className={'self-center print:text-xs'}>{language}</p>
          <Badge className={'print:text-xs'}>{level}</Badge>
        </div>
      ))}
    </div>
  )
}
