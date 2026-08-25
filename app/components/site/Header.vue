<script setup lang="ts">
import { LINKS } from '#shared/constants/project'

const links = usePrimaryNavigation()
</script>

<template>
  <UHeader
    :ui="{ root: 'bg-[var(--ui-bg)]/85 backdrop-blur border-b border-[var(--ui-border)]' }"
    mode="drawer"
  >
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-2"
        aria-label="Fixed by Design, home"
      >
        <SiteLogo :height="26" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="links"
      variant="link"
    />

    <template #right>
      <UContentSearchButton
        collapsed
        class="lg:hidden"
      />
      <UContentSearchButton
        :collapsed="false"
        class="hidden lg:flex w-40 shrink-0"
      />

      <UButton
        :to="LINKS.github"
        target="_blank"
        rel="noopener"
        color="neutral"
        variant="ghost"
        icon="i-simple-icons-github"
        aria-label="Fixed by Design on GitHub"
      />

      <SiteDownloadButton
        label="Download"
        class="hidden shrink-0 sm:inline-flex"
      />

      <SiteUserMenu />
    </template>

    <template #body>
      <UNavigationMenu
        :items="links"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-4" />

      <div class="flex flex-col gap-2">
        <SiteDownloadButton block />
        <UButton
          :to="LINKS.github"
          target="_blank"
          rel="noopener"
          color="neutral"
          variant="subtle"
          icon="i-simple-icons-github"
          block
        >
          View on GitHub
        </UButton>
      </div>
    </template>
  </UHeader>
</template>
