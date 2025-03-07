import {protectedProcedure} from "../../trpc.js";

const me = protectedProcedure.query(async ({ctx}) => {
  console.log('ctx', ctx)

  return ctx.user
})

export default {
  me
}
