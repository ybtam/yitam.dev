import { publicProcedure } from '../../trpc.ts'
import { db, users } from '@apps/db'
import bcrypt from 'bcryptjs'
import { insertUserSchema } from '@apps/db/zod'

const create = publicProcedure.input(insertUserSchema).mutation(async ({ input }) => {
  const hashedPassword = await bcrypt.hash(input.password, 10)

  const newUser = await db
    .insert(users)
    .values({ ...input, password: hashedPassword })
    .returning()

  return newUser[0]
})

export default {
  create,
}
