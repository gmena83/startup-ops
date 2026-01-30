import { PromptGeneratorForm } from '@/components/tools/prompt-generator-form'
import { Sparkles } from 'lucide-react'

export default function PromptGeneratorPage() {
    return (
        <div className="container mx-auto py-24 px-4 min-h-screen flex flex-col items-center justify-center bg-black/50">
            <div className="w-full max-w-2xl text-center mb-12 space-y-6">
                <div className="inline-flex items-center justify-center p-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold tracking-wide uppercase">Free Developer Tool</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                        The Architect
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed">
                    Generate production-ready prompts for any AI tool.
                    We research the official docs so you don't have to.
                </p>
            </div>

            <PromptGeneratorForm />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-zinc-500 text-sm max-w-4xl opacity-60">
                <div>
                    <strong className="block text-zinc-300 text-base mb-1">RAG Powered</strong>
                    Scans live documentation for real-time accuracy.
                </div>
                <div>
                    <strong className="block text-zinc-300 text-base mb-1">Multi-Model</strong>
                    Claude for drafting, GPT-4o for synthesis.
                </div>
                <div>
                    <strong className="block text-zinc-300 text-base mb-1">Free Tier</strong>
                    1 generated guide per day using your email.
                </div>
            </div>
        </div>
    )
}
