import {publicProcedure} from "../../trpc.js";
import {z} from "zod";
import {generateToken, UserPayload} from "./util.js";

const login=  publicProcedure
  .input(z.object({ email: z.string(), password: z.string() }))
  .output(z.object({ token: z.string() }))
  .mutation(async ({ input }) => {
    // Authenticate user against your database or authentication service
    if (input.email === 'test@example.com' && input.password === 'password') {
      const payload: UserPayload = { userId: '123', email: input.email };
      const token = generateToken(payload);
      return { token };
    }
    throw new Error('Invalid credentials');
  })

export default {
  login
}
