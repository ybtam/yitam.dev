import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { positions } from '../experience/schema.ts'
import { users } from '../user/schema.ts'
import { educations } from '../education/schema.ts'
import { skills } from '../skills/schema.ts'

export const cvs = pgTable('cvs', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
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

export const cvsRelations = relations(cvs, ({ many, one }) => ({
  cvPositions: many(cvPositions),
  cvEducation: many(cvEducation),
  cvSkills: many(cvSkills),
  user: one(users, {
    fields: [cvs.userId],
    references: [users.id],
  }),
}))

export const cvPositions = pgTable(
  'cv_positions',
  {
    cvId: serial('cv_id')
      .notNull()
      .references(() => cvs.id, { onDelete: 'cascade' }),
    positionId: integer('position_id')
      .notNull()
      .references(() => positions.id, { onDelete: 'cascade' }),
    order: integer('order').default(0),
  },
  table => ({
    pk: primaryKey({ columns: [table.cvId, table.positionId] }),
  }),
)

export const cvPositionsRelations = relations(cvPositions, ({ one }) => ({
  cv: one(cvs, { fields: [cvPositions.cvId], references: [cvs.id] }),
  position: one(positions, { fields: [cvPositions.positionId], references: [positions.id] }),
}))

export const cvEducation = pgTable(
  'cv_education',
  {
    cvId: serial('cv_id')
      .notNull()
      .references(() => cvs.id, { onDelete: 'cascade' }),
    educationId: serial('education_id')
      .notNull()
      .references(() => educations.id, { onDelete: 'cascade' }),
    order: integer('order').default(0),
  },
  table => ({
    pk: primaryKey({ columns: [table.cvId, table.educationId] }),
  }),
)

export const cvEducationRelations = relations(cvEducation, ({ one }) => ({
  cv: one(cvs, { fields: [cvEducation.cvId], references: [cvs.id] }),
  education: one(educations, { fields: [cvEducation.educationId], references: [educations.id] }),
}))

export const cvSkills = pgTable(
  'cv_skills',
  {
    cvId: serial('cv_id')
      .notNull()
      .references(() => cvs.id, { onDelete: 'cascade' }),
    skillId: serial('skill_id')
      .notNull()
      .references(() => skills.id, { onDelete: 'cascade' }),
    order: integer('order').default(0),
  },
  table => ({
    pk: primaryKey({ columns: [table.cvId, table.skillId] }),
  }),
)

export const cvSkillsRelations = relations(cvSkills, ({ one }) => ({
  cv: one(cvs, { fields: [cvSkills.cvId], references: [cvs.id] }),
  skill: one(skills, { fields: [cvSkills.skillId], references: [skills.id] }),
}))
