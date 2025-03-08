'use client'

import {ReactNode} from "react";
import {TanstackProvider} from "./tanstack-provider.tsx";
import {TRPCProvider} from "./trpc-provider.ts";
import {trpcClient} from "../trpc";

export const SdkProvider = ({ children, accessToken }: {
  children: ReactNode
  accessToken?: string
}) => {
  return <TanstackProvider>
    {(queryClient) => (
    <TRPCProvider queryClient={queryClient} trpcClient={trpcClient({accessToken})}>{children}</TRPCProvider>
  )}
  </TanstackProvider>
}
