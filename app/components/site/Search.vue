<script setup lang="ts">
import { refDebounced } from '@vueuse/core'
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui'
import type { SearchGroup } from '#shared/types/search'

const { open } = useContentSearch()
const searchTerm = ref('')
const debounced = refDebounced(searchTerm, 150)

defineShortcuts({ meta_k: () => (open.value = !open.value) })

const { data, status } = await useFetch<SearchGroup[]>('/api/search', {
  query: { q: debounced },
  immediate: false,
  default: () => [],
  watch: [debounced],
})

const groups = computed<CommandPaletteGroup<CommandPaletteItem>[]>(() => {
  if (debounced.value.length < 2) {
    return [{
      id: 'shortcuts',
      label: 'Jump to',
      items: [
        { label: 'Features', icon: 'i-lucide-sparkles', to: '/features' },
        { label: 'Wiki', icon: 'i-lucide-book-open', to: '/wiki' },
        { label: 'Roadmap', icon: 'i-lucide-map', to: '/roadmap' },
        { label: 'Changelog', icon: 'i-lucide-tag', to: '/changelog' },
        { label: 'Send feedback', icon: 'i-lucide-message-square', to: '/feedback' },
      ],
    }]
  }

  return (data.value ?? []).map(group => ({
    id: group.id,
    label: group.label,
    items: group.items.map(item => ({
      label: item.title,
      suffix: item.description,
      icon: group.icon,
      to: item.path,
      onSelect: () => (open.value = false),
    })),
  }))
})
</script>

<template>
  <UModal
    v-model:open="open"
    :ui="{ content: 'sm:max-w-2xl' }"
    title="Search"
    description="Search the wiki, features and roadmap"
  >
    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        :groups="groups"
        :loading="status === 'pending'"
        placeholder="Search the wiki, features, roadmap..."
        close
        @update:open="open = $event"
        @close="open = false"
      />
    </template>
  </UModal>
</template>
