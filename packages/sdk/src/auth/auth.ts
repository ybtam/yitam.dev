import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import 'next-auth/jwt'


declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id?: string
      token?: null | string
    }
  }

  interface User {
    firstName?: null | string
    id?: string
    token?: null | string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: null | string
    userId?: string
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.token = user.token
        token.userId = user.id
      }

      return token
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.userId,
          token: token.token,
        },
      }
    },
  },
  providers: [
    Credentials({
      authorize: async credentials => {
        //todo add logic

        return null
      },
      credentials: {
        email: {},
        password: {},
        role: {},
      },
    }),
  ],
})
