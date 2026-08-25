import { describe, expect, it } from 'vitest'
import { createProblemFromFeedbackSchema, resolveTriage, slugifyProblemTitle, triageSchema } from '../../shared/schemas/triage'

const uuid = '11111111-1111-4111-8111-111111111111'

describe('resolveTriage', () => {
  it('dismisses without touching the attached problem', () => {
    const patch = resolveTriage({ action: 'dismiss' })
    expect(patch).toEqual({ status: 'dismissed', triaged: true })
    expect(patch).not.toHaveProperty('problemId')
  })

  it('archives rather than deleting', () => {
    expect(resolveTriage({ action: 'archive' }).status).toBe('archived')
  })

  it('attaching a problem marks the entry triaged', () => {
    expect(resolveTriage({ action: 'attach-problem', problemId: uuid })).toEqual({
      status: 'triaged',
      problemId: uuid,
      triaged: true,
    })
  })

  it('detaching a problem returns the entry to the inbox', () => {
    expect(resolveTriage({ action: 'detach-problem' })).toEqual({
      status: 'new',
      problemId: null,
      triaged: false,
    })
  })

  it('marking a duplicate records what it duplicates', () => {
    expect(resolveTriage({ action: 'mark-duplicate', duplicateOfId: uuid })).toEqual({
      status: 'duplicate',
      duplicateOfId: uuid,
      triaged: true,
    })
  })

  it('reopening clears the duplicate link', () => {
    expect(resolveTriage({ action: 'reopen' })).toEqual({
      status: 'new',
      duplicateOfId: null,
      triaged: false,
    })
  })

  it('never resolves to a hard delete', () => {
    const statuses = (['dismiss', 'archive', 'reopen', 'detach-problem'] as const)
      .map(action => resolveTriage({ action }).status)
    expect(statuses).toEqual(['dismissed', 'archived', 'new', 'new'])
  })
})

describe('triageSchema', () => {
  it('requires a problem id when attaching', () => {
    expect(triageSchema.safeParse({ action: 'attach-problem' }).success).toBe(false)
  })

  it('rejects an unknown action', () => {
    expect(triageSchema.safeParse({ action: 'delete' }).success).toBe(false)
  })

  it('rejects a non-uuid duplicate target', () => {
    expect(triageSchema.safeParse({ action: 'mark-duplicate', duplicateOfId: '12' }).success).toBe(false)
  })
})

describe('slugifyProblemTitle', () => {
  it('lowercases and hyphenates', () => {
    expect(slugifyProblemTitle('Multiplayer Sleep Interrupts Everyone')).toBe('multiplayer-sleep-interrupts-everyone')
  })

  it('strips punctuation and collapses separators', () => {
    expect(slugifyProblemTitle('Fishing: treasure is  unreachable!!')).toBe('fishing-treasure-is-unreachable')
  })

  it('trims leading and trailing hyphens', () => {
    expect(slugifyProblemTitle('  -- Trains -- ')).toBe('trains')
  })

  it('caps the length', () => {
    expect(slugifyProblemTitle('a'.repeat(200)).length).toBeLessThanOrEqual(80)
  })

  it('returns an empty string when nothing survives', () => {
    expect(slugifyProblemTitle('!!!')).toBe('')
  })
})

describe('createProblemFromFeedbackSchema', () => {
  const valid = {
    title: 'Rail networks have no niche',
    summary: 'Trains are slower and more expensive than campfire flight, so nobody builds them.',
  }

  it('defaults the status to investigating', () => {
    expect(createProblemFromFeedbackSchema.parse(valid).status).toBe('investigating')
  })

  it('defaults affected systems to an empty list', () => {
    expect(createProblemFromFeedbackSchema.parse(valid).affectedSystems).toEqual([])
  })

  it('rejects a title that is too short', () => {
    expect(createProblemFromFeedbackSchema.safeParse({ ...valid, title: 'Trains' }).success).toBe(false)
  })

  it('rejects a summary that is too short', () => {
    expect(createProblemFromFeedbackSchema.safeParse({ ...valid, summary: 'Too short' }).success).toBe(false)
  })

  it('rejects an unknown severity', () => {
    expect(createProblemFromFeedbackSchema.safeParse({ ...valid, severity: 'catastrophic' }).success).toBe(false)
  })
})
