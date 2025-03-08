'use client'

import {PropsWithChildren} from "react";
import {SdkProvider} from "@repo/sdk";

export const Provider = ({children}: PropsWithChildren) => {
  return (
    <SdkProvider>
      {children}
    </SdkProvider>
  )
}
