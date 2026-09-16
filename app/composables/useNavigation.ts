import type { FooterColumn, NavigationMenuItem } from '@nuxt/ui'
import { LINKS, MODPACK_AVAILABLE } from '#shared/constants/project'

export function usePrimaryNavigation() {
  const { t, localPath } = useSiteLocale()
  const route = useRoute()
  const startsWith = (prefix: string) => route.path.startsWith(localPath(prefix))

  return computed<NavigationMenuItem[]>(() => [
    { label: t('Features'), to: localPath('/features'), active: startsWith('/features') },
    { label: t('Wiki'), to: localPath('/wiki'), active: startsWith('/wiki') },
    { label: t('The modpack'), to: localPath('/modpack'), active: startsWith('/modpack') },
    {
      label: t('Project'),
      active: startsWith('/roadmap') || startsWith('/changelog') || startsWith('/design'),
      children: [
        { label: t('Roadmap'), description: t('What is coming next.'), to: localPath('/roadmap'), active: startsWith('/roadmap') },
        { label: t('Changelog'), description: t('What already shipped.'), to: localPath('/changelog'), active: startsWith('/changelog') },
        { label: t('Design decisions'), description: t('Why we chose this over the alternatives.'), to: localPath('/design'), active: startsWith('/design') },
      ],
    },
    { label: t('Contribute'), to: localPath('/contribute'), active: startsWith('/contribute') },
  ])
}

export function useFooterNavigation(): FooterColumn[] {
  const { t, localPath } = useSiteLocale()
  const { discordUrl, hasDiscord } = useCommunityLinks()

  return [
    {
      label: t('Project'),
      children: [
        { label: t('Features'), to: localPath('/features') },
        { label: t('Wiki'), to: localPath('/wiki') },
        { label: t('The modpack'), to: localPath('/modpack') },
        { label: t('Roadmap'), to: localPath('/roadmap') },
        { label: t('Changelog'), to: localPath('/changelog') },
        { label: t('Design decisions'), to: localPath('/design') },
      ],
    },
    {
      label: t('Participate'),
      children: [
        { label: t('Send feedback'), to: localPath('/feedback') },
        { label: t('Report a bug'), to: localPath('/feedback?type=bug') },
        { label: t('Contribute'), to: localPath('/contribute') },
        ...(hasDiscord ? [{ label: t('Discord'), to: discordUrl, target: '_blank' }] : []),
      ],
    },
    {
      label: t('Elsewhere'),
      children: [
        ...(MODPACK_AVAILABLE ? [{ label: t('Modrinth'), to: LINKS.modrinth, target: '_blank' }] : []),
        { label: t('GitHub'), to: LINKS.github, target: '_blank' },
        { label: t('Support the project'), to: LINKS.kofi, target: '_blank' },
      ],
    },
  ]
}
