export function useCommunityLinks() {
  const discordUrl = useRuntimeConfig().public.discordUrl

  return {
    discordUrl,
    hasDiscord: Boolean(discordUrl),
  }
}
