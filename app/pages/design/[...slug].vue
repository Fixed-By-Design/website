<script setup lang="ts">
const { t, localPath, locale, collection } = useSiteLocale()
const route = useRoute()

const { data: decision } = await useAsyncData(`design-${route.path}`, () =>
  queryCollection(collection('design')).path(route.path).first())

if (!decision.value) {
  throw createError({ statusCode: 404, statusMessage: t('Design decision not found'), fatal: true })
}

const { data: features } = await useAsyncData(`design-features-${route.path}`, () => {
  const slugs = decision.value?.features ?? []
  if (!slugs.length) return Promise.resolve([])
  return queryCollection(collection('features'))
    .select('path', 'title', 'summary', 'category', 'status', 'mod')
    .where('stem', 'IN', slugs.map(slug => `${locale.value === 'fr' ? 'fr/' : ''}features/${slug}`))
    .all()
}, { default: () => [] })

const formatter = new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' })

useSeoMeta({
  title: decision.value.title,
  description: decision.value.summary,
  ogTitle: decision.value.title,
  ogDescription: decision.value.summary,
})
</script>

<template>
  <div v-if="decision">
    <div class="border-b border-[var(--ui-border)] bg-[var(--ui-bg-muted)]">
      <UContainer class="py-10">
        <UBreadcrumb
          :items="[{ label: t('Design decisions'), to: localPath('/design') }, { label: decision.title }]"
          class="mb-6"
        />
        <time
          :datetime="decision.decidedOn"
          class="text-xs uppercase tracking-wider text-[var(--ui-text-dimmed)]"
        >
          {{ t('Decided') }} {{ formatter.format(new Date(decision.decidedOn)) }}
        </time>
        <h1 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ decision.title }}
        </h1>
        <p class="mt-4 max-w-3xl text-lg text-pretty text-[var(--ui-text-muted)]">
          {{ decision.summary }}
        </p>
      </UContainer>
    </div>

    <UContainer class="py-10">
      <UPage>
        <UPageBody>
          <ContentRenderer :value="decision" />

          <section
            v-if="features.length"
            class="mt-12"
          >
            <h2 class="text-xl font-semibold">
              {{ t('What this shipped as') }}
            </h2>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <FeatureCard
                v-for="feature in features"
                :key="feature.path"
                :path="feature.path"
                :title="feature.title"
                :summary="feature.summary"
                :category="feature.category"
                :status="feature.status"
                :mod="feature.mod"
              />
            </div>
          </section>
        </UPageBody>

        <template #right>
          <UPageAside>
            <UContentToc
              v-if="decision.body?.toc?.links?.length"
              :links="decision.body.toc.links"
              highlight
            />
          </UPageAside>
        </template>
      </UPage>
    </UContainer>
  </div>
</template>
