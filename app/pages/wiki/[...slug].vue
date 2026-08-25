<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(`wiki-${route.path}`, () =>
  queryCollection('wiki').path(route.path).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Wiki page not found', fatal: true })
}

const { data: sections } = await useWikiNavigation()

const { data: surround } = await useAsyncData(`wiki-surround-${route.path}`, () =>
  queryCollectionItemSurroundings('wiki', route.path, { fields: ['title', 'description'] }))

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
})
</script>

<template>
  <SiteWikiLayout
    v-if="page"
    :page="page"
    :sections="sections"
    :surround="surround"
  >
    <ContentRenderer :value="page" />
  </SiteWikiLayout>
</template>
