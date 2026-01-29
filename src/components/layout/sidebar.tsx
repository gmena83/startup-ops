"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Settings, Zap, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/ui/language-provider";

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const { t } = useLanguage();

    const navigation = [
        { name: "dashboard.overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "dashboard.automations", href: "/dashboard/automations", icon: Zap },
        { name: "dashboard.settings", href: "/dashboard/settings", icon: Settings },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-[#0d121f]">
            <div className="p-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-1.5 rounded-lg">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">
                        Startup<span className="text-cyan-400">OPS</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-400 border border-blue-500/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-gray-500 group-hover:text-white")} />
                            {t(item.name)}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    {t("dashboard.logout")}
                </button>
            </div>
        </aside>
    );
}
