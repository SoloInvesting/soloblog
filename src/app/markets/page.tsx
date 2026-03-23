import Header from "@/components/Header";
import { getMarketIndices, getStockQuotes, getLatestNews } from "@/lib/fmp";
import NewsWidget from "@/components/NewsWidget";

export const metadata = {
  title: "Markets & Stock Data — Solo",
  description: "Real-time market indices, stock prices, and financial data.",
};

const POPULAR_STOCKS = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK-B",
  "JPM", "V", "UNH", "XOM", "JNJ", "WMT", "PG",
];

export default async function MarketsPage() {
  const indices = await getMarketIndices();
  const stocks = await getStockQuotes(POPULAR_STOCKS);
  const news = await getLatestNews(8);

  return (
    <>
      <Header />
      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        <div className="flex-1 min-w-0 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Markets</h1>
            <p className="text-muted mt-1">Real-time market data and stock prices</p>
          </div>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">Market Indices</h2>
            {indices.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border p-8 text-center">
                <p className="text-muted">
                  Market data unavailable. Please add your FMP API key to <code className="bg-muted-light px-2 py-1 rounded">.env.local</code>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {indices.map((index) => {
                  const isPositive = index.change >= 0;
                  return (
                    <div
                      key={index.symbol}
                      className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
                    >
                      <p className="text-xs text-muted mb-1">{index.symbol}</p>
                      <p className="text-sm font-semibold text-foreground mb-2">
                        {index.name || index.symbol}
                      </p>
                      <p className="text-xl font-bold tabular-nums">
                        {index.price?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className={`text-sm font-medium tabular-nums mt-1 ${isPositive ? "text-positive" : "text-negative"}`}>
                        {isPositive ? "+" : ""}{index.change?.toFixed(2)} ({isPositive ? "+" : ""}{index.changesPercentage?.toFixed(2)}%)
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">Popular Stocks</h2>
            {stocks.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border p-8 text-center">
                <p className="text-muted">Stock data unavailable.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bg-muted-light text-xs font-semibold text-muted uppercase tracking-wider">
                  <span>Symbol</span>
                  <span className="text-right">Price</span>
                  <span className="text-right">Change</span>
                  <span className="text-right">% Change</span>
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
                        <span className="font-bold text-sm">{stock.symbol}</span>
                        <span className="text-xs text-muted ml-2">{stock.name}</span>
                      </div>
                      <span className="text-sm font-semibold tabular-nums text-right">
                        ${stock.price?.toFixed(2)}
                      </span>
                      <span className={`text-sm font-medium tabular-nums text-right ${isPositive ? "text-positive" : "text-negative"}`}>
                        {isPositive ? "+" : ""}{stock.change?.toFixed(2)}
                      </span>
                      <span className={`text-sm font-medium tabular-nums text-right px-2 py-0.5 rounded ${
                        isPositive ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
                      }`}>
                        {isPositive ? "+" : ""}{stock.changesPercentage?.toFixed(2)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <aside className="w-[340px] flex-shrink-0 hidden xl:block">
          <div className="sticky top-20">
            <NewsWidget news={news} />
          </div>
        </aside>
      </div>
    </>
  );
}
