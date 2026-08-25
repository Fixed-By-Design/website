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

const features = defineCollection({
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
})

const wiki = defineCollection({
  type: 'page',
  source: 'wiki/**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    order: z.number().default(100),
    features: z.array(z.string()).default([]),
  }),
})

const design = defineCollection({
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
})

const changelog = defineCollection({
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
})

const pages = defineCollection({
  type: 'page',
  source: 'pages/**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
})

export default defineContentConfig({
  collections: { features, wiki, design, changelog, pages },
})
