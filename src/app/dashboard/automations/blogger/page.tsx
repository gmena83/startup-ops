"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { startBloggerAutomation } from "@/app/actions/blogger";
import { useLanguage } from "@/components/ui/language-provider";
import { GlassCard } from "@/components/ui/glass-card";
import { ProcessingAnimation } from "@/components/automations/processing-animation";
import { ArrowRight, BookOpen, PenTool } from "lucide-react";
import { motion } from "framer-motion";

export default function BloggerPage() {
    const { t } = useLanguage();
    const [topic, setTopic] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!topic) return;
        setIsSubmitting(true);
        try {
            const res = await startBloggerAutomation({ topic });
            if (res.status === "success") {
                setIsSubmitted(true);
                // In a real app, we would poll here using the res.jobId
                // For this demo, we are showing the animation, and since we ran the process "sync" (or it returns success quickly),
                // we show the success state. 
                // Wait for a simulated poll or just show "Check your email"
                setTimeout(() => {
                    // Simulate completion for the demo
                    setResult(true);
                }, 10000); // 10 seconds of "animation" before final "Check Email" state
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted && !result) {
        return <ProcessingAnimation />;
    }

    if (result) {
        return (
            <div className="max-w-2xl mx-auto py-12 text-center">
                <GlassCard className="p-12 border-green-500/30">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <PenTool className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Article Generated!</h2>
                    <p className="text-gray-400 mb-8">
                        The Council has finished researching and writing your deep-dive article on
                        <span className="text-white font-medium"> &quot;{topic}&quot;</span>.
                        <br /><br />
                        It has been sent to your email inbox.
                    </p>
                    <Button
                        onClick={() => { setIsSubmitted(false); setResult(false); setTopic(""); }}
                        variant="secondary"
                    >
                        Write Another Article
                    </Button>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                    <BookOpen className="w-4 h-4" />
                    {t("blogger.title")}
                </div>
                <h1 className="heading-1 text-white">{t("blogger.topicLabel")}</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    {t("blogger.description")}
                </p>
            </motion.div>

            <GlassCard className="p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="space-y-6">
                    <div>
                        <textarea
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder={t("blogger.topicPlaceholder")}
                            className="w-full h-40 bg-[#0d121f] border border-gray-700 rounded-xl p-6 text-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            size="lg"
                            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border-0 shadow-lg shadow-blue-500/25"
                            onClick={handleSubmit}
                            disabled={isSubmitting || !topic}
                        >
                            {isSubmitting ? "Orchestrating..." : t("blogger.submit")}
                            {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
                        </Button>
                    </div>
                </div>
            </GlassCard>

            {/* Models Badge */}
            <div className="flex justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                    Powered by the Council of Six
                </span>
            </div>
        </div>
    );
}
