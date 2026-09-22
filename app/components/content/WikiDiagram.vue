<script setup lang="ts">
const props = defineProps<{
  kind: 'installation' | 'enchanting-room' | 'smithing' | 'map-book' | 'elytra' | 'death' | 'trains' | 'world-progression' | 'patina'
}>()

const { locale } = useSiteLocale()

interface DiagramCopy {
  title: string
  steps?: string[]
  table?: string
  air?: string
  chiseled?: string
  regular?: string
  entrance?: string
  template?: string
  item?: string
  ingot?: string
  result?: string
  templates?: string[]
  collect?: string
  explore?: string
  share?: string
  holders?: string
  charge?: string
  launch?: string
  glide?: string
  boost?: string
  range?: string
  keep?: string
  keepText?: string
  drop?: string
  dropText?: string
  reset?: string
  resetText?: string
  stages?: string[]
  consist?: string
  carriage?: string
  passenger?: string
  coupling?: string
  spawn?: string
  normal?: string
  bonus?: string
  distance?: string
  density?: string
  dust?: string
  patina?: string
  caption?: string
}

const copy = computed<DiagramCopy>(() => {
  const french = locale.value === 'fr'

  const shared = {
    'installation': {
      title: french ? 'Installer en quatre étapes' : 'Install in four steps',
      steps: french
        ? ['Ouvrir la page Modrinth', 'Choisir la variante full', 'Installer dans le lanceur', 'Lancer une première fois']
        : ['Open the Modrinth page', 'Choose the full variant', 'Install in your launcher', 'Launch once'],
    },
    'enchanting-room': {
      title: french ? 'Vue du dessus d’une salle complète' : 'Top view of a complete room',
      table: french ? 'Table' : 'Table',
      air: french ? 'Laisser ce passage vide' : 'Keep this gap clear',
      chiseled: french ? 'Bibliothèque sculptée : enchantements' : 'Chiseled shelf: enchantments',
      regular: french ? 'Bibliothèque normale : réduction' : 'Regular shelf: discount',
      entrance: french ? 'Entrée' : 'Entrance',
    },
    'smithing': {
      title: french ? 'La recette ne consomme jamais d’expérience' : 'The recipe never costs experience',
      template: french ? 'Gabarit' : 'Template',
      item: french ? 'Objet compatible' : 'Eligible item',
      ingot: french ? 'Lingot = niveau' : 'Ingot = level',
      result: french ? 'Amélioration appliquée' : 'Upgrade applied',
      templates: french
        ? ['Affûtage', 'Blindage', 'Trempe', 'Meulage']
        : ['Honing', 'Warding', 'Tempering', 'Grinding'],
    },
    'map-book': {
      title: french ? 'Un atlas partagé, mis à jour en direct' : 'One shared atlas, updated live',
      collect: french ? 'Ajoutez des cartes' : 'Add maps',
      explore: french ? 'Explorez et annotez' : 'Explore and mark',
      share: french ? 'Dupliquez avec un livre' : 'Duplicate with a book',
      holders: french ? 'Chaque porteur voit les mêmes cartes et le même repère' : 'Every holder sees the same maps and marker',
    },
    'elytra': {
      title: french ? 'Le cycle du vol sans fusées' : 'The rocket-free flight loop',
      charge: french ? 'Chargez dans la fumée' : 'Charge in the smoke',
      launch: french ? 'Relâchez pour décoller' : 'Release to launch',
      glide: french ? 'Planez au-dessus des foyers' : 'Glide above hearths',
      boost: french ? 'Dépensez une charge Cheminée' : 'Spend a Smokestack charge',
      range: french ? 'Portée maximale d’un foyer : 34 blocs' : 'Maximum hearth range: 34 blocks',
    },
    'death': {
      title: french ? 'Ce qui se passe à la mort' : 'What happens when you die',
      keep: french ? 'Conservé' : 'Kept',
      keepText: french ? 'Armure, outils, armes, cartes et 50 % de l’expérience' : 'Armor, tools, weapons, maps and 50% of experience',
      drop: french ? 'Déposé au sol' : 'Dropped',
      dropText: french ? 'Blocs, nourriture, minerais, potions et autres ressources' : 'Blocks, food, ores, potions and other supplies',
      reset: french ? 'Réinitialisé' : 'Reset',
      resetText: french ? 'Tous les cœurs bonus' : 'All bonus hearts',
    },
    'trains': {
      title: french ? 'Les quatre vitesses du rail en cuivre' : 'The four copper rail speeds',
      stages: french
        ? ['Cuivre', 'Cuivre exposé', 'Cuivre altéré', 'Cuivre oxydé']
        : ['Copper', 'Exposed copper', 'Weathered copper', 'Oxidized copper'],
      consist: french ? 'Locomotive' : 'Locomotive',
      carriage: french ? 'Wagon' : 'Carriage',
      passenger: french ? 'Passagers' : 'Passengers',
      coupling: french ? 'Accroupi + clic droit pour atteler' : 'Sneak + right-click to couple',
    },
    'world-progression': {
      title: french ? 'Densité des minerais selon la distance au point d’apparition' : 'Ore density by distance from world spawn',
      spawn: french ? 'Apparition' : 'Spawn',
      normal: french ? 'Densité normale' : 'Normal density',
      bonus: french ? 'Bonus lointain' : 'Far-distance bonus',
      distance: french ? 'Distance' : 'Distance',
      density: french ? 'Densité' : 'Density',
    },
    'patina': {
      title: french ? 'Deux signaux peuvent se croiser sans se connecter' : 'Two signals can cross without connecting',
      dust: french ? 'Poudre de redstone' : 'Redstone dust',
      patina: french ? 'Patine de cuivre' : 'Copper patina',
      caption: french ? 'Chaque ligne conserve son propre signal au croisement.' : 'Each line keeps its own signal through the crossing.',
    },
  }

  return shared[props.kind]
})

const roomCells = computed(() => Array.from({ length: 25 }, (_, index) => {
  const row = Math.floor(index / 5)
  const column = index % 5
  if (row === 2 && column === 2) return 'table'
  if (row === 4 && column === 2) return 'entrance'
  if (row === 0 || row === 4 || column === 0 || column === 4) return index % 3 === 0 ? 'regular' : 'chiseled'
  return 'air'
}))

const templateImages = [
  '/media/wiki/textures/honing-template.png',
  '/media/wiki/textures/warding-template.png',
  '/media/wiki/textures/tempering-template.png',
  '/media/wiki/textures/grinding-template.png',
]

const railImages = [
  '/media/wiki/textures/copper-rail.png',
  '/media/wiki/textures/exposed-copper-rail.png',
  '/media/wiki/textures/weathered-copper-rail.png',
  '/media/wiki/textures/oxidized-copper-rail.png',
]

const railSpeeds = ['40 b/s', '20 b/s', '10 b/s', '5 b/s']
</script>

<template>
  <figure
    class="wiki-diagram my-8 overflow-hidden rounded-xl border border-default bg-elevated p-4 sm:p-6"
    role="img"
    :aria-label="copy.title"
  >
    <figcaption class="mb-5 text-center text-sm font-semibold tracking-wide text-highlighted">
      {{ copy.title }}
    </figcaption>

    <div
      v-if="kind === 'installation'"
      class="grid gap-3 sm:grid-cols-4"
    >
      <div
        v-for="(step, index) in copy.steps"
        :key="step"
        class="diagram-card relative text-center"
      >
        <span class="mx-auto mb-2 grid size-8 place-items-center rounded-full bg-primary font-bold text-inverted">{{ index + 1 }}</span>
        <span class="text-sm leading-5">{{ step }}</span>
        <UIcon
          v-if="index < 3"
          name="i-lucide-arrow-right"
          class="absolute -right-5 top-7 hidden size-4 text-primary sm:block"
        />
      </div>
    </div>

    <div
      v-else-if="kind === 'enchanting-room'"
      class="grid gap-5 lg:grid-cols-[minmax(220px,360px)_1fr] lg:items-center"
    >
      <div class="mx-auto grid w-full max-w-[360px] grid-cols-5 gap-1 rounded-lg bg-muted p-2">
        <div
          v-for="(cell, index) in roomCells"
          :key="index"
          class="grid aspect-square place-items-center rounded text-xs font-black sm:text-sm"
          :class="{
            'bg-amber-950 text-amber-200': cell === 'chiseled',
            'bg-amber-800 text-amber-50': cell === 'regular',
            'bg-navy-700 text-gold-300 ring-2 ring-gold-400': cell === 'table',
            'border border-dashed border-accented bg-default text-dimmed': cell === 'air',
            'bg-transparent text-primary': cell === 'entrance',
          }"
        >
          {{ cell === 'chiseled' ? 'S' : cell === 'regular' ? 'B' : cell === 'table' ? 'T' : cell === 'entrance' ? '↓' : '' }}
        </div>
      </div>
      <div class="space-y-3 text-sm">
        <div class="legend-row">
          <span class="legend-swatch bg-amber-950 text-amber-200">S</span>{{ copy.chiseled }}
        </div>
        <div class="legend-row">
          <span class="legend-swatch bg-amber-800 text-amber-50">B</span>{{ copy.regular }}
        </div>
        <div class="legend-row">
          <span class="legend-swatch bg-navy-700 text-gold-300">T</span>{{ copy.table }}
        </div>
        <div class="legend-row">
          <span class="legend-swatch border border-dashed border-accented">·</span>{{ copy.air }}
        </div>
        <div class="legend-row">
          <span class="legend-swatch text-primary">↓</span>{{ copy.entrance }}
        </div>
      </div>
    </div>

    <div
      v-else-if="kind === 'smithing'"
      class="space-y-5"
    >
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div
          v-for="(name, index) in copy.templates"
          :key="name"
          class="diagram-card flex items-center gap-3"
        >
          <img
            :src="templateImages[index]"
            alt=""
            class="pixel-art size-10 shrink-0 sm:size-12"
          >
          <span class="text-sm font-medium">{{ name }}</span>
        </div>
      </div>
      <div class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
        <div class="recipe-slot">
          <img
            src="/media/wiki/textures/honing-template.png"
            alt=""
            class="pixel-art size-8"
          >{{ copy.template }}
        </div>
        <span class="operator">+</span>
        <div class="recipe-slot">
          <UIcon
            name="i-lucide-sword"
            class="size-7 text-primary"
          />{{ copy.item }}
        </div>
        <span class="operator">+</span>
        <div class="recipe-slot">
          <UIcon
            name="i-lucide-box"
            class="size-7 text-amber-400"
          />{{ copy.ingot }}
        </div>
        <span class="operator">→</span>
        <div class="recipe-slot border-primary/70">
          <UIcon
            name="i-lucide-sparkles"
            class="size-7 text-primary"
          />{{ copy.result }}
        </div>
      </div>
    </div>

    <div
      v-else-if="kind === 'map-book'"
      class="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center"
    >
      <div class="diagram-card text-center">
        <UIcon
          name="i-lucide-map"
          class="mx-auto mb-2 size-8 text-primary"
        />{{ copy.collect }}
      </div>
      <UIcon
        name="i-lucide-arrow-right"
        class="mx-auto hidden size-5 text-primary sm:block"
      />
      <div class="diagram-card text-center">
        <img
          src="/media/wiki/textures/map-book.png"
          alt=""
          class="pixel-art mx-auto mb-2 size-12"
        >{{ copy.explore }}
      </div>
      <UIcon
        name="i-lucide-arrow-right"
        class="mx-auto hidden size-5 text-primary sm:block"
      />
      <div class="diagram-card text-center">
        <UIcon
          name="i-lucide-users"
          class="mx-auto mb-2 size-8 text-primary"
        />{{ copy.share }}
      </div>
      <p class="text-center text-xs text-muted sm:col-span-5">
        {{ copy.holders }}
      </p>
    </div>

    <div
      v-else-if="kind === 'elytra'"
      class="space-y-4"
    >
      <div class="grid gap-3 sm:grid-cols-4">
        <div class="diagram-card text-center">
          <UIcon
            name="i-lucide-flame"
            class="mx-auto mb-2 size-8 text-orange-400"
          />{{ copy.charge }}
        </div>
        <div class="diagram-card text-center">
          <UIcon
            name="i-lucide-arrow-up"
            class="mx-auto mb-2 size-8 text-primary"
          />{{ copy.launch }}
        </div>
        <div class="diagram-card text-center">
          <UIcon
            name="i-lucide-feather"
            class="mx-auto mb-2 size-8 text-sky-300"
          />{{ copy.glide }}
        </div>
        <div class="diagram-card text-center">
          <img
            src="/media/wiki/textures/smokestack-charge.png"
            alt=""
            class="pixel-art mx-auto mb-2 size-8"
          >{{ copy.boost }}
        </div>
      </div>
      <div class="mx-auto flex max-w-xl items-center gap-3 text-xs text-muted">
        <span>0</span><span class="h-2 flex-1 rounded-full bg-gradient-to-r from-orange-500 via-gold-400 to-sky-400" /><span>34</span>
      </div>
      <p class="text-center text-xs text-muted">
        {{ copy.range }}
      </p>
    </div>

    <div
      v-else-if="kind === 'death'"
      class="grid gap-3 sm:grid-cols-3"
    >
      <div class="diagram-card border-emerald-500/40">
        <UIcon
          name="i-lucide-shield-check"
          class="mb-3 size-8 text-emerald-400"
        /><strong>{{ copy.keep }}</strong><span class="mt-2 block text-sm text-muted">{{ copy.keepText }}</span>
      </div>
      <div class="diagram-card border-amber-500/40">
        <UIcon
          name="i-lucide-package-open"
          class="mb-3 size-8 text-amber-400"
        /><strong>{{ copy.drop }}</strong><span class="mt-2 block text-sm text-muted">{{ copy.dropText }}</span>
      </div>
      <div class="diagram-card border-violet-500/40">
        <img
          src="/media/wiki/textures/navy-heart.png"
          alt=""
          class="pixel-art mb-3 size-8"
        ><strong>{{ copy.reset }}</strong><span class="mt-2 block text-sm text-muted">{{ copy.resetText }}</span>
      </div>
    </div>

    <div
      v-else-if="kind === 'trains'"
      class="space-y-5"
    >
      <div class="grid gap-3 sm:grid-cols-4">
        <div
          v-for="(stage, index) in copy.stages"
          :key="stage"
          class="diagram-card text-center"
        >
          <img
            :src="railImages[index]"
            alt=""
            class="pixel-art mx-auto mb-2 size-12"
          >
          <strong class="block text-sm">{{ stage }}</strong>
          <span class="text-xs text-muted">{{ railSpeeds[index] }}</span>
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-2 text-sm">
        <span class="train-car border-primary/60">{{ copy.consist }}</span><span class="coupler" />
        <span class="train-car">{{ copy.carriage }}</span><span class="coupler" />
        <span class="train-car">{{ copy.passenger }}</span>
      </div>
      <p class="text-center text-xs text-muted">
        {{ copy.coupling }}
      </p>
    </div>

    <div
      v-else-if="kind === 'world-progression'"
      class="overflow-x-auto"
    >
      <svg
        viewBox="0 0 760 300"
        class="min-w-[560px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="oreArea"
            x1="0"
            y1="1"
            x2="1"
            y2="0"
          >
            <stop
              offset="0"
              stop-color="#3b3178"
              stop-opacity=".32"
            />
            <stop
              offset=".7"
              stop-color="#ebac22"
              stop-opacity=".4"
            />
            <stop
              offset="1"
              stop-color="#f7d65c"
              stop-opacity=".6"
            />
          </linearGradient>
        </defs>
        <path
          d="M72 242H720M72 32V242"
          fill="none"
          stroke="currentColor"
          stroke-opacity=".35"
          stroke-width="2"
        />
        <path
          d="M72 166 C145 166 172 120 250 120 S420 65 560 65 L720 44 L720 242 L72 242Z"
          fill="url(#oreArea)"
        />
        <path
          d="M72 166 C145 166 172 120 250 120 S420 65 560 65 L720 44"
          fill="none"
          stroke="#ebac22"
          stroke-width="5"
          stroke-linecap="round"
        />
        <path
          d="M72 65H720"
          stroke="currentColor"
          stroke-opacity=".25"
          stroke-dasharray="8 8"
        />
        <g
          fill="currentColor"
          font-size="16"
          font-family="Inter, sans-serif"
        >
          <text
            x="50"
            y="172"
            text-anchor="end"
          >45%</text><text
            x="50"
            y="70"
            text-anchor="end"
          >100%</text><text
            x="50"
            y="49"
            text-anchor="end"
          >110%</text>
          <text
            x="72"
            y="270"
            text-anchor="middle"
          >0</text><text
            x="250"
            y="270"
            text-anchor="middle"
          >2,000</text><text
            x="560"
            y="270"
            text-anchor="middle"
          >6,000</text><text
            x="720"
            y="270"
            text-anchor="middle"
          >10,000+</text>
          <text
            x="395"
            y="296"
            text-anchor="middle"
            opacity=".7"
          >{{ copy.distance }}</text>
          <text
            x="18"
            y="145"
            text-anchor="middle"
            opacity=".7"
            transform="rotate(-90 18 145)"
          >{{ copy.density }}</text>
          <text
            x="82"
            y="155"
            fill="#a9a4d5"
          >{{ copy.spawn }}</text><text
            x="566"
            y="55"
            fill="#f7d65c"
          >{{ copy.normal }}</text><text
            x="610"
            y="34"
            fill="#fde68a"
          >{{ copy.bonus }}</text>
        </g>
      </svg>
    </div>

    <div
      v-else-if="kind === 'patina'"
      class="space-y-5"
    >
      <div
        class="signal-cross mx-auto"
        aria-hidden="true"
      >
        <span class="signal-line signal-red" />
        <span class="signal-line signal-cyan" />
        <span class="signal-dot signal-dot-red" />
        <span class="signal-dot signal-dot-cyan" />
      </div>
      <div class="flex flex-wrap justify-center gap-4 text-sm">
        <span class="flex items-center gap-2"><span class="size-3 rounded-full bg-red-500" />{{ copy.dust }}</span>
        <span class="flex items-center gap-2"><span class="size-3 rounded-full bg-cyan-400" />{{ copy.patina }}</span>
      </div>
      <p class="text-center text-xs text-muted">
        {{ copy.caption }}
      </p>
    </div>
  </figure>
</template>

<style scoped>
.diagram-card {
  min-width: 0;
  border: 1px solid var(--ui-border);
  border-radius: .65rem;
  background: color-mix(in oklab, var(--ui-bg) 72%, transparent);
  padding: .85rem;
}

.pixel-art {
  image-rendering: pixelated;
}

.legend-row {
  display: flex;
  align-items: center;
  gap: .75rem;
}

.legend-swatch {
  display: grid;
  width: 2rem;
  height: 2rem;
  flex: 0 0 2rem;
  place-items: center;
  border-radius: .35rem;
  font-weight: 800;
}

.recipe-slot {
  display: flex;
  min-width: 8rem;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  gap: .6rem;
  border: 1px solid var(--ui-border);
  border-radius: .6rem;
  background: var(--ui-bg);
  padding: .7rem;
  text-align: center;
  font-size: .75rem;
}

.operator {
  align-self: center;
  color: var(--ui-text-muted);
  font-weight: 700;
}

.train-car {
  border: 1px solid var(--ui-border);
  border-radius: .45rem;
  background: var(--ui-bg);
  padding: .55rem .8rem;
}

.coupler {
  width: 1.25rem;
  height: 2px;
  background: var(--ui-text-muted);
}

.signal-cross {
  position: relative;
  width: min(100%, 30rem);
  height: 12rem;
  border-radius: .75rem;
  background:
    linear-gradient(to right, color-mix(in oklab, var(--ui-border) 55%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklab, var(--ui-border) 55%, transparent) 1px, transparent 1px),
    var(--ui-bg);
  background-size: 2rem 2rem;
}

.signal-line {
  position: absolute;
  border-radius: 999px;
  box-shadow: 0 0 1rem currentColor;
}

.signal-red {
  top: calc(50% - .35rem);
  left: 1.5rem;
  right: 1.5rem;
  height: .7rem;
  background: #ef4444;
  color: #ef4444;
}

.signal-cyan {
  top: 1.5rem;
  bottom: 1.5rem;
  left: calc(50% - .35rem);
  width: .7rem;
  border: 2px solid var(--ui-bg);
  background: #22d3ee;
  color: #22d3ee;
}

.signal-dot {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--ui-bg);
  border-radius: 50%;
}

.signal-dot-red {
  top: calc(50% - .5rem);
  right: 1.25rem;
  background: #ef4444;
}

.signal-dot-cyan {
  bottom: 1.25rem;
  left: calc(50% - .5rem);
  background: #22d3ee;
}
</style>
