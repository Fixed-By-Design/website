import type { FooterColumn, NavigationMenuItem } from '@nuxt/ui'
import { LINKS, MODPACK_AVAILABLE } from '#shared/constants/project'

export function usePrimaryNavigation() {
  const route = useRoute()
  const startsWith = (prefix: string) => route.path.startsWith(prefix)

  return computed<NavigationMenuItem[]>(() => [
    { label: 'Features', to: '/features', active: startsWith('/features') },
    { label: 'Wiki', to: '/wiki', active: startsWith('/wiki') },
    { label: 'The modpack', to: '/modpack', active: startsWith('/modpack') },
    {
      label: 'Project',
      active: startsWith('/roadmap') || startsWith('/changelog') || startsWith('/design'),
      children: [
        { label: 'Roadmap', description: 'What is coming next.', to: '/roadmap', active: startsWith('/roadmap') },
        { label: 'Changelog', description: 'What already shipped.', to: '/changelog', active: startsWith('/changelog') },
        { label: 'Design decisions', description: 'Why we chose this over the alternatives.', to: '/design', active: startsWith('/design') },
      ],
    },
    { label: 'Contribute', to: '/contribute', active: startsWith('/contribute') },
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
        { label: 'The modpack', to: '/modpack' },
        { label: 'Roadmap', to: '/roadmap' },
        { label: 'Changelog', to: '/changelog' },
        { label: 'Design decisions', to: '/design' },
      ],
    },
    {
      label: 'Participate',
      children: [
        { label: 'Send feedback', to: '/feedback' },
        { label: 'Report a bug', to: '/feedback?type=bug' },
        { label: 'Contribute', to: '/contribute' },
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
