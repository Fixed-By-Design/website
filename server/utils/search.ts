import type { H3Event } from 'h3'
import type { SearchGroup, SearchResult, SearchSourceId } from '#shared/types/search'
import { FEATURE_CATEGORY_LABELS, type FeatureCategory } from '#shared/constants/features'
import { ROADMAP_STATUS_LABELS } from '#shared/constants/workflow'

interface SearchSource {
  id: SearchSourceId
  label: string
  icon: string
  order: number
  fetch: (event: H3Event) => Promise<SearchResult[]>
}

const sources: SearchSource[] = []

export function registerSearchSource(source: SearchSource) {
  sources.push(source)
  sources.sort((a, b) => a.order - b.order)
}

function score(result: SearchResult, terms: string[]) {
  const title = result.title.toLowerCase()
  const haystack = [title, result.description?.toLowerCase() ?? '', ...(result.breadcrumb ?? []).map(s => s.toLowerCase())].join(' ')

  let total = 0
  for (const term of terms) {
    if (title.startsWith(term)) total += 100
    else if (title.includes(term)) total += 60
    else if (haystack.includes(term)) total += 20
    else return 0
  }
  return total
}

export async function runSearch(event: H3Event, query: string, limitPerSource = 6): Promise<SearchGroup[]> {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []

  const groups = await Promise.all(sources.map(async (source) => {
    const items = (await source.fetch(event))
      .map(item => ({ item, rank: score(item, terms) }))
      .filter(entry => entry.rank > 0)
      .sort((a, b) => b.rank - a.rank)
      .slice(0, limitPerSource)
      .map(entry => entry.item)

    return { id: source.id, label: source.label, icon: source.icon, items }
  }))

  return groups.filter(group => group.items.length > 0)
}

registerSearchSource({
  id: 'wiki',
  label: 'Wiki',
  icon: 'i-lucide-book-open',
  order: 1,
  fetch: async (event) => {
    const sections = await queryCollectionSearchSections(event, 'wiki')
    return sections.map(section => ({
      id: `wiki:${section.id}`,
      source: 'wiki' as const,
      title: section.title,
      description: section.content?.slice(0, 140),
      path: section.id,
      breadcrumb: section.titles,
    }))
  },
})

registerSearchSource({
  id: 'features',
  label: 'Features',
  icon: 'i-lucide-sparkles',
  order: 2,
  fetch: async (event) => {
    const items = await queryCollection(event, 'features').select('path', 'title', 'summary', 'category').all()
    return items.map(item => ({
      id: `features:${item.path}`,
      source: 'features' as const,
      title: item.title,
      description: item.summary,
      path: item.path,
      breadcrumb: [FEATURE_CATEGORY_LABELS[item.category as FeatureCategory]],
    }))
  },
})

registerSearchSource({
  id: 'roadmap',
  label: 'Roadmap',
  icon: 'i-lucide-map',
  order: 3,
  fetch: async () => {
    const items = await useDatabase().query.roadmapItems.findMany({
      columns: { slug: true, title: true, summary: true, status: true },
    })
    return items.map(item => ({
      id: `roadmap:${item.slug}`,
      source: 'roadmap' as const,
      title: item.title,
      description: item.summary,
      path: `/roadmap#${item.slug}`,
      breadcrumb: [ROADMAP_STATUS_LABELS[item.status]],
    }))
  },
})

registerSearchSource({
  id: 'design',
  label: 'Design decisions',
  icon: 'i-lucide-scale',
  order: 4,
  fetch: async (event) => {
    const items = await queryCollection(event, 'design').select('path', 'title', 'summary').all()
    return items.map(item => ({
      id: `design:${item.path}`,
      source: 'design' as const,
      title: item.title,
      description: item.summary,
      path: item.path,
    }))
  },
})

registerSearchSource({
  id: 'changelog',
  label: 'Changelog',
  icon: 'i-lucide-tag',
  order: 5,
  fetch: async (event) => {
    const items = await queryCollection(event, 'changelog').select('path', 'title', 'summary', 'version').all()
    return items.map(item => ({
      id: `changelog:${item.path}`,
      source: 'changelog' as const,
      title: item.title,
      description: item.summary,
      path: item.path,
    }))
  },
})
