import { protectedProcedure } from '../../trpc.js'
import { db } from '@apps/db'
import { z } from 'zod'

const getList = protectedProcedure
  .input(
    z
      .object({
        name: z.string().optional(),
      })
      .optional(),
  )
  .query(async ({ ctx, input }) => {
    return db.query.companies.findMany({
      where: (company, { and, eq, ilike }) =>
        and(eq(company.userId, ctx.user.userId), ilike(company.name, `%${input?.name ?? ''}%`)),
    })
  })

export const companiesQueries = {
  getList,
}
