import { BrandAuditForm } from '@/features/automations/components/brand-audit-form'

export default function BrandAuditPage() {
    return (
        <div className="container mx-auto py-20 px-4 min-h-screen flex items-center justify-center">
            <div className="w-full">
                <div className="mb-10 text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                        Market Intelligence
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Deploy our swarm of AI agents to analyze your market position,
                        spy on competitors, and uncover hidden opportunities.
                    </p>
                </div>

                <BrandAuditForm />
            </div>
        </div>
    )
}
