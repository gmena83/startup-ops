"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
    Search,
    FileText,
    BarChart3,
    Users,
    Mail,
    Briefcase,
    ArrowRight,
    Check,
} from "lucide-react";
import Link from "next/link";

const automations = [
    {
        icon: Search,
        title: "Brand SEO Analysis",
        description:
            "AI-powered competitive analysis and SEO recommendations using 6 different AI models for comprehensive insights.",
        status: "available",
        features: ["Competitor mapping", "SEO recommendations", "AI-driven insights"],
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: FileText,
        title: "Invoice Generator",
        description:
            "Automatically generate professional invoices from your project data and send them to clients.",
        status: "coming-soon",
        features: ["PDF generation", "Auto-send", "Payment tracking"],
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: BarChart3,
        title: "Report Builder",
        description:
            "Transform raw data into beautiful, actionable reports for stakeholders and investors.",
        status: "coming-soon",
        features: ["Custom templates", "Data visualization", "Scheduled delivery"],
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: Users,
        title: "Onboarding Flow",
        description:
            "Streamline employee and customer onboarding with automated document collection and task management.",
        status: "coming-soon",
        features: ["Checklist automation", "Document requests", "Progress tracking"],
        color: "from-orange-500 to-red-500",
    },
    {
        icon: Mail,
        title: "Email Campaigns",
        description:
            "Create and schedule targeted email campaigns with AI-generated content tailored to your audience.",
        status: "coming-soon",
        features: ["AI copywriting", "Segmentation", "Analytics"],
        color: "from-cyan-500 to-blue-500",
    },
    {
        icon: Briefcase,
        title: "Proposal Writer",
        description:
            "Generate professional business proposals and quotes based on your service offerings.",
        status: "coming-soon",
        features: ["Template library", "Custom branding", "E-signatures"],
        color: "from-yellow-500 to-orange-500",
    },
];

export function FeaturesSection() {
    return (
        <section className="section-padding relative overflow-hidden" id="features">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[150px]" />
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3 block">
                        Automations
                    </span>
                    <h2 className="heading-1 text-white mb-4">
                        What&apos;s Ready to Use
                    </h2>
                    <p className="text-body max-w-2xl mx-auto">
                        Start with our flagship Brand SEO automation, with more powerful
                        tools launching soon. Each automation is designed to save you hours of work.
                    </p>
                </motion.div>

                {/* Feature Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-bold text-blue-400">6</div>
                        <div className="text-sm text-gray-400">Automations</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-bold text-cyan-400">EN/ES</div>
                        <div className="text-sm text-gray-400">Bilingual</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-bold text-green-400">📱</div>
                        <div className="text-sm text-gray-400">Mobile Ready</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl font-bold text-purple-400">📧</div>
                        <div className="text-sm text-gray-400">Email Delivery</div>
                    </div>
                </motion.div>

                {/* Automations Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {automations.map((automation, index) => (
                        <motion.div
                            key={automation.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <GlassCard className="h-full flex flex-col relative overflow-hidden group">
                                {/* Status Badge */}
                                {automation.status === "available" ? (
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
                                        Available
                                    </div>
                                ) : (
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gray-500/20 border border-gray-500/30 text-gray-400 text-xs font-medium">
                                        Coming Soon
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${automation.color} p-[1px] mb-4`}>
                                    <div className="w-full h-full rounded-xl bg-[#0a0f1a] flex items-center justify-center">
                                        <automation.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {automation.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 flex-grow">
                                    {automation.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-2 mb-4">
                                    {automation.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                                            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Action Button */}
                                {automation.status === "available" ? (
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="w-full"
                                        rightIcon={<ArrowRight className="w-4 h-4" />}
                                        asChild
                                    >
                                        <Link href="/dashboard">Try Now</Link>
                                    </Button>
                                ) : (
                                    <Button variant="secondary" size="sm" className="w-full" disabled>
                                        Notify Me
                                    </Button>
                                )}
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
