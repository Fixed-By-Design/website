import type { RoadmapStatus } from '../constants/workflow'

export interface PublicRoadmapItem {
  slug: string
  title: string
  summary: string
  status: RoadmapStatus
  domain: string
  milestone: string | null
  targetVersion: string | null
  updatedAt: string
  problem: { slug: string, publicId: number, title: string } | null
  links: { url: string, label: string | null, number: number | null }[]
}
