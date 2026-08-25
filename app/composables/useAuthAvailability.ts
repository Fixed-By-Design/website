export function useAuthAvailability() {
  const configured = useState('github-oauth-configured', () => true)

  if (import.meta.server) {
    const oauth = useRuntimeConfig().oauth as { github?: { clientId?: string, clientSecret?: string } } | undefined
    configured.value = Boolean(oauth?.github?.clientId && oauth?.github?.clientSecret)
  }

  return { githubConfigured: readonly(configured) }
}
