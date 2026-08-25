import { createHash } from 'node:crypto'
import type { H3Event } from 'h3'

export function requestFingerprint(event: H3Event) {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  return createHash('sha256').update(ip).digest('hex').slice(0, 32)
}
