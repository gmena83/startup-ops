import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#0a0f1a]">
            <Sidebar />
            <main className="flex-1 lg:pl-0">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-white/5">
                    <div className="flex items-center justify-between h-16 px-6 lg:px-8">
                        {/* Left: Placeholder for breadcrumbs or title */}
                        <div className="lg:hidden w-10" /> {/* Spacer for mobile menu button */}
                        <div className="hidden lg:block">
                            <h1 className="text-lg font-semibold text-white">Operations Hub</h1>
                        </div>

                        {/* Right: User actions */}
                        <div className="flex items-center gap-4">
                            {/* Notification Bell */}
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                                </svg>
                            </button>

                            {/* User Avatar */}
                            <button className="flex items-center gap-3 p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
                                    U
                                </div>
                                <span className="hidden sm:block text-sm text-gray-300">User</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
