import { z } from 'zod'
import { SEARCH_MIN_LENGTH } from '#shared/utils/searchScore'

const querySchema = z.object({
  q: z.string().trim().max(80).default(''),
})

export default defineEventHandler(async (event) => {
  const { q } = await getValidatedQuery(event, querySchema.parse)

  // A query too short to search is an empty result, not a client error. The
  // palette calls this on every keystroke, including the first one.
  if (q.length < SEARCH_MIN_LENGTH) return []

  return runSearch(event, q)
})
