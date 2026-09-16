<script setup lang="ts">
import { PROBLEM_STATUSES, PROBLEM_STATUS_LABELS, type ProblemStatus } from '#shared/constants/workflow'
import type { ProblemSummary } from '#shared/types/dashboard'

const { t, localPath, locale } = useSiteLocale()

definePageMeta({ middleware: 'auth' })

const { data: problems } = await useFetch<ProblemSummary[]>('/api/dashboard/problems', { default: () => [] })

const status = ref('all')

const statusOptions = [
  { label: t('All statuses'), value: 'all' },
  ...PROBLEM_STATUSES.map(value => ({ label: t(PROBLEM_STATUS_LABELS[value]), value })),
]

const filtered = computed(() =>
  status.value === 'all' ? problems.value : problems.value.filter(problem => problem.status === status.value))

const statusColor: Record<ProblemStatus, 'primary' | 'info' | 'warning' | 'success' | 'error' | 'neutral'> = {
  investigating: 'neutral',
  confirmed: 'warning',
  designing: 'primary',
  accepted: 'info',
  rejected: 'error',
  solved: 'success',
}

const severityColor = { low: 'neutral', medium: 'info', high: 'warning', critical: 'error' } as const

const formatter = new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium' })

useSeoMeta({ title: t('Problems'), robots: 'noindex' })
</script>

<template>
  <UContainer class="py-10">
    <UBreadcrumb
      :items="[{ label: t('Dashboard'), to: localPath('/dashboard') }, { label: t('Problems') }]"
      class="mb-6"
    />

    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          {{ t('Problems') }}
        </h1>
        <p class="mt-2 max-w-2xl text-[var(--ui-text-muted)]">
          {{ t('A problem is a structured design problem observed through playtesting or feedback. Many feedback entries can point at one problem. One problem is never one feedback entry.') }}
        </p>
      </div>
      <UButton
        :to="localPath('/dashboard/feedback')"
        color="neutral"
        variant="subtle"
        icon="i-lucide-inbox"
      >
        {{ t('Feedback triage') }}
      </UButton>
    </div>

    <div class="mt-6 flex flex-wrap items-center gap-3">
      <USelect
        v-model="status"
        :items="statusOptions"
        class="w-52"
        :aria-label="t('Filter by status')"
      />
      <p class="text-sm text-[var(--ui-text-dimmed)]">
        {{ filtered.length }} {{ filtered.length === 1 ? t('problem') : t('problems') }}
      </p>
    </div>

    <div
      v-if="filtered.length"
      class="mt-8 space-y-4"
    >
      <article
        v-for="problem in filtered"
        :key="problem.id"
        class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5"
      >
        <header class="flex flex-wrap items-center gap-2">
          <span class="font-mono text-sm text-[var(--ui-text-dimmed)]">#{{ problem.publicId }}</span>
          <UBadge
            :label="t(PROBLEM_STATUS_LABELS[problem.status])"
            :color="statusColor[problem.status]"
            variant="subtle"
            size="sm"
          />
          <UBadge
            v-if="problem.severity"
            :label="t(problem.severity)"
            :color="severityColor[problem.severity]"
            variant="outline"
            size="sm"
            icon="i-lucide-alert-triangle"
          />
          <UBadge
            :label="t('{count} linked', { count: problem.feedbackCount })"
            color="neutral"
            variant="soft"
            size="sm"
            icon="i-lucide-message-square"
          />
          <time
            :datetime="problem.updatedAt"
            class="ms-auto text-xs text-[var(--ui-text-dimmed)]"
          >
            {{ t('Updated') }} {{ formatter.format(new Date(problem.updatedAt)) }}
          </time>
        </header>

        <h2 class="mt-3 font-semibold text-[var(--ui-text-highlighted)]">
          {{ problem.title }}
        </h2>
        <p class="mt-2 leading-relaxed text-[var(--ui-text-muted)]">
          {{ problem.summary }}
        </p>

        <div
          v-if="problem.affectedSystems.length"
          class="mt-4 flex flex-wrap gap-1.5"
        >
          <UBadge
            v-for="system in problem.affectedSystems"
            :key="system"
            :label="system"
            color="neutral"
            variant="soft"
            size="sm"
          />
        </div>
      </article>
    </div>

    <UEmpty
      v-else
      class="mt-16"
      icon="i-lucide-target"
      :title="t('No problems')"
      :description="t('Nothing matches that status. Problems are created from the feedback inbox.')"
    >
      <template #actions>
        <UButton
          :to="localPath('/dashboard/feedback')"
          color="neutral"
          variant="subtle"
        >
          {{ t('Open the inbox') }}
        </UButton>
      </template>
    </UEmpty>
  </UContainer>
</template>
