"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Zap } from "lucide-react";
import Link from "next/link";

interface AutomationCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    status: "available" | "coming-soon";
    href?: string;
    estimatedTime?: string;
    color: string;
}

export function AutomationCard({
    title,
    description,
    icon: Icon,
    status,
    href,
    estimatedTime,
    color,
}: AutomationCardProps) {
    const isAvailable = status === "available";

    return (
        <GlassCard className="h-full flex flex-col relative overflow-hidden group">
            {/* Status Indicator */}
            <div className="absolute top-4 right-4">
                {isAvailable ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-green-400 text-xs font-medium">Live</span>
                    </div>
                ) : (
                    <div className="px-2.5 py-1 rounded-full bg-gray-500/10 border border-gray-500/30 text-gray-400 text-xs font-medium">
                        Coming Soon
                    </div>
                )}
            </div>

            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} p-[1px] mb-5`}>
                <div className="w-full h-full rounded-xl bg-[#0a0f1a] flex items-center justify-center group-hover:bg-[#111827] transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-4 flex-grow">{description}</p>

            {/* Meta Info */}
            {estimatedTime && (
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4" />
                        <span>1 run per use</span>
                    </div>
                </div>
            )}

            {/* Action Button */}
            {isAvailable && href ? (
                <Button
                    variant="primary"
                    className="w-full"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    asChild
                >
                    <Link href={href}>Start Automation</Link>
                </Button>
            ) : (
                <Button variant="secondary" className="w-full" disabled>
                    Coming Soon
                </Button>
            )}
        </GlassCard>
    );
}

export default AutomationCard;
