import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify'
import fastify from 'fastify'
import { AppRouter, appRouter } from './router.js'
import { createContext } from '../context/auth-context.js'
import cors from '@fastify/cors'

export const createServer = () => {
  const server = fastify({
    maxParamLength: 5000,
  })

  server.register(cors, {
    origin: '*',
  })

  server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
      onError({ path, error }) {
        // report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error)
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
  })

  return server
}
