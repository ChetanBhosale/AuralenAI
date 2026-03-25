'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import type { User, AuthMeResponse } from '@repo/types'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'

export default function Page() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.replace('/signin')
            return
        }

        fetch(`${BACKEND_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Unauthorized')
                return res.json() as Promise<AuthMeResponse>
            })
            .then((data) => setUser(data.user))
            .catch(() => {
                localStorage.removeItem('token')
                router.replace('/signin')
            })
            .finally(() => setLoading(false))
    }, [router])

    const handleSignOut = () => {
        localStorage.removeItem('token')
        router.replace('/signin')
    }

    if (loading) {
        return (
            <div className="flex min-h-svh items-center justify-center">
                <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-svh p-6">
            <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
                <div>
                    <h1 className="text-xl font-medium">
                        Welcome{user?.name ? `, ${user.name}` : ''}
                    </h1>
                    <p className="text-muted-foreground">{user?.email}</p>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                    Sign out
                </Button>
            </div>
        </div>
    )
}
