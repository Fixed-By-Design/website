<script setup lang="ts">
import { LINKS } from '#shared/constants/project'

const { loggedIn } = useUserSession()

const areas = [
  { icon: 'i-lucide-code', label: 'Java and Fabric', text: 'Mixins, gameplay systems, networking and the four first-party mods.' },
  { icon: 'i-lucide-layout', label: 'Web development', text: 'This site: Nuxt 4, TypeScript, Drizzle and PostgreSQL.' },
  { icon: 'i-lucide-palette', label: 'UI and UX', text: 'In-game screens like the Catalogue and the Map Book, and the interfaces here.' },
  { icon: 'i-lucide-drafting-compass', label: 'Game design', text: 'Argue with the reasoning. Write proposals. Find the systems we broke.' },
  { icon: 'i-lucide-gamepad-2', label: 'Testing', text: 'Play it and tell us what is wrong. This is the most useful thing most people can do.' },
  { icon: 'i-lucide-book-open', label: 'Documentation', text: 'The wiki lives in Git as Markdown. Editing a page is a pull request.' },
  { icon: 'i-lucide-languages', label: 'Translation', text: 'The mods already ship English and French. More languages are welcome.' },
  { icon: 'i-lucide-brush', label: 'Art and textures', text: 'Item and block textures, GUI sprites and resource pack compatibility.' },
]

const workflow = [
  { title: 'Find something useful', text: 'Check the roadmap and the issues labelled good first contribution or help wanted. If nothing fits, playtesting always does.' },
  { title: 'Read the design context', text: 'Most changes exist for a documented reason. Read the feature page and any related design decision before changing behaviour.' },
  { title: 'Discuss when it matters', text: 'Small fixes need no discussion. Anything that changes how a system feels should start as an issue or a Discord conversation.' },
  { title: 'Work through GitHub', text: 'Fork, branch, and keep commits atomic. Build steps are in each repository CONTRIBUTING file.' },
  { title: 'Open a pull request', text: 'Target dev. Explain what changed and why, and link the problem or roadmap item it addresses.' },
  { title: 'Playtest', text: 'Gameplay changes get played before they get merged. That is the only way to know whether a redesign worked.' },
  { title: 'Merge and release', text: 'Merged work ships in the next modpack release, with player-readable notes in the changelog.' },
]

useSeoMeta({
  title: 'Contribute',
  description: 'How to contribute to Fixed by Design: development, design, testing, documentation, translation and art.',
})
</script>

<template>
  <div>
    <UPageHeader
      title="Contribute"
      description="Fixed by Design is open source and accepts volunteer contributions. Development happens on GitHub; the reasoning happens here."
      :ui="{ root: 'border-b border-[var(--ui-border)]' }"
    />

    <UContainer class="py-10">
      <div class="rounded-xl border border-gold-500/25 bg-gold-500/[0.06] p-8">
        <h2 class="text-2xl font-bold tracking-tight">
          Start here
        </h2>
        <p class="mt-3 max-w-2xl text-[var(--ui-text-muted)]">
          Sign in with GitHub to get an account. Contributors get access to project data and, once trusted, to feedback
          triage. You do not need an account to open a pull request.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <UButton v-if="!loggedIn" to="/auth/github" external size="lg" icon="i-simple-icons-github">
            Continue with GitHub
          </UButton>
          <UButton v-else to="/dashboard" size="lg" icon="i-lucide-layout-dashboard">
            Open the dashboard
          </UButton>
          <UButton :to="LINKS.github" target="_blank" rel="noopener" size="lg" color="neutral" variant="subtle">
            Browse the repositories
          </UButton>
        </div>
      </div>

      <section class="mt-16">
        <h2 class="text-2xl font-bold tracking-tight">
          Where help is needed
        </h2>
        <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div v-for="area in areas" :key="area.label" class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5">
            <UIcon :name="area.icon" class="size-5 text-gold-400" />
            <h3 class="mt-3 font-semibold text-[var(--ui-text-highlighted)]">
              {{ area.label }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-[var(--ui-text-muted)]">
              {{ area.text }}
            </p>
          </div>
        </div>
      </section>

      <section class="mt-16">
        <h2 class="text-2xl font-bold tracking-tight">
          How work moves
        </h2>
        <ol class="mt-6 space-y-4">
          <li
            v-for="(step, index) in workflow"
            :key="step.title"
            class="flex gap-4 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-5"
          >
            <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-sm font-semibold tabular-nums text-gold-400 ring-1 ring-gold-500/20">
              {{ index + 1 }}
            </span>
            <div>
              <h3 class="font-semibold text-[var(--ui-text-highlighted)]">
                {{ step.title }}
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-[var(--ui-text-muted)]">
                {{ step.text }}
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section class="mt-16 grid gap-4 md:grid-cols-3">
        <div class="rounded-xl border border-[var(--ui-border)] p-6">
          <UIcon name="i-simple-icons-github" class="size-5 text-gold-400" />
          <h3 class="mt-3 font-semibold">
            Good first contributions
          </h3>
          <p class="mt-2 text-sm text-[var(--ui-text-muted)]">
            Issues labelled <code class="rounded bg-[var(--ui-bg-elevated)] px-1.5 py-0.5 font-mono text-xs">good first contribution</code>
            and <code class="rounded bg-[var(--ui-bg-elevated)] px-1.5 py-0.5 font-mono text-xs">help wanted</code> across the repositories.
          </p>
          <UButton
            to="https://github.com/search?q=org%3AFixed-By-Design+is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22%2C%22help+wanted%22&type=issues"
            target="_blank"
            rel="noopener"
            color="neutral"
            variant="subtle"
            size="sm"
            class="mt-4"
          >
            Browse issues
          </UButton>
        </div>

        <div class="rounded-xl border border-[var(--ui-border)] p-6">
          <UIcon name="i-lucide-book-open" class="size-5 text-gold-400" />
          <h3 class="mt-3 font-semibold">
            Edit the wiki
          </h3>
          <p class="mt-2 text-sm text-[var(--ui-text-muted)]">
            Every wiki page is a Markdown file in this repository. There is an edit link at the bottom of each one.
          </p>
          <UButton to="/wiki" color="neutral" variant="subtle" size="sm" class="mt-4">
            Open the wiki
          </UButton>
        </div>

        <div class="rounded-xl border border-[var(--ui-border)] p-6">
          <UIcon name="i-simple-icons-discord" class="size-5 text-gold-400" />
          <h3 class="mt-3 font-semibold">
            Talk it through
          </h3>
          <p class="mt-2 text-sm text-[var(--ui-text-muted)]">
            Design conversations happen on Discord before they become proposals. Playtest sessions are organised there too.
          </p>
          <UButton :to="LINKS.discord" target="_blank" rel="noopener" color="neutral" variant="subtle" size="sm" class="mt-4">
            Join the Discord
          </UButton>
        </div>
      </section>
    </UContainer>
  </div>
</template>
