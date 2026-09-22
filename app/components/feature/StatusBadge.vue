<script setup lang="ts">
import { FEATURE_STATUS_LABELS, type FeatureStatus } from '#shared/constants/features'

const { t } = useSiteLocale()

const props = defineProps<{ status: FeatureStatus, size?: 'sm' | 'md' }>()

const colors: Record<FeatureStatus, 'success' | 'warning' | 'info' | 'neutral' | 'error'> = {
  stable: 'success',
  experimental: 'warning',
  playtesting: 'info',
  planned: 'neutral',
  deprecated: 'error',
}

const color = computed(() => colors[props.status])
</script>

<template>
  <UBadge
    :label="t(FEATURE_STATUS_LABELS[status])"
    :color="color"
    variant="subtle"
    :size="size ?? 'sm'"
    class="shrink-0"
  />
</template>
