/**
 * This is the client-side code that uses the inferred types from the server
 */
import {
  createTRPCClient,
  splitLink,
  unstable_httpBatchStreamLink,
  unstable_httpSubscriptionLink,
} from '@trpc/client';
import {AppRouter} from "@apps/api";
import {createTRPCContext} from "@trpc/tanstack-react-query";

// Initialize the tRPC client
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === 'subscription',
      true: unstable_httpSubscriptionLink({
        url: 'http://localhost:3000',
      }),
      false: unstable_httpBatchStreamLink({
        url: 'http://localhost:3000',
      }),
    }),
  ],
});


export const {useTRPC, useTRPCClient, TRPCProvider} = createTRPCContext<AppRouter>();

