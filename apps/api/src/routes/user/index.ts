import { router } from '../../trpc.ts'
import userQueries from './query.ts'
import userMutations from './mutation.ts'

export const userRouter = router({
  ...userQueries,
  ...userMutations,
})
