<script setup lang="ts">
import { ROADMAP_STATUS_LABELS, type RoadmapStatus } from '#shared/constants/workflow'

const props = defineProps<{ status: RoadmapStatus }>()

const config: Record<RoadmapStatus, { color: 'neutral' | 'info' | 'primary' | 'warning' | 'success' | 'error', icon: string }> = {
  'exploring': { color: 'neutral', icon: 'i-lucide-search' },
  'accepted': { color: 'info', icon: 'i-lucide-check' },
  'planned': { color: 'info', icon: 'i-lucide-calendar' },
  'in-progress': { color: 'primary', icon: 'i-lucide-hammer' },
  'playtesting': { color: 'warning', icon: 'i-lucide-gamepad-2' },
  'released': { color: 'success', icon: 'i-lucide-check-circle-2' },
  'rejected': { color: 'error', icon: 'i-lucide-x' },
}

const badge = computed(() => config[props.status])
</script>

<template>
  <UBadge
    :label="ROADMAP_STATUS_LABELS[status]"
    :color="badge.color"
    :icon="badge.icon"
    variant="subtle"
    size="sm"
  />
</template>
