import { protectedProcedure } from '../../trpc.js'
import { insertPositionSchema } from '@apps/db/zod'
import { db, positions, responsibilities } from '@apps/db'
import { createPositionSchema } from './schema.js'

const create = protectedProcedure.input(createPositionSchema).mutation(async ({ ctx, input }) => {
  return await db.transaction(async tx => {
    const [newPosition] = await tx
      .insert(positions)
      .values({
        ...input,
        userId: ctx.user.userId,
      })
      .returning()

    tx.insert(responsibilities)
      .values(
        input.responsibilities.map(responsibility => ({
          ...responsibility,
          positionId: newPosition.id,
        })),
      )
      .returning()

    return newPosition
  })
})

export const positionsMutations = {
  create,
}
