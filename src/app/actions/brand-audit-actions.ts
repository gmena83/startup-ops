'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function startBrandAudit(formData: FormData) {
    const supabase = await createClient()

    const domain = formData.get('domain') as string
    const competitorsString = formData.get('competitors') as string

    // Basic validation
    if (!domain) {
        throw new Error('Domain is required')
    }

    // Parse competitors (comma separated)
    const competitors = competitorsString
        ? competitorsString.split(',').map(c => c.trim()).filter(c => c.length > 0)
        : []

    // 1. Insert into Supabase
    const { data: job, error } = await supabase
        .from('audit_jobs')
        .insert({
            domain,
            competitors,
            status: 'pending'
        })
        .select('id')
        .single()

    if (error) {
        console.error('Error creating job:', error)
        throw new Error('Failed to start audit job')
    }

    if (!job) {
        throw new Error('No job created')
    }

    // 2. Trigger ActivePieces Webhook (Fire & Forget)
    const webhookUrl = process.env.NEXT_PUBLIC_BRAND_AUDIT_WEBHOOK

    if (webhookUrl) {
        // We don't await the result of the fetch if we want true fire-and-forget, 
        // but usually it's better to await the *initiation* of the request to catch immediate network errors.
        // However, for "Fire & Forget" automations, we often just kick it off.

        // Note: In Next.js Server Actions, un-awaited promises might be cancelled if the process terminates quickly.
        // Ideally we assume this fetch is fast enough or use `waitUntil` (Next.js 15 experimental) / or just await it.
        // For safety, we will await the fetch. 
        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job_id: job.id,
                    domain,
                    competitors,
                }),
            })
        } catch (err) {
            console.warn('Failed to trigger webhook, but job is saved:', err)
            // We might want to update the job status to 'failed_trigger' here if we care.
        }
    } else {
        console.warn('NEXT_PUBLIC_BRAND_AUDIT_WEBHOOK is not defined. Job created but not triggered.')
    }

    // 3. Redirect to dashboard or confirmation
    // In a real app we might redirect to /dashboard or /jobs/[id]
    redirect('/dashboard')
}
