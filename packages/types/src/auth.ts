import { z } from 'zod'
import { userSchema } from './user'

export const authMeResponseSchema = z.object({
    user: userSchema,
})

export type AuthMeResponse = z.infer<typeof authMeResponseSchema>

export const authErrorResponseSchema = z.object({
    error: z.string(),
})

export type AuthErrorResponse = z.infer<typeof authErrorResponseSchema>
