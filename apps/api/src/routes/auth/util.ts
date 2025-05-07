import jwt, { JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'

const JWT_TOKEN = process.env.JWT_TOKEN!
if (!JWT_TOKEN) throw new Error('JWT_TOKEN is not set')

const TokenPayloadSchema = z.object({
  userId: z.coerce.number(), // User ID
  exp: z.number(),
})

export function decodeAndVerifyJwtToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_TOKEN)
    const parsedPayload = TokenPayloadSchema.safeParse(decoded)
    if (!parsedPayload.success) {
      throw new Error('Invalid token payload')
    }
    return parsedPayload.data
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export interface UserPayload {
  userId: number
  email: string
}

export function generateTokens(payload: UserPayload) {
  return {
    accessToken: jwt.sign(payload, JWT_TOKEN, { expiresIn: '2d' }),
    refreshToken: jwt.sign(payload, JWT_TOKEN, { expiresIn: '30d' }),
  }
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_TOKEN) as JwtPayload & UserPayload
  } catch (error) {
    return null
  }
}
