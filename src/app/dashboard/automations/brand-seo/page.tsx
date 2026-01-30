"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    ArrowRight,
    Search,
    Building2,
    Globe,
    Target,
    Rocket,
    Package,
    Users,
    Lightbulb,
    AlertCircle,
    MapPin,
    Mail,
    Loader2,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import Link from "next/link";
import { startBrandAudit, type BrandAuditResponse } from "@/features/automations/api/brand-seo";
import { ProcessingAnimation } from "@/features/automations/components/processing-animation";

interface FormData {
    companyName: string;
    brandWebsite: string;
    primaryBusinessGoal: string;
    companyStage: string;
    productService: string;
    knownCompetitors: string;
    valueProposition: string;
    problem: string;
    customerSegment: string;
    region: string;
    reportEmail: string;
}

const initialFormData: FormData = {
    companyName: "",
    brandWebsite: "",
    primaryBusinessGoal: "",
    companyStage: "",
    productService: "",
    knownCompetitors: "",
    valueProposition: "",
    problem: "",
    customerSegment: "",
    region: "",
    reportEmail: "",
};

const companyStages = [
    "Pre-revenue / Idea Stage",
    "Early Stage / MVP",
    "Growth Stage",
    "Scaling / Series A+",
    "Established / Profitable",
];

const businessGoals = [
    "Increase brand awareness",
    "Generate leads",
    "Increase sales/revenue",
    "Expand to new markets",
    "Improve customer retention",
];

const formFields = [
    {
        key: "companyName" as keyof FormData,
        label: "Company Name",
        placeholder: "e.g., StartupOPS",
        icon: Building2,
        type: "text",
        required: true,
    },
    {
        key: "brandWebsite" as keyof FormData,
        label: "Brand Website",
        placeholder: "e.g., https://startupops.com",
        icon: Globe,
        type: "url",
        required: true,
    },
    {
        key: "primaryBusinessGoal" as keyof FormData,
        label: "Primary Business Goal",
        placeholder: "Select your main goal",
        icon: Target,
        type: "select",
        options: businessGoals,
        required: true,
    },
    {
        key: "companyStage" as keyof FormData,
        label: "Company Stage",
        placeholder: "Select your stage",
        icon: Rocket,
        type: "select",
        options: companyStages,
        required: true,
    },
    {
        key: "productService" as keyof FormData,
        label: "Product/Service Description",
        placeholder: "Describe what your company does...",
        icon: Package,
        type: "textarea",
        required: true,
    },
    {
        key: "knownCompetitors" as keyof FormData,
        label: "Known Competitors",
        placeholder: "List competitors you know (comma separated)",
        icon: Users,
        type: "text",
        required: false,
    },
    {
        key: "valueProposition" as keyof FormData,
        label: "Value Proposition",
        placeholder: "What makes your offering unique?",
        icon: Lightbulb,
        type: "textarea",
        required: true,
    },
    {
        key: "problem" as keyof FormData,
        label: "Problem You Solve",
        placeholder: "What problem does your product/service solve?",
        icon: AlertCircle,
        type: "textarea",
        required: true,
    },
    {
        key: "customerSegment" as keyof FormData,
        label: "Target Customer Segment",
        placeholder: "e.g., B2B SaaS founders, SME owners",
        icon: Users,
        type: "text",
        required: true,
    },
    {
        key: "region" as keyof FormData,
        label: "Target Region",
        placeholder: "e.g., North America, Latin America, Global",
        icon: MapPin,
        type: "text",
        required: true,
    },
    {
        key: "reportEmail" as keyof FormData,
        label: "Email for Report Delivery",
        placeholder: "your@email.com",
        icon: Mail,
        type: "email",
        required: true,
    },
];

export default function BrandSeoPage() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [jobId, setJobId] = useState<string | null>(null);
    const [runsRemaining, setRunsRemaining] = useState<number | null>(null);

    const stepsPerPage = 3;
    const totalSteps = Math.ceil(formFields.length / stepsPerPage);
    const currentFields = formFields.slice(
        currentStep * stepsPerPage,
        (currentStep + 1) * stepsPerPage
    );

    const handleChange = (key: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Build FormData from state
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            // Call the Server Action
            const result = await startBrandAudit(data);

            if (result.success) {
                setJobId(result.jobId || null);
                setRunsRemaining(result.runsRemaining ?? null);
                setIsSubmitted(true);
            } else {
                // Handle validation or other errors
                setSubmitError(result.message);
            }
        } catch (error) {
            console.error('Submit error:', error);
            setSubmitError('unexpected_error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isLastStep = currentStep === totalSteps - 1;
    const progress = ((currentStep + 1) / totalSteps) * 100;



    if (isSubmitted) {
        return (
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <GlassCard className="text-center py-12 bg-black/40" interactive={false}>
                        <ProcessingAnimation />

                        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                            <Button variant="secondary" asChild>
                                <Link href="/dashboard">Back to Dashboard</Link>
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setFormData(initialFormData);
                                    setCurrentStep(0);
                                }}
                            >
                                Run Another Analysis
                            </Button>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-[1px] flex-shrink-0">
                        <div className="w-full h-full rounded-xl bg-[#0a0f1a] flex items-center justify-center">
                            <Search className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Brand SEO Analysis</h1>
                        <p className="text-gray-400 mt-1">
                            Fill in the details below to receive a comprehensive competitive
                            analysis powered by 6 AI models.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                        Step {currentStep + 1} of {totalSteps}
                    </span>
                    <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </motion.div>

            {/* Form Card */}
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                <GlassCard interactive={false}>
                    <div className="space-y-6">
                        {currentFields.map((field) => (
                            <div key={field.key}>
                                <label className="flex items-center gap-2 text-white font-medium mb-2">
                                    <field.icon className="w-4 h-4 text-gray-400" />
                                    {field.label}
                                    {field.required && <span className="text-red-400">*</span>}
                                </label>

                                {field.type === "select" ? (
                                    <select
                                        value={formData[field.key]}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    >
                                        <option value="" className="bg-[#1f2937]">
                                            {field.placeholder}
                                        </option>
                                        {field.options?.map((option) => (
                                            <option key={option} value={option} className="bg-[#1f2937]">
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === "textarea" ? (
                                    <textarea
                                        value={formData[field.key]}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        placeholder={field.placeholder}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                                    />
                                ) : (
                                    <input
                                        type={field.type}
                                        value={formData[field.key]}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        placeholder={field.placeholder}
                                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            leftIcon={<ArrowLeft className="w-4 h-4" />}
                        >
                            Back
                        </Button>

                        {isLastStep ? (
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                rightIcon={
                                    isSubmitting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Search className="w-4 h-4" />
                                    )
                                }
                            >
                                {isSubmitting ? "Analyzing..." : "Start Analysis"}
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                onClick={handleNext}
                                rightIcon={<ArrowRight className="w-4 h-4" />}
                            >
                                Continue
                            </Button>
                        )}
                    </div>
                </GlassCard>
            </motion.div>

            {/* Info Box */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6"
            >
                <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <p className="text-sm text-gray-400">
                        <span className="text-blue-400 font-medium">💡 How it works:</span>{" "}
                        Once submitted, our AI swarm (Perplexity, Grok, GPT-4, Claude, DeepSeek, Gemini)
                        will analyze your brand, identify competitors, and synthesize
                        actionable SEO recommendations. Results are delivered via email.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
