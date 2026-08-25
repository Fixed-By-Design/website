export interface WikiNavigationEntry {
  path: string
  title: string
  description: string
}

export interface WikiNavigationSection {
  label: string
  items: WikiNavigationEntry[]
}

export function useWikiNavigation() {
  return useAsyncData('wiki-nav', async () => {
    const pages = await queryCollection('wiki')
      .select('path', 'title', 'description', 'section', 'order')
      .order('order', 'ASC')
      .all()

    const sections: WikiNavigationSection[] = []
    for (const page of pages) {
      let section = sections.find(entry => entry.label === page.section)
      if (!section) {
        section = { label: page.section, items: [] }
        sections.push(section)
      }
      section.items.push({ path: page.path, title: page.title, description: page.description })
    }
    return sections
  }, { default: (): WikiNavigationSection[] => [] })
}
