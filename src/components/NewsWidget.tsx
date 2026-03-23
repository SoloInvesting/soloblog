"use client";

import { useLatestNews } from "@/lib/fmp-client";

interface NewsWidgetProps {
  limit?: number;
}

export default function NewsWidget({ limit = 8 }: NewsWidgetProps) {
  const { news, loading } = useLatestNews(limit);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">חדשות אחרונות</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted-light rounded w-full mb-2" />
              <div className="h-3 bg-muted-light rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">חדשות אחרונות</h3>
        <p className="text-xs text-muted">הזנת חדשות אינה זמינה. הוסף את מפתח ה-FMP API ל-.env.local</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-primary rounded-full" />
        חדשות אחרונות
      </h3>

      <div className="space-y-1">
        {news.slice(0, limit).map((item, i) => {
          const date = new Date(item.publishedDate).toLocaleDateString("he-IL", {
            month: "short",
            day: "numeric",
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
              className="block p-3 rounded-xl hover:bg-muted-light transition-colors group"
            >
              <div className="flex items-start gap-3">
                {item.symbol && (
                  <span className="px-2 py-0.5 bg-primary-light text-primary text-xs font-bold rounded flex-shrink-0 mt-0.5" dir="ltr">
                    {item.symbol}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted">{item.site}</span>
                    <span className="text-xs text-muted">·</span>
                    <span className="text-xs text-muted">{date} {time}</span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
