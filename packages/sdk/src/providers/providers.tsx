'use client'

import {PropsWithChildren, ReactNode} from "react";
import {TanstackProvider} from "./tanstack-provider.tsx";
import {QueryClient} from "@tanstack/react-query";
import {TRPCProvider} from "./trpc-provider.ts";
import {trpcClient} from "../trpc/client.ts";

export const SdkProvider = ({ children }: {
  children: ReactNode
}) => {
  return <TanstackProvider>
    {(queryClient) => (
    <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>{children}</TRPCProvider>
  )}
  </TanstackProvider>
}
