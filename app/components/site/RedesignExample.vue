<script setup lang="ts">
defineProps<{
  title: string
  headingLevel?: 2 | 3
  vanilla: string
  problem: string
  solution: string
  to?: string
}>()
</script>

<template>
  <article class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] overflow-hidden">
    <header class="flex items-center justify-between gap-4 border-b border-[var(--ui-border)] px-6 py-4">
      <component
        :is="`h${headingLevel ?? 3}`"
        class="font-semibold text-[var(--ui-text-highlighted)]"
      >
        {{ title }}
      </component>
      <UButton
        v-if="to"
        :to="to"
        variant="link"
        color="primary"
        trailing-icon="i-lucide-arrow-right"
        size="sm"
      >
        Read more
      </UButton>
    </header>

    <dl class="grid divide-y divide-[var(--ui-border)] md:grid-cols-3 md:divide-x md:divide-y-0">
      <div class="p-6">
        <dt class="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-dimmed)]">
          Vanilla
        </dt>
        <dd class="text-sm leading-relaxed text-[var(--ui-text-muted)]">
          {{ vanilla }}
        </dd>
      </div>

      <div class="p-6">
        <dt class="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-dimmed)]">
          Problem
        </dt>
        <dd class="text-sm leading-relaxed text-[var(--ui-text-muted)]">
          {{ problem }}
        </dd>
      </div>

      <div class="bg-gold-500/[0.04] p-6">
        <dt class="mb-2 text-xs font-semibold uppercase tracking-wider text-gold-400">
          Fixed by Design
        </dt>
        <dd class="text-sm leading-relaxed text-[var(--ui-text-toned)]">
          {{ solution }}
        </dd>
      </div>
    </dl>
  </article>
</template>
