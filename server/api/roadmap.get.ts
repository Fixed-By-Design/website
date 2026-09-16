import { z } from 'zod'
import { translate, localizedPath } from '#shared/i18n/translate'
import { asc, eq, inArray } from 'drizzle-orm'
import type { PublicRoadmapItem } from '#shared/types/roadmap'

export default defineEventHandler(async (event): Promise<PublicRoadmapItem[]> => {
  const { locale } = await getValidatedQuery(event, z.object({ locale: z.enum(['en', 'fr']).default('en') }).parse)
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
    title: translate(locale, item.title),
    summary: translate(locale, item.summary),
    domain: translate(locale, item.domain),
    updatedAt: updatedAt.toISOString(),
    problem: problemSlug && problemPublicId !== null
      ? { slug: problemSlug, publicId: problemPublicId, title: translate(locale, problemTitle!) }
      : null,
    links: links
      .filter(link => link.entityId === itemId)
      .map(link => ({ url: localizedPath(link.url.replace(/^https:\/\/fixedbydesign\.com(?=\/)/, ''), locale), label: link.label ? translate(locale, link.label) : null, number: link.number })),
  }))
})
