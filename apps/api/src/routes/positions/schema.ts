import {
  insertPositionSchema,
  insertResponsibilitySchema,
  updateResponsibilitySchema,
  updatePositionSchema as updatePositionSchemaBase,
} from '@apps/db/zod'

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

export const updatePositionSchema = updatePositionSchemaBase.extend({
  responsibilities: updateResponsibilitySchema.array().transform(data =>
    data.map((responsibility, index) => ({
      ...responsibility,
      order: index,
    })),
  ),
})
