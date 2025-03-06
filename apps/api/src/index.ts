/**
 * This a minimal tRPC server
 */
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { router } from './trpc.js';
import {inferRouterInputs, inferRouterOutputs} from "@trpc/server";
import cors from 'cors';
import {userRouter} from "./routes/user";
import {client} from "@apps/db";

client.connect()

const appRouter = router({
  user: userRouter,
});

// Export type router type signature, this is used by the client.
export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors({
    origin: '*',
  })
});

server.listen(3000);
