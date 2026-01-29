import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Activity, LogOut } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Check Role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        redirect("/dashboard"); // Kick non-admins back to user dashboard
    }

    return (
        <div className="flex min-h-screen bg-[#0a0f1a]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#0d121f]">
                <div className="p-6">
                    <div className="text-xl font-bold text-white mb-2">
                        Startup<span className="text-cyan-400">OPS</span>
                    </div>
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                        Admin Console
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Overview
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <Users className="w-5 h-5" />
                        Users
                    </Link>
                    <Link
                        href="/admin/automations"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <Activity className="w-5 h-5" />
                        Automations
                    </Link>
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors mt-8"
                    >
                        <LogOut className="w-5 h-5" />
                        Exit Admin
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
