import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '@repo/secrets'
import { prisma } from '@repo/db'
import type { AuthMeResponse } from '@repo/types'
import type { AuthRequest } from '../middleware/auth.middleware'

/**
 * Redirects the user to Google OAuth consent screen.
 */
export const googleRedirect = (_req: Request, res: Response) => {
    const params = new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID!,
        redirect_uri: env.GOOGLE_REDIRECT_URI!,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
    })

    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`)
}

/**
 * Handles the Google OAuth callback.
 * Exchanges code for tokens, finds or creates user, issues JWT.
 */
export const googleCallback = async (req: Request, res: Response) => {
    const { code } = req.query

    if (!code || typeof code !== 'string') {
        res.redirect(`${env.FRONTEND_URL}/signin?error=no_code`)
        return
    }

    try {
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code,
                client_id: env.GOOGLE_CLIENT_ID,
                client_secret: env.GOOGLE_CLIENT_SECRET,
                redirect_uri: env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        })

        const tokenData = (await tokenRes.json()) as { access_token?: string }

        if (!tokenData.access_token) {
            res.redirect(`${env.FRONTEND_URL}/signin?error=token_failed`)
            return
        }

        const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        })

        const googleUser = (await userRes.json()) as {
            id: string
            email: string
            name: string
            picture: string
        }

        let user = await prisma.user.findUnique({
            where: { google_id: googleUser.id },
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: googleUser.email,
                    name: googleUser.name,
                    google_id: googleUser.id,
                    profile_pic: googleUser.picture,
                },
            })
        }

        // Only userId in the token
        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET!, { expiresIn: '7d' })

        res.redirect(`${env.FRONTEND_URL}/signin?token=${token}`)
    } catch (error) {
        console.error('[Auth] Google callback error:', error)
        res.redirect(`${env.FRONTEND_URL}/signin?error=auth_failed`)
    }
}

/**
 * Returns the authenticated user's profile.
 * Requires `authenticate` middleware to run before this.
 */
export const getMe = (req: Request, res: Response) => {
    const { user } = req as AuthRequest
    const response: AuthMeResponse = { user }
    res.json(response)
}
