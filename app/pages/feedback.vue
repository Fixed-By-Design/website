<script setup lang="ts">
import { FEEDBACK_TYPES, FEEDBACK_TYPE_LABELS, type FeedbackType } from '#shared/constants/workflow'
import { MESSAGE_MAX, MESSAGE_MIN, webFeedbackSchema, type WebFeedbackInput } from '#shared/schemas/feedback'

const { t } = useSiteLocale()

const route = useRoute()

const state = reactive<WebFeedbackInput>({
  message: '',
  type: (FEEDBACK_TYPES.includes(route.query.type as FeedbackType) ? route.query.type : 'general') as FeedbackType,
  version: undefined,
  playerName: undefined,
  website: '',
})

const typeOptions = FEEDBACK_TYPES.map(value => ({ label: t(FEEDBACK_TYPE_LABELS[value]), value }))

function validate(input: WebFeedbackInput) {
  const result = webFeedbackSchema.safeParse(input)
  if (result.success) return []
  return result.error.issues.map(issue => ({
    name: String(issue.path[0]),
    message: issue.path[0] === 'message'
      ? t('Please enter between {min} and {max} characters.', { min: MESSAGE_MIN, max: MESSAGE_MAX })
      : issue.path[0] === 'playerName'
        ? t('Use 3 to 16 letters, numbers or underscores.')
        : issue.path[0] === 'version'
          ? t('Use at most 32 characters.')
          : t('That could not be sent. Check the message and try again.'),
  }))
}

const submitted = ref(false)
const pending = ref(false)
const errorMessage = ref('')

async function onSubmit() {
  pending.value = true
  errorMessage.value = ''
  try {
    await $fetch('/api/feedback', {
      method: 'POST',
      body: {
        ...state,
        playerName: state.playerName || undefined,
        version: state.version || undefined,
      },
    })
    submitted.value = true
  }
  catch (error) {
    const status = (error as { statusCode?: number }).statusCode
    errorMessage.value = status === 429
      ? t('You have sent several messages already. Try again shortly.')
      : t('That could not be sent. Check the message and try again.')
  }
  finally {
    pending.value = false
  }
}

function sendAnother() {
  state.message = ''
  state.website = ''
  submitted.value = false
}

useSeoMeta({
  title: t('Feedback'),
  description: t('Tell the Fixed by Design team what is working, what is not, and what you would change.'),
})
</script>

<template>
  <div>
    <div class="border-b border-[var(--ui-border)]">
      <UContainer>
        <UPageHeader
          :title="t('Feedback')"
          :description="t('Playtesting is how this project makes decisions. Every message is read.')"
        />
      </UContainer>
    </div>

    <UContainer class="py-10">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <UAlert
            v-if="submitted"
            color="success"
            variant="subtle"
            icon="i-lucide-check-circle-2"
            :title="t('Thanks. Your feedback was added to the playtest inbox.')"
            :description="t('It will be read and, if it points at something real, turned into a design problem.')"
          >
            <template #actions>
              <UButton
                color="neutral"
                variant="subtle"
                size="sm"
                @click="sendAnother"
              >
                {{ t('Send another') }}
              </UButton>
            </template>
          </UAlert>

          <UForm
            v-else
            :validate="validate"
            :state="state"
            class="space-y-6"
            @submit="onSubmit"
          >
            <UFormField
              :label="t('What kind of feedback is this?')"
              name="type"
              required
            >
              <URadioGroup
                v-model="state.type"
                :items="typeOptions"
                orientation="horizontal"
                variant="card"
              />
            </UFormField>

            <UFormField
              :label="t('Your feedback')"
              name="message"
              required
              :description="t('Between {min} and {max} characters. Be specific: what happened, what you expected, and where.', { min: MESSAGE_MIN, max: MESSAGE_MAX })"
            >
              <UTextarea
                v-model="state.message"
                :rows="8"
                :maxlength="MESSAGE_MAX"
                :placeholder="t('Copper rails are great but I still fly everywhere. Building a line never felt worth it because...')"
                class="w-full"
              />
              <template #hint>
                <span class="tabular-nums">{{ state.message.length }} / {{ MESSAGE_MAX }}</span>
              </template>
            </UFormField>

            <div class="grid gap-6 sm:grid-cols-2">
              <UFormField
                :label="t('Modpack version')"
                name="version"
                :description="t('If you know it.')"
              >
                <UInput
                  v-model="state.version"
                  :placeholder="t('e.g. 1.0.0')"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                :label="t('Minecraft username')"
                name="playerName"
                :description="t('Optional, so we can follow up in game.')"
              >
                <UInput
                  v-model="state.playerName"
                  placeholder="Steve"
                  class="w-full"
                />
              </UFormField>
            </div>

            <div
              aria-hidden="true"
              class="hidden"
            >
              <label for="website">{{ t('Leave this field empty') }}</label>
              <input
                id="website"
                v-model="state.website"
                type="text"
                tabindex="-1"
                autocomplete="off"
              >
            </div>

            <UAlert
              v-if="errorMessage"
              color="error"
              variant="subtle"
              icon="i-lucide-triangle-alert"
              :description="errorMessage"
            />

            <UButton
              type="submit"
              size="lg"
              :loading="pending"
              icon="i-lucide-send"
            >
              {{ t('Send feedback') }}
            </UButton>
          </UForm>
        </div>

        <aside class="space-y-6 text-sm">
          <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5">
            <h2 class="font-semibold text-[var(--ui-text-highlighted)]">
              {{ t('Feedback is not an issue') }}
            </h2>
            <p class="mt-2 leading-relaxed text-[var(--ui-text-muted)]">
              {{ t('Nothing here opens a GitHub issue automatically. Feedback is raw observation. When several messages point at the same thing, that becomes a design problem, and the problem is what gets worked on.') }}
            </p>
          </div>

          <div class="rounded-xl border border-[var(--ui-border)] p-5">
            <h2 class="font-semibold text-[var(--ui-text-highlighted)]">
              {{ t('From in game') }}
            </h2>
            <p class="mt-2 leading-relaxed text-[var(--ui-text-muted)]">
              {{ t('On a server running Fairlands, run:') }}
            </p>
            <code class="mt-3 block rounded-md bg-[var(--ui-bg-elevated)] px-3 py-2 font-mono text-xs text-gold-300">
              /feedback &lt;message&gt;
            </code>
            <p class="mt-3 leading-relaxed text-[var(--ui-text-muted)]">
              {{ t('That records where you were and what version you were on, which is often the part that makes a report actionable.') }}
            </p>
          </div>

          <div class="rounded-xl border border-[var(--ui-border)] p-5">
            <h2 class="font-semibold text-[var(--ui-text-highlighted)]">
              {{ t('Something broken in code?') }}
            </h2>
            <p class="mt-2 leading-relaxed text-[var(--ui-text-muted)]">
              {{ t('Crashes and reproducible bugs are better as GitHub issues on the mod that owns them.') }}
            </p>
            <UButton
              to="https://github.com/Fixed-By-Design"
              target="_blank"
              rel="noopener"
              color="neutral"
              variant="subtle"
              size="sm"
              icon="i-simple-icons-github"
              class="mt-3"
            >
              {{ t('Open an issue') }}
            </UButton>
          </div>
        </aside>
      </div>
    </UContainer>
  </div>
</template>
