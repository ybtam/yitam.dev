import {router} from "../../trpc.js";
import authQueries from "./query.ts";
import authMutations from "./mutation.ts";

export const authRouter = router({
  ...authQueries,
  ...authMutations,
})
