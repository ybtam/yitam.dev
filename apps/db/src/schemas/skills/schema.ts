import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const skills = pgTable('skills', {
  id: serial('id').primaryKey().primaryKey(),
  name: text('name').notNull().unique(),
  categoryId: integer('category_id').references(() => skillCategories.id, { onDelete: 'set null' }),
  proficiency: integer('proficiency'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export const skillsRelations = relations(skills, ({ one, many }) => ({
  category: one(skillCategories, {
    fields: [skills.categoryId],
    references: [skillCategories.id],
  }),
  // cvSkills: many(cvSkills),
}))

export const skillCategories = pgTable('skill_categories', {
  id: serial('id').primaryKey().primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export const skillCategoriesRelations = relations(skillCategories, ({ many }) => ({
  skills: many(skills),
}))
