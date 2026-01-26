"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AutomationCard } from "@/components/dashboard/automation-card";
import {
    Search,
    FileText,
    BarChart3,
    Users,
    Mail,
    Briefcase,
    Zap,
    Clock,
    TrendingUp,
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

const stats = [
    {
        label: "Runs Remaining",
        value: "20",
        sublabel: "of 20 this month",
        icon: Zap,
        color: "text-cyan-400",
    },
    {
        label: "Time Saved",
        value: "0h",
        sublabel: "this month",
        icon: Clock,
        color: "text-green-400",
    },
    {
        label: "Automations Used",
        value: "0",
        sublabel: "total runs",
        icon: TrendingUp,
        color: "text-purple-400",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Welcome back! 👋
                </h1>
                <p className="text-gray-400">
                    Ready to automate your operations? Select an automation below to get started.
                </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
                {stats.map((stat) => (
                    <GlassCard key={stat.label} interactive={false} padding="md">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                                <p className="text-gray-500 text-xs mt-1">{stat.sublabel}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-white/5">
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </motion.div>

            {/* Automations Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Available Automations</h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Choose an automation to run
                        </p>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium">
                        1 Available
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {automations.map((automation, index) => (
                        <motion.div
                            key={automation.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                        >
                            <AutomationCard {...automation} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <GlassCard interactive={false} className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-white font-semibold mb-1">Pro Tip: Brand SEO Analysis</h3>
                            <p className="text-gray-400 text-sm">
                                Our flagship automation uses 6 AI models (Perplexity, Grok, GPT-4, Claude, DeepSeek, Gemini)
                                to provide comprehensive competitive analysis and SEO recommendations. Perfect for understanding
                                your market position!
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
}
