<script setup lang="ts">
import { LINKS, PROJECT } from '#shared/constants/project'

const columns = useFooterNavigation()
const { discordUrl, hasDiscord } = useCommunityLinks()
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
              {{ PROJECT.description }} Built on Fabric for Minecraft {{ PROJECT.minecraftVersion }}.
            </p>
            <div class="flex gap-2">
              <UButton
                :to="LINKS.github"
                target="_blank"
                rel="noopener"
                icon="i-simple-icons-github"
                color="neutral"
                variant="subtle"
                size="sm"
                aria-label="GitHub"
              />
              <UButton
                :to="LINKS.modrinth"
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
                :to="discordUrl"
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
        &copy; {{ year }} Fixed by Design. Not affiliated with Mojang or Microsoft.
      </p>
    </template>

    <template #right>
      <p class="text-sm text-[var(--ui-text-dimmed)]">
        {{ PROJECT.modpackName }} {{ PROJECT.modpackVersion }} &middot; Minecraft {{ PROJECT.minecraftVersion }}
      </p>
    </template>
  </UFooter>
</template>
