<script setup lang="ts">
import { en, fr } from '@nuxt/ui/locale'
import type { NuxtError } from '#app'

const { t, localPath, locale } = useSiteLocale()

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

useHead({ htmlAttrs: { lang: locale, class: 'dark' } })
</script>

<template>
  <UApp :locale="locale === 'fr' ? fr : en">
    <SiteHeader />

    <UMain>
      <UContainer class="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p class="font-mono text-6xl font-bold text-gold-500/40 tabular-nums">
          {{ error.statusCode }}
        </p>

        <h1 class="mt-6 text-3xl font-bold tracking-tight">
          {{ isNotFound ? t('That page does not exist') : t('Something went wrong') }}
        </h1>

        <p class="mt-4 max-w-md text-[var(--ui-text-muted)]">
          {{ isNotFound
            ? t('The page may have moved, or the link may be wrong. Try the features index or search.')
            : t('An unexpected error occurred. If it keeps happening, tell us about it.') }}
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UButton
            :to="localPath('/')"
            icon="i-lucide-home"
          >
            {{ t('Back home') }}
          </UButton>
          <UButton
            :to="localPath('/features')"
            color="neutral"
            variant="subtle"
          >
            {{ t('Browse features') }}
          </UButton>
          <UButton
            :to="localPath('/wiki')"
            color="neutral"
            variant="subtle"
          >
            {{ t('Open the wiki') }}
          </UButton>
        </div>
      </UContainer>
    </UMain>

    <SiteFooter />
  </UApp>
</template>
