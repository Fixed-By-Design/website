import { count, desc, eq } from 'drizzle-orm'
import type { ProblemSummary } from '#shared/types/dashboard'

export default defineEventHandler(async (event): Promise<ProblemSummary[]> => {
  await requireRole(event, 'contributor')

  const rows = await useDatabase()
    .select({
      id: tables.problems.id,
      publicId: tables.problems.publicId,
      slug: tables.problems.slug,
      title: tables.problems.title,
      summary: tables.problems.summary,
      status: tables.problems.status,
      severity: tables.problems.severity,
      affectedSystems: tables.problems.affectedSystems,
      createdAt: tables.problems.createdAt,
      updatedAt: tables.problems.updatedAt,
      feedbackCount: count(tables.feedback.id),
    })
    .from(tables.problems)
    .leftJoin(tables.feedback, eq(tables.feedback.problemId, tables.problems.id))
    .groupBy(tables.problems.id)
    .orderBy(desc(tables.problems.updatedAt))

  return rows.map(({ createdAt, updatedAt, ...row }) => ({
    ...row,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  }))
})
