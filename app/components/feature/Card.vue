<script setup lang="ts">
import { FEATURE_CATEGORY_LABELS, MOD_LABELS, type FeatureCategory, type FeatureStatus, type ModId } from '#shared/constants/features'

defineProps<{
  path: string
  title: string
  summary: string
  category: FeatureCategory
  status: FeatureStatus
  mod: ModId
}>()
</script>

<template>
  <NuxtLink
    :to="path"
    class="group flex h-full flex-col gap-3 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5 transition-colors hover:border-gold-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
  >
    <div class="flex items-start justify-between gap-3">
      <h3 class="font-semibold text-[var(--ui-text-highlighted)] group-hover:text-gold-400">
        {{ title }}
      </h3>
      <FeatureStatusBadge :status="status" />
    </div>

    <p class="text-sm leading-relaxed text-[var(--ui-text-muted)]">
      {{ summary }}
    </p>

    <div class="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs text-[var(--ui-text-dimmed)]">
      <span class="flex items-center gap-1">
        <UIcon name="i-lucide-folder" class="size-3" />
        {{ FEATURE_CATEGORY_LABELS[category] }}
      </span>
      <span class="flex items-center gap-1">
        <UIcon name="i-lucide-package" class="size-3" />
        {{ MOD_LABELS[mod] }}
      </span>
    </div>
  </NuxtLink>
</template>
