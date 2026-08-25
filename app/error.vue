<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

useHead({ htmlAttrs: { lang: 'en', class: 'dark' } })
</script>

<template>
  <UApp>
    <SiteHeader />

    <UMain>
      <UContainer class="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p class="font-mono text-6xl font-bold text-gold-500/40 tabular-nums">
          {{ error.statusCode }}
        </p>

        <h1 class="mt-6 text-3xl font-bold tracking-tight">
          {{ isNotFound ? 'That page does not exist' : 'Something went wrong' }}
        </h1>

        <p class="mt-4 max-w-md text-[var(--ui-text-muted)]">
          {{ isNotFound
            ? 'The page may have moved, or the link may be wrong. Try the features index or search.'
            : 'An unexpected error occurred. If it keeps happening, tell us about it.' }}
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UButton
            to="/"
            icon="i-lucide-home"
          >
            Back home
          </UButton>
          <UButton
            to="/features"
            color="neutral"
            variant="subtle"
          >
            Browse features
          </UButton>
          <UButton
            to="/wiki"
            color="neutral"
            variant="subtle"
          >
            Open the wiki
          </UButton>
        </div>
      </UContainer>
    </UMain>

    <SiteFooter />
  </UApp>
</template>
