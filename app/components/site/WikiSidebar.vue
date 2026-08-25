<script setup lang="ts">
import type { WikiNavigationSection } from '~/composables/useWikiNavigation'

defineProps<{ sections: WikiNavigationSection[] }>()
const route = useRoute()
</script>

<template>
  <nav aria-label="Wiki navigation" class="space-y-6">
    <div v-for="section in sections" :key="section.label">
      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-dimmed)]">
        {{ section.label }}
      </p>
      <ul class="space-y-0.5 border-s border-[var(--ui-border)]">
        <li v-for="item in section.items" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="-ms-px block border-s-2 py-1.5 ps-3 text-sm transition-colors"
            :class="route.path === item.path
              ? 'border-gold-500 font-medium text-gold-400'
              : 'border-transparent text-[var(--ui-text-muted)] hover:border-[var(--ui-border-accented)] hover:text-[var(--ui-text-highlighted)]'"
            :aria-current="route.path === item.path ? 'page' : undefined"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
