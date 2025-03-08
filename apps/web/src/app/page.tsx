'use client'

import {useQuery} from "@tanstack/react-query";
import {useTRPC} from "@repo/sdk";

export default function Page() {
  const trpc = useTRPC();

  const {data} = useQuery(trpc.user.list.queryOptions())

  return <div>
    <h1>Hello, world!</h1>
    {data?.map(user => <p key={user.id}>{user.firstName} {user.lastName}</p>)}
  </div>
}
