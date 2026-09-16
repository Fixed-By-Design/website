<script setup lang="ts">
import {
  FEEDBACK_SOURCES,
  FEEDBACK_STATUSES,
  FEEDBACK_STATUS_LABELS,
  FEEDBACK_TYPES,
  FEEDBACK_TYPE_LABELS,
  PROBLEM_SEVERITIES,
  PROBLEM_STATUSES,
  PROBLEM_STATUS_LABELS,
} from '#shared/constants/workflow'
import type { FeedbackEntry, FeedbackPage, ProblemSummary } from '#shared/types/dashboard'
import type { TriageAction } from '#shared/schemas/triage'

const { t, localPath } = useSiteLocale()

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const toast = useToast()

const status = ref(String(route.query.status ?? 'new'))
const type = ref('all')
const source = ref('all')
const version = ref('')
const tag = ref('all')
const page = ref(1)

const query = computed(() => ({
  ...(status.value !== 'all' && { status: status.value }),
  ...(type.value !== 'all' && { type: type.value }),
  ...(source.value !== 'all' && { source: source.value }),
  ...(version.value && { version: version.value }),
  ...(tag.value !== 'all' && { tag: tag.value }),
  page: page.value,
  perPage: 20,
}))

const { data, refresh, status: fetchStatus } = await useFetch<FeedbackPage>('/api/dashboard/feedback', {
  query,
  default: () => ({ items: [], total: 0, counts: {} as FeedbackPage['counts'] }),
})

const { data: problems, refresh: refreshProblems } = await useFetch<ProblemSummary[]>('/api/dashboard/problems', { default: () => [] })

watch([status, type, source, version, tag], () => (page.value = 1))

const { data: tags } = await useFetch<{ slug: string, label: string }[]>('/api/dashboard/tags', { default: () => [] })

const tagOptions = computed(() => [
  { label: t('All tags'), value: 'all' },
  ...tags.value.map(entry => ({ label: t(entry.label), value: entry.slug })),
])

const statusOptions = [
  { label: t('All statuses'), value: 'all' },
  ...FEEDBACK_STATUSES.map(value => ({ label: t(FEEDBACK_STATUS_LABELS[value]), value })),
]
const typeOptions = [{ label: t('All types'), value: 'all' }, ...FEEDBACK_TYPES.map(value => ({ label: t(FEEDBACK_TYPE_LABELS[value]), value }))]
const sourceOptions = [
  { label: t('All sources'), value: 'all' },
  ...FEEDBACK_SOURCES.map(value => ({ label: value === 'minecraft' ? t('In game') : t('Website'), value })),
]

const busyId = ref<string | null>(null)

async function triage(entry: FeedbackEntry, action: TriageAction, extra: Record<string, string> = {}) {
  busyId.value = entry.id
  try {
    await $fetch(`/api/dashboard/feedback/${entry.id}`, { method: 'PATCH', body: { action, ...extra } })
    await refresh()
    toast.add({ title: t('Feedback updated'), color: 'success', icon: 'i-lucide-check' })
  }
  catch {
    toast.add({ title: t('That action failed'), color: 'error', icon: 'i-lucide-triangle-alert' })
  }
  finally {
    busyId.value = null
  }
}

const attachTarget = ref<FeedbackEntry | null>(null)
const attachOpen = computed({
  get: () => attachTarget.value !== null,
  set: (value: boolean) => {
    if (!value) attachTarget.value = null
  },
})
const selectedProblemId = ref<string | undefined>()

const problemOptions = computed(() =>
  problems.value.map(problem => ({ label: `#${problem.publicId} ${problem.title}`, value: problem.id })))

async function confirmAttach() {
  if (!attachTarget.value || !selectedProblemId.value) return
  await triage(attachTarget.value, 'attach-problem', { problemId: selectedProblemId.value })
  attachTarget.value = null
  selectedProblemId.value = undefined
}

const duplicateTarget = ref<FeedbackEntry | null>(null)
const duplicateOpen = computed({
  get: () => duplicateTarget.value !== null,
  set: (value: boolean) => {
    if (!value) duplicateTarget.value = null
  },
})
const selectedDuplicateId = ref<string | undefined>()

const duplicateOptions = computed(() =>
  data.value.items
    .filter(item => item.id !== duplicateTarget.value?.id)
    .map(item => ({ label: item.message.slice(0, 80), value: item.id })))

async function confirmDuplicate() {
  if (!duplicateTarget.value || !selectedDuplicateId.value) return
  await triage(duplicateTarget.value, 'mark-duplicate', { duplicateOfId: selectedDuplicateId.value })
  duplicateTarget.value = null
  selectedDuplicateId.value = undefined
}

const createTarget = ref<FeedbackEntry | null>(null)
const createOpen = computed({
  get: () => createTarget.value !== null,
  set: (value: boolean) => {
    if (!value) createTarget.value = null
  },
})
const creating = ref(false)
const newProblem = reactive({
  title: '',
  summary: '',
  context: '',
  status: 'investigating' as (typeof PROBLEM_STATUSES)[number],
  severity: undefined as (typeof PROBLEM_SEVERITIES)[number] | undefined,
})

function openCreate(entry: FeedbackEntry) {
  createTarget.value = entry
  newProblem.title = ''
  newProblem.summary = entry.message.slice(0, 300)
  newProblem.context = `Raised from ${entry.source === 'minecraft' ? 'in-game' : 'website'} feedback on ${new Date(entry.createdAt).toISOString().slice(0, 10)}.`
  newProblem.status = 'investigating'
  newProblem.severity = undefined
}

async function confirmCreate() {
  if (!createTarget.value) return
  creating.value = true
  try {
    await $fetch('/api/dashboard/problems', {
      method: 'POST',
      body: {
        title: newProblem.title,
        summary: newProblem.summary,
        context: newProblem.context || undefined,
        status: newProblem.status,
        severity: newProblem.severity,
        feedbackId: createTarget.value.id,
      },
    })
    createTarget.value = null
    await Promise.all([refresh(), refreshProblems()])
    toast.add({ title: t('Problem created and feedback attached'), color: 'success', icon: 'i-lucide-check' })
  }
  catch {
    toast.add({ title: t('The problem could not be created'), color: 'error', icon: 'i-lucide-triangle-alert' })
  }
  finally {
    creating.value = false
  }
}

useSeoMeta({ title: t('Feedback triage'), robots: 'noindex' })
</script>

<template>
  <UContainer class="py-10">
    <UBreadcrumb
      :items="[{ label: t('Dashboard'), to: localPath('/dashboard') }, { label: t('Feedback') }]"
      class="mb-6"
    />

    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          {{ t('Feedback triage') }}
        </h1>
        <p class="mt-2 text-[var(--ui-text-muted)]">
          {{ t('Nothing here is deleted. Entries are archived, dismissed or attached to a problem.') }}
        </p>
      </div>
      <UButton
        :to="localPath('/dashboard/problems')"
        color="neutral"
        variant="subtle"
        icon="i-lucide-target"
      >
        {{ t('Problems') }}
      </UButton>
    </div>

    <div class="mt-6 flex flex-wrap gap-2">
      <UButton
        v-for="key in FEEDBACK_STATUSES"
        :key="key"
        size="sm"
        :color="status === key ? 'primary' : 'neutral'"
        :variant="status === key ? 'subtle' : 'ghost'"
        @click="status = key"
      >
        {{ t(FEEDBACK_STATUS_LABELS[key]) }}
        <UBadge
          :label="String(data.counts[key] ?? 0)"
          color="neutral"
          variant="soft"
          size="sm"
        />
      </UButton>
      <UButton
        size="sm"
        :color="status === 'all' ? 'primary' : 'neutral'"
        :variant="status === 'all' ? 'subtle' : 'ghost'"
        @click="status = 'all'"
      >
        {{ t('All') }}
      </UButton>
    </div>

    <div class="mt-4 flex flex-wrap gap-3">
      <USelect
        v-model="status"
        :items="statusOptions"
        class="w-40"
        :aria-label="t('Filter by status')"
      />
      <USelect
        v-model="type"
        :items="typeOptions"
        class="w-44"
        :aria-label="t('Filter by type')"
      />
      <USelect
        v-model="source"
        :items="sourceOptions"
        class="w-40"
        :aria-label="t('Filter by source')"
      />
      <USelect
        v-model="tag"
        :items="tagOptions"
        class="w-40"
        :aria-label="t('Filter by tag')"
      />
      <UInput
        v-model="version"
        placeholder="Version"
        class="w-32"
        :aria-label="t('Filter by modpack version')"
      />
      <p class="ms-auto self-center text-sm text-[var(--ui-text-dimmed)]">
        {{ data.total }} {{ t(data.total === 1 ? 'entry' : 'entries') }}
      </p>
    </div>

    <div
      v-if="fetchStatus === 'pending' && !data.items.length"
      class="mt-8 space-y-3"
    >
      <USkeleton
        v-for="n in 3"
        :key="n"
        class="h-40 w-full"
      />
    </div>

    <div
      v-else-if="data.items.length"
      class="mt-8 space-y-4"
    >
      <DashboardFeedbackCard
        v-for="entry in data.items"
        :key="entry.id"
        :entry="entry"
        :pending="busyId === entry.id"
        @triage="action => triage(entry, action)"
        @attach="attachTarget = entry"
        @create-problem="openCreate(entry)"
        @mark-duplicate="duplicateTarget = entry"
      />

      <UPagination
        v-if="data.total > 20"
        v-model:page="page"
        :total="data.total"
        :items-per-page="20"
        class="justify-center pt-4"
      />
    </div>

    <UEmpty
      v-else
      class="mt-16"
      icon="i-lucide-inbox"
      :title="t('Nothing here')"
      :description="t('No feedback matches those filters.')"
    />

    <UModal
      v-model:open="attachOpen"
      :title="t('Attach to a problem')"
      :description="t('Link this feedback to an existing design problem.')"
    >
      <template #body>
        <UFormField
          :label="t('Problem')"
          name="problem"
          required
        >
          <USelectMenu
            v-model="selectedProblemId"
            :items="problemOptions"
            value-key="value"
            :placeholder="t('Choose a problem')"
            class="w-full"
          />
        </UFormField>
      </template>
      <template #footer>
        <UButton
          color="neutral"
          variant="ghost"
          @click="attachTarget = null"
        >
          {{ t('Cancel') }}
        </UButton>
        <UButton
          :disabled="!selectedProblemId"
          @click="confirmAttach"
        >
          {{ t('Attach') }}
        </UButton>
      </template>
    </UModal>

    <UModal
      v-model:open="duplicateOpen"
      :title="t('Mark as duplicate')"
      :description="t('Point this entry at the feedback it repeats. Neither entry is deleted.')"
    >
      <template #body>
        <UFormField
          :label="t('Duplicate of')"
          name="duplicate"
          required
        >
          <USelectMenu
            v-model="selectedDuplicateId"
            :items="duplicateOptions"
            value-key="value"
            :placeholder="t('Choose the original entry')"
            class="w-full"
          />
        </UFormField>
      </template>
      <template #footer>
        <UButton
          color="neutral"
          variant="ghost"
          @click="duplicateTarget = null"
        >
          {{ t('Cancel') }}
        </UButton>
        <UButton
          :disabled="!selectedDuplicateId"
          @click="confirmDuplicate"
        >
          {{ t('Mark duplicate') }}
        </UButton>
      </template>
    </UModal>

    <UModal
      v-model:open="createOpen"
      :title="t('Create a problem')"
      :description="t('Turn this feedback into a structured design problem.')"
    >
      <template #body>
        <div class="space-y-5">
          <UFormField
            :label="t('Title')"
            name="title"
            required
            :description="t('At least 10 characters.')"
          >
            <UInput
              v-model="newProblem.title"
              :placeholder="t('Rail networks have no niche once elytra flight is available')"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="t('Summary')"
            name="summary"
            required
            :description="t('One paragraph describing the design problem, not the report.')"
          >
            <UTextarea
              v-model="newProblem.summary"
              :rows="4"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="t('Context')"
            name="context"
          >
            <UTextarea
              v-model="newProblem.context"
              :rows="3"
              class="w-full"
            />
          </UFormField>

          <div class="grid gap-4 sm:grid-cols-2">
            <UFormField
              :label="t('Status')"
              name="status"
            >
              <USelect
                v-model="newProblem.status"
                :items="PROBLEM_STATUSES.map(value => ({ label: t(PROBLEM_STATUS_LABELS[value]), value }))"
                class="w-full"
              />
            </UFormField>
            <UFormField
              :label="t('Severity')"
              name="severity"
            >
              <USelect
                v-model="newProblem.severity"
                :items="PROBLEM_SEVERITIES.map(value => ({ label: t(value), value }))"
                :placeholder="t('Unset')"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton
          color="neutral"
          variant="ghost"
          @click="createTarget = null"
        >
          {{ t('Cancel') }}
        </UButton>
        <UButton
          :loading="creating"
          :disabled="newProblem.title.length < 10 || newProblem.summary.length < 20"
          @click="confirmCreate"
        >
          {{ t('Create problem') }}
        </UButton>
      </template>
    </UModal>
  </UContainer>
</template>
