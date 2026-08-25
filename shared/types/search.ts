export type SearchSourceId = 'wiki' | 'features' | 'roadmap' | 'design' | 'changelog'

export interface SearchResult {
  id: string
  source: SearchSourceId
  title: string
  description?: string
  path: string
  breadcrumb?: string[]
}

export interface SearchGroup {
  id: SearchSourceId
  label: string
  icon: string
  items: SearchResult[]
}
