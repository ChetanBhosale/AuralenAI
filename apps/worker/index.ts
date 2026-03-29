import { createOnboardWorker } from './workers/onboard.worker'

async function main() {
    console.log('[Worker] Starting Auralen workers...')

    // Start all workers in parallel — add new workers here as features grow
    const workers = await Promise.all([
        createOnboardWorker(),
    ])

    console.log('[Worker] All workers running, polling for tasks...')

    await Promise.all(workers.map((w) => w.run()))
}

main().catch((err) => {
    console.error('[Worker] Fatal error:', err)
    process.exit(1)
})
