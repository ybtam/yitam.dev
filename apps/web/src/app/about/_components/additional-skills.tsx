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
    <div className={'grid grid-cols-[auto_1fr] gap-1 gap-x-4'}>
      {languages.map(({ language, level }) => (
        <Fragment key={language}>
          <p className={'self-center print:text-xs'}>{language}</p>
          <Badge className={'print:text-xs'}>{level}</Badge>
          <Separator className={'col-span-2'} />
        </Fragment>
      ))}
    </div>
  )
}
