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
    <SiteHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <SiteFooter />

    <ClientOnly>
      <LazySiteSearch />
    </ClientOnly>
  </UApp>
</template>
