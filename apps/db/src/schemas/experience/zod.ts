import { createInsertSchema } from 'drizzle-zod'
import { companies } from './schema.ts'

export const insertCompanySchema = createInsertSchema(companies, {
  userId: schema => schema.optional(),
})
