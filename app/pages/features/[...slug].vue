<script setup lang="ts">
import { FEATURE_CATEGORY_LABELS, MOD_LABELS, type FeatureCategory, type FeatureStatus, type ModId } from '#shared/constants/features'
import { MOD_LINKS } from '#shared/constants/project'

const route = useRoute()

const { data: feature } = await useAsyncData(`feature-${route.path}`, () =>
  queryCollection('features').path(route.path).first())

if (!feature.value) {
  throw createError({ statusCode: 404, statusMessage: 'Feature not found', fatal: true })
}

const { data: related } = await useAsyncData(`feature-related-${route.path}`, () => {
  const slugs = feature.value?.related ?? []
  if (!slugs.length) return Promise.resolve([])
  return queryCollection('features')
    .select('path', 'title', 'summary', 'category', 'status', 'mod')
    .where('stem', 'IN', slugs.map(slug => `features/${slug}`))
    .all()
}, { default: () => [] })

const { data: sideLinks } = await useAsyncData(`feature-links-${route.path}`, async () => {
  const wikiPaths = feature.value?.wiki ?? []
  const decisionPaths = feature.value?.decisions ?? []

  const [wiki, decisions] = await Promise.all([
    wikiPaths.length
      ? queryCollection('wiki').select('path', 'title').where('path', 'IN', wikiPaths).all()
      : Promise.resolve([]),
    decisionPaths.length
      ? queryCollection('design').select('path', 'title').where('path', 'IN', decisionPaths).all()
      : Promise.resolve([]),
  ])

  return { wiki, decisions }
}, { default: () => ({ wiki: [], decisions: [] }) })

const modLinks = computed(() => MOD_LINKS[feature.value!.mod])

const breadcrumb = computed(() => [
  { label: 'Features', to: '/features' },
  { label: FEATURE_CATEGORY_LABELS[feature.value!.category as FeatureCategory], to: `/features?category=${feature.value!.category}` },
  { label: feature.value!.title },
])

useSeoMeta({
  title: feature.value.title,
  description: feature.value.summary,
  ogTitle: feature.value.title,
  ogDescription: feature.value.summary,
})
</script>

<template>
  <div v-if="feature">
    <div class="border-b border-[var(--ui-border)] bg-[var(--ui-bg-muted)]">
      <UContainer class="py-10">
        <UBreadcrumb
          :items="breadcrumb"
          class="mb-6"
        />

        <div class="flex flex-wrap items-center gap-2">
          <FeatureStatusBadge
            :status="feature.status as FeatureStatus"
            size="md"
          />
          <UBadge
            :label="MOD_LABELS[feature.mod as ModId]"
            color="neutral"
            variant="subtle"
            icon="i-lucide-package"
          />
          <UBadge
            v-if="feature.since"
            :label="`Since ${feature.since}`"
            color="neutral"
            variant="subtle"
            icon="i-lucide-tag"
          />
        </div>

        <h1 class="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ feature.title }}
        </h1>
        <p class="mt-4 max-w-3xl text-lg text-pretty text-[var(--ui-text-muted)]">
          {{ feature.summary }}
        </p>
      </UContainer>
    </div>

    <UContainer class="py-10">
      <UPage>
        <UPageBody>
          <SiteRedesignExample
            :title="`${feature.title}: the reasoning`"
            :vanilla="feature.vanilla"
            :problem="feature.problem"
            :solution="feature.solution"
          />

          <div class="mt-10">
            <ContentRenderer :value="feature" />
          </div>

          <section
            v-if="feature.details?.length"
            class="mt-12"
          >
            <h2 class="text-xl font-semibold">
              Details
            </h2>
            <dl class="mt-4 divide-y divide-[var(--ui-border)] rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)]">
              <div
                v-for="detail in feature.details"
                :key="detail.label"
                class="grid gap-1 p-4 sm:grid-cols-3 sm:gap-4"
              >
                <dt class="text-sm font-medium text-[var(--ui-text-dimmed)]">
                  {{ detail.label }}
                </dt>
                <dd class="text-sm text-[var(--ui-text-toned)] sm:col-span-2">
                  {{ detail.value }}
                </dd>
              </div>
            </dl>
          </section>

          <section
            v-if="related.length"
            class="mt-12"
          >
            <h2 class="text-xl font-semibold">
              Related systems
            </h2>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <FeatureCard
                v-for="item in related"
                :key="item.path"
                :path="item.path"
                :title="item.title"
                :summary="item.summary"
                :category="item.category as FeatureCategory"
                :status="item.status as FeatureStatus"
                :mod="item.mod as ModId"
              />
            </div>
          </section>

          <section class="mt-12 rounded-xl border border-[var(--ui-border)] p-6">
            <h2 class="text-lg font-semibold">
              Implementation
            </h2>
            <p class="mt-1 text-sm text-[var(--ui-text-dimmed)]">
              For contributors. Development happens on GitHub.
            </p>
            <div class="mt-4 flex flex-wrap gap-3">
              <UButton
                :to="modLinks?.github"
                target="_blank"
                rel="noopener"
                icon="i-simple-icons-github"
                color="neutral"
                variant="subtle"
                size="sm"
              >
                {{ MOD_LABELS[feature.mod as ModId] }} repository
              </UButton>
              <UButton
                v-if="feature.issue"
                :to="feature.issue.url"
                target="_blank"
                rel="noopener"
                icon="i-lucide-circle-dot"
                color="neutral"
                variant="subtle"
                size="sm"
              >
                Issue #{{ feature.issue.number }}
              </UButton>
              <UButton
                v-if="feature.pullRequest"
                :to="feature.pullRequest.url"
                target="_blank"
                rel="noopener"
                icon="i-lucide-git-pull-request"
                color="neutral"
                variant="subtle"
                size="sm"
              >
                PR #{{ feature.pullRequest.number }}
              </UButton>
            </div>
          </section>
        </UPageBody>

        <template #right>
          <UPageAside>
            <UContentToc
              v-if="feature.body?.toc?.links?.length"
              :links="feature.body.toc.links"
              highlight
            />

            <div
              v-if="sideLinks.wiki.length || sideLinks.decisions.length"
              class="mt-8 space-y-5 text-sm"
            >
              <div v-if="sideLinks.wiki.length">
                <p class="mb-2 font-semibold text-[var(--ui-text-highlighted)]">
                  In the wiki
                </p>
                <ul class="space-y-1.5">
                  <li
                    v-for="link in sideLinks.wiki"
                    :key="link.path"
                  >
                    <ULink
                      :to="link.path"
                      class="flex items-center gap-1.5 text-[var(--ui-text-muted)] hover:text-gold-400"
                    >
                      <UIcon
                        name="i-lucide-book-open"
                        class="size-3.5 shrink-0"
                      />
                      {{ link.title }}
                    </ULink>
                  </li>
                </ul>
              </div>

              <div v-if="sideLinks.decisions.length">
                <p class="mb-2 font-semibold text-[var(--ui-text-highlighted)]">
                  Design decisions
                </p>
                <ul class="space-y-1.5">
                  <li
                    v-for="link in sideLinks.decisions"
                    :key="link.path"
                  >
                    <ULink
                      :to="link.path"
                      class="flex items-start gap-1.5 text-[var(--ui-text-muted)] hover:text-gold-400"
                    >
                      <UIcon
                        name="i-lucide-scale"
                        class="mt-0.5 size-3.5 shrink-0"
                      />
                      {{ link.title }}
                    </ULink>
                  </li>
                </ul>
              </div>
            </div>
          </UPageAside>
        </template>
      </UPage>
    </UContainer>
  </div>
</template>
