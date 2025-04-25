'use client'

import { AboutSection } from '@/app/about/_components/section.tsx'

export const MyStory = () => {
  return (
    <AboutSection title={'Career Objective'}>
      <div className="space-y-4 print:text-sm">
        <p>
          A full-stack engineer with 4+ years' experience, I thrive on building scalable web
          applications from concept to deployment using React and Node.js. My passion lies in
          crafting clean, efficient solutions that solve real user problems and contribute directly
          to product success. I enjoy taking full ownership of features and am currently leading a
          team in developing a complex platform, seeking opportunities to apply my technical and
          leadership skills to challenging projects.
        </p>
      </div>
    </AboutSection>
  )
}
