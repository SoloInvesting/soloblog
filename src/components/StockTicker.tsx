import { MarketIndex } from "@/lib/types";
import { getIndexDisplayName } from "@/lib/fmp";

interface StockTickerProps {
  indices: MarketIndex[];
}

export default function StockTicker({ indices }: StockTickerProps) {
  if (indices.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Market Indices
        </h3>
        <p className="text-xs text-muted">Market data unavailable. Add your FMP API key to .env.local</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-positive rounded-full animate-pulse" />
        Market Indices
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
                <p className="text-xs text-muted">{index.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold tabular-nums">
                  {index.price?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className={`text-xs font-medium tabular-nums ${isPositive ? "text-positive" : "text-negative"}`}>
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
