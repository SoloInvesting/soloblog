import Header from "@/components/Header";
import { getLatestNews, getMarketIndices } from "@/lib/fmp";
import StockTicker from "@/components/StockTicker";
import Image from "next/image";

export const metadata = {
  title: "Latest Financial News — Solo",
  description: "Stay up to date with the latest financial and market news.",
};

export default async function NewsPage() {
  const news = await getLatestNews(24);
  const indices = await getMarketIndices();

  return (
    <>
      <Header />
      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Latest News</h1>
            <p className="text-muted mt-1">Real-time financial news from around the world</p>
          </div>

          {news.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border p-12 text-center">
              <p className="text-muted">
                News feed unavailable. Please add your FMP API key to <code className="bg-muted-light px-2 py-1 rounded">.env.local</code>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {news.map((item, i) => {
                const date = new Date(item.publishedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                const time = new Date(item.publishedDate).toLocaleTimeString("en-US", {
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
                          <span className="px-2 py-0.5 bg-primary-light text-primary text-xs font-bold rounded">
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
          )}
        </div>

        <aside className="w-[340px] flex-shrink-0 hidden xl:block">
          <div className="sticky top-20">
            <StockTicker indices={indices} />
          </div>
        </aside>
      </div>
    </>
  );
}
