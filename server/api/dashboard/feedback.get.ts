import { and, count, desc, eq, inArray, sql } from 'drizzle-orm'
import { z } from 'zod'
import type { FeedbackEntry, FeedbackPage } from '#shared/types/dashboard'
import { FEEDBACK_SOURCES, FEEDBACK_STATUSES, FEEDBACK_TYPES, type FeedbackStatus } from '#shared/constants/workflow'

const querySchema = z.object({
  status: z.enum(FEEDBACK_STATUSES).optional(),
  type: z.enum(FEEDBACK_TYPES).optional(),
  source: z.enum(FEEDBACK_SOURCES).optional(),
  version: z.string().trim().max(32).optional(),
  tag: z.string().trim().max(64).optional(),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(50).default(20),
})

export default defineEventHandler(async (event): Promise<FeedbackPage> => {
  await requireRole(event, 'maintainer')

  const query = await getValidatedQuery(event, querySchema.parse)
  const db = useDatabase()

  const filters = [
    query.status ? eq(tables.feedback.status, query.status) : undefined,
    query.type ? eq(tables.feedback.type, query.type) : undefined,
    query.source ? eq(tables.feedback.source, query.source) : undefined,
    query.version ? eq(tables.feedback.version, query.version) : undefined,
    query.tag
      ? sql`exists (
          select 1 from ${tables.feedbackTags}
          join ${tables.tags} on ${tables.tags.id} = ${tables.feedbackTags.tagId}
          where ${tables.feedbackTags.feedbackId} = ${tables.feedback.id} and ${tables.tags.slug} = ${query.tag}
        )`
      : undefined,
  ].filter(Boolean)

  const where = filters.length ? and(...filters) : undefined

  const [totals] = await db.select({ total: count() }).from(tables.feedback).where(where)

  const rows = await db
    .select({
      id: tables.feedback.id,
      message: tables.feedback.message,
      type: tables.feedback.type,
      source: tables.feedback.source,
      status: tables.feedback.status,
      version: tables.feedback.version,
      playerName: tables.feedback.playerName,
      dimension: tables.feedback.dimension,
      x: tables.feedback.x,
      y: tables.feedback.y,
      z: tables.feedback.z,
      createdAt: tables.feedback.createdAt,
      problemId: tables.problems.id,
      problemSlug: tables.problems.slug,
      problemPublicId: tables.problems.publicId,
      problemTitle: tables.problems.title,
    })
    .from(tables.feedback)
    .leftJoin(tables.problems, eq(tables.feedback.problemId, tables.problems.id))
    .where(where)
    .orderBy(desc(tables.feedback.createdAt))
    .limit(query.perPage)
    .offset((query.page - 1) * query.perPage)

  const tagRows = rows.length
    ? await db
        .select({ feedbackId: tables.feedbackTags.feedbackId, slug: tables.tags.slug, label: tables.tags.label })
        .from(tables.feedbackTags)
        .innerJoin(tables.tags, eq(tables.tags.id, tables.feedbackTags.tagId))
        .where(inArray(tables.feedbackTags.feedbackId, rows.map(row => row.id)))
    : []

  const countRows = await db
    .select({ status: tables.feedback.status, total: count() })
    .from(tables.feedback)
    .groupBy(tables.feedback.status)

  const counts = Object.fromEntries(FEEDBACK_STATUSES.map(status => [status, 0])) as Record<FeedbackStatus, number>
  for (const row of countRows) counts[row.status] = row.total

  const items: FeedbackEntry[] = rows.map(({ problemId, problemSlug, problemPublicId, problemTitle, createdAt, ...row }) => ({
    ...row,
    createdAt: createdAt.toISOString(),
    tags: tagRows.filter(tag => tag.feedbackId === row.id).map(({ slug, label }) => ({ slug, label })),
    problem: problemId && problemSlug && problemPublicId !== null
      ? { id: problemId, slug: problemSlug, publicId: problemPublicId, title: problemTitle! }
      : null,
  }))

  return { items, total: totals?.total ?? 0, counts }
})
