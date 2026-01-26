"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
    FileText,
    Calendar,
    Mail,
    Clipboard,
    Database,
    FileSpreadsheet,
    Wallet,
    Users,
    Receipt,
    Share2,
    Headphones,
    Truck,
} from "lucide-react";

const tasks = [
    { icon: FileText, label: "Invoicing" },
    { icon: Calendar, label: "Scheduling" },
    { icon: Mail, label: "Email Management" },
    { icon: Clipboard, label: "Admin Tasks" },
    { icon: Database, label: "Data Entry" },
    { icon: FileSpreadsheet, label: "Report Generation" },
    { icon: Wallet, label: "Bookkeeping" },
    { icon: Users, label: "Payroll" },
    { icon: Receipt, label: "Expense Tracking" },
    { icon: Share2, label: "Social Media" },
    { icon: Headphones, label: "Customer Support" },
    { icon: Truck, label: "Supplier Relations" },
];

const stats = [
    {
        value: "24",
        unit: "hrs",
        label: "Wasted Weekly",
        sublabel: "on administrative tasks",
        color: "text-red-400",
    },
    {
        value: "$114K",
        unit: "-$1M",
        label: "Lost Annually",
        sublabel: "in opportunity cost",
        color: "text-orange-400",
    },
    {
        value: "72%",
        unit: "",
        label: "Mental Health",
        sublabel: "of founders report issues",
        color: "text-red-400",
    },
    {
        value: "40%",
        unit: "",
        label: "Burnout Rate",
        sublabel: "higher turnover from stress",
        color: "text-yellow-400",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function ProblemSection() {
    return (
        <section className="section-padding relative overflow-hidden" id="problem">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="text-red-400 font-semibold text-sm uppercase tracking-wider mb-3 block">
                        The Problem
                    </span>
                    <h2 className="heading-1 text-white mb-4">
                        Founders Are Drowning in Busy Work
                    </h2>
                    <p className="text-body max-w-2xl mx-auto">
                        Instead of focusing on business strategy and growth, founders spend
                        their precious time on tasks that don&apos;t directly grow their business.
                    </p>
                </motion.div>

                {/* Task Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-16"
                >
                    {tasks.map((task) => (
                        <motion.div
                            key={task.label}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300">
                                <task.icon className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors" />
                                <span className="text-xs text-gray-400 group-hover:text-gray-300 text-center transition-colors">
                                    {task.label}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Impact Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {stats.map((stat) => (
                        <GlassCard
                            key={stat.label}
                            className="text-center"
                            interactive={false}
                        >
                            <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-1`}>
                                {stat.value}
                                <span className="text-2xl md:text-3xl">{stat.unit}</span>
                            </div>
                            <div className="text-white font-semibold mb-1">{stat.label}</div>
                            <div className="text-gray-500 text-sm">{stat.sublabel}</div>
                        </GlassCard>
                    ))}
                </motion.div>

                {/* Callout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <p className="text-xl text-gray-300">
                        That&apos;s <span className="text-white font-bold">a whole day</span> every week
                        that could be invested in{" "}
                        <span className="text-cyan-400">business growth</span>,{" "}
                        <span className="text-green-400">personal development</span>, or{" "}
                        <span className="text-purple-400">self-care</span>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default ProblemSection;
