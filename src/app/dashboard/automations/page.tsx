"use client";

import { motion } from "framer-motion";
import { AutomationCard } from "@/components/dashboard/automation-card";
import {
    Search,
    FileText,
    BarChart3,
    Users,
    Mail,
    Briefcase,
} from "lucide-react";

const automations = [
    {
        icon: Search,
        title: "Brand SEO Analysis",
        description:
            "AI-powered competitive analysis and SEO recommendations using 6 different AI models.",
        status: "available" as const,
        href: "/dashboard/automations/brand-seo",
        estimatedTime: "~5 min",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: FileText,
        title: "Invoice Generator",
        description:
            "Automatically generate professional invoices from your project data.",
        status: "coming-soon" as const,
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: BarChart3,
        title: "Report Builder",
        description:
            "Transform raw data into beautiful, actionable reports for stakeholders.",
        status: "coming-soon" as const,
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: Users,
        title: "Onboarding Flow",
        description:
            "Streamline employee and customer onboarding with automated workflows.",
        status: "coming-soon" as const,
        color: "from-orange-500 to-red-500",
    },
    {
        icon: Mail,
        title: "Email Campaigns",
        description:
            "Create and schedule targeted email campaigns with AI-generated content.",
        status: "coming-soon" as const,
        color: "from-cyan-500 to-blue-500",
    },
    {
        icon: Briefcase,
        title: "Proposal Writer",
        description:
            "Generate professional business proposals and quotes automatically.",
        status: "coming-soon" as const,
        color: "from-yellow-500 to-orange-500",
    },
];

export default function AutomationsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Automations
                </h1>
                <p className="text-gray-400">
                    Browse and run our library of AI-powered automations.
                </p>
            </motion.div>

            {/* Filters (placeholder) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap gap-2"
            >
                <button className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium">
                    All
                </button>
                <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/10 transition-colors">
                    Available
                </button>
                <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/10 transition-colors">
                    Coming Soon
                </button>
            </motion.div>

            {/* Automations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {automations.map((automation, index) => (
                    <motion.div
                        key={automation.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                    >
                        <AutomationCard {...automation} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
