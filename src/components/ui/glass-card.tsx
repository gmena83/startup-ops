"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    /** Enable hover animation effects */
    interactive?: boolean;
    /** Show gradient border effect */
    gradientBorder?: boolean;
    /** Padding preset */
    padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
    (
        {
            className,
            children,
            interactive = true,
            gradientBorder = false,
            padding = "md",
            ...props
        },
        ref
    ) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    // Base glass styles
                    "relative rounded-xl",
                    "bg-white/[0.03] backdrop-blur-xl",
                    // Use style for border color to avoid Oklab/Motion conflict
                    // "border border-white/[0.08]", 
                    "border",
                    // Padding
                    paddingStyles[padding],
                    // Gradient border effect
                    gradientBorder && [
                        "before:absolute before:inset-0 before:-z-10",
                        "before:rounded-xl before:p-[1px]",
                        "before:bg-gradient-to-br before:from-blue-500/30 before:to-cyan-500/30",
                    ],
                    className
                )}
                style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
                whileHover={
                    interactive
                        ? {
                            y: -4,
                            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4)",
                            borderColor: "rgba(255, 255, 255, 0.12)",
                        }
                        : undefined
                }
                transition={{ duration: 0.2, ease: "easeOut" }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
