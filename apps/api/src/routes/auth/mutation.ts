import {publicProcedure} from "../../trpc.ts";
import {z} from "zod";
import {generateTokens, UserPayload, verifyToken} from "./util.ts";
import {loginInputSchema} from "./schema.js";
import {db, users} from "@apps/db";
import {and, eq} from "drizzle-orm";

const login = publicProcedure
  .input(loginInputSchema)
  .mutation(async ({ input }) => {
    const selectUsers = await db.query.users.findFirst({
      where: and(
        eq(users.email, input.email),
        eq(users.password, input.password)
      )
    });

    if (!selectUsers) throw new Error('Invalid email or password');

    const { accessToken, refreshToken } = generateTokens({
      userId: selectUsers.id,
      email: selectUsers.email
    });

    return { accessToken, refreshToken, expiresIn: 3600 };
  });

const generateAccessToken = publicProcedure
  .input(z.object({
    refreshToken: z.string(),
  }))
  .mutation(async ({ input }) => {
    // Authenticate user against your database or authentication service

    const payload = verifyToken(input.refreshToken)
    if (payload) {
      const selectUsers = await db.query.users.findFirst({
        where: eq(users.id, payload.userId)
      })

      if (!selectUsers) throw new Error('Invalid refresh token');

      const {accessToken} = generateTokens(payload);

      return {accessToken, expiresIn: 3600};
    }
    throw new Error('Invalid refresh token');
  })

export default {
  login,
  generateAccessToken
}
