"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Check, X, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Starter",
        price: "$20",
        period: "/month",
        runs: "20 runs",
        description: "Perfect for solopreneurs just getting started with automation.",
        features: [
            { text: "Basic automations", included: true },
            { text: "Non-customizable workflows", included: true },
            { text: "Monthly free webinar", included: true },
            { text: "Email support", included: true },
            { text: "Advanced automations", included: false },
            { text: "Custom workflows", included: false },
        ],
        cta: "Get Started",
        popular: false,
        color: "border-white/10",
    },
    {
        name: "Professional",
        price: "$50",
        period: "/month",
        runs: "50 runs",
        description: "For growing startups that need more power and flexibility.",
        features: [
            { text: "All Starter features", included: true },
            { text: "Advanced automations", included: true },
            { text: "Prompt & code customization", included: true },
            { text: "Priority email support", included: true },
            { text: "Analytics dashboard", included: true },
            { text: "Custom workflows", included: false },
        ],
        cta: "Get Started",
        popular: true,
        color: "border-blue-500/50",
    },
    {
        name: "Growth",
        price: "$100",
        period: "/month",
        runs: "100 runs",
        description: "For scaling teams that need the full power of automation.",
        features: [
            { text: "All Professional features", included: true },
            { text: "All automations unlocked", included: true },
            { text: "Customized workflows", included: true },
            { text: "API access", included: true },
            { text: "Dedicated support", included: true },
            { text: "Team collaboration", included: true },
        ],
        cta: "Get Started",
        popular: false,
        color: "border-white/10",
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        runs: "Unlimited",
        description: "For organizations with custom requirements and scale.",
        features: [
            { text: "All Growth features", included: true },
            { text: "Unlimited runs", included: true },
            { text: "Custom integrations", included: true },
            { text: "SLA guarantees", included: true },
            { text: "Dedicated account manager", included: true },
            { text: "On-premise deployment", included: true },
        ],
        cta: "Contact Sales",
        popular: false,
        color: "border-white/10",
    },
];

export function PricingSection() {
    return (
        <section className="section-padding relative overflow-hidden" id="pricing">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
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
                    <span className="text-green-400 font-semibold text-sm uppercase tracking-wider mb-3 block">
                        Pricing
                    </span>
                    <h2 className="heading-1 text-white mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-body max-w-2xl mx-auto">
                        Start saving time today. No hidden fees, no complicated tiers.
                        Just straightforward pricing that scales with your needs.
                    </p>
                </motion.div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold">
                                        <Zap className="w-3 h-3" />
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <GlassCard
                                className={`h-full flex flex-col ${plan.color} ${plan.popular ? "ring-1 ring-blue-500/30" : ""
                                    }`}
                                interactive={false}
                            >
                                {/* Plan Header */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-white mb-1">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm">{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                                        <span className="text-gray-400">{plan.period}</span>
                                    </div>
                                    <div className="text-sm text-cyan-400 mt-1">{plan.runs}</div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {plan.features.map((feature) => (
                                        <li key={feature.text} className="flex items-start gap-2">
                                            {feature.included ? (
                                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                            )}
                                            <span
                                                className={
                                                    feature.included ? "text-gray-300" : "text-gray-500"
                                                }
                                            >
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Button
                                    variant={plan.popular ? "primary" : "secondary"}
                                    className="w-full"
                                    asChild
                                >
                                    <Link href={plan.name === "Enterprise" ? "#contact" : "/dashboard"}>
                                        {plan.cta}
                                    </Link>
                                </Button>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Money Back Guarantee */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400">
                        ✨ <span className="text-white">7-day free trial</span> on all plans •
                        No credit card required • Cancel anytime
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default PricingSection;
