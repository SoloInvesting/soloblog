import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solo — Investing, Markets & Financial Insights",
  description:
    "Your go-to source for investing strategies, market analysis, financial news, and expert insights to help you build wealth.",
  openGraph: {
    title: "Solo — Investing, Markets & Financial Insights",
    description: "Your go-to source for investing strategies, market analysis, and financial news.",
    url: "https://www.solo.life",
    siteName: "Solo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <Sidebar />
        <main className="ml-[72px] min-h-screen">{children}</main>
      </body>
    </html>
  );
}
