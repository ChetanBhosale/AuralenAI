import { Context } from '@temporalio/activity'
import { prisma } from '@repo/db'
import ai from '@repo/ai'
import prompts from '@repo/ai/prompts'
import env from '@repo/secrets'
import type { ScrapeWebsiteInput } from './types'

export async function scrapeWebsite({ productId, websiteUrl }: ScrapeWebsiteInput): Promise<string> {
    const { info } = Context.current()

    const run = await prisma.workflowRun.create({
        data: {
            workflow: 'ONBOARD',
            activity: 'PRODUCT_SCRAPE',
            status: 'RUNNING',
            workflow_id: info.workflowExecution.workflowId,
            retry_count: info.attempt - 1,
            sync_start: new Date(),
            productId,
        },
    })

    try {
        const response = await ai.chat.send({
            chatGenerationParams: {
                model: env.MODEL ?? 'google/gemini-2.0-flash-lite',
                messages: [
                    { role: 'system', content: prompts.WEBSITE_SCRAPER_PROMPT },
                    { role: 'user', content: `Scrape and analyze this website: ${websiteUrl}` },
                ],
                stream: false,
            },
        })

        const productMd = (response as any).choices?.[0]?.message?.content ?? ''

        await Promise.all([
            prisma.product.update({
                where: { id: productId },
                data: { product_md: productMd },
            }),
            prisma.workflowRun.update({
                where: { id: run.id },
                data: { status: 'COMPLETED', sync_end: new Date() },
            }),
        ])

        return productMd
    } catch (error) {
        await prisma.workflowRun.update({
            where: { id: run.id },
            data: {
                status: 'FAILED',
                sync_end: new Date(),
                error: error instanceof Error ? error.message : String(error),
                retry_count: info.attempt - 1,
            },
        })
        throw error
    }
}
