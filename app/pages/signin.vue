<script setup lang="ts">
useSeoMeta({ title: 'Sign in', robots: 'noindex, follow' })
</script>

<template>
  <UContainer class="flex min-h-[60vh] items-center justify-center py-16">
    <div class="w-full max-w-md rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-8 text-center">
      <SiteLogo
        :height="34"
        class="mx-auto"
      />
      <h1 class="mt-6 text-2xl font-bold">
        Sign in
      </h1>
      <p class="mt-3 text-sm text-[var(--ui-text-muted)]">
        Fixed by Design uses GitHub for authentication. Contributors and maintainers get access to the dashboard;
        everyone else gets an account for feedback and discussion.
      </p>
      <UButton
        to="/auth/github"
        external
        size="lg"
        icon="i-simple-icons-github"
        block
        class="mt-6"
      >
        Continue with GitHub
      </UButton>
      <p class="mt-4 text-xs text-[var(--ui-text-dimmed)]">
        We read your public profile only.
      </p>
    </div>
  </UContainer>
</template>
