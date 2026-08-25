<script setup lang="ts">
const ASPECT_RATIO = 1444 / 640

const props = withDefaults(defineProps<{ height?: number }>(), { height: 28 })
const width = computed(() => Math.round(props.height * ASPECT_RATIO))
</script>

<template>
  <NuxtImg
    src="/brand/fbd-wordmark-transparent.png"
    alt="Fixed by Design"
    :height="height"
    :width="width"
    format="webp"
    class="w-auto select-none"
    :style="{ height: `${height}px` }"
  />
</template>
