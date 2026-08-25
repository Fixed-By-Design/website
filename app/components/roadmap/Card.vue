<script setup lang="ts">
import type { PublicRoadmapItem } from '#shared/types/roadmap'

defineProps<{ item: PublicRoadmapItem, showStatus?: boolean }>()

const formatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })
</script>

<template>
  <article :id="item.slug" class="scroll-mt-28 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5">
    <div class="flex flex-wrap items-center gap-2">
      <RoadmapStatusBadge v-if="showStatus" :status="item.status" />
      <UBadge :label="item.domain" color="neutral" variant="soft" size="sm" />
      <UBadge v-if="item.targetVersion" :label="item.targetVersion" color="neutral" variant="outline" size="sm" icon="i-lucide-tag" />
    </div>

    <h3 class="mt-3 font-semibold text-[var(--ui-text-highlighted)]">
      {{ item.title }}
    </h3>
    <p class="mt-2 text-sm leading-relaxed text-[var(--ui-text-muted)]">
      {{ item.summary }}
    </p>

    <div v-if="item.problem || item.links.length" class="mt-4 flex flex-wrap gap-3 text-sm">
      <span v-if="item.problem" class="flex items-center gap-1.5 text-[var(--ui-text-dimmed)]">
        <UIcon name="i-lucide-target" class="size-3.5" />
        Problem #{{ item.problem.publicId }}
      </span>
      <ULink
        v-for="link in item.links"
        :key="link.url"
        :to="link.url"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-1.5 text-[var(--ui-text-dimmed)] hover:text-gold-400"
      >
        <UIcon name="i-simple-icons-github" class="size-3.5" />
        {{ link.number ? `#${link.number}` : link.label }}
      </ULink>
    </div>

    <p class="mt-4 text-xs text-[var(--ui-text-dimmed)]">
      Updated {{ formatter.format(new Date(item.updatedAt)) }}
    </p>
  </article>
</template>
