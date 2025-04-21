import { userRouter } from './user/index.js'
import { authRouter } from './auth/index.js'
import { cvRouter } from './cv/index.ts'

export const routes = {
  user: userRouter,
  auth: authRouter,
  cv: cvRouter
}
