<script setup lang="ts">
defineProps<{
  title: string
  vanilla: string
  problem: string
  solution: string
  to?: string
}>()
</script>

<template>
  <article class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] overflow-hidden">
    <header class="flex items-center justify-between gap-4 border-b border-[var(--ui-border)] px-6 py-4">
      <h3 class="font-semibold text-[var(--ui-text-highlighted)]">
        {{ title }}
      </h3>
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
        <dt class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-dimmed)]">
          <UIcon
            name="i-lucide-box"
            class="size-3.5"
          />
          Vanilla
        </dt>
        <dd class="text-sm leading-relaxed text-[var(--ui-text-muted)]">
          {{ vanilla }}
        </dd>
      </div>

      <div class="p-6">
        <dt class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-dimmed)]">
          <UIcon
            name="i-lucide-triangle-alert"
            class="size-3.5"
          />
          Problem
        </dt>
        <dd class="text-sm leading-relaxed text-[var(--ui-text-muted)]">
          {{ problem }}
        </dd>
      </div>

      <div class="bg-gold-500/[0.04] p-6">
        <dt class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400">
          <UIcon
            name="i-lucide-wrench"
            class="size-3.5"
          />
          Fixed by Design
        </dt>
        <dd class="text-sm leading-relaxed text-[var(--ui-text-toned)]">
          {{ solution }}
        </dd>
      </div>
    </dl>
  </article>
</template>
