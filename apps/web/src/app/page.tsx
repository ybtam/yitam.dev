'use client'

import {trpc} from "@/utils/trpc";
import {useEffect, useState} from "react";
import {RouterOutput} from "@apps/api";

export default function Page() {
  //todo replace with tanstack

  const [user, setUser] = useState<RouterOutput['user']['list']>()

  useEffect(() => {
    trpc.user.list.query().then(setUser)
  }, []);

  return <div>
    <h1>Hello, world!</h1>
    {user?.map(user => <p>{user.name}</p>)}
  </div>
}
