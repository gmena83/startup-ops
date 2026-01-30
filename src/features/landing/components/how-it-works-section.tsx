"use client";

import { motion } from "framer-motion";
import { MousePointer, FormInput, Sparkles, ArrowRight } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: MousePointer,
        title: "Select Automation",
        description:
            "Choose from our library of pre-built automations designed specifically for startup operations. Each one is optimized for efficiency.",
        color: "from-blue-500 to-blue-600",
    },
    {
        number: "02",
        icon: FormInput,
        title: "Provide Input",
        description:
            "Fill in a simple form with your specific requirements. No technical knowledge needed—we guide you through every step.",
        color: "from-cyan-500 to-cyan-600",
    },
    {
        number: "03",
        icon: Sparkles,
        title: "Receive Results",
        description:
            "Our AI-powered system processes your request and delivers actionable results directly to your inbox. It's that simple.",
        color: "from-purple-500 to-purple-600",
    },
];

export function HowItWorksSection() {
    return (
        <section className="section-padding relative overflow-hidden" id="how-it-works">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
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
                    <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-3 block">
                        How It Works
                    </span>
                    <h2 className="heading-1 text-white mb-4">
                        Three Steps to Reclaim Your Time
                    </h2>
                    <p className="text-body max-w-2xl mx-auto">
                        No complex setup. No learning curve. Just select, input, and receive
                        your results. StartupOPS handles the complexity so you don&apos;t have to.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
                    {/* Connecting Lines (Desktop) */}
                    <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-purple-500/50" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Step Card */}
                            <div className="text-center">
                                {/* Icon Circle */}
                                <div className="relative mx-auto mb-6">
                                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} p-[1px]`}>
                                        <div className="w-full h-full rounded-2xl bg-[#0a0f1a] flex items-center justify-center">
                                            <step.icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    {/* Step Number */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0a0f1a] border-2 border-white/10 flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">{step.number}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="heading-3 text-white mb-3">{step.title}</h3>
                                <p className="text-body">{step.description}</p>
                            </div>

                            {/* Arrow (Mobile) */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden flex justify-center my-6">
                                    <ArrowRight className="w-6 h-6 text-gray-600 rotate-90" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Highlight Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 border border-white/10 text-center"
                >
                    <p className="text-lg text-white mb-2">
                        🚀 <span className="font-semibold">Save up to 9.5 hours a week</span> from day one!
                    </p>
                    <p className="text-gray-400">
                        No coding required. Non-tech friendly. Ready-to-use automations.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default HowItWorksSection;
