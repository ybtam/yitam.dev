import {publicProcedure} from "../../trpc.ts";
import {insertUserSchema} from "@apps/db/zod";
import {db, users} from "@apps/db";

const create = publicProcedure
  .input(insertUserSchema)
  .mutation(async ({input}) => {
    const newUser = await db.insert(users).values(input).returning();

    console.log('newUser', newUser)

    return newUser[0]
  })

export default {
  create
}
