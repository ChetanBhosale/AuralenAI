import { Router } from 'express'
import { googleRedirect, googleCallback, getMe } from '../controllers/auth.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.get('/google', googleRedirect)
router.get('/google/callback', googleCallback)
router.get('/me', authenticate, getMe)

export default router
