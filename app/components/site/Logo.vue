<script setup lang="ts">
const props = withDefaults(defineProps<{ height?: number }>(), { height: 28 })
const width = computed(() => Math.round(props.height * 2.14))
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
