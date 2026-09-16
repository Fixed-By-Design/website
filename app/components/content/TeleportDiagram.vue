<script setup lang="ts">
const { t, locale } = useSiteLocale()
const props = defineProps<{
  kind: 'platform' | 'covered-platform' | 'charging' | 'relative-arrival'
}>()

const diagrams = {
  'platform': {
    height: 682,
    mobileHeight: 784,
    alt: t('Isometric and side views of a single-layer 7 by 7 gold foundation, with a Lodestone above the centre block.'),
  },
  'covered-platform': {
    height: 414,
    mobileHeight: 540,
    alt: t('A gold foundation hidden beneath polished andesite and carpet. The Lodestone remains exposed, and the boarding outline appears above the floor.'),
  },
  'charging': {
    height: 286,
    mobileHeight: 316,
    alt: t('At an anvil, combine a linked compass and one Nether Star for one experience level to obtain a Wither Compass.'),
  },
  'relative-arrival': {
    height: 544,
    mobileHeight: 1054,
    alt: t('Two players and a villager occupy identical relative positions and face the same directions on the departure and arrival emerald platforms.'),
  },
} as const

const diagram = computed(() => diagrams[props.kind])
const source = computed(() => `/media/teleportation/${locale.value === 'fr' ? 'fr/' : ''}${props.kind}.svg`)
</script>

<template>
  <figure class="my-8">
    <a
      :href="source"
      target="_blank"
      rel="noopener"
      class="block rounded-xl outline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
      :aria-label="`${diagram.alt} ${t('Open full-size diagram.')}`"
    >
      <picture>
        <source
          media="(max-width: 640px)"
          :srcset="`/media/teleportation/${locale === 'fr' ? 'fr/' : ''}${kind}-mobile.svg`"
          :width="560"
          :height="diagram.mobileHeight"
        >
        <img
          :src="source"
          :alt="diagram.alt"
          width="960"
          :height="diagram.height"
          loading="lazy"
          class="h-auto w-full rounded-xl"
        >
      </picture>
      <span class="mt-2 block text-right text-xs text-muted">{{ t('Open full-size diagram ↗') }}</span>
    </a>
  </figure>
</template>
