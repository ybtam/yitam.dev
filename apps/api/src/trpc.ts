import { initTRPC, TRPCError } from '@trpc/server';
import { AuthContext } from './context/auth-context.ts';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create({});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

export const authContext = initTRPC.context<AuthContext>().create();
// you can reuse this for any procedure
export const protectedProcedure = authContext.procedure.use(
  async function isAuthed(opts) {
    const { ctx } = opts;
    // `ctx.user` is nullable
    if (!ctx.user) {
      //     ^?
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return opts.next({
      ctx: {
        // ✅ user value is known to be non-null now
        user: ctx.user,
        // ^?
      },
    });
  },
);
