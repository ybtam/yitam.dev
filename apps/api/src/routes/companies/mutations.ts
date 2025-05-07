import { protectedProcedure } from '../../trpc.js'
import { insertCompanySchema } from '@apps/db/zod'
import { companies, db } from '@apps/db'

const create = protectedProcedure.input(insertCompanySchema).mutation(async ({ ctx, input }) => {
  const [newCompany] = await db
    .insert(companies)
    .values({ ...input, userId: ctx.user.userId })
    .returning()

  return newCompany
})

export const companiesMutations = { create }
