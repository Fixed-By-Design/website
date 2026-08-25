<script setup lang="ts">
import { LINKS } from '#shared/constants/project'

const { data: releases } = await useAsyncData('changelog', () =>
  queryCollection('changelog').order('date', 'DESC').all(), { default: () => [] })

const formatter = new Intl.DateTimeFormat('en', { dateStyle: 'long' })

useSeoMeta({
  title: 'Changelog',
  description: 'Player-readable release notes for Fixed by Design, newest first.',
})
</script>

<template>
  <div>
    <div class="border-b border-[var(--ui-border)]">
      <UContainer>
        <UPageHeader
          title="Changelog"
          description="Player-readable release notes. Raw commits live on GitHub."
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
              :label="release.channel === 'stable' ? 'Stable' : 'Beta'"
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
            <UButton
              v-if="release.modrinth"
              :to="release.modrinth"
              target="_blank"
              rel="noopener"
              size="sm"
              icon="i-simple-icons-modrinth"
            >
              Download {{ release.version }}
            </UButton>
            <UButton
              v-if="release.github"
              :to="release.github"
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

          <div class="mt-8 grid gap-4 lg:grid-cols-3">
            <section
              v-if="release.highlights?.length"
              class="rounded-xl border border-gold-500/25 bg-gold-500/[0.05] p-5"
            >
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gold-400">
                Highlights
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
                Fixes
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
                Breaking changes
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
        title="No releases yet"
        description="Release notes appear here as versions ship."
      />

      <div class="mt-16 rounded-xl border border-[var(--ui-border)] p-6">
        <h2 class="font-semibold">
          Looking for the technical history?
        </h2>
        <p class="mt-2 text-sm text-[var(--ui-text-muted)]">
          Commits, pull requests and per-mod releases live on GitHub.
        </p>
        <UButton
          :to="LINKS.github"
          target="_blank"
          rel="noopener"
          color="neutral"
          variant="subtle"
          size="sm"
          icon="i-simple-icons-github"
          class="mt-4"
        >
          Fixed by Design on GitHub
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
