import type { FeedbackSource, FeedbackStatus, FeedbackType, ProblemSeverity, ProblemStatus } from '../constants/workflow'

export interface FeedbackTag {
  slug: string
  label: string
}

export interface FeedbackEntry {
  id: string
  message: string
  type: FeedbackType
  source: FeedbackSource
  status: FeedbackStatus
  version: string | null
  playerName: string | null
  dimension: string | null
  x: number | null
  y: number | null
  z: number | null
  createdAt: string
  tags: FeedbackTag[]
  problem: { id: string, slug: string, publicId: number, title: string } | null
}

export interface FeedbackPage {
  items: FeedbackEntry[]
  total: number
  counts: Record<FeedbackStatus, number>
}

export interface ProblemSummary {
  id: string
  publicId: number
  slug: string
  title: string
  summary: string
  status: ProblemStatus
  severity: ProblemSeverity | null
  affectedSystems: string[]
  feedbackCount: number
  createdAt: string
  updatedAt: string
}
