import { z } from 'zod'
import { PROBLEM_SEVERITIES, PROBLEM_STATUSES, type FeedbackStatus } from '../constants/workflow'

export const TRIAGE_ACTIONS = ['dismiss', 'archive', 'reopen', 'mark-duplicate', 'attach-problem', 'detach-problem'] as const

export type TriageAction = (typeof TRIAGE_ACTIONS)[number]

export const triageSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('dismiss') }),
  z.object({ action: z.literal('archive') }),
  z.object({ action: z.literal('reopen') }),
  z.object({ action: z.literal('mark-duplicate'), duplicateOfId: z.uuid() }),
  z.object({ action: z.literal('attach-problem'), problemId: z.uuid() }),
  z.object({ action: z.literal('detach-problem') }),
])

export type TriageInput = z.infer<typeof triageSchema>

export interface TriagePatch {
  status: FeedbackStatus
  problemId?: string | null
  duplicateOfId?: string | null
  triaged: boolean
}

export function resolveTriage(input: TriageInput): TriagePatch {
  switch (input.action) {
    case 'dismiss':
      return { status: 'dismissed', triaged: true }
    case 'archive':
      return { status: 'archived', triaged: true }
    case 'reopen':
      return { status: 'new', duplicateOfId: null, triaged: false }
    case 'mark-duplicate':
      return { status: 'duplicate', duplicateOfId: input.duplicateOfId, triaged: true }
    case 'attach-problem':
      return { status: 'triaged', problemId: input.problemId, triaged: true }
    case 'detach-problem':
      return { status: 'new', problemId: null, triaged: false }
  }
}

export const createProblemFromFeedbackSchema = z.object({
  title: z.string().trim().min(10).max(200),
  summary: z.string().trim().min(20).max(1000),
  context: z.string().trim().max(4000).optional(),
  status: z.enum(PROBLEM_STATUSES).default('investigating'),
  severity: z.enum(PROBLEM_SEVERITIES).optional(),
  affectedSystems: z.array(z.string().trim().max(64)).max(10).default([]),
  feedbackId: z.uuid().optional(),
})

export type CreateProblemInput = z.infer<typeof createProblemFromFeedbackSchema>

export function slugifyProblemTitle(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
