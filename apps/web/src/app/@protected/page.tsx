'use client'

import {useQuery} from "@tanstack/react-query";
import {useTRPC} from "@repo/sdk";

export default function Page() {
  const trpc = useTRPC();

  const userList = useQuery(trpc.user.list.queryOptions())
  const me = useQuery(trpc.auth.me.queryOptions())

  return <div>
    <h1>Hello, world!</h1>
    {userList.data?.map(user => <p key={user.id}>{user.firstName} {user.lastName}</p>)}
    <h2>Me</h2>
    {me.data && (
      <div>
        <p>User ID: {me.data.id}</p>
        <p>Email: {me.data.email}</p>
      </div>
    )}
  </div>
}
