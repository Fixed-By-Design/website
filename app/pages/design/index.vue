<script setup lang="ts">
const { data: decisions } = await useAsyncData('design-index', () =>
  queryCollection('design').select('path', 'title', 'summary', 'decidedOn', 'systems').order('decidedOn', 'DESC').all(),
{ default: () => [] })

const formatter = new Intl.DateTimeFormat('en', { dateStyle: 'long' })

useSeoMeta({
  title: 'Design decisions',
  description: 'Published reasoning behind the changes Fixed by Design makes: the problem, the evidence, the constraints, the alternatives and the consequences.',
})
</script>

<template>
  <div>
    <div class="border-b border-[var(--ui-border)]">
      <UContainer>
        <UPageHeader
          title="Design decisions"
          description="Why a change was made, what else was considered, and what it cost. Published so players and contributors can argue with the reasoning, not just the result."
        />
      </UContainer>
    </div>

    <UContainer class="py-10">
      <div class="grid gap-4 md:grid-cols-2">
        <NuxtLink
          v-for="decision in decisions"
          :key="decision.path"
          :to="decision.path"
          class="group flex flex-col gap-3 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-6 transition-colors hover:border-gold-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
        >
          <time
            :datetime="decision.decidedOn"
            class="text-xs uppercase tracking-wider text-[var(--ui-text-dimmed)]"
          >
            {{ formatter.format(new Date(decision.decidedOn)) }}
          </time>
          <h2 class="text-lg font-semibold text-[var(--ui-text-highlighted)] group-hover:text-gold-400">
            {{ decision.title }}
          </h2>
          <p class="text-sm leading-relaxed text-[var(--ui-text-muted)]">
            {{ decision.summary }}
          </p>
          <div class="mt-auto flex flex-wrap gap-1.5 pt-2">
            <UBadge
              v-for="system in decision.systems"
              :key="system"
              :label="system"
              color="neutral"
              variant="soft"
              size="sm"
            />
          </div>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>
