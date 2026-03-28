import { Router } from 'express'
import { authenticate } from '../middleware/auth.middleware'
import { createOnboarding } from '../controllers/onboard.controller'

const router = Router()

router.post('/', authenticate, createOnboarding)

export default router
