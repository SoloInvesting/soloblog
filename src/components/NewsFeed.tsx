"use client";

import Image from "next/image";
import { useLatestNews } from "@/lib/fmp-client";

export default function NewsFeed() {
  const { news, loading } = useLatestNews(24);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-border p-5 animate-pulse">
            <div className="flex gap-5">
              <div className="w-48 h-32 bg-muted-light rounded-xl flex-shrink-0" />
              <div className="flex-1">
                <div className="h-4 bg-muted-light rounded w-1/3 mb-3" />
                <div className="h-5 bg-muted-light rounded w-full mb-2" />
                <div className="h-5 bg-muted-light rounded w-2/3 mb-3" />
                <div className="h-3 bg-muted-light rounded w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-12 text-center">
        <p className="text-muted">
          הזנת חדשות אינה זמינה. הוסף את מפתח ה-FMP API שלך ל-<code className="bg-muted-light px-2 py-1 rounded" dir="ltr">.env.local</code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {news.map((item, i) => {
        const date = new Date(item.publishedDate).toLocaleDateString("he-IL", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const time = new Date(item.publishedDate).toLocaleTimeString("he-IL", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-5 bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-primary/5 transition-all group animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {item.image && (
              <div className="relative w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {item.symbol && (
                  <span className="px-2 py-0.5 bg-primary-light text-primary text-xs font-bold rounded" dir="ltr">
                    {item.symbol}
                  </span>
                )}
                <span className="text-xs text-muted">{item.site}</span>
                <span className="text-xs text-muted">·</span>
                <span className="text-xs text-muted">{date} {time}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted line-clamp-2">
                {item.text}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
