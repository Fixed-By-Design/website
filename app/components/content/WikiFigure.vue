<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  alt: string
  caption: string
  position?: string
}>(), {
  position: 'center',
})
</script>

<template>
  <figure class="my-8 overflow-hidden rounded-xl border border-default bg-elevated shadow-lg shadow-black/10">
    <a
      :href="src"
      target="_blank"
      rel="noopener"
      class="group block outline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <NuxtImg
        :src="src"
        :alt="alt"
        width="1920"
        height="1080"
        format="webp"
        quality="85"
        sizes="100vw sm:768px lg:1024px"
        loading="lazy"
        class="aspect-video h-auto w-full object-cover transition duration-300 group-hover:brightness-105"
        :style="{ objectPosition: position }"
      />
    </a>
    <figcaption class="border-t border-default px-4 py-3 text-sm leading-6 text-muted">
      {{ caption }}
    </figcaption>
  </figure>
</template>
