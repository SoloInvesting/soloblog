"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const CATEGORIES = [
  { label: "For You", href: "/" },
  { label: "Investing", href: "/category/investing" },
  { label: "Technology", href: "/category/technology" },
  { label: "Economy", href: "/category/economy" },
  { label: "Crypto", href: "/category/crypto" },
  { label: "Personal Finance", href: "/category/personal-finance" },
];

export default function Header() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-4 px-6 py-3">
        <form onSubmit={handleSearch} className="flex-1 max-w-xl">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search articles, news, stocks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-muted-light rounded-xl text-sm border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </form>

        <div className="flex items-center gap-3">
          <Link
            href="/news"
            className={`text-sm font-medium transition-colors ${
              pathname === "/news" ? "text-primary" : "text-muted hover:text-foreground"
            }`}
          >
            Latest News
          </Link>
          <Link
            href="/markets"
            className={`text-sm font-medium transition-colors ${
              pathname === "/markets" ? "text-primary" : "text-muted hover:text-foreground"
            }`}
          >
            Markets
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 px-6 pb-3 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => {
          const active = pathname === cat.href;
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted hover:text-foreground hover:bg-muted-light"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
