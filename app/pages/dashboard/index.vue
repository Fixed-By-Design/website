<script setup lang="ts">
import { ROLE_RANK } from '#shared/constants/workflow'
import { LINKS } from '#shared/constants/project'
import type { FeedbackPage, ProblemSummary } from '#shared/types/dashboard'
import type { PublicRoadmapItem } from '#shared/types/roadmap'

definePageMeta({ middleware: 'auth' })

const { user } = useUserSession()
const canTriage = computed(() => (user.value ? ROLE_RANK[user.value.role] >= ROLE_RANK.maintainer : false))
const canSeeProblems = computed(() => (user.value ? ROLE_RANK[user.value.role] >= ROLE_RANK.contributor : false))

const { data: inbox } = await useFetch<FeedbackPage>('/api/dashboard/feedback', {
  query: { status: 'new', perPage: 5 },
  immediate: canTriage.value,
  default: () => ({ items: [], total: 0, counts: {} as FeedbackPage['counts'] }),
})

const { data: problems } = await useFetch<ProblemSummary[]>('/api/dashboard/problems', {
  immediate: canSeeProblems.value,
  default: () => [],
})

const { data: roadmap } = await useFetch<PublicRoadmapItem[]>('/api/roadmap', { default: () => [] })

const investigating = computed(() => problems.value.filter(p => p.status === 'investigating' || p.status === 'confirmed'))
const designing = computed(() => problems.value.filter(p => p.status === 'designing' || p.status === 'accepted'))
const inDevelopment = computed(() => roadmap.value.filter(item => item.status === 'in-progress'))
const needsPlaytest = computed(() => roadmap.value.filter(item => item.status === 'playtesting'))

useSeoMeta({ title: 'Dashboard', robots: 'noindex' })
</script>

<template>
  <UContainer class="py-10">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          What needs attention
        </h1>
        <p class="mt-2 text-[var(--ui-text-muted)]">
          Signed in as {{ user?.login }} &middot; {{ user?.role }}
        </p>
      </div>
      <div class="flex gap-2">
        <UButton v-if="canTriage" to="/dashboard/feedback" icon="i-lucide-inbox">
          Triage feedback
        </UButton>
        <UButton v-if="canSeeProblems" to="/dashboard/problems" color="neutral" variant="subtle" icon="i-lucide-target">
          Problems
        </UButton>
      </div>
    </div>

    <UAlert
      v-if="!canSeeProblems"
      class="mt-8"
      color="info"
      variant="subtle"
      icon="i-lucide-info"
      title="You have a player account"
      description="Triage and project data are limited to contributors and maintainers. You can still send feedback and read everything public."
    >
      <template #actions>
        <UButton to="/feedback" size="sm" color="neutral" variant="subtle">
          Send feedback
        </UButton>
        <UButton to="/contribute" size="sm" color="neutral" variant="ghost">
          Contribute
        </UButton>
      </template>
    </UAlert>

    <div v-if="canTriage" class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <NuxtLink
        v-for="stat in [
          { label: 'Awaiting triage', value: inbox.counts.new ?? 0, icon: 'i-lucide-inbox', to: '/dashboard/feedback?status=new' },
          { label: 'Being investigated', value: investigating.length, icon: 'i-lucide-search', to: '/dashboard/problems' },
          { label: 'In development', value: inDevelopment.length, icon: 'i-lucide-hammer', to: '/roadmap' },
          { label: 'Needs playtest', value: needsPlaytest.length, icon: 'i-lucide-gamepad-2', to: '/roadmap' },
        ]"
        :key="stat.label"
        :to="stat.to"
        class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5 transition-colors hover:border-gold-500/50"
      >
        <div class="flex items-center justify-between">
          <p class="text-sm text-[var(--ui-text-muted)]">
            {{ stat.label }}
          </p>
          <UIcon :name="stat.icon" class="size-4 text-gold-400" />
        </div>
        <p class="mt-2 text-3xl font-bold tabular-nums">
          {{ stat.value }}
        </p>
      </NuxtLink>
    </div>

    <div class="mt-10 grid gap-8 lg:grid-cols-2">
      <section v-if="canTriage">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold">
            Feedback awaiting triage
          </h2>
          <UButton to="/dashboard/feedback" variant="link" size="sm" trailing-icon="i-lucide-arrow-right">
            Open inbox
          </UButton>
        </div>

        <div v-if="inbox.items.length" class="space-y-3">
          <NuxtLink
            v-for="entry in inbox.items"
            :key="entry.id"
            to="/dashboard/feedback"
            class="block rounded-lg border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-4 transition-colors hover:border-gold-500/50"
          >
            <p class="line-clamp-2 text-sm text-[var(--ui-text-toned)]">
              {{ entry.message }}
            </p>
            <p class="mt-2 text-xs text-[var(--ui-text-dimmed)]">
              {{ entry.source === 'minecraft' ? 'In game' : 'Website' }}
              <template v-if="entry.playerName"> &middot; {{ entry.playerName }}</template>
              <template v-if="entry.version"> &middot; {{ entry.version }}</template>
            </p>
          </NuxtLink>
        </div>

        <UEmpty v-else icon="i-lucide-inbox" title="The inbox is empty" description="Nothing is waiting to be triaged." />
      </section>

      <section v-if="canSeeProblems">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold">
            Problems being worked on
          </h2>
          <UButton to="/dashboard/problems" variant="link" size="sm" trailing-icon="i-lucide-arrow-right">
            All problems
          </UButton>
        </div>

        <div v-if="[...investigating, ...designing].length" class="space-y-3">
          <NuxtLink
            v-for="problem in [...investigating, ...designing].slice(0, 5)"
            :key="problem.id"
            to="/dashboard/problems"
            class="block rounded-lg border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-4 transition-colors hover:border-gold-500/50"
          >
            <p class="text-sm font-medium text-[var(--ui-text-highlighted)]">
              #{{ problem.publicId }} {{ problem.title }}
            </p>
            <p class="mt-1 text-xs text-[var(--ui-text-dimmed)]">
              {{ problem.status }} &middot; {{ problem.feedbackCount }} linked feedback
            </p>
          </NuxtLink>
        </div>

        <UEmpty v-else icon="i-lucide-target" title="No open problems" description="Nothing is under investigation right now." />
      </section>
    </div>

    <section class="mt-10">
      <h2 class="mb-4 text-lg font-semibold">
        Development links
      </h2>
      <div class="flex flex-wrap gap-2">
        <UButton :to="LINKS.github" target="_blank" rel="noopener" color="neutral" variant="subtle" icon="i-simple-icons-github" size="sm">
          GitHub organisation
        </UButton>
        <UButton :to="LINKS.modrinth" target="_blank" rel="noopener" color="neutral" variant="subtle" icon="i-simple-icons-modrinth" size="sm">
          Modrinth
        </UButton>
        <UButton to="/roadmap" color="neutral" variant="subtle" icon="i-lucide-map" size="sm">
          Public roadmap
        </UButton>
      </div>
    </section>
  </UContainer>
</template>
