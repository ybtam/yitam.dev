'use client'

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
        url: process.env.NEXT_PUBLIC_API_URL!,
      }),
      false: unstable_httpBatchStreamLink({
        url: process.env.NEXT_PUBLIC_API_URL!,
      }),
    }),
  ],
});



