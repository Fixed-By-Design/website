import { beforeEach, describe, expect, it, vi } from 'vitest'
import { consumeRateLimit, pruneRateLimits } from '../../server/utils/rateLimit'

describe('consumeRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    pruneRateLimits()
  })

  it('allows requests up to the limit', () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      expect(consumeRateLimit('a', 3, 1000).allowed).toBe(true)
    }
  })

  it('blocks the request past the limit', () => {
    for (let attempt = 0; attempt < 3; attempt++) consumeRateLimit('b', 3, 1000)
    const result = consumeRateLimit('b', 3, 1000)
    expect(result.allowed).toBe(false)
    expect(result.retryAfterSeconds).toBeGreaterThan(0)
  })

  it('keeps buckets separate per key', () => {
    for (let attempt = 0; attempt < 3; attempt++) consumeRateLimit('c', 3, 1000)
    expect(consumeRateLimit('d', 3, 1000).allowed).toBe(true)
  })

  it('allows again once the window has passed', () => {
    for (let attempt = 0; attempt < 3; attempt++) consumeRateLimit('e', 3, 1000)
    expect(consumeRateLimit('e', 3, 1000).allowed).toBe(false)
    vi.advanceTimersByTime(1001)
    expect(consumeRateLimit('e', 3, 1000).allowed).toBe(true)
  })
})
