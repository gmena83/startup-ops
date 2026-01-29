import { createClient } from "@/lib/supabase/server";
import { Users, Activity, Zap } from "lucide-react";

export default async function AdminPage() {
    const supabase = await createClient();

    // Fetch Stats (Parallel)
    const [
        { count: userCount },
        { count: runCount },
        { count: activeCount } // Just a proxy for pending logs
    ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("automations_log").select("*", { count: "exact", head: true }),
        supabase.from("automations_log").select("*", { count: "exact", head: true }).eq("status", "pending")
    ]);

    return (
        <div className="space-y-8">
            <h1 className="heading-2">Admin Overview</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111827] border border-white/5 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm">Total Users</span>
                        <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold">{userCount || 0}</div>
                </div>

                <div className="bg-[#111827] border border-white/5 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm">Total Automations Run</span>
                        <Zap className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="text-3xl font-bold">{runCount || 0}</div>
                </div>

                <div className="bg-[#111827] border border-white/5 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm">Active / Pending</span>
                        <Activity className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold">{activeCount || 0}</div>
                </div>
            </div>

            {/* Quick Actions or Recent Logs could go here */}
        </div>
    );
}
