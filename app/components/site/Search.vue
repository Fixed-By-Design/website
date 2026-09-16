<script setup lang="ts">
import { refDebounced } from '@vueuse/core'
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui'
import type { SearchGroup } from '#shared/types/search'
import { SEARCH_MIN_LENGTH } from '#shared/utils/searchScore'

const { t, localPath, locale } = useSiteLocale()

const { open } = useContentSearch()
const searchTerm = ref('')
const debounced = refDebounced(searchTerm, 150)

defineShortcuts({ meta_k: () => (open.value = !open.value) })

const canSearch = computed(() => debounced.value.trim().length >= SEARCH_MIN_LENGTH)

const { data, status, refresh } = await useFetch<SearchGroup[]>('/api/search', {
  key: `site-search-${locale.value}`,
  query: { q: debounced, locale },
  immediate: false,
  default: () => [],
  watch: false,
})

watch(debounced, () => {
  if (!canSearch.value) {
    data.value = []
    return
  }
  refresh()
})

const groups = computed<CommandPaletteGroup<CommandPaletteItem>[]>(() => {
  if (!canSearch.value) {
    return [{
      id: 'shortcuts',
      label: t('Jump to'),
      items: [
        { label: t('Features'), icon: 'i-lucide-sparkles', to: localPath('/features') },
        { label: 'Wiki', icon: 'i-lucide-book-open', to: localPath('/wiki') },
        { label: t('Roadmap'), icon: 'i-lucide-map', to: localPath('/roadmap') },
        { label: t('Changelog'), icon: 'i-lucide-tag', to: localPath('/changelog') },
        { label: t('Send feedback'), icon: 'i-lucide-message-square', to: localPath('/feedback') },
      ],
    }]
  }

  return (data.value ?? []).map(group => ({
    id: group.id,
    ignoreFilter: true,
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
    :title="t('Search')"
    :description="t('Search the wiki, features and roadmap')"
  >
    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        :groups="groups"
        :loading="status === 'pending'"
        :placeholder="t('Search the wiki, features, roadmap...')"
        close
        @update:open="open = $event"
        @close="open = false"
      />
    </template>
  </UModal>
</template>
