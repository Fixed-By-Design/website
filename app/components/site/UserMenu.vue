<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { ROLE_RANK } from '#shared/constants/workflow'

const { loggedIn, user, clear } = useUserSession()

const canTriage = computed(() => (user.value ? ROLE_RANK[user.value.role] >= ROLE_RANK.maintainer : false))

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
  <UDropdownMenu v-if="loggedIn && user" :items="items" :ui="{ content: 'w-52' }">
    <UButton color="neutral" variant="ghost" class="p-1" :aria-label="`Account menu for ${user.login}`">
      <UAvatar :src="user.avatarUrl ?? undefined" :alt="user.login" size="xs" />
    </UButton>
  </UDropdownMenu>

  <UButton
    v-else
    to="/auth/github"
    external
    color="neutral"
    variant="ghost"
    icon="i-lucide-log-in"
    class="shrink-0 whitespace-nowrap"
    aria-label="Sign in with GitHub"
  />
</template>
