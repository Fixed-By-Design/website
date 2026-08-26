<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { ROLE_RANK } from '#shared/constants/workflow'

const { mobile = false } = defineProps<{ mobile?: boolean }>()

const { loggedIn, user, clear } = useUserSession()
const { githubConfigured } = useAuthAvailability()

const canTriage = computed(() => (user.value ? ROLE_RANK[user.value.role] >= ROLE_RANK.maintainer : false))

const signInTo = computed(() => (githubConfigured.value ? '/auth/github' : '/signin'))

const items = computed<DropdownMenuItem[][]>(() => [
  [{ label: user.value?.name || user.value?.login || '', type: 'label' }],
  [
    { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
    ...(canTriage.value
      ? [{ label: 'Feedback triage', icon: 'i-lucide-inbox', to: '/dashboard/feedback' }]
      : []),
    { label: 'Problems', icon: 'i-lucide-target', to: '/dashboard/problems' },
  ],
  [{ label: 'Sign out', icon: 'i-lucide-log-out', onSelect: () => clear() }],
])
</script>

<template>
  <div
    v-if="mobile"
    class="flex flex-col gap-2"
  >
    <template v-if="loggedIn && user">
      <div class="flex items-center gap-2 px-1 text-sm text-[var(--ui-text-muted)]">
        <UAvatar
          :src="user.avatarUrl ?? undefined"
          :alt="user.login"
          size="2xs"
        />
        {{ user.name || user.login }}
      </div>
      <UButton
        to="/dashboard"
        color="neutral"
        variant="subtle"
        icon="i-lucide-layout-dashboard"
        block
      >
        Dashboard
      </UButton>
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-log-out"
        block
        @click="clear()"
      >
        Sign out
      </UButton>
    </template>

    <UButton
      v-else
      :to="signInTo"
      :external="githubConfigured"
      color="neutral"
      variant="ghost"
      icon="i-lucide-log-in"
      block
    >
      Maintainer sign-in
    </UButton>
  </div>

  <UDropdownMenu
    v-else-if="loggedIn && user"
    :items="items"
    :ui="{ content: 'w-52' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      class="p-1"
      :aria-label="`Account menu for ${user.login}`"
    >
      <UAvatar
        :src="user.avatarUrl ?? undefined"
        :alt="user.login"
        size="xs"
      />
    </UButton>
  </UDropdownMenu>

  <UButton
    v-else
    :to="signInTo"
    :external="githubConfigured"
    color="neutral"
    variant="ghost"
    icon="i-lucide-log-in"
    class="shrink-0 whitespace-nowrap"
    aria-label="Sign in with GitHub"
  />
</template>
