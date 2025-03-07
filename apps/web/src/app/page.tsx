'use client'

import {useTRPC} from "@/utils/trpcClient";
import {useEffect} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {LoginForm} from "@/app/_components/login-form/form.tsx";

export default function Page() {
  const trpc = useTRPC();

  const {data, refetch} = useQuery(trpc.user.list.queryOptions())
  const {mutate, data: createData} = useMutation(trpc.user.create.mutationOptions({
    onSuccess(data) {
      refetch()
    },
    onError(error) {
      console.error(error)
    }
  }))

  useEffect(() => {
    mutate({
      firstName: 'John',
      lastName: 'Doe5',
      email: 'john.doe5@example.com',
      password: 'password',
    })
  }, []);

  return <div>
    <h1>Hello, world!</h1>
    {
      createData && <p>Created user: {createData.firstName} {createData.lastName}</p>
    }
    {data?.map(user => <p key={user.id}>{user.firstName} {user.lastName}</p>)}
    <LoginForm/>
  </div>
}
