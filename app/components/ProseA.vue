<script setup lang="ts">
const { href = '', target } = defineProps<{
  href?: string
  target?: string | null
}>()

const url = computed(() => {
  if (!/^https?:\/\//i.test(href)) return null
  try {
    return new URL(href)
  }
  catch {
    return null
  }
})

const isExternal = computed(() => url.value !== null)
const isModrinth = computed(() => {
  const host = url.value?.hostname
  return host === 'modrinth.com' || (host?.endsWith('.modrinth.com') ?? false)
})
</script>

<template>
  <ULink
    :href="href"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="isExternal ? 'noopener' : undefined"
    :class="[
      'font-medium rounded-xs border-b border-transparent transition-colors outline-primary/25 focus-visible:outline-3',
      isModrinth
        ? 'text-modrinth hover:border-modrinth'
        : 'text-primary hover:border-primary',
    ]"
    raw
  >
    <slot />
    <UIcon
      v-if="isExternal"
      name="i-lucide-arrow-up-right"
      class="ms-0.5 inline-block size-3 align-super"
      aria-hidden="true"
    />
  </ULink>
</template>
