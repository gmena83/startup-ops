"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Mail, FileText, Ban, DollarSign, Clock, LayoutGrid, BrainCircuit } from "lucide-react";

interface ValuePropVisualizerProps {
    currentIndex: number;
}

export function ValuePropVisualizer({ currentIndex }: ValuePropVisualizerProps) {
    return (
        <div className="relative w-full h-[500px] bg-[#0d121f] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-8">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <AnimatePresence mode="wait">
                {currentIndex === 0 && <DilemmaVisual key="dilemma" />}
                {currentIndex === 1 && <OverloadVisual key="overload" />}
                {currentIndex === 2 && <BurnoutVisual key="burnout" />}
            </AnimatePresence>
        </div>
    );
}

// Visual 1: The Founder's Dilemma (Money/Time Loss vs Strategy)
function DilemmaVisual() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
        >
            <div className="space-y-6">
                {/* Problem State: Draining Money */}
                <div className="flex items-center justify-between text-red-400 font-mono text-sm mb-2">
                    <span>ADMIN_COSTS</span>
                    <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        -$114,000/yr
                    </motion.span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-red-500/50"
                        initial={{ width: "20%" }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                    />
                </div>

                <div className="flex justify-center my-8">
                    <motion.div
                        animate={{ rotate: 180 }}
                        transition={{ duration: 0.5, delay: 2 }}
                    >
                        <div className="w-px h-12 bg-white/10" />
                    </motion.div>
                </div>

                {/* Solution State: Growth */}
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <BrainCircuit className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-emerald-100 font-medium">Strategic Focus</span>
                    </div>
                    <div className="flex items-end gap-1 h-24">
                        {[30, 45, 35, 60, 50, 80, 100].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="flex-1 bg-emerald-500/40 rounded-t-sm"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// Visual 2: Task Overload (Chaos vs Order)
function OverloadVisual() {
    // Array of scattered icons position
    const scatteredElements = [
        { icon: Mail, x: -80, y: -60, color: "text-blue-400" },
        { icon: FileText, x: 80, y: -40, color: "text-orange-400" },
        { icon: Clock, x: -60, y: 60, color: "text-purple-400" },
        { icon: DollarSign, x: 70, y: 50, color: "text-green-400" },
        { icon: AlertCircle, x: 0, y: -90, color: "text-red-400" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center"
        >
            {/* Chaotic State moving to Order */}
            {scatteredElements.map((el, i) => (
                <motion.div
                    key={i}
                    initial={{ x: el.x, y: el.y, scale: 0.8 }}
                    animate={{
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 0
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                    className={cn("absolute p-3 rounded-lg bg-white/5 border border-white/10", el.colors)}
                >
                    <el.icon className={cn("w-6 h-6", el.color)} />
                </motion.div>
            ))}

            {/* The Engine emerging */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5, type: "spring" }}
                className="z-10 bg-blue-500/10 border border-blue-500/50 p-6 rounded-2xl backdrop-blur-xl"
            >
                <LayoutGrid className="w-12 h-12 text-blue-400" />
            </motion.div>

            {/* Output Streams */}
            <motion.div className="absolute inset-0 flex items-center justify-center -z-10">
                <svg className="w-full h-full">
                    <motion.circle
                        cx="50%" cy="50%" r="60"
                        stroke="#3b82f6" strokeWidth="1" fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        transition={{ delay: 2.2, duration: 1 }}
                    />
                    <motion.circle
                        cx="50%" cy="50%" r="80"
                        stroke="#3b82f6" strokeWidth="1" fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.2 }}
                        transition={{ delay: 2.4, duration: 1 }}
                    />
                </svg>
            </motion.div>
        </motion.div>
    )
}

// Visual 3: Burnout Risk (Red Wave vs Smooth Flow)
function BurnoutVisual() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm space-y-8"
        >
            {/* Burnout State */}
            <div className="relative h-24 border-b border-white/10 flex items-end overflow-hidden px-2">
                <span className="absolute top-0 left-0 text-xs text-red-500 font-mono">STRESS_LEVEL: CRITICAL</span>
                <div className="flex items-end gap-1 w-full justify-between">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 bg-red-500 rounded-t-sm"
                            animate={{
                                height: ["20%", "90%", "30%", "100%", "50%"]
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "mirror",
                                delay: i * 0.05
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Transition Arrow */}
            <div className="flex justify-center">
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </motion.div>
            </div>

            {/* Peace State */}
            <div className="relative h-24 border-b border-white/10 flex items-center justify-center overflow-hidden">
                <span className="absolute top-0 left-0 text-xs text-emerald-500 font-mono">SYSTEM_STATUS: OPTIMAL</span>
                <svg className="w-full h-20" preserveAspectRatio="none">
                    <motion.path
                        d="M0 50 Q 50 20, 100 50 T 200 50 T 300 50 T 400 50"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    />
                </svg>
                <motion.div
                    className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"
                    animate={{ offsetDistance: "100%" }}
                    style={{ offsetPath: "path('M0 50 Q 50 20, 100 50 T 200 50 T 300 50 T 400 50')" }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                />
            </div>
        </motion.div>
    )
}
