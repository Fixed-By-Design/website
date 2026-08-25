import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireRole(event, 'maintainer')

  return useDatabase()
    .select({ slug: tables.tags.slug, label: tables.tags.label })
    .from(tables.tags)
    .orderBy(asc(tables.tags.label))
})
