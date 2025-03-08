import {publicProcedure} from "../../trpc.ts";
import {z} from "zod";
import {generateToken, UserPayload, verifyToken} from "./util.ts";
import {loginInputSchema} from "./schema.js";

const login=  publicProcedure
  .input(loginInputSchema)
  .output(z.object({ accessToken: z.string(), refreshToken: z.string(), expiresIn: z.number() }))
  .mutation(async ({ input }) => {
    // Authenticate user against your database or authentication service
    if (input.email === 'test@test.test' && input.password === 'test') {
      const payload: UserPayload = { userId: '123', email: input.email };
      const accessToken = generateToken(payload);
      const refreshToken = generateToken(payload);

      return {accessToken, refreshToken, expiresIn: 3600};
    }
    throw new Error('Invalid credentials');
  })

const generateAccessToken = publicProcedure
  .input(z.object({
    refreshToken: z.string(),
  }))
  .output(z.object({
    accessToken: z.string(),
    expiresIn: z.number(),
  }))
  .mutation(async ({ input }) => {
    // Authenticate user against your database or authentication service
    if (verifyToken(input.refreshToken)) {
      const payload: UserPayload = { userId: '123', email: 'test@test.test' };
      const accessToken = generateToken(payload);

      return {accessToken, expiresIn: 3600};
    }
    throw new Error('Invalid refresh token');
  })

export default {
  login,
  generateAccessToken
}
