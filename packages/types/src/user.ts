import { z } from 'zod'

export const userSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string().nullable(),
    google_id: z.string(),
    profile_pic: z.string().nullable(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
})

export type User = z.infer<typeof userSchema>
