import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { companies } from '../experience/schema.ts'
import { skills } from '../skills/schema.ts'
import { educations } from '../education/schema.ts'

export const users = pgTable('users', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  id: serial('id').primaryKey(),
  lastName: text('last_name'),
  password: text('password').notNull(),
})

relations(users, ({ many }) => ({
  companies: many(companies),
  skills: many(skills),
  educations: many(educations),
}))
