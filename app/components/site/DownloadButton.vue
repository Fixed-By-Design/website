<script setup lang="ts">
import { LINKS, MODPACK_AVAILABLE } from '#shared/constants/project'

const { t, localPath } = useSiteLocale()

withDefaults(defineProps<{
  label?: string
  pendingLabel?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  block?: boolean
  variant?: 'solid' | 'subtle'
}>(), {
  label: 'Download on Modrinth',
  pendingLabel: 'Soon on Modrinth',
  size: 'md',
  block: false,
  variant: 'solid',
})
</script>

<template>
  <UButton
    v-if="MODPACK_AVAILABLE"
    :to="localPath(LINKS.modrinth)"
    target="_blank"
    rel="noopener"
    :size="size"
    :block="block"
    :variant="variant"
    icon="i-simple-icons-modrinth"
    class="font-medium"
  >
    {{ t(label) }}
  </UButton>

  <UButton
    v-else
    :size="size"
    :block="block"
    color="neutral"
    variant="subtle"
    disabled
    class="font-medium"
    :aria-label="t('The modpack is not released yet')"
  >
    {{ t(pendingLabel) }}
  </UButton>
</template>
