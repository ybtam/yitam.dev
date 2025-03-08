'use server'

import { signIn } from '@repo/sdk/auth'
import {z} from "zod";
import {loginInputSchema} from "@apps/api/zod";

export const login = async (data: z.infer<typeof loginInputSchema>) => {
  await signIn('credentials', data)
}
