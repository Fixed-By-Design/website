<script setup lang="ts">
const { t, localPath } = useSiteLocale()
const { subject = 'this' } = defineProps<{ subject?: string }>()
</script>

<template>
  <aside class="rounded-xl border border-gold-500/25 bg-gold-500/[0.06] p-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="font-semibold text-[var(--ui-text-highlighted)]">
          {{ t('Does {subject} feel wrong in game?', { subject: t(subject) }) }}
        </h2>
        <p class="mt-1.5 text-sm text-[var(--ui-text-muted)]">
          {{ t('That is the most useful thing you can tell us. Playtesting is how this project decides what to change next.') }}
        </p>
      </div>
      <UButton
        :to="localPath('/feedback')"
        color="primary"
        icon="i-lucide-message-square"
        class="shrink-0 font-medium"
      >
        {{ t('Send feedback') }}
      </UButton>
    </div>
  </aside>
</template>
