import { z } from "zod";

/**
 * Business goals enum values
 */
const businessGoals = [
    "Increase brand awareness",
    "Generate leads",
    "Increase sales/revenue",
    "Expand to new markets",
    "Improve customer retention",
] as const;

/**
 * Company stage enum values
 */
const companyStages = [
    "Pre-revenue / Idea Stage",
    "Early Stage / MVP",
    "Growth Stage",
    "Scaling / Series A+",
    "Established / Profitable",
] as const;

/**
 * Validation schema for Brand SEO automation input.
 * Matches the form fields from the Brand SEO multi-step wizard.
 * 
 * @see automations.md - "Brand & SEO Analyst (The Consensus Engine)"
 */
export const brandSeoInputSchema = z.object({
    // Step 1: Company Info
    companyName: z
        .string()
        .min(2, "company_name_required")
        .max(100, "company_name_too_long"),

    brandWebsite: z
        .string()
        .url("valid_url_required")
        .refine(
            (url) => !url.includes("localhost"),
            "production_url_required"
        ),

    // Step 2: Business Context
    primaryBusinessGoal: z.enum(businessGoals, {
        message: "business_goal_required",
    }),

    companyStage: z.enum(companyStages, {
        message: "company_stage_required",
    }),

    // Step 3: Product Details
    productService: z
        .string()
        .min(20, "product_description_too_short")
        .max(1000, "product_description_too_long"),

    knownCompetitors: z
        .string()
        .max(500, "competitors_too_long")
        .optional()
        .default(""),

    // Step 4: Value Proposition
    valueProposition: z
        .string()
        .min(20, "value_prop_too_short")
        .max(500, "value_prop_too_long"),

    problem: z
        .string()
        .min(20, "problem_too_short")
        .max(500, "problem_too_long"),

    // Step 5: Target Market
    customerSegment: z
        .string()
        .min(5, "customer_segment_required")
        .max(200, "customer_segment_too_long"),

    region: z
        .string()
        .min(2, "region_required")
        .max(100, "region_too_long"),

    // Step 6: Delivery
    reportEmail: z
        .string()
        .email("valid_email_required"),
});

export type BrandSeoInput = z.infer<typeof brandSeoInputSchema>;

/**
 * Orchestration context passed to AI models.
 * This is the "broadcast" payload for the 6-model consensus.
 */
export interface BrandSeoContext {
    input: BrandSeoInput;
    timestamp: string;
    jobId: string;
    userId?: string;
}

/**
 * Response from a single AI model in the consensus engine.
 */
export interface ModelAnalysis {
    modelName: string;
    competitors: string[];
    seoRecommendations: string[];
    threats: string[];
    opportunities: string[];
    rawResponse?: string;
    error?: string;
    durationMs: number;
}

/**
 * Synthesized consensus result after all models complete.
 */
export interface ConsensusResult {
    consensusCompetitors: Array<{
        name: string;
        mentionCount: number;
        urls: string[];
    }>;
    blindSpots: string[];
    topSeoRecommendations: string[];
    modelResults: ModelAnalysis[];
    synthesisModel: string;
    totalDurationMs: number;
}
