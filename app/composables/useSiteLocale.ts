import { localizedPath, translate } from '#shared/i18n/translate'

export function useSiteLocale() {
  const { locale } = useI18n()
  const t = (text: string, params?: Record<string, string | number>) => translate(locale.value, text, params)
  function localPath(path: string): string
  function localPath(path: string | undefined): string | undefined
  function localPath(path: string | undefined) {
    return path === undefined ? undefined : localizedPath(path, locale.value)
  }
  const collection = <T extends 'features' | 'wiki' | 'design' | 'changelog' | 'pages'>(name: T): T | `${T}_fr` =>
    locale.value === 'fr' ? `${name}_fr` : name
  return { locale, t, localPath, collection }
}
