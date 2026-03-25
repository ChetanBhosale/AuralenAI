import { z } from 'zod'

export const apiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        success: z.literal(true),
        data: dataSchema,
    })

export const apiErrorSchema = z.object({
    success: z.literal(false),
    error: z.string(),
})

export type ApiSuccess<T> = { success: true; data: T }
export type ApiError = z.infer<typeof apiErrorSchema>
export type ApiResponse<T> = ApiSuccess<T> | ApiError
