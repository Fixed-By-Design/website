<script setup lang="ts">
import { LINKS, MODPACK_AVAILABLE, PROJECT } from '#shared/constants/project'

const { t, localPath } = useSiteLocale()

const columns = useFooterNavigation()
const { discordUrl, hasDiscord } = useCommunityLinks()
const { githubConfigured } = useAuthAvailability()
const { loggedIn } = useUserSession()
const year = new Date().getFullYear()
</script>

<template>
  <UFooter :ui="{ root: 'border-t border-[var(--ui-border)] bg-[var(--ui-bg-muted)]' }">
    <template #top>
      <UContainer>
        <div class="grid gap-10 py-12 lg:grid-cols-[1.4fr_2fr]">
          <div class="space-y-4">
            <SiteLogo :height="30" />
            <p class="max-w-sm text-sm text-[var(--ui-text-muted)]">
              {{ t(PROJECT.description) }} {{ t('Built on Fabric for Minecraft') }} {{ PROJECT.minecraftVersion }}.
            </p>
            <div class="flex gap-2">
              <UButton
                :to="localPath(LINKS.github)"
                target="_blank"
                rel="noopener"
                icon="i-simple-icons-github"
                color="neutral"
                variant="subtle"
                size="sm"
                aria-label="GitHub"
              />
              <UButton
                v-if="MODPACK_AVAILABLE"
                :to="localPath(LINKS.modrinth)"
                target="_blank"
                rel="noopener"
                icon="i-simple-icons-modrinth"
                color="neutral"
                variant="subtle"
                size="sm"
                aria-label="Modrinth"
              />
              <UButton
                v-if="hasDiscord"
                :to="localPath(discordUrl)"
                target="_blank"
                rel="noopener"
                icon="i-simple-icons-discord"
                color="neutral"
                variant="subtle"
                size="sm"
                aria-label="Discord"
              />
            </div>
          </div>

          <UFooterColumns :columns="columns" />
        </div>
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-[var(--ui-text-dimmed)]">
        &copy; {{ year }} {{ t('Fixed by Design. Not affiliated with Mojang or Microsoft.') }}
        <ULink
          v-if="!loggedIn"
          :to="localPath(githubConfigured ? '/auth/github' : '/signin')"
          :external="githubConfigured"
          class="ms-1 underline-offset-2 hover:text-gold-400 hover:underline"
        >
          {{ t('Maintainer sign-in') }}
        </ULink>
      </p>
    </template>

    <template #right>
      <p class="text-sm text-[var(--ui-text-dimmed)]">
        Minecraft {{ PROJECT.minecraftVersion }} &middot; Fabric {{ PROJECT.fabricLoaderVersion }}
      </p>
    </template>
  </UFooter>
</template>
