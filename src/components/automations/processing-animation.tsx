"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, Brain, Search, MessageSquare, Zap, ShieldAlert, TrendingUp } from "lucide-react";

// Icons representing the Council of Six
const aiModels = [
    { id: "perplexity", name: "Perplexity", icon: Search, color: "text-blue-400" },
    { id: "grok", name: "Grok", icon: Zap, color: "text-gray-100" },
    { id: "gpt-4o", name: "GPT-4o", icon: Brain, color: "text-green-500" },
    { id: "claude", name: "Claude", icon: MessageSquare, color: "text-orange-400" },
    { id: "deepseek", name: "DeepSeek", icon: ShieldAlert, color: "text-purple-500" },
    { id: "gemini", name: "Gemini", icon: TrendingUp, color: "text-blue-500" },
];

export function ProcessingAnimation() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        "Analyzing Brand Context...",
        "Orchestrating Council of Six...",
        "Gathering Competitor Intelligence...",
        "Synthesizing Strategic Insights...",
        "Finalizing Report..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 2000); // Change text every 2 seconds
        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <div className="flex flex-col items-center justify-center p-12 text-center space-y-8">
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Central Brain/Core */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center backdrop-blur-md border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <Brain className="w-10 h-10 text-blue-400 animate-pulse" />
                    </div>
                </div>

                {/* Satellite AI Models */}
                {aiModels.map((model, index) => {
                    const angle = (index / aiModels.length) * 2 * Math.PI;
                    const radius = 100; // Distance from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <motion.div
                            key={model.id}
                            className="absolute z-0"
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                                x: x,
                                y: y,
                                opacity: 1,
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 1,
                                delay: index * 0.1,
                                scale: { repeat: Infinity, duration: 2 }
                            }}
                        >
                            <div className={cn("p-3 bg-gray-900/50 rounded-full border border-gray-700 backdrop-blur-sm", model.color)}>
                                <model.icon className="w-6 h-6" />
                            </div>

                            {/* Connecting Line (SVG) */}
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] pointer-events-none -z-10 overflow-visible">
                                <motion.line
                                    x1="50%"
                                    y1="50%"
                                    x2="50%" // Will need calculation relative to center, simplified for direct rendering
                                    y2="50%" // React motion handles relative positioning better in parents, but let's do a simple pulse effect
                                    stroke="currentColor"
                                    className="text-blue-500/20"
                                    strokeWidth="1"
                                />
                            </svg>
                        </motion.div>
                    );
                })}

                {/* Orbit Rings */}
                <div className="absolute inset-0 border border-blue-500/10 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 border border-purple-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">
                    {activeStep < steps.length - 1 ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                            {steps[activeStep]}
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2 text-green-400">
                            <CheckCircle2 className="w-5 h-5" />
                            Report Ready! Sending Email...
                        </span>
                    )}
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Our multi-model consensus engine is processing your data.
                    You will receive the full report in your email in less than 10 minutes.
                </p>
            </div>
        </div>
    );
}
