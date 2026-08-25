import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'

const PREFIX_LENGTH = 12

export function hashApiKey(key: string) {
  return createHash('sha256').update(key).digest('hex')
}

export function generateApiKey() {
  const key = `fbd_${randomBytes(24).toString('base64url')}`
  return { key, prefix: key.slice(0, PREFIX_LENGTH), hash: hashApiKey(key) }
}

export function extractPrefix(key: string) {
  return key.slice(0, PREFIX_LENGTH)
}

export function verifyApiKey(key: string, expectedHash: string) {
  const actual = Buffer.from(hashApiKey(key), 'hex')
  const expected = Buffer.from(expectedHash, 'hex')
  if (actual.length !== expected.length) return false
  return timingSafeEqual(actual, expected)
}
