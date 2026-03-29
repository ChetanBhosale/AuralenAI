import { proxyActivities } from '@temporalio/workflow'
import type { OnboardActivities } from '../../activities/onboard/types'

const { scrapeWebsite, generateAgentMd } = proxyActivities<OnboardActivities>({
    startToCloseTimeout: '10 minutes',
    retry: {
        maximumAttempts: 3,
        initialInterval: '10 seconds',
        backoffCoefficient: 2,       // 10s → 20s → 40s
        maximumInterval: '2 minutes',
        nonRetryableErrorTypes: [],
    },
})

export interface OnboardWorkflowInput {
    productId: number
    agentId: number
    websiteUrl: string
    speech: string
    goal: string
    toneContext: string | null
}

export async function onboardWorkflow(input: OnboardWorkflowInput): Promise<void> {
    // Step 1: Scrape website → update product.product_md
    const productMd = await scrapeWebsite({
        productId: input.productId,
        websiteUrl: input.websiteUrl,
    })

    // Step 2: Generate agent_md from product context
    await generateAgentMd({
        agentId: input.agentId,
        productId: input.productId,
        productMd,
        speech: input.speech,
        goal: input.goal,
        toneContext: input.toneContext,
    })
}
