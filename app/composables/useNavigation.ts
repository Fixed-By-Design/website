import type { FooterColumn, NavigationMenuItem } from '@nuxt/ui'
import { LINKS, MODPACK_AVAILABLE } from '#shared/constants/project'

export function usePrimaryNavigation() {
  const route = useRoute()

  return computed<NavigationMenuItem[]>(() => [
    { label: 'Features', to: '/features', active: route.path.startsWith('/features') },
    { label: 'Wiki', to: '/wiki', active: route.path.startsWith('/wiki') },
    { label: 'Roadmap', to: '/roadmap', active: route.path.startsWith('/roadmap') },
    { label: 'Changelog', to: '/changelog', active: route.path.startsWith('/changelog') },
    { label: 'Contribute', to: '/contribute', active: route.path.startsWith('/contribute') },
  ])
}

export function useFooterNavigation(): FooterColumn[] {
  const { discordUrl, hasDiscord } = useCommunityLinks()

  return [
    {
      label: 'Project',
      children: [
        { label: 'Features', to: '/features' },
        { label: 'Wiki', to: '/wiki' },
        { label: 'Roadmap', to: '/roadmap' },
        { label: 'Changelog', to: '/changelog' },
        { label: 'Design decisions', to: '/design' },
        { label: 'The modpack', to: '/modpack' },
      ],
    },
    {
      label: 'Participate',
      children: [
        { label: 'Contribute', to: '/contribute' },
        { label: 'Send feedback', to: '/feedback' },
        { label: 'Report a bug', to: '/feedback?type=bug' },
        ...(hasDiscord ? [{ label: 'Discord', to: discordUrl, target: '_blank' }] : []),
      ],
    },
    {
      label: 'Elsewhere',
      children: [
        ...(MODPACK_AVAILABLE ? [{ label: 'Modrinth', to: LINKS.modrinth, target: '_blank' }] : []),
        { label: 'GitHub', to: LINKS.github, target: '_blank' },
        { label: 'Support the project', to: LINKS.kofi, target: '_blank' },
      ],
    },
  ]
}
