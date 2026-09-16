<script setup lang="ts">
import { FEEDBACK_STATUS_LABELS, FEEDBACK_TYPE_LABELS } from '#shared/constants/workflow'
import type { FeedbackEntry } from '#shared/types/dashboard'

const { t, locale } = useSiteLocale()

defineProps<{ entry: FeedbackEntry, pending?: boolean }>()

const emit = defineEmits<{
  triage: [action: 'dismiss' | 'archive' | 'reopen' | 'detach-problem']
  attach: []
  createProblem: []
  markDuplicate: []
}>()

const formatter = new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium', timeStyle: 'short' })

const statusColor: Record<string, 'primary' | 'success' | 'neutral' | 'warning'> = {
  new: 'primary',
  triaged: 'success',
  archived: 'neutral',
  dismissed: 'neutral',
  duplicate: 'warning',
}

function coordinates(entry: FeedbackEntry) {
  if (entry.x === null || entry.y === null || entry.z === null) return null
  return `${entry.x.toFixed(1)}, ${entry.y.toFixed(1)}, ${entry.z.toFixed(1)}`
}
</script>

<template>
  <article class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5">
    <header class="flex flex-wrap items-center gap-2">
      <UBadge
        :label="t(FEEDBACK_STATUS_LABELS[entry.status])"
        :color="statusColor[entry.status] ?? 'neutral'"
        variant="subtle"
        size="sm"
      />
      <UBadge
        :label="t(FEEDBACK_TYPE_LABELS[entry.type])"
        color="neutral"
        variant="soft"
        size="sm"
      />
      <UBadge
        :label="entry.source === 'minecraft' ? t('In game') : t('Website')"
        :icon="entry.source === 'minecraft' ? 'i-lucide-gamepad-2' : 'i-lucide-globe'"
        color="neutral"
        variant="outline"
        size="sm"
      />
      <UBadge
        v-if="entry.version"
        :label="entry.version"
        color="neutral"
        variant="outline"
        size="sm"
      />
      <time
        :datetime="entry.createdAt"
        class="ms-auto text-xs text-[var(--ui-text-dimmed)]"
      >
        {{ formatter.format(new Date(entry.createdAt)) }}
      </time>
    </header>

    <p class="mt-4 whitespace-pre-line leading-relaxed text-[var(--ui-text-toned)]">
      {{ entry.message }}
    </p>

    <dl class="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[var(--ui-text-dimmed)]">
      <div
        v-if="entry.playerName"
        class="flex gap-1.5"
      >
        <dt class="sr-only">
          {{ t('Player') }}
        </dt>
        <UIcon
          name="i-lucide-user"
          class="size-3.5"
        />
        <dd>{{ entry.playerName }}</dd>
      </div>
      <div
        v-if="entry.dimension"
        class="flex gap-1.5"
      >
        <dt class="sr-only">
          Dimension
        </dt>
        <UIcon
          name="i-lucide-layers"
          class="size-3.5"
        />
        <dd>{{ entry.dimension.replace('minecraft:', '') }}</dd>
      </div>
      <div
        v-if="coordinates(entry)"
        class="flex gap-1.5"
      >
        <dt class="sr-only">
          {{ t('Coordinates') }}
        </dt>
        <UIcon
          name="i-lucide-map-pin"
          class="size-3.5"
        />
        <dd class="tabular-nums">
          {{ coordinates(entry) }}
        </dd>
      </div>
    </dl>

    <div
      v-if="entry.tags.length"
      class="mt-3 flex flex-wrap gap-1.5"
    >
      <UBadge
        v-for="tag in entry.tags"
        :key="tag.slug"
        :label="t(tag.label)"
        color="neutral"
        variant="soft"
        size="sm"
      />
    </div>

    <div
      v-if="entry.problem"
      class="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-gold-500/25 bg-gold-500/[0.06] px-3 py-2 text-sm"
    >
      <UIcon
        name="i-lucide-target"
        class="size-4 shrink-0 text-gold-400"
      />
      <span class="text-[var(--ui-text-toned)]">
        {{ t('Problem #') }}{{ entry.problem.publicId }}: {{ entry.problem.title }}
      </span>
      <UButton
        size="xs"
        color="neutral"
        variant="ghost"
        class="ms-auto"
        :loading="pending"
        @click="emit('triage', 'detach-problem')"
      >
        {{ t('Detach') }}
      </UButton>
    </div>

    <footer class="mt-4 flex flex-wrap gap-2 border-t border-[var(--ui-border)] pt-4">
      <template v-if="entry.status === 'new'">
        <UButton
          size="sm"
          icon="i-lucide-link"
          :loading="pending"
          @click="emit('attach')"
        >
          {{ t('Attach to problem') }}
        </UButton>
        <UButton
          size="sm"
          color="neutral"
          variant="subtle"
          icon="i-lucide-plus"
          :loading="pending"
          @click="emit('createProblem')"
        >
          {{ t('Create problem') }}
        </UButton>
        <UButton
          size="sm"
          color="neutral"
          variant="subtle"
          icon="i-lucide-copy"
          :loading="pending"
          @click="emit('markDuplicate')"
        >
          {{ t('Mark duplicate') }}
        </UButton>
        <UButton
          size="sm"
          color="neutral"
          variant="ghost"
          icon="i-lucide-archive"
          :loading="pending"
          @click="emit('triage', 'archive')"
        >
          {{ t('Archive') }}
        </UButton>
        <UButton
          size="sm"
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          :loading="pending"
          @click="emit('triage', 'dismiss')"
        >
          {{ t('Dismiss') }}
        </UButton>
      </template>
      <template v-else>
        <UButton
          size="sm"
          color="neutral"
          variant="subtle"
          icon="i-lucide-undo-2"
          :loading="pending"
          @click="emit('triage', 'reopen')"
        >
          {{ t('Return to inbox') }}
        </UButton>
        <UButton
          v-if="!entry.problem"
          size="sm"
          color="neutral"
          variant="ghost"
          icon="i-lucide-link"
          :loading="pending"
          @click="emit('attach')"
        >
          {{ t('Attach to problem') }}
        </UButton>
      </template>
    </footer>
  </article>
</template>
