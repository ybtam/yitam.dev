import { protectedProcedure } from '../../trpc.js'
import { insertPositionSchema } from '@apps/db/zod'
import { db, positions } from '@apps/db'

const create = protectedProcedure.input(insertPositionSchema).mutation(async ({ ctx, input }) => {
  const [newPosition] = await db
    .insert(positions)
    .values({
      ...input,
      userId: ctx.user.userId,
    })
    .returning()

  return newPosition
})

export const positionsMutations = {
  create,
}
