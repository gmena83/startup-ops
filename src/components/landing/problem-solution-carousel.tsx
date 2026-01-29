"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

// Data derived from the PPTX content provided
const carouselData = [
    {
        id: 1,
        problem: {
            title: "The Founder's Dilemma",
            description: "Founders lose ~$114k-$1M/year in opportunity costs doing admin work instead of strategy.",
            icon: AlertCircle,
        },
        solution: {
            title: "Reclaim Your Time",
            description: "StartupOPS automates the mundane so you can focus on growth, strategy, and self-care.",
            icon: CheckCircle2,
        },
    },
    {
        id: 2,
        problem: {
            title: "Task Overload",
            description: "Invoicing, scheduling, email management, data entry... 24 hours/week lost to repetitive tasks.",
            icon: AlertCircle,
        },
        solution: {
            title: "Automated Operations",
            description: "Our AI engine handles invoicing, emails, and scheduling automatically. No human intervention needed.",
            icon: CheckCircle2,
        },
    },
    {
        id: 3,
        problem: {
            title: "Burnout Risk",
            description: "72% of founders report mental health issues. 40% suffer from burnout due to constant task-switching.",
            icon: AlertCircle,
        },
        solution: {
            title: "Peace of Mind",
            description: "Reduce cognitive load. Let AI handle the noise while you maintain your mental clarity and vision.",
            icon: CheckCircle2,
        },
    },
];

export function ProblemSolutionCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-cycle every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselData.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const currentItem = carouselData[currentIndex];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="heading-2 gradient-text mb-4">
                        Why StartupOPS?
                    </h2>
                    <p className="text-body max-w-2xl mx-auto">
                        We bridge the gap between where you are and where you need to be.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid md:grid-cols-2 gap-8 items-center"
                        >
                            {/* Problem Card (Left) */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-red-500/10 rounded-2xl blur-xl group-hover:bg-red-500/20 transition-all duration-500" />
                                <div className="relative bg-[#111827]/80 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 h-full min-h-[300px] flex flex-col justify-center">
                                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                                        <currentItem.problem.icon className="w-6 h-6 text-red-500" />
                                    </div>
                                    <h3 className="heading-3 text-white mb-3">
                                        {currentItem.problem.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {currentItem.problem.description}
                                    </p>
                                </div>
                            </div>

                            {/* Arrow Indicator (Desktop) */}
                            <div className="hidden md:flex justify-center text-gray-600">
                                <ArrowRight className="w-8 h-8 animate-pulse" />
                            </div>

                            {/* Solution Card (Right) */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl group-hover:bg-emerald-500/20 transition-all duration-500" />
                                <div className="relative bg-[#111827]/80 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 h-full min-h-[300px] flex flex-col justify-center">
                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                                        <currentItem.solution.icon className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <h3 className="heading-3 text-white mb-3">
                                        {currentItem.solution.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {currentItem.solution.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Indicators */}
                    <div className="flex justify-center gap-3 mt-12">
                        {carouselData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-all duration-300",
                                    index === currentIndex
                                        ? "bg-blue-500 w-8"
                                        : "bg-gray-700 hover:bg-gray-600"
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
