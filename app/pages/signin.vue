<script setup lang="ts">
const route = useRoute()
const { loggedIn } = useUserSession()
const { githubConfigured } = useAuthAvailability()

if (loggedIn.value) {
  await navigateTo('/dashboard', { replace: true })
}

const error = computed(() => String(route.query.error ?? ''))
const notConfigured = computed(() => error.value === 'not-configured' || !githubConfigured.value)

useSeoMeta({ title: 'Sign in', robots: 'noindex, follow' })
</script>

<template>
  <UContainer class="flex min-h-[60vh] items-center justify-center py-16">
    <div class="w-full max-w-md">
      <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-8 text-center">
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

        <UAlert
          v-if="error === 'failed'"
          class="mt-6 text-start"
          color="error"
          variant="subtle"
          title="That sign-in did not complete"
          description="GitHub rejected the request or you cancelled it. Try again."
        />

        <UButton
          v-if="!notConfigured"
          to="/auth/github"
          external
          size="lg"
          icon="i-simple-icons-github"
          block
          class="mt-6"
        >
          Continue with GitHub
        </UButton>

        <p
          v-if="!notConfigured"
          class="mt-4 text-xs text-[var(--ui-text-dimmed)]"
        >
          We read your public profile only.
        </p>
      </div>

      <div
        v-if="notConfigured"
        class="mt-4 rounded-xl border border-[var(--ui-border-accented)] bg-[var(--ui-bg-elevated)] p-6 text-start"
      >
        <h2 class="font-semibold text-[var(--ui-text-highlighted)]">
          GitHub sign-in is not configured on this instance
        </h2>
        <p class="mt-2 text-sm text-[var(--ui-text-muted)]">
          The server has no GitHub OAuth credentials, so there is nothing to redirect to. If you are running this
          locally, create an OAuth app and fill in three values.
        </p>

        <ol class="mt-4 space-y-3 text-sm text-[var(--ui-text-muted)]">
          <li>
            <span class="font-medium text-[var(--ui-text-toned)]">1.</span>
            Create an OAuth app at
            <ULink
              to="https://github.com/settings/developers"
              target="_blank"
              rel="noopener"
              class="text-gold-400 underline-offset-2 hover:underline"
            >
              github.com/settings/developers
            </ULink>
            with this authorization callback URL:
            <code class="mt-1.5 block rounded-md bg-[var(--ui-bg)] px-2.5 py-1.5 font-mono text-xs text-gold-300">
              {{ `${useRequestURL().origin}/auth/github` }}
            </code>
          </li>
          <li>
            <span class="font-medium text-[var(--ui-text-toned)]">2.</span>
            Put the credentials in <code class="font-mono text-xs">.env</code>:
            <code class="mt-1.5 block rounded-md bg-[var(--ui-bg)] px-2.5 py-1.5 font-mono text-xs text-gold-300">
              NUXT_OAUTH_GITHUB_CLIENT_ID=<br>
              NUXT_OAUTH_GITHUB_CLIENT_SECRET=<br>
              NUXT_ADMIN_GITHUB_LOGINS=your-login
            </code>
          </li>
          <li>
            <span class="font-medium text-[var(--ui-text-toned)]">3.</span>
            Restart the server. Nuxt reads environment variables at boot, not on reload.
          </li>
        </ol>

        <p class="mt-4 text-xs text-[var(--ui-text-dimmed)]">
          Without your login in <code class="font-mono">NUXT_ADMIN_GITHUB_LOGINS</code>, the first sign-in creates a
          player account and the dashboard stays locked. It is re-checked on every sign-in.
        </p>
      </div>

      <p class="mt-6 text-center text-sm text-[var(--ui-text-dimmed)]">
        Everything except the dashboard works without an account.
        <ULink
          to="/feedback"
          class="text-gold-400 underline-offset-2 hover:underline"
        >
          Send feedback
        </ULink>
      </p>
    </div>
  </UContainer>
</template>
