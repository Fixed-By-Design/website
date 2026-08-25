import { z } from 'zod'

const querySchema = z.object({
  q: z.string().trim().min(2).max(80),
})

export default defineEventHandler(async (event) => {
  const { q } = await getValidatedQuery(event, querySchema.parse)
  return runSearch(event, q)
})
