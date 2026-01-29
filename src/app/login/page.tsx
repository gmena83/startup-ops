"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { Zap, Loader2, Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/ui/language-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useLanguage();
    const supabase = createClient();

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred";
            setError(errorMessage);
            setIsLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
            setIsEmailSent(true);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center items-center p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

            <div className="absolute top-4 right-4 group">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md z-10">
                <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
                    <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Startup<span className="text-cyan-400">OPS</span>
                    </span>
                </Link>

                <GlassCard className="p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-[var(--foreground)]">{t("auth.signInParams")}</h1>
                        <p className="text-[var(--foreground-muted)] text-sm mt-2">
                            Welcome back
                        </p>
                    </div>

                    {isEmailSent ? (
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="text-lg font-medium text-[var(--foreground)]">Check your email</h3>
                            <p className="text-[var(--foreground-muted)] text-sm">
                                We&apos;ve sent a magic link to <span className="text-[var(--foreground)]">{email}</span>
                            </p>
                            <Button
                                variant="ghost"
                                onClick={() => setIsEmailSent(false)}
                                className="text-[var(--accent-primary)] hover:text-[var(--accent-primary)]/80"
                            >
                                Try another email
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Button
                                variant="secondary"
                                className="w-full flex items-center justify-center gap-2 h-11 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                )}
                                {t("auth.google")}
                            </Button>

                            <Button
                                variant="secondary"
                                className="w-full flex items-center justify-center gap-2 h-11 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
                                onClick={async () => {
                                    setIsLoading(true);
                                    setError(null);
                                    try {
                                        const { error } = await supabase.auth.signInWithOAuth({
                                            provider: "linkedin_oidc",
                                            options: {
                                                redirectTo: `${window.location.origin}/auth/callback`,
                                            },
                                        });
                                        if (error) throw error;
                                    } catch (err: unknown) {
                                        const errorMessage = err instanceof Error ? err.message : "An error occurred";
                                        setError(errorMessage);
                                        setIsLoading(false);
                                    }
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0077b5">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                )}
                                {t("auth.linkedin")}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-[var(--glass-border)]" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[var(--background-secondary)] px-2 text-[var(--foreground-subtle)] rounded">
                                        Or
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleEmailLogin} className="space-y-4">
                                <div>
                                    <Input
                                        type="email"
                                        placeholder={t("auth.emailPlaceholder")}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-11 bg-[var(--background-secondary)] border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full h-11"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Mail className="w-4 h-4 mr-2" />
                                            {t("auth.sendMagicLink")}
                                        </>
                                    )}
                                </Button>
                            </form>

                            {error && (
                                <p className="text-red-400 text-xs text-center">{error}</p>
                            )}
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>
    );
}
