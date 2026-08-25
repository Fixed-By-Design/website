<script setup lang="ts">
import { PROJECT } from '#shared/constants/project'

const { data: navigation } = await useAsyncData('wiki-navigation', () => queryCollectionNavigation('wiki'), {
  default: () => [],
})
provide('wiki-navigation', navigation)

useHead({
  titleTemplate: title => (title ? `${title} - ${PROJECT.name}` : PROJECT.name),
  htmlAttrs: { lang: 'en', class: 'dark' },
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
    { rel: 'icon', type: 'image/png', href: '/favicon-32.png', sizes: '32x32' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  ],
})

useSeoMeta({
  ogSiteName: PROJECT.name,
  ogType: 'website',
  ogImage: '/brand/og-default.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: 'Fixed by Design',
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="#ebac22" />

    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gold-500 focus:px-4 focus:py-2 focus:font-medium focus:text-navy-950"
    >
      Skip to content
    </a>

    <SiteHeader />

    <UMain
      id="main-content"
      tabindex="-1"
    >
      <NuxtPage />
    </UMain>

    <SiteFooter />

    <ClientOnly>
      <LazySiteSearch />
    </ClientOnly>
  </UApp>
</template>
