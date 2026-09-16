import { queryCollection } from '@nuxt/content/server'
import type { SitemapUrlInput } from '#sitemap/types'
import { localizedPath } from '#shared/i18n/translate'

export default defineSitemapEventHandler(async (event): Promise<SitemapUrlInput[]> => {
  const collections = ['features', 'wiki', 'design', 'features_fr', 'wiki_fr', 'design_fr'] as const
  const content = (await Promise.all(collections.map(name => queryCollection(event, name).select('path').all()))).flat()
  const pages = ['/', '/features', '/wiki', '/design', '/modpack', '/contribute', '/feedback', '/roadmap', '/changelog']
  const paths = new Set([...content.map(item => item.path), ...pages, ...pages.map(path => localizedPath(path, 'fr'))])

  return [...paths].map(path => ({
    loc: path,
    alternatives: [
      { hreflang: 'en', href: localizedPath(path, 'en') },
      { hreflang: 'fr', href: localizedPath(path, 'fr') },
      { hreflang: 'x-default', href: localizedPath(path, 'en') },
    ],
  }))
})
