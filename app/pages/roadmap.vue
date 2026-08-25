<script setup lang="ts">
import { ROADMAP_BOARD_STATUSES, ROADMAP_STATUS_LABELS, type RoadmapStatus } from '#shared/constants/workflow'
import type { PublicRoadmapItem } from '#shared/types/roadmap'

const { data: items } = await useFetch<PublicRoadmapItem[]>('/api/roadmap', { default: () => [] })

const domain = ref('all')

const domains = computed(() => [
  { label: 'All systems', value: 'all' },
  ...[...new Set(items.value.map(item => item.domain))].sort().map(value => ({ label: value, value })),
])

const filtered = computed(() =>
  domain.value === 'all' ? items.value : items.value.filter(item => item.domain === domain.value))

const columns = computed(() =>
  ROADMAP_BOARD_STATUSES.map(status => ({
    status,
    label: ROADMAP_STATUS_LABELS[status],
    items: filtered.value.filter(item => item.status === status),
  })))

const rejected = computed(() => filtered.value.filter(item => item.status === 'rejected'))

useSeoMeta({
  title: 'Roadmap',
  description: 'The public roadmap for Fixed by Design: what is being explored, designed, built, playtested and released.',
})
</script>

<template>
  <div>
    <UPageHeader
      title="Roadmap"
      description="Product and game design initiatives, not every technical task. Development work lives on GitHub."
      :ui="{ root: 'border-b border-[var(--ui-border)]' }"
    />

    <UContainer class="py-10">
      <div class="flex flex-wrap items-center gap-3">
        <USelect v-model="domain" :items="domains" class="w-52" aria-label="Filter by system" />
        <p class="text-sm text-[var(--ui-text-dimmed)]">
          {{ filtered.length }} {{ filtered.length === 1 ? 'initiative' : 'initiatives' }}
        </p>
      </div>

      <div class="mt-8 hidden gap-4 xl:grid xl:grid-cols-6">
        <section v-for="column in columns" :key="column.status" class="min-w-0">
          <div class="mb-3 flex items-center justify-between gap-2 border-b border-[var(--ui-border)] pb-2">
            <h2 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">
              {{ column.label }}
            </h2>
            <span class="text-xs tabular-nums text-[var(--ui-text-dimmed)]">{{ column.items.length }}</span>
          </div>
          <div class="space-y-3">
            <RoadmapCard v-for="item in column.items" :key="item.slug" :item="item" />
            <p v-if="!column.items.length" class="rounded-lg border border-dashed border-[var(--ui-border)] p-4 text-center text-xs text-[var(--ui-text-dimmed)]">
              Nothing here
            </p>
          </div>
        </section>
      </div>

      <div class="mt-8 space-y-8 xl:hidden">
        <section v-for="column in columns.filter(c => c.items.length)" :key="column.status">
          <h2 class="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-400">
            {{ column.label }}
            <span class="text-xs tabular-nums text-[var(--ui-text-dimmed)]">{{ column.items.length }}</span>
          </h2>
          <div class="grid gap-3 md:grid-cols-2">
            <RoadmapCard v-for="item in column.items" :key="item.slug" :item="item" />
          </div>
        </section>
      </div>

      <section v-if="rejected.length" class="mt-12">
        <h2 class="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ui-text-dimmed)]">
          Rejected
        </h2>
        <p class="mb-4 max-w-2xl text-sm text-[var(--ui-text-muted)]">
          Ideas that were considered and turned down. Kept public so the reasoning is not lost.
        </p>
        <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <RoadmapCard v-for="item in rejected" :key="item.slug" :item="item" show-status />
        </div>
      </section>
    </UContainer>
  </div>
</template>
