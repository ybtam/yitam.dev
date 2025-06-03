import { cvQueries } from './queries.ts'
import { cvMutations } from './mutations.ts'

export const cvRouter = {
  ...cvQueries,
  ...cvMutations,
}
