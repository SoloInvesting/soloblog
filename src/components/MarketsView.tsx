"use client";

import { useMarketIndices, useStockQuotes, getIndexDisplayName } from "@/lib/fmp-client";

const POPULAR_STOCKS = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK-B",
  "JPM", "V", "UNH", "XOM", "JNJ", "WMT", "PG",
];

export default function MarketsView() {
  const { indices, loading: indicesLoading } = useMarketIndices();
  const { stocks, loading: stocksLoading } = useStockQuotes(POPULAR_STOCKS);

  return (
    <>
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4">מדדי שוק</h2>
        {indicesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-border p-5 animate-pulse">
                <div className="h-3 bg-muted-light rounded w-16 mb-2" />
                <div className="h-4 bg-muted-light rounded w-24 mb-3" />
                <div className="h-6 bg-muted-light rounded w-20 mb-2" />
                <div className="h-4 bg-muted-light rounded w-16" />
              </div>
            ))}
          </div>
        ) : indices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-8 text-center">
            <p className="text-muted">
              נתוני שוק אינם זמינים. הוסף את מפתח ה-FMP API שלך ל-<code className="bg-muted-light px-2 py-1 rounded" dir="ltr">.env.local</code>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {indices.map((index) => {
              const isPositive = index.change >= 0;
              return (
                <div key={index.symbol} className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
                  <p className="text-xs text-muted mb-1" dir="ltr">{index.symbol}</p>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    {getIndexDisplayName(index.symbol)}
                  </p>
                  <p className="text-xl font-bold tabular-nums" dir="ltr">
                    {index.price?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className={`text-sm font-medium tabular-nums mt-1 ${isPositive ? "text-positive" : "text-negative"}`} dir="ltr">
                    {isPositive ? "+" : ""}{index.change?.toFixed(2)} ({isPositive ? "+" : ""}{index.changesPercentage?.toFixed(2)}%)
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-4">מניות פופולריות</h2>
        {stocksLoading ? (
          <div className="bg-white rounded-2xl border border-border p-5 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between py-3 border-b border-border last:border-0">
                <div className="h-4 bg-muted-light rounded w-32" />
                <div className="h-4 bg-muted-light rounded w-16" />
              </div>
            ))}
          </div>
        ) : stocks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-8 text-center">
            <p className="text-muted">נתוני מניות אינם זמינים.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bg-muted-light text-xs font-semibold text-muted uppercase tracking-wider">
              <span>סימול</span>
              <span className="text-left">מחיר</span>
              <span className="text-left">שינוי</span>
              <span className="text-left">% שינוי</span>
            </div>
            {stocks.map((stock, i) => {
              const isPositive = stock.change >= 0;
              return (
                <div
                  key={stock.symbol}
                  className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-surface-hover transition-colors animate-fade-in ${
                    i < stocks.length - 1 ? "border-b border-border" : ""
                  }`}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div>
                    <span className="font-bold text-sm" dir="ltr">{stock.symbol}</span>
                    <span className="text-xs text-muted mr-2">{stock.name}</span>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-left" dir="ltr">
                    ${stock.price?.toFixed(2)}
                  </span>
                  <span className={`text-sm font-medium tabular-nums text-left ${isPositive ? "text-positive" : "text-negative"}`} dir="ltr">
                    {isPositive ? "+" : ""}{stock.change?.toFixed(2)}
                  </span>
                  <span className={`text-sm font-medium tabular-nums text-left px-2 py-0.5 rounded ${
                    isPositive ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
                  }`} dir="ltr">
                    {isPositive ? "+" : ""}{stock.changesPercentage?.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
