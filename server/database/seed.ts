import { createHash } from 'node:crypto'
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const url = process.env.NUXT_DATABASE_URL
if (!url) throw new Error('NUXT_DATABASE_URL is not set')

const client = postgres(url, { max: 1 })
const db = drizzle(client, { schema })

const TAGS = [
  { slug: 'enchanting', label: 'Enchanting' },
  { slug: 'balance', label: 'Balance' },
  { slug: 'multiplayer', label: 'Multiplayer' },
  { slug: 'transportation', label: 'Transportation' },
  { slug: 'exploration', label: 'Exploration' },
  { slug: 'ux', label: 'UX' },
]

const PROBLEMS = [
  {
    slug: 'multiplayer-sleep-interrupts-everyone',
    title: 'Multiplayer sleep forces unrelated players to interrupt what they are doing',
    summary: 'Skipping the night requires a share of the server to stop whatever they were doing and walk to a bed, which makes night a coordination tax rather than a phase of the game.',
    context: 'On a server with more than four active players, the percentage threshold means night is either skipped constantly by a small group or never skipped at all. Neither outcome reflects a decision anyone made.',
    evidence: 'Repeated playtest feedback during 1.7 and 1.8 sessions, both in game and on Discord.',
    status: 'designing' as const,
    severity: 'medium' as const,
    affectedSystems: ['multiplayer'],
  },
  {
    slug: 'treasure-fishing-unreachable-without-bait',
    title: 'Fishing treasure is unreachable without bait',
    summary: 'The pool selection maths puts the treasure band at zero width when no bait is held, so a player fishing normally can never roll a treasure result.',
    context: 'Bait is a new concept introduced by the fishing redesign. A player who has not discovered it experiences fishing as strictly worse than vanilla, with no signal explaining why.',
    evidence: 'Derived from the pool selection formula: with no bait, chanceGood is zero, so the treasure band cannot be reached.',
    status: 'confirmed' as const,
    severity: 'high' as const,
    affectedSystems: ['fishing'],
  },
  {
    slug: 'rail-networks-lose-to-elytra',
    title: 'Rail networks have no niche once elytra flight is available',
    summary: 'Even at 40 blocks per second, a train is slower than a campfire corridor and costs far more to build, so long-distance rail remains a hobby rather than infrastructure.',
    context: 'Copper rails and trains fixed the speed problem. They did not fix the cargo problem: an ender chest with shulker boxes still beats any train for moving goods.',
    evidence: 'Playtest observation across the 1.8 cycle. No playtester built a rail line longer than 400 blocks for a logistics reason.',
    status: 'investigating' as const,
    severity: 'medium' as const,
    affectedSystems: ['minecarts-trains'],
  },
  {
    slug: 'enchantment-discovery-has-no-in-game-signal',
    title: 'Players do not learn that books are permanent unlocks',
    summary: 'Nothing in game tells a player that putting a book in a chiseled bookshelf permanently unlocks that enchantment, so books get treated as one-time consumables and hoarded.',
    context: 'The Catalogue depends on a mental model the game never teaches. Players who miss it experience the system as strictly harder than vanilla enchanting.',
    evidence: 'Consistent across new-player sessions. Every tested player asked whether the book was consumed.',
    status: 'accepted' as const,
    severity: 'high' as const,
    affectedSystems: ['enchanting'],
  },
]

const ROADMAP = [
  {
    slug: 'reconsider-multiplayer-sleeping',
    title: 'Reconsider multiplayer sleeping',
    summary: 'Find a night-skip rule that does not require unrelated players to stop what they are doing, without making night meaningless.',
    status: 'in-progress' as const,
    domain: 'Multiplayer',
    targetVersion: '1.9.0',
    problemSlug: 'multiplayer-sleep-interrupts-everyone',
    sortOrder: 1,
  },
  {
    slug: 'teach-the-catalogue-in-game',
    title: 'Teach the Catalogue in game',
    summary: 'Give the enchanting rework an in-game explanation, so a player who never reads the wiki still understands that books are permanent unlocks.',
    status: 'accepted' as const,
    domain: 'Enchanting',
    targetVersion: '1.9.0',
    problemSlug: 'enchantment-discovery-has-no-in-game-signal',
    sortOrder: 2,
  },
  {
    slug: 'make-bait-discoverable',
    title: 'Make fishing bait discoverable',
    summary: 'Surface the bait system so that fishing without it is a choice rather than an accident, and treasure becomes reachable through normal play.',
    status: 'planned' as const,
    domain: 'Fishing',
    targetVersion: '1.9.0',
    problemSlug: 'treasure-fishing-unreachable-without-bait',
    sortOrder: 3,
  },
  {
    slug: 'cargo-role-for-rail-networks',
    title: 'Give rail networks a cargo role',
    summary: 'Make long-distance rail the best way to move volume, so trains have a niche that elytra flight cannot take.',
    status: 'exploring' as const,
    domain: 'Transportation',
    problemSlug: 'rail-networks-lose-to-elytra',
    sortOrder: 4,
  },
  {
    slug: 'grindstone-penalty-feedback',
    title: 'Explain the grindstone penalty in game',
    summary: 'Show the permanent slot cost before a player commits to grinding an item, rather than after they discover the missing pip.',
    status: 'playtesting' as const,
    domain: 'Enchanting',
    targetVersion: '1.8.1',
    problemSlug: 'enchantment-discovery-has-no-in-game-signal',
    sortOrder: 5,
  },
  {
    slug: 'rework-enchanting-progression',
    title: 'Rework enchanting progression',
    summary: 'Replace random enchanting with a catalogue of unlocked enchantments, reagents and slot budgets.',
    status: 'released' as const,
    domain: 'Enchanting',
    targetVersion: '1.8.0',
    sortOrder: 6,
  },
  {
    slug: 'minecarts-for-long-distance-transport',
    title: 'Make minecarts viable for long-distance transportation',
    summary: 'Copper rail speed tiers, self-propelling furnace locomotives and coupled trains.',
    status: 'released' as const,
    domain: 'Transportation',
    targetVersion: '1.8.0',
    sortOrder: 7,
  },
  {
    slug: 'improve-death-consequences',
    title: 'Improve death consequences',
    summary: 'Keep tools and half the experience, and make bonus hearts the thing death actually takes.',
    status: 'released' as const,
    domain: 'Survival',
    targetVersion: '1.8.0',
    sortOrder: 8,
  },
  {
    slug: 'per-player-difficulty-scaling',
    title: 'Per-player difficulty scaling',
    summary: 'Scale hostile mob strength to individual player progression rather than to world difficulty.',
    status: 'rejected' as const,
    domain: 'Combat',
    sortOrder: 9,
  },
]

const FEEDBACK = [
  {
    message: 'Villages feel too common near spawn now that ore is scarce there. I found four before I found iron.',
    type: 'balance' as const,
    source: 'minecraft' as const,
    version: '1.8.0',
    playerName: 'Playtester',
    server: 'playtest',
    dimension: 'minecraft:overworld',
    x: 120.5,
    y: 68,
    z: -348.2,
    problemSlug: null,
  },
  {
    message: 'Spent two hours fishing and never got a single treasure item. Is treasure fishing actually implemented?',
    type: 'bug' as const,
    source: 'minecraft' as const,
    version: '1.8.0',
    playerName: 'Playtester',
    server: 'playtest',
    dimension: 'minecraft:overworld',
    x: -812.3,
    y: 63,
    z: 1204.9,
    problemSlug: 'treasure-fishing-unreachable-without-bait',
  },
  {
    message: 'I put an enchanted book in a chiseled bookshelf expecting to lose it and was confused when it stayed. Nothing tells you that.',
    type: 'general' as const,
    source: 'web' as const,
    version: '1.8.0',
    problemSlug: 'enchantment-discovery-has-no-in-game-signal',
  },
  {
    message: 'Sleeping on the server is a mess. Half of us are underground and the other half want to skip the night.',
    type: 'general' as const,
    source: 'minecraft' as const,
    version: '1.8.0',
    playerName: 'Playtester',
    server: 'playtest',
    dimension: 'minecraft:overworld',
    x: 44.1,
    y: 71,
    z: 12.8,
    problemSlug: 'multiplayer-sleep-interrupts-everyone',
  },
  {
    message: 'Copper rails are great but I still just fly everywhere. Building a line never felt worth it.',
    type: 'balance' as const,
    source: 'web' as const,
    version: '1.8.0',
    problemSlug: 'rail-networks-lose-to-elytra',
  },
  {
    message: 'Bonus hearts on death feels exactly right. Losing them stings without ruining the session.',
    type: 'general' as const,
    source: 'web' as const,
    version: '1.8.0',
    problemSlug: null,
  },
  {
    message: 'Suggestion: let the Map Book show a legend for the custom banner marker types.',
    type: 'suggestion' as const,
    source: 'web' as const,
    version: '1.8.0',
    problemSlug: null,
  },
  {
    message: 'The grindstone penalty is not explained anywhere in game. I ground a sword twice before I understood.',
    type: 'general' as const,
    source: 'minecraft' as const,
    version: '1.8.0',
    playerName: 'Playtester',
    server: 'playtest',
    dimension: 'minecraft:overworld',
    x: 300.0,
    y: 12,
    z: -90.5,
    problemSlug: 'enchantment-discovery-has-no-in-game-signal',
  },
]

await db.execute(sql`
  truncate table
    ${schema.feedbackTags},
    ${schema.problemTags},
    ${schema.feedback},
    ${schema.roadmapItems},
    ${schema.externalLinks},
    ${schema.proposals},
    ${schema.designDecisions},
    ${schema.problems},
    ${schema.tags},
    ${schema.serverApiKeys}
  restart identity cascade
`)

const insertedTags = await db.insert(schema.tags).values(TAGS).returning()
const tagBySlug = new Map(insertedTags.map(tag => [tag.slug, tag]))

const insertedProblems = await db.insert(schema.problems).values(PROBLEMS).returning()
const problemBySlug = new Map(insertedProblems.map(problem => [problem.slug, problem]))

await db.insert(schema.roadmapItems).values(ROADMAP.map(({ problemSlug, ...item }) => ({
  ...item,
  problemId: problemSlug ? problemBySlug.get(problemSlug)?.id ?? null : null,
})))

const insertedFeedback = await db.insert(schema.feedback).values(FEEDBACK.map(({ problemSlug, ...item }) => ({
  ...item,
  problemId: problemSlug ? problemBySlug.get(problemSlug)?.id ?? null : null,
  status: problemSlug ? ('triaged' as const) : ('new' as const),
  triagedAt: problemSlug ? new Date() : null,
}))).returning()

await db.insert(schema.feedbackTags).values([
  { feedbackId: insertedFeedback[1]!.id, tagId: tagBySlug.get('balance')!.id },
  { feedbackId: insertedFeedback[2]!.id, tagId: tagBySlug.get('enchanting')!.id },
  { feedbackId: insertedFeedback[2]!.id, tagId: tagBySlug.get('ux')!.id },
  { feedbackId: insertedFeedback[3]!.id, tagId: tagBySlug.get('multiplayer')!.id },
  { feedbackId: insertedFeedback[4]!.id, tagId: tagBySlug.get('transportation')!.id },
])

await db.insert(schema.problemTags).values([
  { problemId: problemBySlug.get('multiplayer-sleep-interrupts-everyone')!.id, tagId: tagBySlug.get('multiplayer')!.id },
  { problemId: problemBySlug.get('treasure-fishing-unreachable-without-bait')!.id, tagId: tagBySlug.get('balance')!.id },
  { problemId: problemBySlug.get('rail-networks-lose-to-elytra')!.id, tagId: tagBySlug.get('transportation')!.id },
  { problemId: problemBySlug.get('enchantment-discovery-has-no-in-game-signal')!.id, tagId: tagBySlug.get('enchanting')!.id },
])

const devKey = 'fbd_localdevelopmentkeydonotuseinprod'
await db.insert(schema.serverApiKeys).values({
  name: 'Local playtest server',
  keyPrefix: devKey.slice(0, 12),
  keyHash: createHash('sha256').update(devKey).digest('hex'),
  serverLabel: 'playtest',
})

await client.end()

console.log(`Seeded ${insertedTags.length} tags, ${insertedProblems.length} problems, ${ROADMAP.length} roadmap items, ${insertedFeedback.length} feedback entries.`)
console.log(`Development API key: ${devKey}`)
