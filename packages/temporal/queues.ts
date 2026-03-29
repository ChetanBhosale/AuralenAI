import env from '@repo/secrets'

// All Temporal task queue names live here.
// Both backend (workflow.start) and worker (Worker.create) import from this file.
export const QUEUES = {
    ONBOARD: env.TEMPORAL_ONBOARD_QUEUE ?? 'onboard-queue',
} as const
