'use client'

import {createTRPCContext} from "@trpc/tanstack-react-query";
import {AppRouter} from "@apps/api";

export const {useTRPC, useTRPCClient, TRPCProvider} = createTRPCContext<AppRouter>();
