import { Worker } from '@temporalio/worker'
import { scrapeWebsite, generateAgentMd } from '../activities/onboard/index'
import { QUEUES } from '@repo/temporal/queues'
import env from '@repo/secrets'

export async function createOnboardWorker() {
    return Worker.create({
        workflowsPath: new URL('../workflows/onboard/index.ts', import.meta.url).pathname,
        activities: { scrapeWebsite, generateAgentMd },
        taskQueue: QUEUES.ONBOARD,
        namespace: env.TEMPORAL_NAMESPACE ?? 'staging',
    })
}
