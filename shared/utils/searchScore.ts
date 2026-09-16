import type { SearchResult } from '../types/search'

export const SEARCH_MIN_LENGTH = 2

export function normalizeSearch(text: string) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replaceAll('œ', 'oe')
}

export function searchTerms(query: string) {
  return normalizeSearch(query).split(/\s+/).filter(Boolean)
}

export function scoreSearchResult(result: SearchResult, terms: string[]) {
  if (!terms.length) return 0

  const title = normalizeSearch(result.title)
  const haystack = [
    title,
    normalizeSearch(result.description ?? ''),
    ...(result.breadcrumb ?? []).map(entry => normalizeSearch(entry)),
  ].join(' ')

  let total = 0
  for (const term of terms) {
    if (title.startsWith(term)) total += 100
    else if (title.includes(term)) total += 60
    else if (haystack.includes(term)) total += 20
    else return 0
  }
  return total
}

export function rankSearchResults(results: SearchResult[], terms: string[], limit: number) {
  return results
    .map(result => ({ result, rank: scoreSearchResult(result, terms) }))
    .filter(entry => entry.rank > 0)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, limit)
    .map(entry => entry.result)
}
