"use server";

import { createClient } from "@/lib/supabase/server";
import { brandSeoInputSchema, type BrandSeoInput, type BrandSeoContext } from "@/lib/schemas/brand-seo";

/**
 * Response type for the startBrandAudit action.
 */
export interface BrandAuditResponse {
    success: boolean;
    jobId?: string;
    message: string;
    runsRemaining?: number;
    errors?: Record<string, string>;
}

/**
 * Generates a unique job ID for tracking the automation.
 */
function generateJobId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `bseo_${timestamp}_${random}`;
}

/**
 * Checks and decrements the user's run balance.
 * Returns the remaining runs or throws if insufficient.
 * 
 * @todo Connect to actual Supabase runs table
 */
async function checkRunBalance(userId: string): Promise<number> {
    // STUB: In production, query Supabase for user's run balance
    // For now, simulate a user with runs remaining
    const mockRunsRemaining = 20;

    if (mockRunsRemaining <= 0) {
        throw new Error("run_balance_exhausted");
    }

    // STUB: Decrement run count in database
    // await supabase.rpc('decrement_runs', { user_id: userId });

    return mockRunsRemaining - 1;
}

/**
 * Logs the automation job to the database.
 * This allows the user to see their automation history.
 * 
 * @todo Connect to actual Supabase automations_log table
 */
async function logAutomationJob(
    jobId: string,
    context: BrandSeoContext,
    status: "pending" | "processing" | "completed" | "failed"
): Promise<void> {
    // STUB: Insert into Supabase
    console.log(`[Brand SEO] Job ${jobId} status: ${status}`);
    console.log(`[Brand SEO] Input:`, context.input.companyName);
}

/**
 * Starts the Brand SEO automation.
 * 
 * This is the main Server Action that:
 * 1. Validates the input
 * 2. Checks the user's run balance
 * 3. Creates a job record
 * 4. Triggers the AI orchestration (async)
 * 5. Returns immediately to the UI
 * 
 * The actual AI processing happens asynchronously, and results
 * are delivered via email.
 * 
 * @see automations.md - "Brand & SEO Analyst (The Consensus Engine)"
 */
export async function startBrandAudit(
    formData: FormData
): Promise<BrandAuditResponse> {
    try {
        // Parse form data into object
        const rawInput = Object.fromEntries(formData.entries());

        // Validate input with Zod
        const validationResult = brandSeoInputSchema.safeParse(rawInput);

        if (!validationResult.success) {
            const errors: Record<string, string> = {};
            validationResult.error.issues.forEach((issue) => {
                const path = issue.path.join(".");
                errors[path] = issue.message;
            });

            return {
                success: false,
                message: "validation_failed",
                errors,
            };
        }

        const input: BrandSeoInput = validationResult.data;

        // Get current user (if authenticated)
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // For MVP, allow unauthenticated users but track by email
        const userId = user?.id || `guest_${input.reportEmail}`;

        // Check run balance
        let runsRemaining: number;
        try {
            runsRemaining = await checkRunBalance(userId);
        } catch {
            return {
                success: false,
                message: "run_balance_exhausted",
                runsRemaining: 0,
            };
        }

        // Generate job ID
        const jobId = generateJobId();

        // Create context for AI orchestration
        const context: BrandSeoContext = {
            input,
            timestamp: new Date().toISOString(),
            jobId,
            userId,
        };

        // Log the job as pending
        await logAutomationJob(jobId, context, "pending");

        // TODO: Trigger async AI orchestration
        // This will be implemented in the next phase:
        // - Call 6 AI models in parallel (Perplexity, Grok, GPT-4o, Claude, DeepSeek, Gemini)
        // - Synthesize results with OpenAI
        // - Generate HTML report with Gemini
        // - Send email via Resend
        //
        // For now, log that we would trigger the orchestration
        console.log(`[Brand SEO] Would trigger AI orchestration for job ${jobId}`);
        console.log(`[Brand SEO] Target email: ${input.reportEmail}`);

        // Return success immediately (don't wait for AI processing)
        return {
            success: true,
            jobId,
            message: "automation_started",
            runsRemaining,
        };

    } catch (error) {
        console.error("[Brand SEO] Unexpected error:", error);
        return {
            success: false,
            message: "unexpected_error",
        };
    }
}

/**
 * Alternative: Start Brand Audit with typed input (for programmatic use)
 */
export async function startBrandAuditTyped(
    input: BrandSeoInput
): Promise<BrandAuditResponse> {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        formData.append(key, String(value));
    });
    return startBrandAudit(formData);
}
