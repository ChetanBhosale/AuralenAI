import type { Request, Response } from 'express'
import { onboardingSchema } from '@repo/types'
import { prisma } from '@repo/db'
import { serverResponse } from '../utils/response'
import type { AuthRequest } from '../middleware/auth.middleware'

export const createOnboarding = async (req: Request, res: Response) => {
    try {
        const { user } = req as AuthRequest
        const parsed = onboardingSchema.safeParse(req.body)

        if (!parsed.success) {
            serverResponse(res, 400, 'Validation failed', parsed.error.flatten().fieldErrors)
            return
        }

        const {
            name, website_url, description,
            target_description, job_roles, industries, locations,
            speech, goal, tone_context,
        } = parsed.data

        const result = await prisma.$transaction(async (tx) => {
            const product = await tx.product.create({
                data: {
                    name,
                    website_url,
                    prduct_description: description,
                    product_md: '',
                    product_scrape_md: '',
                    userId: user.id,
                },
            })

            const [_, agent] = await Promise.all([
                tx.targetAudience.create({
                    data: {
                        job_roles: job_roles.split(',').map((s) => s.trim()).filter(Boolean),
                        industries: industries.split(',').map((s) => s.trim()).filter(Boolean),
                        locations: locations.split(',').map((s) => s.trim()).filter(Boolean),
                        goal,
                        productId: product.id,
                        target_description : target_description || ''
                    },
                }),
                tx.agent.create({
                    data: {
                        speech,
                        goal,
                        agent_md: '',
                        tone_context: tone_context || null,
                        userId: user.id,
                    },
                }),
            ])
            
            await tx.agentProduct.create({
                data: {
                    agentId: agent.id,
                    productId: product.id,
                },
            })

            return { product, agent }
        })

        // build the temporal website scraper here that will actually scrape the website and create a full details about the product

        serverResponse(res, 201, 'Onboarding completed', result)
    } catch (error) {
        console.error('[Onboard] Error:', error)
        serverResponse(res, 500, 'Something went wrong')
    }
}
