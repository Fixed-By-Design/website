<script setup lang="ts">
import { FEATURE_STATUS_LABELS, type FeatureStatus } from '#shared/constants/features'

const props = defineProps<{ status: FeatureStatus, size?: 'sm' | 'md' }>()

const config: Record<FeatureStatus, { color: 'success' | 'warning' | 'info' | 'neutral' | 'error', icon: string }> = {
  stable: { color: 'success', icon: 'i-lucide-check-circle-2' },
  experimental: { color: 'warning', icon: 'i-lucide-flask-conical' },
  playtesting: { color: 'info', icon: 'i-lucide-gamepad-2' },
  planned: { color: 'neutral', icon: 'i-lucide-clock' },
  deprecated: { color: 'error', icon: 'i-lucide-archive' },
}

const badge = computed(() => config[props.status])
</script>

<template>
  <UBadge
    :label="FEATURE_STATUS_LABELS[status]"
    :color="badge.color"
    :icon="badge.icon"
    variant="subtle"
    :size="size ?? 'sm'"
  />
</template>
