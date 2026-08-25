export const USER_ROLES = ['visitor', 'player', 'contributor', 'maintainer', 'admin'] as const

export type UserRole = (typeof USER_ROLES)[number]

export const ROLE_RANK: Record<UserRole, number> = {
  visitor: 0,
  player: 1,
  contributor: 2,
  maintainer: 3,
  admin: 4,
}

export const FEEDBACK_TYPES = ['general', 'bug', 'balance', 'suggestion'] as const

export type FeedbackType = (typeof FEEDBACK_TYPES)[number]

export const FEEDBACK_TYPE_LABELS: Record<FeedbackType, string> = {
  general: 'General feedback',
  bug: 'Bug',
  balance: 'Balance',
  suggestion: 'Suggestion',
}

export const FEEDBACK_SOURCES = ['web', 'minecraft'] as const

export type FeedbackSource = (typeof FEEDBACK_SOURCES)[number]

export const FEEDBACK_STATUSES = ['new', 'triaged', 'archived', 'dismissed', 'duplicate'] as const

export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number]

export const FEEDBACK_STATUS_LABELS: Record<FeedbackStatus, string> = {
  new: 'New',
  triaged: 'Triaged',
  archived: 'Archived',
  dismissed: 'Dismissed',
  duplicate: 'Duplicate',
}

export const PROBLEM_STATUSES = ['investigating', 'confirmed', 'designing', 'accepted', 'rejected', 'solved'] as const

export type ProblemStatus = (typeof PROBLEM_STATUSES)[number]

export const PROBLEM_STATUS_LABELS: Record<ProblemStatus, string> = {
  investigating: 'Investigating',
  confirmed: 'Confirmed',
  designing: 'Designing',
  accepted: 'Accepted',
  rejected: 'Rejected',
  solved: 'Solved',
}

export const PROBLEM_SEVERITIES = ['low', 'medium', 'high', 'critical'] as const

export type ProblemSeverity = (typeof PROBLEM_SEVERITIES)[number]

export const ROADMAP_STATUSES = [
  'exploring',
  'accepted',
  'planned',
  'in-progress',
  'playtesting',
  'released',
  'rejected',
] as const

export type RoadmapStatus = (typeof ROADMAP_STATUSES)[number]

export const ROADMAP_STATUS_LABELS: Record<RoadmapStatus, string> = {
  'exploring': 'Exploring',
  'accepted': 'Accepted',
  'planned': 'Planned',
  'in-progress': 'In Progress',
  'playtesting': 'Playtesting',
  'released': 'Released',
  'rejected': 'Rejected',
}

export const ROADMAP_BOARD_STATUSES = [
  'exploring',
  'accepted',
  'planned',
  'in-progress',
  'playtesting',
  'released',
] as const satisfies readonly RoadmapStatus[]

export const PROPOSAL_STATUSES = ['draft', 'considered', 'accepted', 'rejected'] as const

export type ProposalStatus = (typeof PROPOSAL_STATUSES)[number]

export const PUBLICATION_STATUSES = ['draft', 'internal', 'public'] as const

export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number]

export const EXTERNAL_LINK_KINDS = ['issue', 'pull-request', 'discussion', 'release', 'other'] as const

export type ExternalLinkKind = (typeof EXTERNAL_LINK_KINDS)[number]

export const LINKABLE_ENTITY_TYPES = ['problem', 'roadmap-item', 'proposal', 'design-decision'] as const

export type LinkableEntityType = (typeof LINKABLE_ENTITY_TYPES)[number]
