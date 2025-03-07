import {publicProcedure} from "../../trpc.ts";
import {z} from "zod";
import {generateToken, UserPayload} from "./util.ts";
import {loginInputSchema} from "./schema.js";

const login=  publicProcedure
  .input(loginInputSchema)
  .output(z.object({ token: z.string() }))
  .mutation(async ({ input }) => {
    // Authenticate user against your database or authentication service
    if (input.email === 'test@test.test' && input.password === 'test') {
      const payload: UserPayload = { userId: '123', email: input.email };
      const token = generateToken(payload);
      return { token };
    }
    throw new Error('Invalid credentials');
  })

export default {
  login
}
