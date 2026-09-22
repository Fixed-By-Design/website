<script setup lang="ts">
import { en, fr } from '@nuxt/ui/locale'
import { PROJECT } from '#shared/constants/project'

const { t, locale } = useSiteLocale()

useHead({
  titleTemplate: title => (title ? `${title} - ${PROJECT.name}` : PROJECT.name),
  htmlAttrs: { lang: locale, class: 'dark' },
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
const preferredLocale = useCookie('site_locale', { sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 })
watch(locale, value => (preferredLocale.value = value), { immediate: true })
useSchemaOrg([{ '@type': 'WebSite', 'description': () => t(PROJECT.description), 'inLanguage': locale }])

const localeHead = useLocaleHead({ seo: true })
useHead(() => ({ link: localeHead.value.link, meta: localeHead.value.meta }))
</script>

<template>
  <UApp :locale="locale === 'fr' ? fr : en">
    <NuxtLoadingIndicator color="#ebac22" />

    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gold-500 focus:px-4 focus:py-2 focus:font-medium focus:text-navy-950"
    >
      {{ t('Skip to content') }}
    </a>

    <SiteHeader :key="`header-${locale}`" />

    <UMain
      id="main-content"
      tabindex="-1"
    >
      <NuxtPage :page-key="route => route.path" />
    </UMain>

    <SiteFooter :key="`footer-${locale}`" />

    <ClientOnly>
      <LazySiteSearch :key="`search-${locale}`" />
    </ClientOnly>
  </UApp>
</template>
