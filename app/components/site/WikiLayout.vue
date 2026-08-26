<script setup lang="ts">
import type { ContentNavigationItem, TocLink } from '@nuxt/content'
import { LINKS } from '#shared/constants/project'
import type { WikiNavigationSection } from '~/composables/useWikiNavigation'

const props = defineProps<{
  page: { title: string, section: string, stem: string, body?: { toc?: { links?: TocLink[] } } }
  sections: WikiNavigationSection[]
  surround?: ContentNavigationItem[] | null
  isRoot?: boolean
}>()

const breadcrumb = computed(() =>
  props.isRoot
    ? [{ label: 'Wiki', to: '/wiki' }]
    : [{ label: 'Wiki', to: '/wiki' }, { label: props.page.section }, { label: props.page.title }])

const editUrl = computed(() => `${LINKS.githubWebsite}/edit/dev/content/${props.page.stem}.md`)
</script>

<template>
  <UContainer class="py-10">
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

        <slot />

        <SiteFeedbackPrompt
          subject="this"
          class="mt-12"
        />

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
            class="underline-offset-2 hover:text-gold-400 hover:underline"
          >
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
