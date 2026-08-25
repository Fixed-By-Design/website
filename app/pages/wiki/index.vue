<script setup lang="ts">
const { data: sections } = await useWikiNavigation()

useSeoMeta({
  title: 'Wiki',
  description: 'How to use and understand every mechanic Fixed by Design changes, from enchanting to trains.',
})
</script>

<template>
  <div>
    <div class="border-b border-[var(--ui-border)]">
      <UContainer>
        <UPageHeader
          title="Wiki"
          description="How to use and understand each mechanic. For what changed and why, read the Features section."
        />
      </UContainer>
    </div>

    <UContainer class="py-10">
      <div
        v-for="section in sections"
        :key="section.label"
        class="mb-10"
      >
        <h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
          {{ section.label }}
        </h2>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <NuxtLink
            v-for="item in section.items"
            :key="item.path"
            :to="item.path"
            class="group rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5 transition-colors hover:border-gold-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          >
            <h3 class="font-semibold text-[var(--ui-text-highlighted)] group-hover:text-gold-400">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-[var(--ui-text-muted)]">
              {{ item.description }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
