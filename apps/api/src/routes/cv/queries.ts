import { publicProcedure } from '../../trpc.js'

const experience = publicProcedure.query(async () => {
  return [
    {
      company: 'Cargoking',
      history: [
        {
          title: 'Project Manager',
          years: '04.2025-present',
          description: 'Managing people',
          responsibilities: []
        },
        {
          title: 'Tech Lead',
          years: '10.2024-present',
          description: 'Leading the team to get our products to the market. Introducing Agile and Scrum methodologies. Simplifying complex components, relying on native components for better long term maintainability.',
          responsibilities: [
            'Manage and mentor a team of 4 (assign work, give feedback on work).',
              'Convert CRA project into Next.js to introduce server actions, RSC and React 19.',
              'Migrate multiple related projects into a monorepo and building reusable libraries for in-house components.',
              'Develop and optimize Api integrations between backend and frontend.',
              'Bridging the technical side of the job with the UI/UX and business side of the company.',
              'Introduced a faster iteration pace with less bugs, by building e2e tests with Cypress and stricter rules for development with eslint.'
            ]
        },
        {
          title: 'Full-stack Engineer',
          years: '03.2024-10.2024',
          description: 'Creating tools for non-technical staff and support dev team with getting the main product to market faster.',
          responsibilities: [
            "Create in-house multisite CMS. To empower our clients to manage their own websites and reduce the need for developers to build them.",
            "Interim Tech Lead, managing our flagship product development in the absence of the tech lead.",
            "Planning short and mid-term goals, based on analytics and research. Handle job distribution. Decide on future upgrade paths and tech stacks.",
            "Develop responsive design with latest standards and browser APIs",
            "Collaborate with backend team to integrate/develop Graphql or Rest Apis in node.js",
            "Work on side projects for sister companies, in logistics and vegetable industry."
          ]
        }
      ]
    },
    {
      company: 'Switchplane',
      history: [
        {
          title: 'Software Engineer',
          years: '2021-2023',
          description: 'Working with multiple clients in diverse sectors, including insurance and healthcare. Catering to the needs of\n' +
            'both technical and business side of the company.',
          responsibilities: [
            'Collaborated in the creation of a job review system with the team, enabling tech leads to provide detailed feedback after each job.',
            'This system facilitated error identification, performance enhancement, and acknowledgment of well-executed tasks.',
            'Improved the quality of the work by reducing the number of bugs and improving the codebase.',
            'Develop solutions that meet the need of the client, focusing on UX.',
            'Contributing to the modernization of existing systems and documenting internal dependencies.',
            'Making sure that new recruits have an easier time getting up to speed.',
            'Writing complex MySQL queries to retrieve data to reduce load on the server and improve performance.',
            'Commiting work on CodeCommit (AWS) with git and deploying work on AWS.',
            'Created mobile apps in Flutter.'
          ]
        }
      ]
    }
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
