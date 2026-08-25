<script setup lang="ts">
import type { PublicRoadmapItem } from '#shared/types/roadmap'

const { data: items } = await useFetch<PublicRoadmapItem[]>('/api/roadmap', { default: () => [] })

const milestones = computed(() => buildRoadmapTimeline(items.value))
const rejected = computed(() => items.value.filter(item => item.status === 'rejected'))

useSeoMeta({
  title: 'Roadmap',
  description: 'What Fixed by Design is building next, what is being explored, and what has already shipped.',
})
</script>

<template>
  <div>
    <div class="border-b border-[var(--ui-border)]">
      <UContainer>
        <UPageHeader
          title="Roadmap"
          description="Product and game design initiatives, in the order we expect to reach them. Development tasks live on GitHub."
        />
      </UContainer>
    </div>

    <UContainer class="py-10">
      <ol
        v-if="milestones.length"
        class="space-y-10 border-s border-[var(--ui-border)] ps-6 sm:ps-8"
      >
        <li
          v-for="milestone in milestones"
          :key="milestone.id"
          class="relative"
        >
          <span
            class="absolute -start-6 top-2 size-2.5 rounded-full ring-4 ring-[var(--ui-bg)] sm:-start-8"
            :class="milestone.shipped ? 'bg-[var(--ui-border-accented)]' : 'bg-gold-500'"
            aria-hidden="true"
          />

          <header class="mb-4">
            <p
              class="text-xs font-semibold uppercase tracking-wider"
              :class="milestone.shipped ? 'text-[var(--ui-text-dimmed)]' : 'text-gold-400'"
            >
              {{ milestone.horizon }}
            </p>
            <h2 class="mt-1 text-xl font-semibold text-[var(--ui-text-highlighted)]">
              {{ milestone.version ? `Version ${milestone.version}` : 'Unscheduled' }}
            </h2>
            <p class="mt-1 text-sm text-[var(--ui-text-muted)]">
              {{ milestone.description }}
            </p>
          </header>

          <div class="grid gap-3 lg:grid-cols-2">
            <RoadmapCard
              v-for="item in milestone.items"
              :key="item.slug"
              :item="item"
              :muted="milestone.shipped"
            />
          </div>
        </li>
      </ol>

      <UEmpty
        v-else
        class="mt-16"
        title="Nothing on the roadmap"
        description="Initiatives appear here as they are picked up."
      />

      <section
        v-if="rejected.length"
        class="mt-16 border-t border-[var(--ui-border)] pt-10"
      >
        <h2 class="text-sm font-semibold uppercase tracking-wider text-[var(--ui-text-dimmed)]">
          Not planned
        </h2>
        <p class="mt-2 max-w-2xl text-sm text-[var(--ui-text-muted)]">
          Considered and turned down. Kept public so the reasoning is not lost.
        </p>
        <div class="mt-4 grid gap-3 lg:grid-cols-2">
          <RoadmapCard
            v-for="item in rejected"
            :key="item.slug"
            :item="item"
            muted
          />
        </div>
      </section>
    </UContainer>
  </div>
</template>
