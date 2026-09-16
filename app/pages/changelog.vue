<script setup lang="ts">
import { LINKS } from '#shared/constants/project'

const { t, localPath, locale, collection } = useSiteLocale()

const { data: releases } = await useAsyncData(`changelog-${locale.value}`, () =>
  queryCollection(collection('changelog')).order('date', 'DESC').all(), { default: () => [] })

const formatter = new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' })

useSeoMeta({
  title: t('Changelog'),
  description: t('Player-readable release notes for Fixed by Design, newest first.'),
})
</script>

<template>
  <div>
    <div class="border-b border-[var(--ui-border)]">
      <UContainer>
        <UPageHeader
          :title="t('Changelog')"
          :description="t('Player-readable release notes. Raw commits live on GitHub.')"
        />
      </UContainer>
    </div>

    <UContainer class="py-10">
      <div
        v-if="releases.length"
        class="space-y-12"
      >
        <article
          v-for="release in releases"
          :id="release.version"
          :key="release.path"
          class="scroll-mt-28"
        >
          <header class="flex flex-wrap items-center gap-3">
            <h2 class="text-2xl font-bold tracking-tight">
              {{ release.title }}
            </h2>
            <UBadge
              :label="t(release.channel === 'stable' ? 'Stable' : 'Beta')"
              :color="release.channel === 'stable' ? 'success' : 'warning'"
              variant="subtle"
              size="sm"
            />
            <UBadge
              :label="`Minecraft ${release.minecraft}`"
              color="neutral"
              variant="outline"
              size="sm"
            />
            <time
              :datetime="release.date"
              class="text-sm text-[var(--ui-text-dimmed)]"
            >
              {{ formatter.format(new Date(release.date)) }}
            </time>
          </header>

          <p class="mt-4 max-w-3xl text-lg text-pretty text-[var(--ui-text-muted)]">
            {{ release.summary }}
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <SiteDownloadButton
              v-if="release.modrinth"
              :label="t('Download {version}', { version: release.version })"
              size="sm"
            />
            <UButton
              v-if="release.github"
              :to="localPath(release.github)"
              target="_blank"
              rel="noopener"
              size="sm"
              color="neutral"
              variant="subtle"
              icon="i-simple-icons-github"
            >
              Source
            </UButton>
          </div>

          <div
            v-reveal.children="{ stagger: 0.08 }"
            class="mt-8 grid gap-4 lg:grid-cols-3"
          >
            <section
              v-if="release.highlights?.length"
              class="rounded-xl border border-gold-500/25 bg-gold-500/[0.05] p-5"
            >
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gold-400">
                {{ t('Highlights') }}
              </h3>
              <ul class="mt-3 space-y-2 text-sm text-[var(--ui-text-toned)]">
                <li
                  v-for="item in release.highlights"
                  :key="item"
                  class="border-s border-gold-500/30 ps-3"
                >
                  {{ item }}
                </li>
              </ul>
            </section>

            <section
              v-if="release.fixes?.length"
              class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5"
            >
              <h3 class="text-sm font-semibold uppercase tracking-wider text-[var(--ui-text-dimmed)]">
                {{ t('Fixes') }}
              </h3>
              <ul class="mt-3 space-y-2 text-sm text-[var(--ui-text-muted)]">
                <li
                  v-for="item in release.fixes"
                  :key="item"
                  class="border-s border-[var(--ui-border-accented)] ps-3"
                >
                  {{ item }}
                </li>
              </ul>
            </section>

            <section
              v-if="release.breaking?.length"
              class="rounded-xl border border-red-500/25 bg-red-500/[0.05] p-5"
            >
              <h3 class="text-sm font-semibold uppercase tracking-wider text-red-400">
                {{ t('Breaking changes') }}
              </h3>
              <ul class="mt-3 space-y-2 text-sm text-[var(--ui-text-toned)]">
                <li
                  v-for="item in release.breaking"
                  :key="item"
                  class="border-s border-red-500/40 ps-3"
                >
                  {{ item }}
                </li>
              </ul>
            </section>
          </div>

          <div class="mt-8">
            <ContentRenderer :value="release" />
          </div>
        </article>
      </div>

      <UEmpty
        v-else
        :title="t('No releases yet')"
        :description="t('Release notes appear here as versions ship.')"
      />

      <div class="mt-16 rounded-xl border border-[var(--ui-border)] p-6">
        <h2 class="font-semibold">
          {{ t('Looking for the technical history?') }}
        </h2>
        <p class="mt-2 text-sm text-[var(--ui-text-muted)]">
          {{ t('Commits, pull requests and per-mod releases live on GitHub.') }}
        </p>
        <UButton
          :to="localPath(LINKS.github)"
          target="_blank"
          rel="noopener"
          color="neutral"
          variant="subtle"
          size="sm"
          icon="i-simple-icons-github"
          class="mt-4"
        >
          {{ t('Fixed by Design on GitHub') }}
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
