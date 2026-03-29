import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

const env = {
    BACKEND_PORT: process.env.BACKEND_PORT,
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    FRONTEND_URL: process.env.FRONTEND_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    OPENROUTER_API_KEY : process.env.OPENROUTER_API_KEY,
    MODEL:process.env.MODEL,
    TEMPORAL_ADDRESS: process.env.TEMPORAL_ADDRESS ?? 'localhost:7233',
    TEMPORAL_NAMESPACE: process.env.TEMPORAL_NAMESPACE ?? 'default',
    TEMPORAL_ONBOARD_QUEUE: process.env.TEMPORAL_ONBOARD_QUEUE ?? 'onboard-queue',
} as const


export function validateEnv(requiredKeys: (keyof typeof env)[]) {
    const missing = requiredKeys.filter((key) => !env[key])
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
    }
}

export default env
