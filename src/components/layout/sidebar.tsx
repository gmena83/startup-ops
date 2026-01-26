"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Sparkles,
    Settings,
    HelpCircle,
    LogOut,
    ChevronLeft,
    Zap,
    Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const mainNavItems = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        href: "/dashboard/automations",
        label: "Automations",
        icon: Sparkles,
    },
    {
        href: "/dashboard/settings",
        label: "Settings",
        icon: Settings,
    },
];

const bottomNavItems = [
    {
        href: "/help",
        label: "Help & Support",
        icon: HelpCircle,
    },
];

interface NavItemProps {
    href: string;
    label: string;
    icon: React.ElementType;
    isCollapsed: boolean;
    pathname: string;
    onMobileClose: () => void;
}

function NavItem({
    href,
    label,
    icon: Icon,
    isCollapsed,
    pathname,
    onMobileClose,
}: NavItemProps) {
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                "transition-all duration-200",
                "group relative",
                isActive
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
            onClick={onMobileClose}
        >
            {isActive && (
                <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            <Icon
                className={cn("w-5 h-5 flex-shrink-0", isActive && "text-blue-400")}
            />
            <AnimatePresence>
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </Link>
    );
}

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    const handleMobileClose = () => setIsMobileOpen(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#111827] border border-white/10 rounded-lg text-gray-400 hover:text-white"
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        onClick={handleMobileClose}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={cn(
                    // Base styles
                    "fixed lg:sticky top-0 left-0 h-screen z-50 lg:z-30",
                    "bg-[#0a0f1a] border-r border-white/5",
                    // Mobile: slide in from left
                    "lg:translate-x-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full",
                    "transition-transform duration-300 lg:transition-none",
                    className
                )}
                animate={{ width: isCollapsed ? 72 : 240 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-4 border-b border-white/5">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg flex-shrink-0">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="text-lg font-bold text-white whitespace-nowrap overflow-hidden"
                                    >
                                        Startup<span className="text-cyan-400">OPS</span>
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    </div>

                    {/* Main Navigation */}
                    <nav className="flex-1 p-3 space-y-1">
                        {mainNavItems.map((item) => (
                            <NavItem
                                key={item.href}
                                {...item}
                                isCollapsed={isCollapsed}
                                pathname={pathname}
                                onMobileClose={handleMobileClose}
                            />
                        ))}
                    </nav>

                    {/* Bottom Navigation */}
                    <div className="p-3 border-t border-white/5 space-y-1">
                        {bottomNavItems.map((item) => (
                            <NavItem
                                key={item.href}
                                {...item}
                                isCollapsed={isCollapsed}
                                pathname={pathname}
                                onMobileClose={handleMobileClose}
                            />
                        ))}

                        {/* Logout Button */}
                        <button
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg w-full",
                                "text-gray-400 hover:text-red-400 hover:bg-red-500/10",
                                "transition-all duration-200"
                            )}
                        >
                            <LogOut className="w-5 h-5 flex-shrink-0" />
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                                    >
                                        Log Out
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>

                    {/* Collapse Button (Desktop only) */}
                    <div className="hidden lg:block p-3 border-t border-white/5">
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={cn(
                                "flex items-center justify-center w-full p-2 rounded-lg",
                                "text-gray-400 hover:text-white hover:bg-white/5",
                                "transition-all duration-200"
                            )}
                            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            <ChevronLeft
                                className={cn(
                                    "w-5 h-5 transition-transform duration-200",
                                    isCollapsed && "rotate-180"
                                )}
                            />
                        </button>
                    </div>
                </div>
            </motion.aside>
        </>
    );
}

export default Sidebar;
