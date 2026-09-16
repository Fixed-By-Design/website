<script setup lang="ts">
import { LINKS, MODPACK_AVAILABLE, PROJECT } from '#shared/constants/project'
import { PILLAR_DEFINITIONS } from '#shared/constants/pillars'

const { t, localPath, locale, collection } = useSiteLocale()

const VISIBLE_EXAMPLES = 4
const expanded = ref(false)

const { data: examples } = await useAsyncData(`home-examples-${locale.value}`, () =>
  queryCollection(collection('features'))
    .select('path', 'title', 'vanilla', 'problem', 'solution', 'order')
    .where('featured', '=', true)
    .order('order', 'ASC')
    .all(), { default: () => [] })

const visibleExamples = computed(() =>
  expanded.value ? examples.value : examples.value.slice(0, VISIBLE_EXAMPLES))

const hiddenCount = computed(() => Math.max(examples.value.length - VISIBLE_EXAMPLES, 0))

useSeoMeta({
  title: t('Minecraft Survival, fixed by design'),
  description: t(PROJECT.description),
  ogTitle: `${PROJECT.name} - ${t(PROJECT.tagline)}`,
  ogDescription: t(PROJECT.description),
  ogImage: '/media/og-catalogue.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: t('The Catalogue enchanting screen in Fixed by Design'),
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-[var(--ui-border)]">
      <div
        class="brand-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(235,172,34,0.12),transparent)]"
        aria-hidden="true"
      />

      <UContainer class="relative py-20 sm:py-28">
        <div
          v-intro.children="{ delay: 0.1, stagger: 0.09 }"
          class="mx-auto max-w-3xl text-center"
        >
          <SiteLogo
            :height="72"
            class="mx-auto"
          />

          <h1 class="mt-10 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            {{ t('Minecraft Survival,') }} <span class="brand-gradient-text">{{ t('fixed by design') }}</span>.
          </h1>

          <p class="mx-auto mt-6 max-w-2xl text-lg text-pretty text-[var(--ui-text-muted)]">
            {{ t(PROJECT.description) }}
          </p>

          <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <UButton
              :to="localPath('/features')"
              size="xl"
              :color="MODPACK_AVAILABLE ? 'neutral' : 'primary'"
              :variant="MODPACK_AVAILABLE ? 'subtle' : 'solid'"
              trailing-icon="i-lucide-arrow-right"
              class="font-semibold"
            >
              {{ t('Explore the changes') }}
            </UButton>
            <SiteDownloadButton size="xl" />
          </div>

          <p class="mt-6 text-sm text-[var(--ui-text-dimmed)]">
            <ULink
              :to="localPath(LINKS.github)"
              target="_blank"
              rel="noopener"
              class="hover:text-gold-400"
            >
              {{ t('View on GitHub') }}
            </ULink>
            <span
              class="mx-2"
              aria-hidden="true"
            >&middot;</span>
            Fabric {{ PROJECT.fabricLoaderVersion }} {{ t('on Minecraft') }} {{ PROJECT.minecraftVersion }}
          </p>
        </div>

        <figure
          v-reveal="{ y: 26 }"
          class="mx-auto mt-16 max-w-5xl"
        >
          <NuxtImg
            src="/media/catalogue-screen.png"
            :alt="t('The Catalogue in game: an enchanting table screen listing enchantments from the surrounding chiseled bookshelves, with a tooltip showing the reagent, experience and slot cost of Mending I')"
            width="2000"
            height="1081"
            sizes="100vw md:768px lg:1024px"
            format="webp"
            quality="85"
            class="w-full rounded-xl border border-[var(--ui-border-accented)]"
          />
          <figcaption class="mt-3 text-center text-sm text-[var(--ui-text-dimmed)]">
            {{ t('The Catalogue: every enchantment your bookshelves can teach, with its exact price.') }}
          </figcaption>
        </figure>
      </UContainer>
    </section>

    <section class="border-b border-[var(--ui-border)]">
      <UContainer class="py-20">
        <div class="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div v-reveal>
            <p class="text-sm font-semibold uppercase tracking-wider text-gold-400">
              {{ t('The idea') }}
            </p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {{ t('Minecraft Survival has incredible foundations.') }}
            </h2>
            <p class="mt-6 leading-relaxed text-[var(--ui-text-muted)]">
              {{ t('Fixed by Design rethinks the systems that get in their way. It is not a different game, a kitchen-sink modpack, or a collection of buffs. It is a redesign that keeps every system\'s original purpose and fixes what that system actually encourages you to do.') }}
            </p>
            <p class="mt-4 leading-relaxed text-[var(--ui-text-muted)]">
              {{ t('Every change starts from the same four questions: what was this system trying to achieve, what behaviour does it actually reward, where does it become tedious or dominant, and can it be improved without making Minecraft feel like something else.') }}
            </p>
          </div>

          <ul
            v-reveal.children="{ stagger: 0.05 }"
            class="grid gap-3 sm:grid-cols-2 lg:content-start"
          >
            <li
              v-for="item in [
                { label: t('Dominant strategies'), text: t('One correct answer crowds out every alternative.') },
                { label: t('Trivialised progression'), text: t('A single item ends a whole progression curve.') },
                { label: t('Multiplayer friction'), text: t('Rules built for one player, applied to twenty.') },
                { label: t('Forgotten mechanics'), text: t('Whole systems nobody has a reason to touch.') },
                { label: t('Tedium without decisions'), text: t('Time spent that never asks you to choose.') },
                { label: t('Systems undermining systems'), text: t('One feature quietly deleting another.') },
              ]"
              :key="item.label"
              class="rounded-lg border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-4"
            >
              <p class="text-sm font-medium text-[var(--ui-text-highlighted)]">
                {{ item.label }}
              </p>
              <p class="mt-1.5 text-sm text-[var(--ui-text-dimmed)]">
                {{ item.text }}
              </p>
            </li>
          </ul>
        </div>
      </UContainer>
    </section>

    <section class="border-b border-[var(--ui-border)]">
      <UContainer class="py-20">
        <div
          v-reveal
          class="max-w-2xl"
        >
          <p class="text-sm font-semibold uppercase tracking-wider text-gold-400">
            {{ t('Designed systems') }}
          </p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {{ t('Four pillars, rebuilt system by system.') }}
          </h2>
        </div>

        <div
          v-reveal.children="{ stagger: 0.08 }"
          class="mt-10 grid gap-5 md:grid-cols-2"
        >
          <SitePillarCard
            v-for="pillar in PILLAR_DEFINITIONS"
            :key="pillar.id"
            :pillar="pillar"
          />
        </div>
      </UContainer>
    </section>

    <section class="border-b border-[var(--ui-border)]">
      <UContainer class="py-20">
        <div
          v-reveal.children="{ stagger: 0.1 }"
          class="grid gap-5 md:grid-cols-2"
        >
          <div class="rounded-xl border border-gold-500/25 bg-gold-500/[0.06] p-8">
            <h2 class="text-2xl font-bold tracking-tight">
              {{ t('Play it') }}
            </h2>
            <p class="mt-3 text-[var(--ui-text-muted)]">
              {{ t('The') }} {{ PROJECT.modpackName }} {{ t('modpack bundles the four first-party mods with a curated set of third-party mods, shaders and quality-of-life improvements. It is not published yet.') }}
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <SiteDownloadButton :label="t('Download')" />
              <UButton
                :to="localPath('/wiki/getting-started')"
                color="neutral"
                variant="subtle"
              >
                {{ t('Installation guide') }}
              </UButton>
            </div>
          </div>

          <div class="rounded-xl border border-[var(--ui-border)] bg-[var(--ui-bg-muted)] p-8">
            <h2 class="text-2xl font-bold tracking-tight">
              {{ t('Shape it') }}
            </h2>
            <p class="mt-3 text-[var(--ui-text-muted)]">
              {{ t('Fixed by Design runs on playtesting. Feedback becomes design problems, design problems become decisions, and the reasoning is published.') }}
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <UButton
                :to="localPath('/feedback')"
                color="neutral"
                variant="solid"
                icon="i-lucide-message-square"
              >
                {{ t('Send feedback') }}
              </UButton>
              <UButton
                :to="localPath('/contribute')"
                color="neutral"
                variant="subtle"
              >
                {{ t('Contribute') }}
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
    <section>
      <UContainer class="py-20">
        <div
          v-reveal
          class="max-w-2xl"
        >
          <p class="text-sm font-semibold uppercase tracking-wider text-gold-400">
            {{ t('How a change is made') }}
          </p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {{ t('Vanilla, the problem, and the fix.') }}
          </h2>
          <p class="mt-4 text-[var(--ui-text-muted)]">
            {{ t('Every feature is documented the same way. Here is what that looks like in practice.') }}
          </p>
        </div>

        <div
          v-reveal.children="{ stagger: 0.08, y: 22 }"
          class="mt-10 space-y-5"
        >
          <SiteRedesignExample
            v-for="example in visibleExamples"
            :key="example.path"
            :title="example.title"
            :vanilla="example.vanilla"
            :problem="example.problem"
            :solution="example.solution"
            :to="localPath(example.path)"
          />
        </div>

        <div
          v-if="hiddenCount"
          class="mt-6 flex justify-center"
        >
          <UButton
            color="neutral"
            variant="subtle"
            :trailing-icon="expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            @click="expanded = !expanded"
          >
            {{ expanded ? t('Show less') : t('Show {count} more', { count: hiddenCount }) }}
          </UButton>
        </div>

        <div
          v-reveal
          class="mt-14 flex flex-col items-center gap-4 border-t border-[var(--ui-border)] pt-10 text-center"
        >
          <p class="max-w-xl text-[var(--ui-text-muted)]">
            {{ t('Every change on this list has a page explaining what vanilla did, why it was a problem, and what replaced it.') }}
          </p>
          <UButton
            :to="localPath('/features')"
            size="lg"
            trailing-icon="i-lucide-arrow-right"
            class="font-semibold"
          >
            {{ t('Read every change') }}
          </UButton>
        </div>
      </UContainer>
    </section>
  </div>
</template>
