import env, { validateEnv } from '@repo/secrets'

// Fail fast if required env vars are missing
validateEnv([
    'BACKEND_PORT',
    'DATABASE_URL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_REDIRECT_URI',
    'JWT_SECRET',
    'FRONTEND_URL',
])

import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
}))
app.use(express.json())

app.use('/api', routes)

app.listen(env.BACKEND_PORT, () => {
    console.log(`[Server] Running on port ${env.BACKEND_PORT}`)
})
