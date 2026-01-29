import { createClient } from "@/lib/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";

export default async function AdminAutomationsPage() {
    const supabase = await createClient();

    // Fetch recent logs with user details
    const { data: logs } = await supabase
        .from("automations_log")
        .select(`
            *,
            profiles:user_id (email, full_name)
        `)
        .order("created_at", { ascending: false })
        .limit(50);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="heading-2">Automation Logs</h1>
            </div>

            <div className="bg-[#111827] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="p-4 font-medium text-gray-400">Status</th>
                            <th className="p-4 font-medium text-gray-400">Automation</th>
                            <th className="p-4 font-medium text-gray-400">User</th>
                            <th className="p-4 font-medium text-gray-400">Time</th>
                            <th className="p-4 font-medium text-gray-400">ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {logs?.map((log) => (
                            <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <StatusBadge status={log.status} />
                                </td>
                                <td className="p-4 font-medium text-white">
                                    {log.automation_id}
                                </td>
                                <td className="p-4 text-gray-300">

                                    {log.profiles?.email || "Guest/Unknown"}
                                </td>
                                <td className="p-4 text-gray-400">
                                    {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                                </td>
                                <td className="p-4 text-gray-600 font-mono text-xs">
                                    {log.id.slice(0, 8)}...
                                </td>
                            </tr>
                        ))}
                        {!logs?.length && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    No logs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "completed":
            return (
                <span className="flex items-center gap-1.5 text-green-400 bg-green-400/10 px-2 py-1 rounded-full text-xs font-medium w-fit">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
            );
        case "failed":
            return (
                <span className="flex items-center gap-1.5 text-red-400 bg-red-400/10 px-2 py-1 rounded-full text-xs font-medium w-fit">
                    <XCircle className="w-3 h-3" /> Failed
                </span>
            );
        case "processing":
            return (
                <span className="flex items-center gap-1.5 text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full text-xs font-medium w-fit">
                    <Clock className="w-3 h-3 animate-spin" /> Processing
                </span>
            );
        default:
            return (
                <span className="flex items-center gap-1.5 text-gray-400 bg-gray-400/10 px-2 py-1 rounded-full text-xs font-medium w-fit">
                    <AlertTriangle className="w-3 h-3" /> {status}
                </span>
            );
    }
}
