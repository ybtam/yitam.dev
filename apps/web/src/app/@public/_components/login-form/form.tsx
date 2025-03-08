'use client'

import { useForm } from "react-hook-form"
import {Button, Form, FormControl, FormField, FormItem, FormLabel, Input} from "@repo/ui";
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {loginInputSchema} from "@apps/api/zod";
import {useMutation} from "@tanstack/react-query";
import { login } from "./action";


export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginInputSchema>>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const {mutate, isPending} = useMutation({
    mutationFn: (data: z.infer<typeof loginInputSchema>) => login(data),
  })

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
