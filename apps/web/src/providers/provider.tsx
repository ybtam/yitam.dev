'use client'

import {PropsWithChildren} from "react";
import {SdkProvider} from "@repo/sdk";
import {createTRPCContext} from "@trpc/tanstack-react-query";
import {AppRouter} from "@apps/api";
import {trpcClient, TRPCProvider} from "@/utils/trpcClient";

export const Provider = ({children}: PropsWithChildren) => {
  return (
    <SdkProvider>
      {(queryClient) => (
        <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>{children}</TRPCProvider>
      )}
    </SdkProvider>
  )
}
