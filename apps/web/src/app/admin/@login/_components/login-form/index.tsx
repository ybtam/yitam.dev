'use client'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, toast } from '@repo/ui'
import Link from 'next/link'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/app/admin/@login/_components/login-form/action.ts'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginInputSchema } from '@apps/api/zod'
import { FormInput } from 'lucide-react'

export const LoginForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success('Logged in successfully')
    },
    onError: error => {
      if (error.message !== 'REDIRECT_URL') toast.error(error.message)
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginInputSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(value => mutate(value))} className="space-y-4">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
          name={'email'}
          control={form.control}
        />

        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type={'password'} />
              </FormControl>
            </FormItem>
          )}
          name={'password'}
          control={form.control}
        />

        <Button className="w-full" type={'submit'} disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </Form>
  )
}
