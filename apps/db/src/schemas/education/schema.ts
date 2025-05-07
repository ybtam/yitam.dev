import { date, integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from '../user/schema.ts'
import { relations } from 'drizzle-orm'

export const educations = pgTable('educations', {
  id: serial('id').primaryKey(),
  institutionName: text('institution_name').notNull(),
  degree: text('degree'),
  fieldOfStudy: text('field_of_study'),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const educationRelations = relations(educations, ({ one }) => ({
  user: one(users, {
    fields: [educations.userId],
    references: [users.id],
  }),
}))
