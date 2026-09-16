import french from './fr.json'

export type SiteLocale = 'en' | 'fr'

/** English copy is the source key, so changes to the wording are visible in reviews. */
export function translate(locale: string, source: string, params: Record<string, string | number> = {}): string {
  const text = locale === 'fr' ? (french as Record<string, string>)[source] ?? source : source
  return text.replace(/\{(\w+)\}/g, (match, key: string) => String(params[key] ?? match))
}

export function localizedPath(path: string, locale: string): string {
  // Assets, API endpoints, OAuth and external links must never get a locale prefix.
  if (!/^\/(?:$|\?|#|fr(?:\/|$|\?|#)|features(?:\/|$|\?|#)|wiki(?:\/|$|\?|#)|design(?:\/|$|\?|#)|modpack(?:$|\?|#)|roadmap(?:$|\?|#)|changelog(?:$|\?|#)|contribute(?:$|\?|#)|feedback(?:$|\?|#)|signin(?:$|\?|#)|dashboard(?:\/|$|\?|#))/.test(path)) return path
  const unprefixed = path.replace(/^\/fr(?=\/|$|\?|#)/, '')
  const base = unprefixed.startsWith('/') ? unprefixed : `/${unprefixed}`
  return locale === 'fr' ? `/fr${base.replace(/^\/(?=$|\?|#)/, '')}` : base
}
