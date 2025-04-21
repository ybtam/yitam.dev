import { publicProcedure } from '../../trpc.js'

const experience = publicProcedure.query(async () => {
  return [
    {
      title: 'Senior Software Engineer',
      company: 'Company Name',
      years: '2021 - Present',
      responsibilities: [
        'Led the development of a new product feature that increased user engagement by 30%',
        'Mentored junior developers and conducted code reviews',
        'Implemented CI/CD pipelines that reduced deployment time by 50%',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Previous Company',
      years: '2018 - 2021',
      responsibilities: [
        'Developed and maintained multiple web applications using React and Node.js',
        'Collaborated with designers and product managers to deliver high-quality features',
        'Optimized database queries that improved application performance by 40%',
      ],
    },
  ]
})

const education = publicProcedure.query(async () => {
  return [
    {
      course: 'Bachelor of Science in Computer Science',
      school: 'University of Sussex',
      start: '2016',
      end: '2020'
    }
  ]
})

const skills = publicProcedure.query(async () => {
  return [
    {label: 'Languages', values: ['Typescript', 'PHP', 'Python']},
    {
      label: 'Frameworks/Libraries',
      values: ['Next.js', 'React.js', 'Flutter', 'TRPC']
    },
    {
      label: 'Styling',
      values: ['TailwindCss']
    },
    {
      label: 'Monorepo tools',
      values: ['Turborepo']
    },
    {
      label: 'DevOps',
      values: ['Docker', 'Kubernetes', 'Gitlab CI/CD', 'Github Actions']
    },
    {
      label: 'Cloud Platforms',
      values: ['AWS', 'Azure', 'Cloudflare']
    },
    {
      label: 'Database',
      values: ['PostgresSQL', 'MySQL']
    },
    {
      label: 'API protocols',
      values: ['REST', 'GraphQL']
    },
    {
      label: 'Version control',
      values: ['Git', 'Github', 'Gitlab']
    },
    {
      label: 'Other tools',
      values: ['LaTex']
    }
  ]
})

export const cvQueries = {
  experience,
  education,
  skills
}
