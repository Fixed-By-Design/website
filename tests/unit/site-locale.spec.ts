import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { localizedPath, translate } from '../../shared/i18n/translate'
import french from '../../shared/i18n/fr.json'
import { rankSearchResults, searchTerms } from '../../shared/utils/searchScore'

describe('language navigation', () => {
  it.each(['/', '/?category=travel', '/#features', '/wiki/teleportation', '/features/copper-rails?from=wiki#details', '/dashboard/feedback?status=new'])('preserves the page, query and fragment of %s', (path) => {
    const translated = localizedPath(path, 'fr')
    expect(translated).toMatch(/^\/fr(?:[/?#]|$)/)
    expect(localizedPath(translated, 'fr')).toBe(translated)
    expect(localizedPath(translated, 'en')).toBe(path)
  })

  it.each(['/api/search', '/auth/github', '/media/teleportation/travel.svg', '/brand/logo.svg', 'https://modrinth.com/modpack/fixed-by-design', '#details', '//example.org/wiki'])('does not localize non-page link %s', (path) => {
    expect(localizedPath(path, 'fr')).toBe(path)
  })
})

describe('French copy', () => {
  it('preserves interpolation placeholders and avoids em dashes', () => {
    for (const [source, translation] of Object.entries(french)) {
      expect(translation, source).not.toContain('—')
      expect(translation.match(/\{\w+\}/g)?.sort() ?? [], source).toEqual(source.match(/\{\w+\}/g)?.sort() ?? [])
    }
  })

  it('keeps English and unknown editorial copy intact', () => {
    expect(translate('en', 'Search')).toBe('Search')
    expect(translate('fr', 'An unpublished roadmap item')).toBe('An unpublished roadmap item')
  })

  it('covers every published document with a French counterpart', () => {
    for (const collection of ['features', 'wiki', 'design', 'pages', 'changelog']) {
      const documents = (path: string) => existsSync(path) ? readdirSync(path).filter(file => file.endsWith('.md')).sort() : []
      const source = documents(`content/${collection}`)
      expect(documents(`content/fr/${collection}`)).toEqual(source)
      for (const file of source) {
        const translation = readFileSync(`content/fr/${collection}/${file}`, 'utf8')
        expect(translation, file).not.toContain('—')
        expect(translation, file).not.toBe(readFileSync(`content/${collection}/${file}`, 'utf8'))
      }
    }
  })

  it('finds French titles with or without accents and ligatures', () => {
    const items = [{ id: 'flight', source: 'wiki' as const, title: 'Élytres et cœur du vol', path: '/fr/wiki/elytra' }]
    expect(rankSearchResults(items, searchTerms('elytres coeur'), 10)).toEqual(items)
    expect(rankSearchResults(items, searchTerms('ÉLYTRES cœur'), 10)).toEqual(items)
  })
})
