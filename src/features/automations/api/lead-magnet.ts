'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const promptSchema = z.object({
    tool_name: z.string().min(1, "Tool name is required"), // Now Platform
    project_type: z.string().optional(),
    task_description: z.string().min(10, "Please describe the task in more detail"),
    features: z.string().optional(), // JSON string
    visual_style: z.string().optional(),
    ai_experience: z.string().optional(),
    data_type: z.string().optional(),
    email: z.string().email("Invalid email address")
})

export type PromptState = {
    message?: string
    success?: boolean
    errors?: any
}

export async function submitPromptRequest(prevState: PromptState, formData: FormData): Promise<PromptState> {
    const supabase = await createClient()

    // 1. Validate Input
    const rawData = {
        tool_name: formData.get('tool_name'),
        project_type: formData.get('project_type'),
        task_description: formData.get('task_description'),
        features: formData.get('features'),
        visual_style: formData.get('visual_style'),
        ai_experience: formData.get('ai_experience'),
        data_type: formData.get('data_type'),
        email: formData.get('email'),
    }

    const validatedFields = promptSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please check your inputs.'
        }
    }

    const { email, tool_name, task_description, ...rest } = validatedFields.data

    // 2. Rate Limit Check (24h)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count, error: countError } = await supabase
        .from('lead_magnets_log')
        .select('*', { count: 'exact', head: true })
        .eq('user_email', email)
        .gte('created_at', oneDayAgo)

    if (countError) {
        console.error('Rate limit check error:', countError)
        return { success: false, message: 'System error during rate check. Please try again later.' }
    }

    if (count && count > 0) {
        return {
            success: false,
            message: 'Daily limit reached. You can generate one prompt guide every 24 hours.'
        }
    }

    // 3. Insert Log Entry + Submission Data
    // We store the structured extra data in `submission_data`
    const submissionData = {
        project_type: rest.project_type,
        features: rest.features ? JSON.parse(rest.features) : [], // Parse checking string
        visual_style: rest.visual_style,
        ai_experience: rest.ai_experience,
        data_type: rest.data_type
    }

    const { error: insertError } = await supabase
        .from('lead_magnets_log')
        .insert({
            user_email: email,
            tool_requested: tool_name,
            task_description: task_description,
            status: 'pending',
            submission_data: submissionData
        })

    if (insertError) {
        console.error('Log insertion error:', insertError)
        return { success: false, message: `Failed to record request: ${insertError.message}` }
    }

    // 4. Trigger Webhook
    const webhookUrl = process.env.NEXT_PUBLIC_PROMPT_GEN_WEBHOOK

    if (webhookUrl) {
        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool_name,
                    task_description,
                    user_email: email,
                    ...submissionData // Spread all extra fields into payload
                })
            })
        } catch (err) {
            console.error('Webhook trigger failed:', err)
        }
    } else {
        console.warn('Webhook URL missing')
    }

    return {
        success: true,
        message: 'Request received! Check your email in about 3 minutes.'
    }
}
