import Image from 'next/image'
import { AboutSection } from '@/app/about/_components/section.tsx'
import { Skills } from '@/app/about/_components/skills.tsx'
import { AdditionalSkills } from '@/app/about/_components/additional-skills.tsx'
import { Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export const Intro = () => {
  return (
    <div className="flex flex-col items-center gap-6 print:flex-row">
      <div className="border-primary relative size-[300px] overflow-hidden rounded-full border-4 print:size-36">
        <Image
          src="/profile/0X0A6882-Poprawione-SR.png"
          alt="Yi Tam"
          width={600}
          height={600}
          className="object-cover"
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Yi Tam</h2>
        <p className="text-muted-foreground print:hidden">
          Software Engineer / Full Stack Developer / Project Manager
        </p>
        <Contact
          email={'tam.yi3d@gmail.com'}
          location={'Warsaw'}
          phone={{
            label: '(+48) 798-996-842',
            value: '+48798996842',
          }}
        />
      </div>
      <AboutSection className={'print:hidden'} title={'Skills'}>
        <Skills />
      </AboutSection>
      <AboutSection title={'Languages'} className={'print:hidden'}>
        <AdditionalSkills />
      </AboutSection>
    </div>
  )
}

type Props = {
  email: string
  location: string
  phone: {
    label: string
    value: string
  }
}

const Contact = ({ email, location, phone }: Props) => {
  return (
    <>
      <div className={'flex w-full gap-4'}>
        <div className={'flex items-center gap-2'}>
          <Phone size={16} />
          <Link href={`tel:${phone.value}`}>{phone.label}</Link>
        </div>
        <div className={'flex items-center gap-2'}>
          <Mail size={16} />
          <Link href={`mailto:${email}`}>{email}</Link>
        </div>
      </div>
      {/*<div className={'flex items-center gap-2'}>*/}
      {/*  <MapPin size={16} />*/}
      {/*  <p>{location}</p>*/}
      {/*</div>*/}
      <div className={'flex w-full gap-4 not-print:hidden'}>
        <div className={'flex items-center gap-2'}>
          <Linkedin size={16} />
          <Link href={'www.linkedin.com/in/yi-tam'}>www.linkedin.com/in/yi-tam</Link>
        </div>
      </div>
    </>
  )
}
