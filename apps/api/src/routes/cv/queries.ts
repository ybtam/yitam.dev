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

export const cvQueries = {
  experience
}
