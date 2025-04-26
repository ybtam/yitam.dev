import { userRouter } from './user/index.js'
import { authRouter } from './auth/index.js'
import { cvRouter } from './cv/index.ts'
import { companiesRouter } from './companies/index.ts'

export const routes = {
  user: userRouter,
  auth: authRouter,
  cv: cvRouter,
  companies: companiesRouter,
}
