import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StartupOPS - Give Founders Their Time Back",
  description:
    "Stop wasting 24+ hours every week on repetitive tasks. StartupOPS automates your operations so you can focus on strategy and growth.",
  keywords: [
    "startup automation",
    "business operations",
    "AI automation",
    "founder tools",
    "SEO analysis",
    "startup productivity",
  ],
  authors: [{ name: "StartupOPS" }],
  openGraph: {
    title: "StartupOPS - Give Founders Their Time Back",
    description:
      "Stop wasting 24+ hours every week on repetitive tasks. StartupOPS automates your operations so you can focus on strategy and growth.",
    type: "website",
    locale: "en_US",
    siteName: "StartupOPS",
  },
  twitter: {
    card: "summary_large_image",
    title: "StartupOPS - Give Founders Their Time Back",
    description:
      "Stop wasting 24+ hours every week on repetitive tasks. StartupOPS automates your operations.",
  },
};

import { LanguageProvider } from "@/components/ui/language-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#0a1628] text-white`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
