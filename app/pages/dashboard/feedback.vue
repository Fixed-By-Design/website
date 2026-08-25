<script setup lang="ts">
import {
  FEEDBACK_SOURCES,
  FEEDBACK_STATUSES,
  FEEDBACK_STATUS_LABELS,
  FEEDBACK_TYPES,
  FEEDBACK_TYPE_LABELS,
  PROBLEM_SEVERITIES,
  PROBLEM_STATUSES,
} from '#shared/constants/workflow'
import type { FeedbackEntry, FeedbackPage, ProblemSummary } from '#shared/types/dashboard'
import type { TriageAction } from '#shared/schemas/triage'

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
  { label: 'All tags', value: 'all' },
  ...tags.value.map(entry => ({ label: entry.label, value: entry.slug })),
])

const statusOptions = [
  { label: 'All statuses', value: 'all' },
  ...FEEDBACK_STATUSES.map(value => ({ label: FEEDBACK_STATUS_LABELS[value], value })),
]
const typeOptions = [{ label: 'All types', value: 'all' }, ...FEEDBACK_TYPES.map(value => ({ label: FEEDBACK_TYPE_LABELS[value], value }))]
const sourceOptions = [
  { label: 'All sources', value: 'all' },
  ...FEEDBACK_SOURCES.map(value => ({ label: value === 'minecraft' ? 'In game' : 'Website', value })),
]

const busyId = ref<string | null>(null)

async function triage(entry: FeedbackEntry, action: TriageAction, extra: Record<string, string> = {}) {
  busyId.value = entry.id
  try {
    await $fetch(`/api/dashboard/feedback/${entry.id}`, { method: 'PATCH', body: { action, ...extra } })
    await refresh()
    toast.add({ title: 'Feedback updated', color: 'success', icon: 'i-lucide-check' })
  }
  catch {
    toast.add({ title: 'That action failed', color: 'error', icon: 'i-lucide-triangle-alert' })
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
    toast.add({ title: 'Problem created and feedback attached', color: 'success', icon: 'i-lucide-check' })
  }
  catch {
    toast.add({ title: 'The problem could not be created', color: 'error', icon: 'i-lucide-triangle-alert' })
  }
  finally {
    creating.value = false
  }
}

useSeoMeta({ title: 'Feedback triage', robots: 'noindex' })
</script>

<template>
  <UContainer class="py-10">
    <UBreadcrumb
      :items="[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Feedback' }]"
      class="mb-6"
    />

    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          Feedback triage
        </h1>
        <p class="mt-2 text-[var(--ui-text-muted)]">
          Nothing here is deleted. Entries are archived, dismissed or attached to a problem.
        </p>
      </div>
      <UButton
        to="/dashboard/problems"
        color="neutral"
        variant="subtle"
        icon="i-lucide-target"
      >
        Problems
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
        {{ FEEDBACK_STATUS_LABELS[key] }}
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
        All
      </UButton>
    </div>

    <div class="mt-4 flex flex-wrap gap-3">
      <USelect
        v-model="status"
        :items="statusOptions"
        class="w-40"
        aria-label="Filter by status"
      />
      <USelect
        v-model="type"
        :items="typeOptions"
        class="w-44"
        aria-label="Filter by type"
      />
      <USelect
        v-model="source"
        :items="sourceOptions"
        class="w-40"
        aria-label="Filter by source"
      />
      <USelect
        v-model="tag"
        :items="tagOptions"
        class="w-40"
        aria-label="Filter by tag"
      />
      <UInput
        v-model="version"
        placeholder="Version"
        class="w-32"
        aria-label="Filter by modpack version"
      />
      <p class="ms-auto self-center text-sm text-[var(--ui-text-dimmed)]">
        {{ data.total }} {{ data.total === 1 ? 'entry' : 'entries' }}
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
      title="Nothing here"
      description="No feedback matches those filters."
    />

    <UModal
      v-model:open="attachOpen"
      title="Attach to a problem"
      description="Link this feedback to an existing design problem."
    >
      <template #body>
        <UFormField
          label="Problem"
          name="problem"
          required
        >
          <USelectMenu
            v-model="selectedProblemId"
            :items="problemOptions"
            value-key="value"
            placeholder="Choose a problem"
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
          Cancel
        </UButton>
        <UButton
          :disabled="!selectedProblemId"
          @click="confirmAttach"
        >
          Attach
        </UButton>
      </template>
    </UModal>

    <UModal
      v-model:open="duplicateOpen"
      title="Mark as duplicate"
      description="Point this entry at the feedback it repeats. Neither entry is deleted."
    >
      <template #body>
        <UFormField
          label="Duplicate of"
          name="duplicate"
          required
        >
          <USelectMenu
            v-model="selectedDuplicateId"
            :items="duplicateOptions"
            value-key="value"
            placeholder="Choose the original entry"
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
          Cancel
        </UButton>
        <UButton
          :disabled="!selectedDuplicateId"
          @click="confirmDuplicate"
        >
          Mark duplicate
        </UButton>
      </template>
    </UModal>

    <UModal
      v-model:open="createOpen"
      title="Create a problem"
      description="Turn this feedback into a structured design problem."
    >
      <template #body>
        <div class="space-y-5">
          <UFormField
            label="Title"
            name="title"
            required
            description="At least 10 characters."
          >
            <UInput
              v-model="newProblem.title"
              placeholder="Rail networks have no niche once elytra flight is available"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Summary"
            name="summary"
            required
            description="One paragraph describing the design problem, not the report."
          >
            <UTextarea
              v-model="newProblem.summary"
              :rows="4"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Context"
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
              label="Status"
              name="status"
            >
              <USelect
                v-model="newProblem.status"
                :items="[...PROBLEM_STATUSES]"
                class="w-full"
              />
            </UFormField>
            <UFormField
              label="Severity"
              name="severity"
            >
              <USelect
                v-model="newProblem.severity"
                :items="[...PROBLEM_SEVERITIES]"
                placeholder="Unset"
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
          Cancel
        </UButton>
        <UButton
          :loading="creating"
          :disabled="newProblem.title.length < 10 || newProblem.summary.length < 20"
          @click="confirmCreate"
        >
          Create problem
        </UButton>
      </template>
    </UModal>
  </UContainer>
</template>
