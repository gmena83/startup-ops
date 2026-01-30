"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

export function VideoSection() {
    return (
        <section className="py-12 md:py-24 relative overflow-hidden bg-[#0a0f1a]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-4">
                        See It In Action
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Watch how StartupOPS transforms chaotic workflows into streamlined efficiency.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    <GlassCard
                        padding="none"
                        className="overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20 aspect-video group relative"
                        gradientBorder
                    >
                        <video
                            controls
                            className="w-full h-full object-cover rounded-xl"
                            poster="/thumbnail-placeholder.png" // We don't have one yet, browser will showing 1st frame
                        >
                            <source src="/videos/what_is_startupops.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
