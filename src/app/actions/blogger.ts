"use server";

import { createClient } from "@/lib/supabase/server";
import { callPerplexity, callGemini, callGrok, callAnthropic, callOpenAI, robustJSONParse } from "@/lib/ai/providers";

// ----------------------------------------------------------------------
// Interfaces
// ----------------------------------------------------------------------

interface BloggerRequest {
    topic: string;
}



interface BloggerResponse {
    jobId: string;
    status: "success" | "error";
    message?: string;
}

// ----------------------------------------------------------------------
// Core Action
// ----------------------------------------------------------------------

export async function startBloggerAutomation(data: BloggerRequest): Promise<BloggerResponse> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    // 1. Check Runs Balance (Mocked for now, assuming unlimited or checked elsewhere)
    // const hasRuns = await checkUserRuns(user.id);
    // if (!hasRuns) throw new Error("Insufficient runs");

    try {
        // 2. Log Job Start
        const { data: job, error: jobError } = await supabase
            .from("automations_log")
            .insert({
                user_id: user.id,
                automation_id: "blogger_deep_research_v1",
                status: "processing",
                inputs: data,
            })
            .select()
            .single();

        if (jobError) throw new Error(jobError.message);

        // 3. Trigger Async Processing (Fire & Forget pattern for server actions if long running, 
        // regarding Next.js limits we might need a background worker, but for MVP we attempt direct execution 
        // or simulating a handoff. Given the 3-5 min runtime, this MUST ideally be a background job.
        // For this Alpha, we will run it, but be aware of timeouts. 
        // EDIT: User requirements say "Run a full test", so we'll try to run it.

        // In a real production app, this would be: await triggerBackgroundWorker(job.id, data);
        // Here we run the promise without awaiting it to return control to UI immediately? 
        // No, Next.js actions kill the process if not awaited usually. 
        // We will await it for the Alpha demo to ensure it completes, 
        // OR we can rely on the fact that Vercel Functions timeout after 10-60s.
        // STRATEGY: We will execute only the PLANNING phase synchronously, and return.
        // The rest would theoretically happen in a background worker. 
        // HOWEVER, to demonstrate "Automation Working", I will execute it all now. 
        // If it times out, we know we need queues.

        // Execute the "Council of Research"
        await runBloggerWorkflow(job.id, data.topic, user.email || "test@example.com");

        return { jobId: job.id, status: "success" };

    } catch (error: unknown) {
        console.error("Blogger automation failed:", error);
        return { jobId: "", status: "error", message: error instanceof Error ? error.message : "Unknown error" };
    }
}

// ----------------------------------------------------------------------
// Workflow Steps
// ----------------------------------------------------------------------

async function runBloggerWorkflow(jobId: string, topic: string, userEmail: string) {
    const supabase = await createClient();
    const logUpdate = async (status: string, result: unknown = null) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await supabase.from("automations_log").update({ status, outputs: result as any }).eq("id", jobId);
    };

    try {
        // Step 1: Context & Orchestration (GPT-4o)
        const orchestratorPrompt = `
            You are the Editor-in-Chief. Plan a deep research article on: "${topic}".
            Return a JSON object with:
            {
                "article_thesis": "string",
                "target_audience": "string",
                "keywords": ["string"],
                "prompts": {
                    "academic_search_query": "string for Perplexity (FIND PAPERS)",
                    "web_search_query": "string for Google (FIND NEWS)",
                    "sentiment_search_query": "string for Grok (FIND REDDIT/TWITTER OPINIONS)"
                }
            }
        `;
        const planRaw = await callOpenAI(orchestratorPrompt, process.env.OPENAI_API_KEY || "");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const plan = robustJSONParse(planRaw.text) as any;

        // Step 2: Parallel Research
        const [academic, web, sentiment] = await Promise.all([
            callPerplexity(plan.prompts.academic_search_query || topic + " academic papers", process.env.PERPLEXITY_API_KEY || ""),
            callGemini(plan.prompts.web_search_query || topic + " news analysis", process.env.GOOGLE_GEMINI_API_KEY || ""),
            callGrok(plan.prompts.sentiment_search_query || topic + " reddit user sentiment", process.env.XAI_API_KEY || "")
        ]);

        const researchData = {
            academic: academic.text,
            web: web.text,
            sentiment: sentiment.text
        };

        // Step 3: Synthesis & Writing (Claude 3.7)
        const writerPrompt = `
            You are a Senior Tech Journalist. Write a comprehensive HTML article based on this Research Plan and Data.
            
            PLAN:
            Thesis: ${plan.article_thesis}
            Audience: ${plan.target_audience}
            
            RESEARCH DATA:
            [ACADEMIC]: ${researchData.academic}
            [WEB NEWS]: ${researchData.web}
            [SENTIMENT]: ${researchData.sentiment}
            
            INSTRUCTIONS:
            - Write a long-form, highly readable article.
            - Use <h2>, <h3>, <p>, <ul>, <blockquote>.
            - Embed inline CSS for basic styling (font-family: sans-serif, nice spacing).
            - Cite the sources from the research.
            - Output ONLY the raw HTML. containing <body> content (wrapper optional).
        `;

        const articleRaw = await callAnthropic(writerPrompt, process.env.ANTHROPIC_API_KEY || "");
        const finalHtml = articleRaw.text;

        // Step 4: Finalize
        await logUpdate("completed", {
            html: finalHtml,
            plan: plan,
            stats: {
                academicDuration: academic.durationMs,
                webDuration: web.durationMs,
                sentimentDuration: sentiment.durationMs
            }
        });

        // Step 5: (Simulated) Email Delivery
        console.log(`[Email Service] Sending article to ${userEmail}...`);

    } catch (err) {
        console.error("Workflow failed inside async:", err);
        await logUpdate("failed", { error: String(err) });
    }
}
