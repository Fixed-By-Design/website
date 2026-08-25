import { describe, expect, it } from 'vitest'
import type { PublicRoadmapItem } from '../../shared/types/roadmap'
import { buildRoadmapTimeline } from '../../app/composables/useRoadmapTimeline'

function item(partial: Partial<PublicRoadmapItem>): PublicRoadmapItem {
  return {
    slug: 'x',
    title: 'X',
    summary: 'Y',
    status: 'planned',
    domain: 'Enchanting',
    milestone: null,
    targetVersion: null,
    updatedAt: '2026-01-01T00:00:00.000Z',
    problem: null,
    links: [],
    ...partial,
  }
}

describe('buildRoadmapTimeline', () => {
  it('orders upcoming versions ascending', () => {
    const timeline = buildRoadmapTimeline([
      item({ slug: 'b', targetVersion: '1.9.0' }),
      item({ slug: 'a', targetVersion: '1.8.1' }),
    ])
    expect(timeline.map(m => m.version)).toEqual(['1.8.1', '1.9.0'])
  })

  it('compares version parts numerically, not lexically', () => {
    const timeline = buildRoadmapTimeline([
      item({ slug: 'a', targetVersion: '1.10.0' }),
      item({ slug: 'b', targetVersion: '1.9.0' }),
    ])
    expect(timeline.map(m => m.version)).toEqual(['1.9.0', '1.10.0'])
  })

  it('labels the nearest upcoming milestone Next', () => {
    const timeline = buildRoadmapTimeline([item({ targetVersion: '1.8.1' })])
    expect(timeline[0]!.horizon).toBe('Next')
  })

  it('puts unscheduled work after every dated milestone', () => {
    const timeline = buildRoadmapTimeline([
      item({ slug: 'a', status: 'exploring' }),
      item({ slug: 'b', targetVersion: '1.9.0' }),
    ])
    expect(timeline.map(m => m.id)).toEqual(['1.9.0', 'unscheduled'])
  })

  it('puts shipped versions last, newest first', () => {
    const timeline = buildRoadmapTimeline([
      item({ slug: 'a', status: 'released', targetVersion: '1.7.0' }),
      item({ slug: 'b', status: 'released', targetVersion: '1.8.0' }),
      item({ slug: 'c', targetVersion: '1.9.0' }),
    ])
    expect(timeline.map(m => m.id)).toEqual(['1.9.0', 'shipped-1.8.0', 'shipped-1.7.0'])
    expect(timeline.slice(1).every(m => m.shipped)).toBe(true)
  })

  it('excludes rejected work from the timeline', () => {
    const timeline = buildRoadmapTimeline([
      item({ slug: 'a', status: 'rejected' }),
      item({ slug: 'b', targetVersion: '1.9.0' }),
    ])
    expect(timeline.flatMap(m => m.items).map(i => i.slug)).toEqual(['b'])
  })

  it('marks a milestone as playtesting when any item is', () => {
    const timeline = buildRoadmapTimeline([
      item({ slug: 'a', status: 'playtesting', targetVersion: '1.8.1' }),
    ])
    expect(timeline[0]!.description).toContain('playtesting')
  })

  it('returns an empty timeline for no items', () => {
    expect(buildRoadmapTimeline([])).toEqual([])
  })
})
