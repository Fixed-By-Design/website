<script setup lang="ts">
import type { PillarDefinition } from '#shared/constants/pillars'

defineProps<{ pillar: PillarDefinition }>()
</script>

<template>
  <NuxtLink
    :to="`/features?category=${pillar.category}`"
    class="group relative flex flex-col gap-4 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-6 transition-colors hover:border-gold-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
  >
    <div class="flex items-center gap-3">
      <span class="flex size-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400 ring-1 ring-gold-500/20">
        <UIcon
          :name="pillar.icon"
          class="size-5"
        />
      </span>
      <h3 class="text-lg font-semibold text-[var(--ui-text-highlighted)]">
        {{ pillar.label }}
      </h3>
    </div>

    <p class="text-sm leading-relaxed text-[var(--ui-text-muted)]">
      {{ pillar.summary }}
    </p>

    <ul class="flex flex-wrap gap-1.5">
      <li
        v-for="example in pillar.examples"
        :key="example"
      >
        <UBadge
          :label="example"
          color="neutral"
          variant="soft"
          size="sm"
        />
      </li>
    </ul>

    <div class="mt-auto flex items-center justify-between pt-2 text-sm">
      <span class="text-[var(--ui-text-dimmed)]">{{ pillar.mod }}</span>
      <span class="flex items-center gap-1 font-medium text-gold-400">
        Explore
        <UIcon
          name="i-lucide-arrow-right"
          class="size-4 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </div>
  </NuxtLink>
</template>
