<script setup lang="ts">
import { normalizeSearch } from '#shared/utils/searchScore'
import {
  FEATURE_CATEGORY_LABELS,
  FEATURE_STATUSES,
  FEATURE_STATUS_LABELS,
  MODS,
  MOD_LABELS,
  type FeatureCategory,
  type FeatureStatus,
  type ModId,
} from '#shared/constants/features'

const { t, locale, collection } = useSiteLocale()

const route = useRoute()
const router = useRouter()

const { data: features } = await useAsyncData(`features-index-${locale.value}`, () =>
  queryCollection(collection('features'))
    .select('path', 'title', 'summary', 'category', 'status', 'mod', 'order')
    .order('order', 'ASC')
    .all(), { default: () => [] })

const category = ref<string>(String(route.query.category ?? 'all'))
const mod = ref<string>(String(route.query.mod ?? 'all'))
const status = ref<string>(String(route.query.status ?? 'all'))
const search = ref('')

watch([category, mod, status], () => {
  router.replace({
    query: {
      ...(category.value !== 'all' && { category: category.value }),
      ...(mod.value !== 'all' && { mod: mod.value }),
      ...(status.value !== 'all' && { status: status.value }),
    },
  })
})

const usedCategories = computed(() => {
  const present = new Set(features.value.map(f => f.category))
  return [
    { label: t('All categories'), value: 'all' },
    ...Object.entries(FEATURE_CATEGORY_LABELS)
      .filter(([key]) => present.has(key as FeatureCategory))
      .map(([value, label]) => ({ label: t(label), value })),
  ]
})

const modOptions = [
  { label: t('All mods'), value: 'all' },
  ...MODS.map(value => ({ label: MOD_LABELS[value], value })),
]

const statusOptions = [
  { label: t('Any status'), value: 'all' },
  ...FEATURE_STATUSES.map(value => ({ label: t(FEATURE_STATUS_LABELS[value]), value })),
]

const filtered = computed(() => {
  const term = normalizeSearch(search.value.trim())
  return features.value.filter((feature) => {
    if (category.value !== 'all' && feature.category !== category.value) return false
    if (mod.value !== 'all' && feature.mod !== mod.value) return false
    if (status.value !== 'all' && feature.status !== status.value) return false
    if (term && !normalizeSearch(`${feature.title} ${feature.summary}`).includes(term)) return false
    return true
  })
})

const grouped = computed(() => {
  const map = new Map<FeatureCategory, typeof filtered.value>()
  for (const feature of filtered.value) {
    const key = feature.category as FeatureCategory
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(feature)
  }
  return [...map.entries()]
})

function reset() {
  category.value = 'all'
  mod.value = 'all'
  status.value = 'all'
  search.value = ''
}

useSeoMeta({
  title: t('Features'),
  description: t('Every gameplay system Fixed by Design changes, grouped by what it affects in game rather than by which mod implements it.'),
})
</script>

<template>
  <div>
    <div class="border-b border-[var(--ui-border)]">
      <UContainer>
        <UPageHeader
          :title="t('Features')"
          :description="t('What actually changes in the game. Grouped by gameplay system, not by repository.')"
        />
      </UContainer>
    </div>

    <UContainer class="py-10">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
        <UInput
          v-model="search"
          icon="i-lucide-search"
          :placeholder="t('Filter features')"
          class="lg:max-w-xs"
          :aria-label="t('Filter features by name')"
        />
        <div class="flex flex-wrap gap-3">
          <USelect
            v-model="category"
            :items="usedCategories"
            class="w-52"
            :aria-label="t('Filter by category')"
          />
          <USelect
            v-model="mod"
            :items="modOptions"
            class="w-52"
            :aria-label="t('Filter by mod')"
          />
          <USelect
            v-model="status"
            :items="statusOptions"
            class="w-40"
            :aria-label="t('Filter by status')"
          />
        </div>
        <p class="text-sm text-[var(--ui-text-dimmed)] lg:ml-auto">
          {{ filtered.length }} {{ t('of') }} {{ features.length }}
        </p>
      </div>

      <div
        v-if="grouped.length"
        class="mt-10 space-y-12"
      >
        <section
          v-for="[key, items] in grouped"
          :key="key"
        >
          <h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
            {{ t(FEATURE_CATEGORY_LABELS[key]) }}
          </h2>
          <div
            v-reveal.children="{ stagger: 0.05 }"
            class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            <FeatureCard
              v-for="feature in items"
              :key="feature.path"
              :path="feature.path"
              :title="feature.title"
              :summary="feature.summary"
              :category="feature.category as FeatureCategory"
              :status="feature.status as FeatureStatus"
              :mod="feature.mod as ModId"
            />
          </div>
        </section>
      </div>

      <UEmpty
        v-else
        class="mt-16"
        icon="i-lucide-search-x"
        :title="t('No features match those filters')"
        :description="t('Try widening the category, mod or status filter.')"
      >
        <template #actions>
          <UButton
            color="neutral"
            variant="subtle"
            @click="reset"
          >
            {{ t('Clear filters') }}
          </UButton>
        </template>
      </UEmpty>
    </UContainer>
  </div>
</template>
