<script setup lang="ts">
import { LINKS, PROJECT } from '#shared/constants/project'

const { data: page } = await useAsyncData('modpack', () => queryCollection('pages').path('/pages/modpack').first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <div v-if="page">
    <div class="border-b border-[var(--ui-border)]">
      <UContainer>
        <UPageHeader
          :title="page.title"
          :description="page.description"
        >
          <template #links>
            <UButton
              :to="LINKS.modrinth"
              target="_blank"
              rel="noopener"
              icon="i-simple-icons-modrinth"
            >
              Download {{ PROJECT.modpackVersion }}
            </UButton>
          </template>
        </UPageHeader>
      </UContainer>
    </div>

    <UContainer class="py-10">
      <UPage>
        <UPageBody>
          <ContentRenderer :value="page" />
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
  </div>
</template>
