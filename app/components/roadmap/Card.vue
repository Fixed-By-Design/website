<script setup lang="ts">
import type { PublicRoadmapItem } from '#shared/types/roadmap'

const { t, localPath } = useSiteLocale()

defineProps<{ item: PublicRoadmapItem, muted?: boolean }>()
</script>

<template>
  <article
    :id="item.slug"
    class="scroll-mt-28 rounded-lg border border-[var(--ui-border)] p-4"
    :class="muted ? 'bg-transparent' : 'bg-[var(--ui-bg-muted)]'"
  >
    <div class="flex flex-wrap items-start justify-between gap-3">
      <h3 class="font-medium text-[var(--ui-text-highlighted)]">
        {{ item.title }}
      </h3>
      <RoadmapStatusBadge :status="item.status" />
    </div>

    <p class="mt-2 text-sm leading-relaxed text-[var(--ui-text-muted)]">
      {{ item.summary }}
    </p>

    <p class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--ui-text-dimmed)]">
      <span>{{ item.domain }}</span>
      <template v-if="item.problem">
        <span aria-hidden="true">&middot;</span>
        <span>{{ t('Problem #') }}{{ item.problem.publicId }}</span>
      </template>
      <template
        v-for="link in item.links"
        :key="link.url"
      >
        <span aria-hidden="true">&middot;</span>
        <ULink
          :to="localPath(link.url)"
          target="_blank"
          rel="noopener"
          class="text-[var(--ui-text-dimmed)] underline-offset-2 hover:text-gold-400 hover:underline"
        >
          {{ link.number ? t('Issue #{number}', { number: link.number }) : link.label }}
        </ULink>
      </template>
    </p>
  </article>
</template>
