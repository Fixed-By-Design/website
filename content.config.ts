import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod/v4'
import { FEATURE_CATEGORIES, FEATURE_STATUSES, MODS, PILLARS } from './shared/constants/features'

const credit = z.object({
  name: z.string(),
  author: z.string(),
  url: z.string(),
  license: z.string().optional(),
  note: z.string(),
})

const githubRef = z.object({
  repository: z.string(),
  number: z.number(),
  url: z.string(),
})

const features = {
  type: 'page',
  source: 'features/**/*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(FEATURE_CATEGORIES),
    pillar: z.enum(PILLARS),
    mod: z.enum(MODS),
    status: z.enum(FEATURE_STATUSES),
    since: z.string().optional(),
    vanilla: z.string(),
    problem: z.string(),
    solution: z.string(),
    details: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    credits: z.array(credit).default([]),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    wiki: z.array(z.string()).default([]),
    problems: z.array(z.string()).default([]),
    decisions: z.array(z.string()).default([]),
    issue: githubRef.optional(),
    pullRequest: githubRef.optional(),
    order: z.number().default(100),
    featured: z.boolean().default(false),
  }),
} as const

const wiki = {
  type: 'page',
  source: 'wiki/**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    order: z.number().default(100),
    features: z.array(z.string()).default([]),
  }),
} as const

const design = {
  type: 'page',
  source: 'design/**/*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    decidedOn: z.string(),
    systems: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    issue: githubRef.optional(),
  }),
} as const

const changelog = {
  type: 'page',
  source: 'changelog/**/*.md',
  schema: z.object({
    title: z.string(),
    version: z.string(),
    date: z.string(),
    channel: z.enum(['stable', 'beta']),
    summary: z.string(),
    minecraft: z.string(),
    highlights: z.array(z.string()).default([]),
    fixes: z.array(z.string()).default([]),
    breaking: z.array(z.string()).default([]),
    modrinth: z.string().optional(),
    github: z.string().optional(),
  }),
} as const

const pages = {
  type: 'page',
  source: 'pages/**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
} as const

export default defineContentConfig({
  collections: {
    features: defineCollection(features),
    wiki: defineCollection(wiki),
    design: defineCollection(design),
    changelog: defineCollection(changelog),
    pages: defineCollection(pages),
    features_fr: defineCollection({ ...features, source: { include: 'fr/features/**/*.md', prefix: '/fr/features' } }),
    wiki_fr: defineCollection({ ...wiki, source: { include: 'fr/wiki/**/*.md', prefix: '/fr/wiki' } }),
    design_fr: defineCollection({ ...design, source: { include: 'fr/design/**/*.md', prefix: '/fr/design' } }),
    changelog_fr: defineCollection({ ...changelog, source: { include: 'fr/changelog/**/*.md', prefix: '/fr/changelog' } }),
    pages_fr: defineCollection({ ...pages, source: { include: 'fr/pages/**/*.md', prefix: '/fr/pages' } }),
  },
})
