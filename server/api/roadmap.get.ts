import { asc, eq, inArray } from 'drizzle-orm'
import type { PublicRoadmapItem } from '#shared/types/roadmap'

export default defineEventHandler(async (): Promise<PublicRoadmapItem[]> => {
  const db = useDatabase()

  const rows = await db
    .select({
      slug: tables.roadmapItems.slug,
      title: tables.roadmapItems.title,
      summary: tables.roadmapItems.summary,
      status: tables.roadmapItems.status,
      domain: tables.roadmapItems.domain,
      milestone: tables.roadmapItems.milestone,
      targetVersion: tables.roadmapItems.targetVersion,
      updatedAt: tables.roadmapItems.updatedAt,
      problemSlug: tables.problems.slug,
      problemPublicId: tables.problems.publicId,
      problemTitle: tables.problems.title,
      itemId: tables.roadmapItems.id,
    })
    .from(tables.roadmapItems)
    .leftJoin(tables.problems, eq(tables.roadmapItems.problemId, tables.problems.id))
    .orderBy(asc(tables.roadmapItems.sortOrder))

  if (!rows.length) return []

  const links = await db
    .select()
    .from(tables.externalLinks)
    .where(inArray(tables.externalLinks.entityId, rows.map(row => row.itemId)))

  return rows.map(({ itemId, problemSlug, problemPublicId, problemTitle, updatedAt, ...item }) => ({
    ...item,
    updatedAt: updatedAt.toISOString(),
    problem: problemSlug && problemPublicId !== null
      ? { slug: problemSlug, publicId: problemPublicId, title: problemTitle! }
      : null,
    links: links
      .filter(link => link.entityId === itemId)
      .map(link => ({ url: link.url, label: link.label, number: link.number })),
  }))
})
