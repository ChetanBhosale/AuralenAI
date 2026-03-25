import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import env from '@repo/secrets'
import { prisma } from '@repo/db'
import type { User } from '@repo/types'

export interface AuthRequest extends Request {
    user: User
}

/**
 * JWT auth middleware.
 * Verifies the Bearer token, fetches the user from DB,
 * and attaches it to `req.user`.
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

    try {
        const token = authHeader.split(' ')[1]!
        const { userId } = jwt.verify(token, env.JWT_SECRET!) as unknown as { userId: number }

        const user = await prisma.user.findUnique({ where: { id: userId } })

        if (!user) {
            res.status(401).json({ error: 'User not found' })
            return
        }

        ;(req as AuthRequest).user = user
        next()
    } catch {
        res.status(401).json({ error: 'Invalid token' })
    }
}
