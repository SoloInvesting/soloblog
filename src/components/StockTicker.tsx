"use client";

import { useMarketIndices, getIndexDisplayName } from "@/lib/fmp-client";

export default function StockTicker() {
  const { indices, loading } = useMarketIndices();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          מדדי שוק
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex justify-between py-2">
              <div className="h-4 bg-muted-light rounded w-24" />
              <div className="h-4 bg-muted-light rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (indices.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          מדדי שוק
        </h3>
        <p className="text-xs text-muted">נתוני שוק אינם זמינים. הוסף את מפתח ה-FMP API ל-.env.local</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-positive rounded-full animate-pulse" />
        מדדי שוק
      </h3>

      <div className="space-y-3">
        {indices.map((index) => {
          const isPositive = index.change >= 0;
          return (
            <div key={index.symbol} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {getIndexDisplayName(index.symbol)}
                </p>
                <p className="text-xs text-muted" dir="ltr">{index.symbol}</p>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold tabular-nums" dir="ltr">
                  {index.price?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className={`text-xs font-medium tabular-nums ${isPositive ? "text-positive" : "text-negative"}`} dir="ltr">
                  {isPositive ? "+" : ""}{index.change?.toFixed(2)} ({isPositive ? "+" : ""}{index.changesPercentage?.toFixed(2)}%)
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
