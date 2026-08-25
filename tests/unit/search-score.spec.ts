import { describe, expect, it } from 'vitest'
import type { SearchResult } from '../../shared/types/search'
import { rankSearchResults, scoreSearchResult, searchTerms } from '../../shared/utils/searchScore'

function result(partial: Partial<SearchResult>): SearchResult {
  return { id: 'x', source: 'wiki', title: 'Untitled', path: '/x', ...partial }
}

describe('searchTerms', () => {
  it('lowercases and splits on whitespace', () => {
    expect(searchTerms('  Copper   Rails ')).toEqual(['copper', 'rails'])
  })

  it('returns an empty list for a blank query', () => {
    expect(searchTerms('   ')).toEqual([])
  })
})

describe('scoreSearchResult', () => {
  const item = result({ title: 'Copper Rails', description: 'Rail speed tiers', breadcrumb: ['Transportation'] })

  it('scores a title prefix highest', () => {
    expect(scoreSearchResult(item, ['copper'])).toBeGreaterThan(scoreSearchResult(item, ['rails']))
  })

  it('scores a title substring above a description match', () => {
    expect(scoreSearchResult(item, ['rails'])).toBeGreaterThan(scoreSearchResult(item, ['speed']))
  })

  it('matches against the breadcrumb', () => {
    expect(scoreSearchResult(item, ['transportation'])).toBeGreaterThan(0)
  })

  it('requires every term to match', () => {
    expect(scoreSearchResult(item, ['copper', 'elytra'])).toBe(0)
  })

  it('sums the score across matching terms', () => {
    expect(scoreSearchResult(item, ['copper', 'rails'])).toBe(160)
  })

  it('returns zero with no terms', () => {
    expect(scoreSearchResult(item, [])).toBe(0)
  })

  it('handles a missing description and breadcrumb', () => {
    expect(scoreSearchResult(result({ title: 'Map Book' }), ['map'])).toBe(100)
  })
})

describe('rankSearchResults', () => {
  const items = [
    result({ id: 'a', title: 'Trains', description: 'Coupling' }),
    result({ id: 'b', title: 'Copper Rails', description: 'Feeds trains' }),
    result({ id: 'c', title: 'Map Book', description: 'Atlas' }),
  ]

  it('drops non-matching results', () => {
    expect(rankSearchResults(items, ['train'], 10).map(r => r.id)).toEqual(['a', 'b'])
  })

  it('orders by descending score', () => {
    expect(rankSearchResults(items, ['train'], 10)[0]!.id).toBe('a')
  })

  it('respects the limit', () => {
    expect(rankSearchResults(items, ['train'], 1)).toHaveLength(1)
  })

  it('returns nothing for an unmatched query', () => {
    expect(rankSearchResults(items, ['elytra'], 10)).toEqual([])
  })
})
