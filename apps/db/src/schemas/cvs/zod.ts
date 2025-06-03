import { createInsertSchema } from 'drizzle-zod'
import { cvs } from './schema.ts'

export const insertCvsSchema = createInsertSchema(cvs)
