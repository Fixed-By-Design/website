<script setup lang="ts">
import { FEATURE_CATEGORY_LABELS, MOD_LABELS, type FeatureCategory, type FeatureStatus, type ModId } from '#shared/constants/features'
import { MOD_LINKS } from '#shared/constants/project'

const { t, localPath, locale, collection } = useSiteLocale()

const route = useRoute()

const { data: feature } = await useAsyncData(`feature-${route.path}`, () =>
  queryCollection(collection('features')).path(route.path).first())

if (!feature.value) {
  throw createError({ statusCode: 404, statusMessage: t('Feature not found'), fatal: true })
}

const { data: related } = await useAsyncData(`feature-related-${route.path}`, () => {
  const slugs = feature.value?.related ?? []
  if (!slugs.length) return Promise.resolve([])
  return queryCollection(collection('features'))
    .select('path', 'title', 'summary', 'category', 'status', 'mod')
    .where('stem', 'IN', slugs.map(slug => `${locale.value === 'fr' ? 'fr/' : ''}features/${slug}`))
    .all()
}, { default: () => [] })

const { data: sideLinks } = await useAsyncData(`feature-links-${route.path}`, async () => {
  const wikiPaths = feature.value?.wiki ?? []
  const decisionPaths = feature.value?.decisions ?? []

  const [wiki, decisions] = await Promise.all([
    wikiPaths.length
      ? queryCollection(collection('wiki')).select('path', 'title').where('path', 'IN', wikiPaths.map(localPath)).all()
      : Promise.resolve([]),
    decisionPaths.length
      ? queryCollection(collection('design')).select('path', 'title').where('path', 'IN', decisionPaths.map(localPath)).all()
      : Promise.resolve([]),
  ])

  return { wiki, decisions }
}, { default: () => ({ wiki: [], decisions: [] }) })

const modLinks = computed(() => MOD_LINKS[feature.value!.mod])

const breadcrumb = computed(() => [
  { label: t('Features'), to: localPath('/features') },
  { label: t(FEATURE_CATEGORY_LABELS[feature.value!.category as FeatureCategory]), to: localPath(`/features?category=${feature.value!.category}`) },
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
            :label="t(MOD_LABELS[feature.mod as ModId])"
            color="neutral"
            variant="subtle"
          />
          <UBadge
            v-if="feature.since"
            :label="t('Since {version}', { version: feature.since })"
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
            :title="t('{title}: the reasoning', { title: feature.title })"
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
              {{ t('Details') }}
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
              {{ t('Related systems') }}
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
                  {{ t('How to use it') }}
                </h3>
                <ul class="mt-3 space-y-2">
                  <li
                    v-for="link in sideLinks.wiki"
                    :key="link.path"
                  >
                    <ULink
                      :to="localPath(link.path)"
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
                  {{ t('Why it works this way') }}
                </h3>
                <ul class="mt-3 space-y-2">
                  <li
                    v-for="link in sideLinks.decisions"
                    :key="link.path"
                  >
                    <ULink
                      :to="localPath(link.path)"
                      class="text-[var(--ui-text-muted)] underline-offset-2 hover:text-gold-400 hover:underline"
                    >
                      {{ link.title }}
                    </ULink>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section
            v-if="feature.credits?.length"
            class="mt-12 rounded-xl border border-gold-500/25 bg-gold-500/[0.05] p-6"
          >
            <h2 class="text-lg font-semibold text-[var(--ui-text-highlighted)]">
              {{ t('Built on the work of others') }}
            </h2>
            <p class="mt-1 text-sm text-[var(--ui-text-muted)]">
              {{ t('This system exists because someone else solved it first.') }}
            </p>

            <ul class="mt-5 space-y-5">
              <li
                v-for="entry in feature.credits"
                :key="entry.url"
              >
                <p class="flex flex-wrap items-baseline gap-x-2">
                  <ULink
                    :to="localPath(entry.url)"
                    target="_blank"
                    rel="noopener"
                    class="font-semibold text-gold-400 underline-offset-2 hover:underline"
                  >
                    {{ entry.name }}
                  </ULink>
                  <span class="text-sm text-[var(--ui-text-muted)]">{{ t('by') }} {{ entry.author }}</span>
                  <UBadge
                    v-if="entry.license"
                    :label="entry.license"
                    color="neutral"
                    variant="subtle"
                    size="sm"
                  />
                </p>
                <p class="mt-1.5 text-sm leading-relaxed text-[var(--ui-text-toned)]">
                  {{ entry.note }}
                </p>
              </li>
            </ul>
          </section>

          <section class="mt-12 rounded-xl border border-[var(--ui-border)] p-6">
            <h2 class="text-lg font-semibold">
              {{ t('Implementation') }}
            </h2>
            <p class="mt-1 text-sm text-[var(--ui-text-dimmed)]">
              {{ t('For contributors. Development happens on GitHub.') }}
            </p>
            <div class="mt-4 flex flex-wrap gap-3">
              <UButton
                :to="localPath(modLinks?.github)"
                target="_blank"
                rel="noopener"
                icon="i-simple-icons-github"
                color="neutral"
                variant="subtle"
                size="sm"
              >
                {{ t(MOD_LABELS[feature.mod as ModId]) }} {{ t('repository') }}
              </UButton>
              <UButton
                v-if="feature.issue"
                :to="localPath(feature.issue.url)"
                target="_blank"
                rel="noopener"
                icon="i-lucide-circle-dot"
                color="neutral"
                variant="subtle"
                size="sm"
              >
                {{ t('Issue #{number}', { number: feature.issue.number }) }}
              </UButton>
              <UButton
                v-if="feature.pullRequest"
                :to="localPath(feature.pullRequest.url)"
                target="_blank"
                rel="noopener"
                icon="i-lucide-git-pull-request"
                color="neutral"
                variant="subtle"
                size="sm"
              >
                {{ t('PR #{number}', { number: feature.pullRequest.number }) }}
              </UButton>
            </div>
          </section>

          <SiteFeedbackPrompt
            :subject="t('this change')"
            class="mt-12"
          />
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
