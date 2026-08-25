<script setup lang="ts">
const { data: page } = await useAsyncData('wiki-overview', () =>
  queryCollection('wiki').path('/wiki').first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Wiki overview not found', fatal: true })
}

const { data: sections } = await useWikiNavigation()

const contents = computed(() => sections.value.filter(section => section.items.some(item => item.path !== '/wiki')))

useSeoMeta({
  title: 'Wiki',
  description: page.value.description,
  ogTitle: 'Fixed by Design wiki',
  ogDescription: page.value.description,
})
</script>

<template>
  <SiteWikiLayout
    v-if="page"
    :page="page"
    :sections="sections"
    is-root
  >
    <ContentRenderer :value="page" />

    <section class="mt-12">
      <h2 class="text-xl font-semibold">
        Everything in this wiki
      </h2>

      <div
        v-for="section in contents"
        :key="section.label"
        class="mt-6"
      >
        <h3 class="text-sm font-semibold uppercase tracking-wider text-gold-400">
          {{ section.label }}
        </h3>
        <ul
          v-reveal.children="{ stagger: 0.04, y: 12 }"
          class="mt-3 space-y-3"
        >
          <li
            v-for="item in section.items.filter(entry => entry.path !== '/wiki')"
            :key="item.path"
          >
            <ULink
              :to="item.path"
              class="font-medium text-[var(--ui-text-highlighted)] underline-offset-2 hover:text-gold-400 hover:underline"
            >
              {{ item.title }}
            </ULink>
            <p class="mt-0.5 text-sm text-[var(--ui-text-muted)]">
              {{ item.description }}
            </p>
          </li>
        </ul>
      </div>
    </section>
  </SiteWikiLayout>
</template>
