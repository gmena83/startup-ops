'use client'

import { useState, useTransition } from 'react'
import { startBrandAudit } from '@/app/actions/brand-audit-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassCard } from '@/components/ui/glass-card'
import { Loader2 } from 'lucide-react'

export function BrandAuditForm() {
    const [isPending, startTransition] = useTransition()

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            try {
                await startBrandAudit(formData)
            } catch (error) {
                console.error('Audit failed:', error)
                // In a real app, use toast.error("Something went wrong")
                alert('Failed to start audit. Check console.')
            }
        })
    }

    return (
        <GlassCard className="w-full max-w-lg mx-auto" gradientBorder>
            <div className="space-y-4">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Brand Audit</h2>
                    <p className="text-zinc-400">
                        Enter your website and competitors to receive a comprehensive AI analysis.
                    </p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="domain" className="text-sm font-medium text-zinc-300">
                            Your Website URL
                        </label>
                        <Input
                            id="domain"
                            name="domain"
                            placeholder="https://example.com"
                            required
                            disabled={isPending}
                            className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-blue-500/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="competitors" className="text-sm font-medium text-zinc-300">
                            Competitors (comma separated)
                        </label>
                        <Input
                            id="competitors"
                            name="competitors"
                            placeholder="competitor1.com, competitor2.com"
                            disabled={isPending}
                            className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-blue-500/50"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Starting Audit...
                            </>
                        ) : (
                            'Start Audit'
                        )}
                    </Button>
                </form>
            </div>
        </GlassCard>
    )
}
