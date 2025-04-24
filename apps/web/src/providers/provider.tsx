'use client'

import { PropsWithChildren } from 'react'
import { SdkProvider } from '@repo/sdk'

export const Provider = ({ children, ...props }: PropsWithChildren<{ accessToken?: string }>) => {
  return <SdkProvider {...props}>{children}</SdkProvider>
}
