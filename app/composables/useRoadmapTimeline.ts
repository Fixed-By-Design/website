import type { PublicRoadmapItem } from '#shared/types/roadmap'

export interface RoadmapMilestone {
  id: string
  version: string | null
  horizon: string
  description: string
  shipped: boolean
  items: PublicRoadmapItem[]
}

function compareVersions(a: string, b: string) {
  const left = a.split('.').map(Number)
  const right = b.split('.').map(Number)
  for (let index = 0; index < Math.max(left.length, right.length); index++) {
    const diff = (left[index] ?? 0) - (right[index] ?? 0)
    if (diff) return diff
  }
  return 0
}

const HORIZONS = ['Next', 'After that', 'Further out']

export function buildRoadmapTimeline(items: PublicRoadmapItem[]): RoadmapMilestone[] {
  const upcoming = items.filter(item => item.status !== 'released' && item.status !== 'rejected')
  const shipped = items.filter(item => item.status === 'released')

  const byVersion = new Map<string, PublicRoadmapItem[]>()
  const unscheduled: PublicRoadmapItem[] = []

  for (const item of upcoming) {
    if (!item.targetVersion) {
      unscheduled.push(item)
      continue
    }
    const bucket = byVersion.get(item.targetVersion) ?? []
    bucket.push(item)
    byVersion.set(item.targetVersion, bucket)
  }

  const milestones: RoadmapMilestone[] = [...byVersion.entries()]
    .sort(([a], [b]) => compareVersions(a, b))
    .map(([version, versionItems], index) => ({
      id: version,
      version,
      horizon: HORIZONS[index] ?? 'Later',
      description: versionItems.some(item => item.status === 'playtesting')
        ? 'In playtesting. Close to shipping.'
        : 'In development.',
      shipped: false,
      items: versionItems,
    }))

  if (unscheduled.length) {
    milestones.push({
      id: 'unscheduled',
      version: null,
      horizon: 'Someday',
      description: 'Being explored. No version attached yet, and no promise that it ships.',
      shipped: false,
      items: unscheduled,
    })
  }

  const shippedByVersion = new Map<string, PublicRoadmapItem[]>()
  for (const item of shipped) {
    const key = item.targetVersion ?? 'Released'
    const bucket = shippedByVersion.get(key) ?? []
    bucket.push(item)
    shippedByVersion.set(key, bucket)
  }

  for (const [version, versionItems] of [...shippedByVersion.entries()].sort(([a], [b]) => compareVersions(b, a))) {
    milestones.push({
      id: `shipped-${version}`,
      version,
      horizon: 'Shipped',
      description: 'Released and playable.',
      shipped: true,
      items: versionItems,
    })
  }

  return milestones
}
