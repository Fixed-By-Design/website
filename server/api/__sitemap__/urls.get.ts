import { queryCollection } from '@nuxt/content/server'
import { asc } from 'drizzle-orm'
import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async (event): Promise<SitemapUrlInput[]> => {
  const [features, wiki, design] = await Promise.all([
    queryCollection(event, 'features').select('path').all(),
    queryCollection(event, 'wiki').select('path').all(),
    queryCollection(event, 'design').select('path').all(),
  ])

  const roadmap = await useDatabase()
    .select({ updatedAt: tables.roadmapItems.updatedAt })
    .from(tables.roadmapItems)
    .orderBy(asc(tables.roadmapItems.updatedAt))
    .limit(1)

  return [
    ...features.map(item => ({ loc: item.path, priority: 0.8 as const, changefreq: 'monthly' as const })),
    ...wiki.map(item => ({ loc: item.path, priority: 0.7 as const, changefreq: 'monthly' as const })),
    ...design.map(item => ({ loc: item.path, priority: 0.6 as const, changefreq: 'yearly' as const })),
    ...(roadmap.length ? [{ loc: '/roadmap', priority: 0.7 as const, changefreq: 'weekly' as const }] : []),
  ]
})
