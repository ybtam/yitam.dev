import { insertPositionSchema, insertResponsibilitySchema } from '@apps/db/zod'

export const createPositionSchema = insertPositionSchema.extend({
  responsibilities: insertResponsibilitySchema
    .omit({
      id: true,
    })
    .array()
    .transform(data =>
      data.map((responsibility, index) => ({
        ...responsibility,
        order: index,
      })),
    ),
})
