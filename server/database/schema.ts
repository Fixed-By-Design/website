import { relations, sql } from 'drizzle-orm'
import {
  doublePrecision,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'
import {
  EXTERNAL_LINK_KINDS,
  FEEDBACK_SOURCES,
  FEEDBACK_STATUSES,
  FEEDBACK_TYPES,
  LINKABLE_ENTITY_TYPES,
  PROBLEM_SEVERITIES,
  PROBLEM_STATUSES,
  PROPOSAL_STATUSES,
  PUBLICATION_STATUSES,
  ROADMAP_STATUSES,
  USER_ROLES,
} from '../../shared/constants/workflow'

export const userRole = pgEnum('user_role', USER_ROLES)
export const feedbackType = pgEnum('feedback_type', FEEDBACK_TYPES)
export const feedbackSource = pgEnum('feedback_source', FEEDBACK_SOURCES)
export const feedbackStatus = pgEnum('feedback_status', FEEDBACK_STATUSES)
export const problemStatus = pgEnum('problem_status', PROBLEM_STATUSES)
export const problemSeverity = pgEnum('problem_severity', PROBLEM_SEVERITIES)
export const roadmapStatus = pgEnum('roadmap_status', ROADMAP_STATUSES)
export const proposalStatus = pgEnum('proposal_status', PROPOSAL_STATUSES)
export const publicationStatus = pgEnum('publication_status', PUBLICATION_STATUSES)
export const externalLinkKind = pgEnum('external_link_kind', EXTERNAL_LINK_KINDS)
export const linkableEntityType = pgEnum('linkable_entity_type', LINKABLE_ENTITY_TYPES)

const now = () => timestamp('created_at', { withTimezone: true }).notNull().defaultNow()

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  githubId: integer('github_id').notNull(),
  login: text('login').notNull(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  role: userRole('role').notNull().default('player'),
  createdAt: now(),
  lastSeenAt: timestamp('last_seen_at', { withTimezone: true }).notNull().defaultNow(),
}, t => [
  uniqueIndex('users_github_id_idx').on(t.githubId),
  uniqueIndex('users_login_idx').on(t.login),
])

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull(),
  label: text('label').notNull(),
  createdAt: now(),
}, t => [uniqueIndex('tags_slug_idx').on(t.slug)])

export const problems = pgTable('problems', {
  id: uuid('id').primaryKey().defaultRandom(),
  publicId: integer('public_id').generatedAlwaysAsIdentity({ startWith: 1 }).notNull(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  context: text('context'),
  evidence: text('evidence'),
  status: problemStatus('status').notNull().default('investigating'),
  severity: problemSeverity('severity'),
  affectedSystems: text('affected_systems').array().notNull().default(sql`'{}'::text[]`),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: now(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, t => [
  uniqueIndex('problems_slug_idx').on(t.slug),
  uniqueIndex('problems_public_id_idx').on(t.publicId),
  index('problems_status_idx').on(t.status),
])

export const feedback = pgTable('feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  message: text('message').notNull(),
  type: feedbackType('type').notNull().default('general'),
  source: feedbackSource('source').notNull().default('web'),
  status: feedbackStatus('status').notNull().default('new'),
  version: text('version'),
  playerName: text('player_name'),
  playerUuid: uuid('player_uuid'),
  server: text('server'),
  dimension: text('dimension'),
  x: doublePrecision('x'),
  y: doublePrecision('y'),
  z: doublePrecision('z'),
  problemId: uuid('problem_id').references(() => problems.id, { onDelete: 'set null' }),
  duplicateOfId: uuid('duplicate_of_id').references((): any => feedback.id, { onDelete: 'set null' }),
  submittedById: uuid('submitted_by_id').references(() => users.id, { onDelete: 'set null' }),
  triagedById: uuid('triaged_by_id').references(() => users.id, { onDelete: 'set null' }),
  triagedAt: timestamp('triaged_at', { withTimezone: true }),
  submitterHash: text('submitter_hash'),
  createdAt: now(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, t => [
  index('feedback_status_idx').on(t.status),
  index('feedback_created_at_idx').on(t.createdAt),
  index('feedback_problem_id_idx').on(t.problemId),
])

export const feedbackTags = pgTable('feedback_tags', {
  feedbackId: uuid('feedback_id').notNull().references(() => feedback.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, t => [primaryKey({ columns: [t.feedbackId, t.tagId] })])

export const problemTags = pgTable('problem_tags', {
  problemId: uuid('problem_id').notNull().references(() => problems.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, t => [primaryKey({ columns: [t.problemId, t.tagId] })])

export const roadmapItems = pgTable('roadmap_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  status: roadmapStatus('status').notNull().default('exploring'),
  domain: text('domain').notNull(),
  milestone: text('milestone'),
  targetVersion: text('target_version'),
  problemId: uuid('problem_id').references(() => problems.id, { onDelete: 'set null' }),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: now(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, t => [
  uniqueIndex('roadmap_items_slug_idx').on(t.slug),
  index('roadmap_items_status_idx').on(t.status),
])

export const proposals = pgTable('proposals', {
  id: uuid('id').primaryKey().defaultRandom(),
  problemId: uuid('problem_id').notNull().references(() => problems.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  body: text('body'),
  status: proposalStatus('status').notNull().default('draft'),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: now(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, t => [index('proposals_problem_id_idx').on(t.problemId)])

export const designDecisions = pgTable('design_decisions', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  problemId: uuid('problem_id').references(() => problems.id, { onDelete: 'set null' }),
  acceptedProposalId: uuid('accepted_proposal_id').references(() => proposals.id, { onDelete: 'set null' }),
  context: text('context'),
  constraints: text('constraints'),
  consideredSolutions: text('considered_solutions'),
  decision: text('decision'),
  reasoning: text('reasoning'),
  consequences: text('consequences'),
  relatedFeatures: text('related_features').array().notNull().default(sql`'{}'::text[]`),
  publication: publicationStatus('publication').notNull().default('draft'),
  createdAt: now(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, t => [uniqueIndex('design_decisions_slug_idx').on(t.slug)])

export const externalLinks = pgTable('external_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  entityType: linkableEntityType('entity_type').notNull(),
  entityId: uuid('entity_id').notNull(),
  kind: externalLinkKind('kind').notNull().default('issue'),
  repository: text('repository'),
  number: integer('number'),
  url: text('url').notNull(),
  label: text('label'),
  createdAt: now(),
}, t => [index('external_links_entity_idx').on(t.entityType, t.entityId)])

export const serverApiKeys = pgTable('server_api_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  keyPrefix: text('key_prefix').notNull(),
  keyHash: text('key_hash').notNull(),
  serverLabel: text('server_label'),
  lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  createdById: uuid('created_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: now(),
}, t => [uniqueIndex('server_api_keys_prefix_idx').on(t.keyPrefix)])

export const usersRelations = relations(users, ({ many }) => ({
  authoredProblems: many(problems),
  submittedFeedback: many(feedback),
}))

export const problemsRelations = relations(problems, ({ one, many }) => ({
  author: one(users, { fields: [problems.authorId], references: [users.id] }),
  feedback: many(feedback),
  proposals: many(proposals),
  tags: many(problemTags),
}))

export const feedbackRelations = relations(feedback, ({ one, many }) => ({
  problem: one(problems, { fields: [feedback.problemId], references: [problems.id] }),
  submittedBy: one(users, { fields: [feedback.submittedById], references: [users.id] }),
  triagedBy: one(users, { fields: [feedback.triagedById], references: [users.id] }),
  tags: many(feedbackTags),
}))

export const feedbackTagsRelations = relations(feedbackTags, ({ one }) => ({
  feedback: one(feedback, { fields: [feedbackTags.feedbackId], references: [feedback.id] }),
  tag: one(tags, { fields: [feedbackTags.tagId], references: [tags.id] }),
}))

export const problemTagsRelations = relations(problemTags, ({ one }) => ({
  problem: one(problems, { fields: [problemTags.problemId], references: [problems.id] }),
  tag: one(tags, { fields: [problemTags.tagId], references: [tags.id] }),
}))

export const roadmapItemsRelations = relations(roadmapItems, ({ one }) => ({
  problem: one(problems, { fields: [roadmapItems.problemId], references: [problems.id] }),
}))

export const proposalsRelations = relations(proposals, ({ one }) => ({
  problem: one(problems, { fields: [proposals.problemId], references: [problems.id] }),
  author: one(users, { fields: [proposals.authorId], references: [users.id] }),
}))

export type User = typeof users.$inferSelect
export type Feedback = typeof feedback.$inferSelect
export type NewFeedback = typeof feedback.$inferInsert
export type Problem = typeof problems.$inferSelect
export type NewProblem = typeof problems.$inferInsert
export type RoadmapItem = typeof roadmapItems.$inferSelect
export type Tag = typeof tags.$inferSelect
export type ExternalLink = typeof externalLinks.$inferSelect
export type ServerApiKey = typeof serverApiKeys.$inferSelect
