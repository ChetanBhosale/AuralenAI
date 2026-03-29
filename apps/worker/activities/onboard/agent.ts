import { Context } from '@temporalio/activity'
import { prisma } from '@repo/db'
import ai from '@repo/ai'
import prompts from '@repo/ai/prompts'
import env from '@repo/secrets'
import type { GenerateAgentMdInput } from './types'

export async function generateAgentMd({
    agentId,
    productId,
    productMd,
    speech,
    goal,
    toneContext,
}: GenerateAgentMdInput): Promise<void> {
    const { info } = Context.current()

    const run = await prisma.workflowRun.create({
        data: {
            workflow: 'ONBOARD',
            activity: 'AGENT_GENERATE',
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
                model: env.MODEL ?? 'google/gemini-3.1-flash-lite-preview',
                messages: [
                    { role: 'system', content: prompts.AGENT_MD_PROMPT(speech, goal, toneContext) },
                    { role: 'user', content: `Here is the product information:\n\n${productMd}` },
                ],
                stream: false,
            },
        })

        const agentMd = (response as any).choices?.[0]?.message?.content ?? ''

        await Promise.all([
            prisma.agent.update({
                where: { id: agentId },
                data: { agent_md: agentMd },
            }),
            prisma.workflowRun.update({
                where: { id: run.id },
                data: { status: 'COMPLETED', sync_end: new Date() },
            }),
        ])
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
