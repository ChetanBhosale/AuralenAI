import { Router } from 'express'
import authRouter from './auth.route'
import onboardRouter from './onboard.route'

const router = Router()

router.use('/auth', authRouter)
router.use('/onboard', onboardRouter)

export default router
