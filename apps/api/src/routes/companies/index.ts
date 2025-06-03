import { companiesQueries } from './queries.ts'
import { companiesMutations } from './mutations.ts'

export const companiesRouter = {
  ...companiesQueries,
  ...companiesMutations,
}
