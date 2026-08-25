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
      <UContainer
        v-intro.children="{ delay: 0.05, stagger: 0.07 }"
        class="py-10"
      >
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
          />
          <UBadge
            v-if="feature.since"
            :label="`Since ${feature.since}`"
            color="neutral"
            variant="subtle"
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
            v-reveal="{ y: 22 }"
            :heading-level="2"
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
            v-if="related.length || sideLinks.wiki.length || sideLinks.decisions.length"
            class="mt-12"
          >
            <h2 class="text-xl font-semibold">
              Related systems
            </h2>

            <div
              v-if="related.length"
              class="mt-4 grid gap-4 md:grid-cols-2"
            >
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

            <div
              v-if="sideLinks.wiki.length || sideLinks.decisions.length"
              class="mt-4 grid gap-4 sm:grid-cols-2"
            >
              <div
                v-if="sideLinks.wiki.length"
                class="rounded-xl border border-[var(--ui-border)] p-5"
              >
                <h3 class="text-sm font-semibold uppercase tracking-wider text-[var(--ui-text-dimmed)]">
                  How to use it
                </h3>
                <ul class="mt-3 space-y-2">
                  <li
                    v-for="link in sideLinks.wiki"
                    :key="link.path"
                  >
                    <ULink
                      :to="link.path"
                      class="text-[var(--ui-text-muted)] underline-offset-2 hover:text-gold-400 hover:underline"
                    >
                      {{ link.title }}
                    </ULink>
                  </li>
                </ul>
              </div>

              <div
                v-if="sideLinks.decisions.length"
                class="rounded-xl border border-[var(--ui-border)] p-5"
              >
                <h3 class="text-sm font-semibold uppercase tracking-wider text-[var(--ui-text-dimmed)]">
                  Why it works this way
                </h3>
                <ul class="mt-3 space-y-2">
                  <li
                    v-for="link in sideLinks.decisions"
                    :key="link.path"
                  >
                    <ULink
                      :to="link.path"
                      class="text-[var(--ui-text-muted)] underline-offset-2 hover:text-gold-400 hover:underline"
                    >
                      {{ link.title }}
                    </ULink>
                  </li>
                </ul>
              </div>
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
          </UPageAside>
        </template>
      </UPage>
    </UContainer>
  </div>
</template>
