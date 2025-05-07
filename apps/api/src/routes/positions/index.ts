import { positionsMutations } from './mutations.ts'
import { positionsQueries } from './queries.ts'

export const positionsRouter = {
  ...positionsMutations,
  ...positionsQueries,
}
