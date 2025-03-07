import {router} from "../trpc.js";
import {userRouter} from "../routes/user/index.js";
import {inferRouterInputs, inferRouterOutputs} from "@trpc/server";
import {authRouter} from "../routes/auth/index.js";

export const appRouter = router({
  user: userRouter,
  auth: authRouter
});

// Export type router type signature, this is used by the client.
export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
