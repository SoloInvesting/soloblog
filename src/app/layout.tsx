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
  title: "סולו — השקעות, שווקים ותובנות פיננסיות",
  description:
    "המקור שלך לאסטרטגיות השקעה, ניתוח שווקים, חדשות פיננסיות ותובנות מומחים שיעזרו לך לבנות עושר.",
  openGraph: {
    title: "סולו — השקעות, שווקים ותובנות פיננסיות",
    description: "המקור שלך לאסטרטגיות השקעה, ניתוח שווקים וחדשות פיננסיות.",
    url: "https://www.solo.life",
    siteName: "סולו",
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
      lang="he"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <Sidebar />
        <main className="mr-[72px] min-h-screen">{children}</main>
      </body>
    </html>
  );
}
