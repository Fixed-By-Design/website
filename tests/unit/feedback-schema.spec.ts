import { describe, expect, it } from 'vitest'
import { MESSAGE_MAX, MESSAGE_MIN, minecraftFeedbackSchema, webFeedbackSchema } from '../../shared/schemas/feedback'

describe('webFeedbackSchema', () => {
  const valid = { message: 'Copper rails feel great but I never build them.', type: 'balance' as const }

  it('accepts a minimal valid submission', () => {
    expect(webFeedbackSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects a message below the minimum length', () => {
    const result = webFeedbackSchema.safeParse({ ...valid, message: 'too short' })
    expect(result.success).toBe(false)
  })

  it('rejects a message above the maximum length', () => {
    const result = webFeedbackSchema.safeParse({ ...valid, message: 'a'.repeat(MESSAGE_MAX + 1) })
    expect(result.success).toBe(false)
  })

  it('trims the message before checking the minimum', () => {
    const result = webFeedbackSchema.safeParse({ ...valid, message: `   ${'a'.repeat(MESSAGE_MIN - 1)}   ` })
    expect(result.success).toBe(false)
  })

  it('rejects an unknown feedback type', () => {
    expect(webFeedbackSchema.safeParse({ ...valid, type: 'praise' }).success).toBe(false)
  })

  it('rejects a username with invalid characters', () => {
    expect(webFeedbackSchema.safeParse({ ...valid, playerName: 'not a name!' }).success).toBe(false)
  })

  it('accepts a valid Minecraft username', () => {
    expect(webFeedbackSchema.safeParse({ ...valid, playerName: 'Player_1' }).success).toBe(true)
  })

  it('rejects a filled honeypot field', () => {
    expect(webFeedbackSchema.safeParse({ ...valid, website: 'http://spam.example' }).success).toBe(false)
  })
})

describe('minecraftFeedbackSchema', () => {
  const valid = {
    message: 'Villages feel too common near spawn.',
    player: 'PlayerName',
    playerUuid: '11111111-2222-3333-4444-555555555555',
    version: '1.8.0',
    server: 'playtest',
    dimension: 'minecraft:overworld',
    x: 120.5,
    y: 68,
    z: -348.2,
  }

  it('accepts the documented payload', () => {
    const result = minecraftFeedbackSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('defaults the type to general', () => {
    const result = minecraftFeedbackSchema.parse(valid)
    expect(result.type).toBe('general')
  })

  it('accepts a payload without coordinates', () => {
    const { x, y, z, dimension, ...rest } = valid
    expect(minecraftFeedbackSchema.safeParse(rest).success).toBe(true)
  })

  it('rejects a malformed player uuid', () => {
    expect(minecraftFeedbackSchema.safeParse({ ...valid, playerUuid: 'not-a-uuid' }).success).toBe(false)
  })

  it('rejects a missing player name', () => {
    const { player, ...rest } = valid
    expect(minecraftFeedbackSchema.safeParse(rest).success).toBe(false)
  })

  it('rejects non-finite coordinates', () => {
    expect(minecraftFeedbackSchema.safeParse({ ...valid, x: Number.POSITIVE_INFINITY }).success).toBe(false)
  })
})
