import jwt from 'jsonwebtoken';
import { z } from 'zod';

const JWT_TOKEN = process.env.JWT_TOKEN!;
if (!JWT_TOKEN) throw new Error('JWT_TOKEN is not set');

const TokenPayloadSchema = z.object({
  id: z.string(), // User ID
  role: z.string().optional(), // Optional role
  exp: z.number(),
});

export function decodeAndVerifyJwtToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    const parsedPayload = TokenPayloadSchema.safeParse(decoded);
    if (!parsedPayload.success) {
      throw new Error('Invalid token payload');
    }
    return parsedPayload.data;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}
