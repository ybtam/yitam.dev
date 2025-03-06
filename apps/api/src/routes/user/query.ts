import {publicProcedure} from "../../trpc.ts";
import {db} from "@apps/db";

const list = publicProcedure.query(async () => {
  return db.query.users.findMany()
})

export default {
  list
}
