'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function SigninPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const token = searchParams.get('token')
        const error = searchParams.get('error')
        if (token) {
            localStorage.setItem('token', token)
            router.replace('/')
        }
        if (error) {
            console.error('Auth error:', error)
        }
    }, [searchParams, router])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            router.replace('/')
        }
    }, [router])

    const handleGoogleSignIn = () => {
        window.location.href = `${BACKEND_URL}/auth/google`
    }

    return (
        <div className="flex min-h-svh bg-background">
            {/* ── Left Panel ── */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary dark:bg-primary/90 flex-col justify-between p-14">
                {/* Background texture */}
                <div className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
                        backgroundSize: '32px 32px',
                    }}
                />
                <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-white/[0.07] blur-[100px] translate-x-1/3 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-white/[0.05] blur-[80px] -translate-x-1/4 translate-y-1/4" />

                {/* Logo */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white" aria-hidden="true">
                                <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="font-heading text-xl font-bold text-white tracking-tight">Auralen AI</span>
                    </div>
                </div>

                {/* Main content */}
                <div className="relative z-10 max-w-lg space-y-8">
                    <h1 className="text-display-md text-white leading-[1.1]">
                        Stop chasing leads.
                        <br />
                        <span className="text-white/70">Let AI close them.</span>
                    </h1>

                    <p className="text-body-lg text-white/60 leading-relaxed max-w-md">
                        Auralen automates your entire LinkedIn sales pipeline — from finding
                        prospects to booking meetings. Built for B2B teams that want to scale
                        without scaling headcount.
                    </p>

                    {/* Feature list */}
                    <div className="space-y-4 pt-2">
                        {[
                            { title: 'AI Prospecting', desc: 'Find ideal buyers based on ICP, job title, and intent signals' },
                            { title: 'Smart Outreach', desc: 'Personalized connection requests and follow-ups at scale' },
                            { title: 'Auto Engagement', desc: 'Comment, react, and build presence on target accounts' },
                        ].map((item) => (
                            <div key={item.title} className="flex gap-3.5 items-start">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white" aria-hidden="true">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-label-lg text-white font-medium">{item.title}</p>
                                    <p className="text-body-sm text-white/50 mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 pt-4">
                        <div className="border-l-2 border-white/20 pl-4">
                            <p className="text-headline-lg text-white font-bold">10x</p>
                            <p className="text-label-sm text-white/40">Faster pipeline</p>
                        </div>
                        <div className="border-l-2 border-white/20 pl-4">
                            <p className="text-headline-lg text-white font-bold">3x</p>
                            <p className="text-label-sm text-white/40">Reply rates</p>
                        </div>
                        <div className="border-l-2 border-white/20 pl-4">
                            <p className="text-headline-lg text-white font-bold">85%</p>
                            <p className="text-label-sm text-white/40">Time saved</p>
                        </div>
                    </div>
                </div>

                {/* Bottom quote */}
                <div className="relative z-10 border-t border-white/10 pt-6">
                    <blockquote className="text-body-md text-white/50 italic leading-relaxed">
                        &ldquo;We replaced 3 SDRs with Auralen and doubled our pipeline in 60 days.&rdquo;
                    </blockquote>
                    <p className="text-label-sm text-white/30 mt-2">— Head of Growth, Series B SaaS</p>
                </div>
            </div>

            {/* ── Right Panel: Sign In ── */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-background">
                {/* Mobile logo */}
                <div className="mb-10 flex items-center gap-2.5 lg:hidden">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary" aria-hidden="true">
                            <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="font-heading text-lg font-bold tracking-tight text-foreground">Auralen AI</span>
                </div>

                <div className="w-full max-w-[360px] space-y-10">
                    {/* Heading */}
                    <div className="space-y-3">
                        <h2 className="text-display-sm text-foreground">Welcome</h2>
                        <p className="text-body-lg text-muted-foreground">
                            Sign in to launch your autonomous LinkedIn sales agent.
                        </p>
                    </div>

                    {/* Sign in section */}
                    <div className="space-y-5">
                        {/* Google Sign In */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="group flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-label-lg text-foreground shadow-sm transition-all hover:border-outline-variant hover:shadow-float focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-border" />
                            <span className="text-label-sm text-muted-foreground uppercase tracking-widest">or</span>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        {/* Demo Button */}
                        <button
                            onClick={() => window.open('https://auralen.ai', '_blank')}
                            className="btn-primary-gradient flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-4 cursor-pointer"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true">
                                <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                            </svg>
                            Book a Demo
                        </button>
                    </div>

                    {/* Trust signals */}
                    <div className="flex items-center justify-center gap-6 pt-2">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <span className="text-label-sm">SOC 2</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <span className="text-label-sm">GDPR</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
                                <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-label-sm">99.9% uptime</span>
                        </div>
                    </div>

                    {/* Terms */}
                    <p className="text-label-sm text-muted-foreground text-center leading-relaxed">
                        By continuing, you agree to our{' '}
                        <a href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">Terms</a>
                        {' '}and{' '}
                        <a href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">Privacy Policy</a>.
                    </p>

                    {/* Error */}
                    {searchParams.get('error') && (
                        <div className="rounded-xl bg-destructive/10 px-4 py-3 text-body-sm text-destructive text-center">
                            Sign in failed. Please try again.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
