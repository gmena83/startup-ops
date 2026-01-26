"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

const buttonVariants = cva(
    // Base styles
    [
        "inline-flex items-center justify-center gap-2",
        "font-semibold text-sm",
        "rounded-lg",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1a]",
        "disabled:pointer-events-none disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-gradient-to-r from-blue-500 to-cyan-500",
                    "text-white",
                    "shadow-md shadow-blue-500/25",
                    "hover:shadow-lg hover:shadow-blue-500/30",
                ],
                secondary: [
                    "bg-white/5 backdrop-blur-sm",
                    "border border-white/10",
                    "text-white",
                    "hover:bg-white/10 hover:border-white/20",
                ],
                ghost: ["text-gray-300", "hover:bg-white/5 hover:text-white"],
                outline: [
                    "border border-blue-500/50",
                    "text-blue-400",
                    "hover:bg-blue-500/10 hover:border-blue-500",
                ],
                danger: [
                    "bg-red-500/10",
                    "border border-red-500/50",
                    "text-red-400",
                    "hover:bg-red-500/20",
                ],
            },
            size: {
                sm: "h-9 px-3 text-xs",
                md: "h-10 px-4 py-2",
                lg: "h-12 px-6 text-base",
                xl: "h-14 px-8 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

// Non-animated button for asChild support
interface ButtonBaseProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonBaseProps>(
    (
        {
            className,
            variant,
            size,
            children,
            asChild = false,
            isLoading = false,
            leftIcon,
            rightIcon,
            disabled,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        // When asChild is true, we can't add icons or loading states
        // The child component handles everything
        if (asChild) {
            return (
                <Comp
                    ref={ref}
                    className={cn(buttonVariants({ variant, size, className }))}
                    {...props}
                >
                    {children}
                </Comp>
            );
        }

        return (
            <button
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
                {children}
                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = "Button";

// Animated button variant (without asChild support)
interface AnimatedButtonProps
    extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
    children?: React.ReactNode;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
    (
        {
            className,
            variant,
            size,
            children,
            isLoading = false,
            leftIcon,
            rightIcon,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <motion.button
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={disabled || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                {...props}
            >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
                {children}
                {!isLoading && rightIcon}
            </motion.button>
        );
    }
);

AnimatedButton.displayName = "AnimatedButton";

export { buttonVariants };
export default Button;
