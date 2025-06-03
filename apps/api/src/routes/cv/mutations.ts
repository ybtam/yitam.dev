import { protectedProcedure } from '../../trpc.js'
import { insertCvsSchema } from '@apps/db/zod'
import { cvs, db } from '@apps/db'

const create = protectedProcedure.input(insertCvsSchema).mutation(async ({ input, ctx }) => {
  const [cv] = await db
    .insert(cvs)
    .values({ ...input, userId: ctx.user.userId })
    .returning()

  return cv
})

export const cvMutations = {
  create,
}
