<script setup lang="ts">
import { LINKS } from '#shared/constants/project'

const route = useRoute()

const { data: page } = await useAsyncData(`wiki-${route.path}`, () =>
  queryCollection('wiki').path(route.path).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Wiki page not found', fatal: true })
}

const { data: sections } = await useWikiNavigation()

const { data: surround } = await useAsyncData(`wiki-surround-${route.path}`, () =>
  queryCollectionItemSurroundings('wiki', route.path, { fields: ['title', 'description'] }))

const breadcrumb = computed(() => [
  { label: 'Wiki', to: '/wiki' },
  { label: page.value!.section },
  { label: page.value!.title },
])

const editUrl = computed(() =>
  `${LINKS.githubWebsite}/edit/dev/content/${page.value?.stem}.md`)

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
})
</script>

<template>
  <UContainer
    v-if="page"
    class="py-10"
  >
    <UPage>
      <template #left>
        <UPageAside>
          <SiteWikiSidebar :sections="sections" />
        </UPageAside>
      </template>

      <UPageBody>
        <UBreadcrumb
          :items="breadcrumb"
          class="mb-6"
        />

        <ContentRenderer :value="page" />

        <USeparator class="my-10" />

        <UContentSurround
          v-if="surround"
          :surround="surround"
        />

        <p class="mt-8 text-sm text-[var(--ui-text-dimmed)]">
          <ULink
            :to="editUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 hover:text-gold-400"
          >
            <UIcon
              name="i-lucide-pencil"
              class="size-3.5"
            />
            Edit this page on GitHub
          </ULink>
        </p>
      </UPageBody>

      <template #right>
        <UPageAside>
          <UContentToc
            v-if="page.body?.toc?.links?.length"
            :links="page.body.toc.links"
            highlight
          />
        </UPageAside>
      </template>
    </UPage>
  </UContainer>
</template>
