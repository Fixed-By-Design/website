<script setup lang="ts">
import { ROADMAP_STATUS_LABELS, type RoadmapStatus } from '#shared/constants/workflow'

const props = defineProps<{ status: RoadmapStatus }>()

const colors: Record<RoadmapStatus, 'neutral' | 'info' | 'primary' | 'warning' | 'success' | 'error'> = {
  'exploring': 'neutral',
  'accepted': 'info',
  'planned': 'info',
  'in-progress': 'primary',
  'playtesting': 'warning',
  'released': 'success',
  'rejected': 'error',
}

const color = computed(() => colors[props.status])
</script>

<template>
  <UBadge
    :label="ROADMAP_STATUS_LABELS[status]"
    :color="color"
    variant="subtle"
    size="sm"
    class="shrink-0"
  />
</template>
