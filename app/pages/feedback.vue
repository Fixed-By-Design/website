<script setup lang="ts">
import { FEEDBACK_TYPES, FEEDBACK_TYPE_LABELS, type FeedbackType } from '#shared/constants/workflow'
import { MESSAGE_MAX, MESSAGE_MIN, webFeedbackSchema, type WebFeedbackInput } from '#shared/schemas/feedback'

const route = useRoute()

const state = reactive<WebFeedbackInput>({
  message: '',
  type: (FEEDBACK_TYPES.includes(route.query.type as FeedbackType) ? route.query.type : 'general') as FeedbackType,
  version: undefined,
  playerName: undefined,
  website: '',
})

const typeOptions = FEEDBACK_TYPES.map(value => ({ label: FEEDBACK_TYPE_LABELS[value], value }))

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
      ? 'You have sent several messages already. Try again shortly.'
      : 'That could not be sent. Check the message and try again.'
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
  title: 'Feedback',
  description: 'Tell the Fixed by Design team what is working, what is not, and what you would change.',
})
</script>

<template>
  <div>
    <div class="border-b border-[var(--ui-border)]">
      <UContainer>
        <UPageHeader
          title="Feedback"
          description="Playtesting is how this project makes decisions. Every message is read."
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
            title="Thanks. Your feedback was added to the playtest inbox."
            description="It will be read and, if it points at something real, turned into a design problem."
          >
            <template #actions>
              <UButton
                color="neutral"
                variant="subtle"
                size="sm"
                @click="sendAnother"
              >
                Send another
              </UButton>
            </template>
          </UAlert>

          <UForm
            v-else
            :schema="webFeedbackSchema"
            :state="state"
            class="space-y-6"
            @submit="onSubmit"
          >
            <UFormField
              label="What kind of feedback is this?"
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
              label="Your feedback"
              name="message"
              required
              :description="`Between ${MESSAGE_MIN} and ${MESSAGE_MAX} characters. Be specific: what happened, what you expected, and where.`"
            >
              <UTextarea
                v-model="state.message"
                :rows="8"
                :maxlength="MESSAGE_MAX"
                placeholder="Copper rails are great but I still fly everywhere. Building a line never felt worth it because..."
                class="w-full"
              />
              <template #hint>
                <span class="tabular-nums">{{ state.message.length }} / {{ MESSAGE_MAX }}</span>
              </template>
            </UFormField>

            <div class="grid gap-6 sm:grid-cols-2">
              <UFormField
                label="Modpack version"
                name="version"
                description="If you know it."
              >
                <UInput
                  v-model="state.version"
                  placeholder="e.g. 1.0.0"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Minecraft username"
                name="playerName"
                description="Optional, so we can follow up in game."
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
              <label for="website">Leave this field empty</label>
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
              Send feedback
            </UButton>
          </UForm>
        </div>

        <aside class="space-y-6 text-sm">
          <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5">
            <h2 class="font-semibold text-[var(--ui-text-highlighted)]">
              Feedback is not an issue
            </h2>
            <p class="mt-2 leading-relaxed text-[var(--ui-text-muted)]">
              Nothing here opens a GitHub issue automatically. Feedback is raw observation. When several messages point
              at the same thing, that becomes a design problem, and the problem is what gets worked on.
            </p>
          </div>

          <div class="rounded-xl border border-[var(--ui-border)] p-5">
            <h2 class="font-semibold text-[var(--ui-text-highlighted)]">
              From in game
            </h2>
            <p class="mt-2 leading-relaxed text-[var(--ui-text-muted)]">
              On a server running Fairlands, run:
            </p>
            <code class="mt-3 block rounded-md bg-[var(--ui-bg-elevated)] px-3 py-2 font-mono text-xs text-gold-300">
              /feedback &lt;message&gt;
            </code>
            <p class="mt-3 leading-relaxed text-[var(--ui-text-muted)]">
              That records where you were and what version you were on, which is often the part that makes a report
              actionable.
            </p>
          </div>

          <div class="rounded-xl border border-[var(--ui-border)] p-5">
            <h2 class="font-semibold text-[var(--ui-text-highlighted)]">
              Something broken in code?
            </h2>
            <p class="mt-2 leading-relaxed text-[var(--ui-text-muted)]">
              Crashes and reproducible bugs are better as GitHub issues on the mod that owns them.
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
              Open an issue
            </UButton>
          </div>
        </aside>
      </div>
    </UContainer>
  </div>
</template>
