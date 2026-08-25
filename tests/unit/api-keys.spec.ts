import { describe, expect, it } from 'vitest'
import { extractPrefix, generateApiKey, hashApiKey, verifyApiKey } from '../../server/utils/apiKeys'

describe('api keys', () => {
  it('generates a key with a matching prefix and hash', () => {
    const { key, prefix, hash } = generateApiKey()
    expect(key.startsWith('fbd_')).toBe(true)
    expect(extractPrefix(key)).toBe(prefix)
    expect(hash).toBe(hashApiKey(key))
  })

  it('verifies a key against its own hash', () => {
    const { key, hash } = generateApiKey()
    expect(verifyApiKey(key, hash)).toBe(true)
  })

  it('rejects a different key', () => {
    const { hash } = generateApiKey()
    const other = generateApiKey()
    expect(verifyApiKey(other.key, hash)).toBe(false)
  })

  it('rejects a malformed hash without throwing', () => {
    const { key } = generateApiKey()
    expect(verifyApiKey(key, 'deadbeef')).toBe(false)
  })

  it('generates distinct keys', () => {
    expect(generateApiKey().key).not.toBe(generateApiKey().key)
  })
})
