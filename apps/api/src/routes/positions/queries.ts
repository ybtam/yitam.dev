import { protectedProcedure } from '../../trpc.js' // Make sure this path is correct
import { db, positions } from '@apps/db'
import { eq } from 'drizzle-orm'

const getList = protectedProcedure.query(async ({ ctx }) => {
  return db.query.positions.findMany({
    where: (position, { eq }) => eq(position.userId, ctx.user.userId),
    with: {
      company: true,
    },
  })
})

export const positionsQueries = {
  getList,
}
