import { z } from 'zod'

// ── Step 1: Product Details ──
export const productDetailsSchema = z.object({
    name: z.string().min(2, 'Product name must be at least 2 characters'),
    website_url: z.string().url('Please enter a valid URL'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
})

export type ProductDetailsInput = z.infer<typeof productDetailsSchema>

// ── Step 2: Customer Profile ──
export const customerProfileSchema = z.object({
    target_description: z.string().min(10, 'Description must be at least 10 characters'),
    job_roles: z.string().min(2, 'Please enter at least one job role'),
    industries: z.string().min(2, 'Please enter at least one industry'),
    locations: z.string().min(2, 'Please enter at least one location'),
})

export type CustomerProfileInput = z.infer<typeof customerProfileSchema>

// ── Step 3: Agent Identity ──
export const speechEnum = z.enum(['FORMAL', 'FRIENDLY', 'CASUAL'])
export const outreachGoalEnum = z.enum([
    'BOOK_MEETING',
    'SALES',
    'NETWORKING',
    'PARTNERSHIPS',
    'BRAND_BUILDING',
])

export const agentIdentitySchema = z.object({
    speech: speechEnum,
    goal: outreachGoalEnum,
    tone_context: z.string().optional(),
})

export type AgentIdentityInput = z.infer<typeof agentIdentitySchema>

// ── Full Onboarding Payload ──
export const onboardingSchema = productDetailsSchema
    .merge(customerProfileSchema)
    .merge(agentIdentitySchema)

export type OnboardingInput = z.infer<typeof onboardingSchema>
