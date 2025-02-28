'use client'

import {trpcClient, useTRPC} from "@/utils/trpcClient";
import {useEffect, useState} from "react";
import {RouterOutput} from "@apps/api";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const trpc = useTRPC();

  const {data} = useQuery(trpc.user.list.queryOptions())

  return <div>
    <h1>Hello, world!</h1>
    {data?.map(user => <p key={user.id}>{user.name}</p>)}
  </div>
}
