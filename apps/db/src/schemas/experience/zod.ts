import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { companies, positions, responsibilities } from './schema.ts'
import { z } from 'zod'

export const insertCompanySchema = createInsertSchema(companies, {
  userId: schema => schema.optional(),
})

export const insertPositionSchema = createInsertSchema(positions, {
  userId: schema => schema.optional(),
  companyId: z.coerce.number(),
  description: z.string().optional(),
})

export const updatePositionSchema = createUpdateSchema(positions, {
  id: z.number(),
})

export const insertResponsibilitySchema = createInsertSchema(responsibilities, {
  positionId: schema => schema.optional(),
})

export const updateResponsibilitySchema = createUpdateSchema(responsibilities, {
  positionId: z.number(),
  text: z.string(),
})
