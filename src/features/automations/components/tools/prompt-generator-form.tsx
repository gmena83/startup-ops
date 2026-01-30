"use client"

import { useState } from 'react'
import { submitPromptRequest, type PromptState } from '@/features/automations/api/lead-magnet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassCard } from '@/components/ui/glass-card'
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from '@/components/ui/checkbox'

const initialState: PromptState = {
    message: '',
    success: undefined,
    errors: {}
}

const PROJECT_TYPES = [
    "Landing Page", ,
    "Mobile Application",
    "Web Application",
    "Dashboard",
    "Bot / Automation",
    "Interactive Tutorial",
    "Interactive Content"
]

const KEY_FEATURES = [
    "User authentication",
    "External Database",
    "Contact Form",
    "Chat",
    "Notifications",
    "Multi-Language",
    "Blog",
    "Portfolio",
    "Document upload",
    "Document Storage",
    "Text Review",
    "Translate languages",
    "Sentiment Analysis",
    "Image Creation",
    "Image to text",
    "Document summary",
    "Audio to text"
]

const PLATFORMS = [
    "Replit.dev",
    "Perplexity Labs",
    "Manus.im",
    "Wegic.ai",
    "Webflow",
    "Github Copilot",
    "Gamma App",
    "Lovable.dev"
]

const AI_EXPERIENCE = [
    "Beginner (First time)",
    "Intermediate (Tried a few times)",
    "Advanced (Use regularly)",
    "Expert (Developing AI solutions)"
]

const VISUAL_STYLES = [
    "Minimalist/Clean",
    "Modern/Bold",
    "Professional/Corporate",
    "Creative/Artistic",
    "Futurist/Tech",
    "Organic/Natural"
]

const DATA_TYPES = [
    { id: "public", label: "Public Data (Low security)" },
    { id: "sensitive", label: "Sensitive Data (High Security)" },
    { id: "custom", label: "Customized Restrictions" }
]

export function PromptGeneratorForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState<PromptState>(initialState)
    // Local state for multi-selects to handle FormData logic
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setState(initialState)

        const formData = new FormData(event.currentTarget)
        // Manually append multi-select array as JSON string or handle in server action
        formData.set("features", JSON.stringify(selectedFeatures))

        try {
            const result = await submitPromptRequest(initialState, formData)
            setState(result)
        } catch (e) {
            setState({ success: false, message: 'An unexpected error occurred.' })
        } finally {
            setIsLoading(false)
        }
    }

    if (state.success) {
        return (
            <GlassCard className="w-full max-w-2xl mx-auto border-emerald-500/30" gradientBorder>
                <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Request Received!</h3>
                    <p className="text-zinc-400 max-w-xs mx-auto">
                        {state.message}
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => setState(initialState)}
                        className="mt-6 border-white/10 hover:bg-white/5 text-white"
                    >
                        Generate Another (Tomorrow)
                    </Button>
                </div>
            </GlassCard>
        )
    }

    return (
        <GlassCard className="w-full max-w-2xl mx-auto" gradientBorder>
            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Error Message Generic */}
                {state.success === false && state.message && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center text-sm">
                        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        {state.message}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                        <Label className="text-zinc-300">Project Type *</Label>
                        <Select name="project_type" required disabled={isLoading}>
                            <SelectTrigger className="bg-zinc-900/50 border-white/10 text-white">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {PROJECT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Platform */}
                    <div className="space-y-2">
                        <Label className="text-zinc-300">Target Platform *</Label>
                        <Select name="tool_name" required disabled={isLoading}>
                            <SelectTrigger className="bg-zinc-900/50 border-white/10 text-white">
                                <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                                {PLATFORMS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Project Details */}
                <div className="space-y-2">
                    <Label htmlFor="task_description" className="text-zinc-300">Project Details *</Label>
                    <textarea
                        id="task_description"
                        name="task_description"
                        required
                        rows={4}
                        className="flex w-full rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="Describe your idea in detail..."
                        disabled={isLoading}
                    />
                </div>

                {/* Key Features (Multi-Select) */}
                <div className="space-y-3">
                    <Label className="text-zinc-300">Key Features</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {KEY_FEATURES.map(feature => (
                            <div key={feature} className="flex items-start space-x-2">
                                <Checkbox
                                    id={feature}
                                    checked={selectedFeatures.includes(feature)}
                                    onCheckedChange={(checked) => {
                                        if (checked) setSelectedFeatures([...selectedFeatures, feature])
                                        else setSelectedFeatures(selectedFeatures.filter(f => f !== feature))
                                    }}
                                    className="border-white/20 data-[state=checked]:bg-blue-600"
                                />
                                <label
                                    htmlFor={feature}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-400"
                                >
                                    {feature}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Visual Style */}
                    <div className="space-y-2">
                        <Label className="text-zinc-300">Visual Style</Label>
                        <Select name="visual_style" disabled={isLoading}>
                            <SelectTrigger className="bg-zinc-900/50 border-white/10 text-white">
                                <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                                {VISUAL_STYLES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* AI Experience */}
                    <div className="space-y-2">
                        <Label className="text-zinc-300">Your AI Experience</Label>
                        <Select name="ai_experience" disabled={isLoading}>
                            <SelectTrigger className="bg-zinc-900/50 border-white/10 text-white">
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                {AI_EXPERIENCE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Data Privacy Radio */}
                <div className="space-y-3">
                    <Label className="text-zinc-300">Data Sensitivity</Label>
                    <RadioGroup defaultValue="public" name="data_type" className="flex flex-col md:flex-row gap-4">
                        {DATA_TYPES.map(type => (
                            <div key={type.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={type.id} id={type.id} className="border-white/20 text-blue-500" />
                                <Label htmlFor={type.id} className="text-zinc-400 font-normal">{type.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300">Email Address *</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="bg-zinc-900/50 border-white/10 text-white"
                        disabled={isLoading}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 py-6 text-base font-semibold shadow-lg shadow-blue-900/20"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            Generate Master Prompt
                            <Send className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </form>
        </GlassCard>
    )
}
