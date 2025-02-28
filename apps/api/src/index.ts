/**
 * This a minimal tRPC server
 */
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc.js';
import {inferRouterInputs, inferRouterOutputs} from "@trpc/server";
import cors from 'cors';

const appRouter = router({
  user: {
    list: publicProcedure.query(async () => {
      return [
        {
          id: 1,
          name: 'John Doe',
        },
        {
          id: 2,
          name: 'Jane Doe',
        }
      ]
    }),
  },
  examples: {
    iterable: publicProcedure.query(async function* () {
      for (let i = 0; i < 3; i++) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        yield i;
      }
    }),
  },
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
