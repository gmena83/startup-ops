"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50",
                    "transition-all duration-300",
                    isScrolled
                        ? "bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-white/5"
                        : "bg-transparent"
                )}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                                <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <span className="text-xl font-bold text-white">
                                Startup<span className="text-cyan-400">OPS</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/login">Log In</Link>
                            </Button>
                            <Button variant="primary" size="sm" asChild>
                                <Link href="/dashboard">Get Started</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-72 bg-[#111827] border-l border-white/10"
                        >
                            <div className="p-6 pt-20">
                                <div className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-gray-300 hover:text-white transition-colors text-lg font-medium py-2"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}

                                    <div className="h-px bg-white/10 my-4" />

                                    <Button variant="secondary" className="w-full" asChild>
                                        <Link href="/login">Log In</Link>
                                    </Button>
                                    <Button variant="primary" className="w-full" asChild>
                                        <Link href="/dashboard">Get Started</Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
