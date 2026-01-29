"use client";

import { Zap, Twitter, Linkedin, Github, Mail } from "lucide-react";
import Link from "next/link";

const footerLinks = {
    product: [
        { href: "#features", label: "Features" },
        { href: "#pricing", label: "Pricing" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "#", label: "Changelog" },
    ],
    company: [
        { href: "#", label: "About" },
        { href: "#", label: "Blog" },
        { href: "#", label: "Careers" },
        { href: "#", label: "Contact" },
    ],
    resources: [
        { href: "#", label: "Documentation" },
        { href: "#", label: "Help Center" },
        { href: "#", label: "Community" },
        { href: "#", label: "API" },
    ],
    legal: [
        { href: "#", label: "Privacy Policy" },
        { href: "#", label: "Terms of Service" },
        { href: "#", label: "Cookie Policy" },
    ],
};

const socialLinks = [
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Linkedin, label: "LinkedIn" },
    { href: "#", icon: Github, label: "GitHub" },
    { href: "mailto:hello@startupops.com", icon: Mail, label: "Email" },
];

export function Footer() {
    return (
        <footer className="bg-[#080c14] border-t border-white/5 mt-32">
            <div className="container-custom py-24">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                Startup<span className="text-cyan-400">OPS</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 max-w-xs">
                            Give founders their time back. Automate repetitive tasks so you can focus on what really matters.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="text-gray-500 hover:text-white transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/data-management" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Data Management
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} StartupOPS.</p>
                        <span className="hidden md:inline text-gray-700">•</span>
                        <p>
                            A product by{" "}
                            <a
                                href="https://menatech.cloud"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Menatech.cloud
                            </a>
                        </p>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Made with ❤️ for founders everywhere
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
