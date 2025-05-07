import { boolean, date, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from '../user/schema.ts'

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // Ensure company names are unique
  location: text('location'), // e.g., "City, Country"
  description: text('description'), // Optional: Brief company overview
  website: text('website'), // Company website URL
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const companiesRelations = relations(companies, ({ many, one }) => ({
  positions: many(positions),
  user: one(users, {
    fields: [companies.userId],
    references: [users.id],
  }),
}))

export const positions = pgTable('positions', {
  id: serial('id').primaryKey(),
  companyId: integer('company_id')
    .notNull()
    .references(() => companies.id, { onDelete: 'cascade' }), // If a company is deleted, delete associated positions
  jobTitle: text('job_title').notNull(),
  description: text('description'),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  isCurrent: boolean('is_current').default(false).notNull(), // Explicit flag for the current role
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const positionsRelations = relations(positions, ({ one, many }) => ({
  company: one(companies, {
    fields: [positions.companyId],
    references: [companies.id],
  }),
  responsibilities: many(responsibilities),
  user: one(users, {
    fields: [positions.userId],
    references: [users.id],
  }),
  // cvPositions: many(cvPositions),
}))

export const responsibilities = pgTable('responsibilities', {
  id: serial('id').primaryKey(), // Using serial for simplicity here too
  // Foreign key linking to the specific position
  positionId: integer('position_id')
    .notNull()
    .references(() => positions.id, { onDelete: 'cascade' }), // If position deleted, delete responsibilities
  text: text('text').notNull(), // The text content of the responsibility/achievement
  order: integer('order').default(0).notNull(), // To control display order
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export const responsibilitiesRelations = relations(responsibilities, ({ one }) => ({
  position: one(positions, {
    // Each responsibility belongs to one position
    fields: [responsibilities.positionId],
    references: [positions.id],
  }),
}))
