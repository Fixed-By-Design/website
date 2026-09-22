<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const target = computed(() => locale.value === 'fr' ? 'en' : 'fr')
</script>

<template>
  <UButton
    :to="switchLocalePath(target)"
    :locale="false"
    :aria-label="target === 'fr' ? 'Lire cette page en français' : 'Read this page in English'"
    :lang="target"
    :hreflang="target"
    color="neutral"
    variant="ghost"
    class="h-11 shrink-0 px-2 lg:h-8"
  >
    {{ target === 'fr' ? 'FR' : 'EN' }}
  </UButton>
</template>
