import { protectedProcedure, publicProcedure } from '../../trpc.js'
import { db } from '@apps/db'
import { z } from 'zod'

const experience = publicProcedure.query(async () => {
  return [
    {
      company: 'Cargoking',
      history: [
        {
          title: 'Project Manager & Tech Lead',
          years: '10.2024-present',
          description:
            'Leading the team to get our products to the market. Introducing Agile and Scrum methodologies. Simplifying complex components, relying on native components for better long term maintainability.',
          responsibilities: [
            'Promoted to Project Manager (04.2025) overseeing flagship B2B CRM (EU/UK) while retaining Tech Lead duties.',
            'Define/manage product roadmap, prioritize features (client feedback, business value), translate needs into tech specs, and manage backlog.',
            'Manage, mentor, and foster growth for a team of 4 developers & 2 designers; implemented Agile/Scrum methodologies.',
            'Led migration from CRA to Next.js (RSC, server actions), improving structure, dev cycles, and load times.',
            'Bridging the technical side of the job with the UI/UX and business side of the company.',
            "Implemented E2E testing (Cypress) and stricter linting rules (ESLint), significantly accelerating the team's iteration velocity from bi-weekly deployments to near-daily updates and reducing post-deployment bugs.",
            'Introduced Agile and Scrum methodologies to improve team workflow and product delivery.',
            'Simplify complex components and leverage native browser features for improved long-term maintainability.',
          ],
        },
        {
          title: 'Full-stack Engineer',
          years: '03.2024-10.2024',
          description:
            'Creating tools for non-technical staff and support dev team with getting the main product to market faster.',
          responsibilities: [
            'Developed an in-house multisite CMS, enabling non-technical staff to manage website content (blogs, job postings, basic details) independently, eliminating developer intervention for routine updates and saving significant build time (~14 minutes per change compared to the previous static site process).',
            'Interim Tech Lead, managing our flagship product development in the absence of the tech lead.',
            'Planning short and mid-term goals, based on analytics and research. Handle job distribution. Decide on future upgrade paths and tech stacks.',
            'Develop responsive design with latest standards and browser APIs',
            'Collaborate with backend team to integrate/develop Graphql or Rest Apis in node.js',
            'Work on side projects for sister companies, in logistics and vegetable industry.',
          ],
        },
      ],
    },
    {
      company: 'Switchplane',
      history: [
        {
          title: 'Software Engineer',
          years: '2021-2023',
          description:
            'Working with multiple clients in diverse sectors, including insurance and healthcare. Catering to the needs of\n' +
            'both technical and business side of the company.',
          responsibilities: [
            'Collaborated with the team to build a job review system designed to facilitate detailed feedback, error identification, and performance enhancement.',
            'Contributed to improved code quality and faster iteration cycles, resulting in fewer bug fixes required post-deployment.',
            'Develop solutions that meet the need of the client, focusing on UX.',
            'Contributed to modernizing legacy systems and significantly improved internal documentation, reducing onboarding time for new recruits from 2-3 weeks to 1-2 weeks.',
            'Making sure that new recruits have an easier time getting up to speed.',
            'Wrote complex, optimized MySQL queries to efficiently retrieve data, minimizing load on the application server.',
            'Commiting work on CodeCommit (AWS) with git and deploying work on AWS.',
            'Created mobile apps in Flutter.',
          ],
        },
      ],
    },
    {
      company: `Tam's Property Investment Co.`,
      history: [
        {
          title: 'Managing Shareholder',
          years: '2015-present',
          description:
            'Managed network maintenance, ensuring optimal performance and operational efficiency',
          responsibilities: [
            'Oversaw server and PC maintenance tasks, contributing to a stable computing environment.',
            'Developed an internal app automating task assignments and documenting sales, leading to a notable 50% surge in online sales and improved team efficiency.',
            'Handled client interactions and contributed to sales strategies.',
            'Supported CAD design tasks for new products and engaged in photo editing.',
          ],
        },
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
      end: '2020',
    },
  ]
})

const skills = publicProcedure.query(async () => {
  return [
    { label: 'Languages', values: ['Typescript', 'PHP'] },
    {
      label: 'Frameworks/Libraries',
      values: ['Next.js', 'Node.js', 'React.js', 'Flutter', 'TRPC'],
    },
    {
      label: 'Styling',
      values: ['TailwindCss'],
    },
    {
      label: 'Monorepo tools',
      values: ['Turborepo'],
    },
    {
      label: 'DevOps',
      values: ['Docker', 'Kubernetes', 'Gitlab CI/CD', 'Github Actions'],
    },
    {
      label: 'Cloud Platforms',
      values: ['AWS', 'Azure', 'Cloudflare'],
    },
    {
      label: 'Database',
      values: ['PostgresSQL', 'MySQL'],
    },
    {
      label: 'API protocols',
      values: ['REST', 'GraphQL'],
    },
    {
      label: 'Version control',
      values: ['Git', 'Github', 'Gitlab'],
    },
    // {
    //   label: 'Other tools',
    //   values: ['LaTex'],
    // },
  ]
})

const get = protectedProcedure
  .input(
    z.object({
      id: z.number(),
    }),
  )
  .query(async ({ ctx, input }) => {
    return db.query.cvs.findFirst({
      where: (cv, { eq, and }) => and(eq(cv.userId, ctx.user.userId), eq(cv.id, input.id)),
    })
  })

export const cvQueries = {
  experience,
  education,
  skills,
  get,
}
