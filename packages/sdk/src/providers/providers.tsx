'use client'

import {PropsWithChildren, ReactNode} from "react";
import {TanstackProvider} from "./tanstack-provider.tsx";
import {QueryClient} from "@tanstack/react-query";

export const SdkProvider = ({ children }: {
  children: (queryClient: QueryClient) => ReactNode
}) => {
  return <TanstackProvider>{children}</TanstackProvider>
}
