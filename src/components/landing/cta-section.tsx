"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTASection() {
    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    {/* Decorative Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-8"
                    >
                        <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Headline */}
                    <h2 className="heading-1 text-white mb-4">
                        Ready to Reclaim Your Time?
                    </h2>

                    {/* Subheadline */}
                    <p className="text-xl text-gray-400 mb-8">
                        Join thousands of founders who are automating their way to success.
                        Start your journey today with{" "}
                        <span className="text-white font-semibold">StartupOPS</span>.
                    </p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">50M+</div>
                            <div className="text-sm text-gray-400">Founders globally</div>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden sm:block" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">$12B</div>
                            <div className="text-sm text-gray-400">Market size</div>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden sm:block" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">35%</div>
                            <div className="text-sm text-gray-400">Annual growth</div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="xl" rightIcon={<ArrowRight className="w-5 h-5" />} asChild>
                            <Link href="/dashboard">Start Automating Free</Link>
                        </Button>
                        <Button variant="secondary" size="xl" asChild>
                            <Link href="#pricing">View Pricing</Link>
                        </Button>
                    </div>

                    {/* Quote */}
                    <motion.blockquote
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5"
                    >
                        <p className="text-lg text-gray-300 italic mb-3">
                            &ldquo;Empowering founders to build the future, not manage the present.&rdquo;
                        </p>
                        <cite className="text-sm text-gray-500 not-italic">
                            — StartupOPS Mission
                        </cite>
                    </motion.blockquote>
                </motion.div>
            </div>
        </section>
    );
}

export default CTASection;
