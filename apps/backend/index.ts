import express from 'express'
import secrets from '@repo/secrets'
const app = express()


app.listen(secrets.BACKEND_PORT ,() => {
    console.log(`BACKEND PORT START ON PORT ${secrets.BACKEND_PORT}`)
})