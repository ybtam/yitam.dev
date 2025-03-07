'use client'

import { useForm } from "react-hook-form"
import {Button, Form, FormControl, FormField, FormItem, FormLabel, Input} from "@repo/ui";
import {useMutation} from "@tanstack/react-query";
import {useTRPC} from "@/utils/trpcClient.ts";
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {loginInputSchema} from "@apps/api/zod";


export const LoginForm = () => {
  const trpc = useTRPC()
  const form = useForm<z.infer<typeof loginInputSchema>>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const {mutate, isPending} = useMutation(trpc.auth.login.mutationOptions({
    onSuccess(data) {
      console.log(data)
    },
    onError(error) {
      console.error(error)
    }
  }))

  return <div>
    <h1>Login</h1>
    {form.formState.errors && <p>Errors: {JSON.stringify(form.formState.errors)}</p>}
    <Form {...form}>
      <form onSubmit={form.handleSubmit((value) => mutate(value))}>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Email"/>
            </FormControl>
          </FormItem>
        )} name={'email'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Password" type="password"/>
            </FormControl>
          </FormItem>
        )} name={'password'}/>
        <Button type="submit" isPending={isPending}>Login</Button>
      </form>
    </Form>
  </div>
}
