import { z } from 'zod'
import { FEEDBACK_TYPES } from '../constants/workflow'

export const MESSAGE_MIN = 10
export const MESSAGE_MAX = 2000

const message = z.string().trim().min(MESSAGE_MIN, `Tell us at least ${MESSAGE_MIN} characters.`).max(MESSAGE_MAX)
const version = z.string().trim().max(32).optional()

export const webFeedbackSchema = z.object({
  message,
  type: z.enum(FEEDBACK_TYPES),
  version,
  playerName: z.string().trim().min(3).max(16).regex(/^\w+$/, 'Minecraft usernames are letters, numbers and underscores.').optional(),
  website: z.string().max(0).optional(),
})

export type WebFeedbackInput = z.infer<typeof webFeedbackSchema>

export const minecraftFeedbackSchema = z.object({
  message,
  type: z.enum(FEEDBACK_TYPES).default('general'),
  player: z.string().trim().min(1).max(16),
  playerUuid: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Expected a Minecraft player UUID.'),
  version,
  server: z.string().trim().max(64).optional(),
  dimension: z.string().trim().max(128).optional(),
  x: z.number().finite().optional(),
  y: z.number().finite().optional(),
  z: z.number().finite().optional(),
})

export type MinecraftFeedbackInput = z.infer<typeof minecraftFeedbackSchema>
