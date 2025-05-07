import { protectedProcedure } from '../../trpc.js' // Make sure this path is correct
import { db, positions } from '@apps/db'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const getList = protectedProcedure.query(async ({ ctx }) => {
  return db.query.positions.findMany({
    where: (position, { eq }) => eq(position.userId, ctx.user.userId),
    with: {
      company: true,
    },
  })
})

const get = protectedProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
  return db.query.positions.findFirst({
    where: (position, { eq, and }) =>
      and(eq(position.userId, ctx.user.userId), eq(position.id, input.id)),
    with: {
      responsibilities: true,
    },
  })
})

export const positionsQueries = {
  getList,
  get,
}
