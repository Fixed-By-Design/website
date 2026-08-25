<script setup lang="ts">
import type { PillarDefinition } from '#shared/constants/pillars'

defineProps<{ pillar: PillarDefinition }>()
</script>

<template>
  <NuxtLink
    :to="`/features?category=${pillar.category}`"
    class="group flex flex-col gap-3 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-6 transition-colors hover:border-gold-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
  >
    <div class="flex items-baseline justify-between gap-4">
      <h3 class="text-lg font-semibold text-[var(--ui-text-highlighted)]">
        {{ pillar.label }}
      </h3>
      <UIcon
        name="i-lucide-arrow-right"
        class="size-4 shrink-0 self-center text-[var(--ui-text-dimmed)] transition group-hover:translate-x-0.5 group-hover:text-gold-400"
      />
    </div>

    <p class="text-pretty text-[var(--ui-text-muted)]">
      {{ pillar.summary }}
    </p>

    <p class="mt-1 text-sm text-[var(--ui-text-dimmed)]">
      {{ pillar.examples.join(' · ') }}
    </p>
  </NuxtLink>
</template>
