import {protectedProcedure} from "../../trpc.js";
import {db, users} from "@apps/db";
import {eq} from "drizzle-orm";

const me = protectedProcedure.query(async ({ctx}) => {
  return db.query.users.findFirst({
    where: eq(users.id, ctx.user.userId)
  })
})

export default {
  me
}
