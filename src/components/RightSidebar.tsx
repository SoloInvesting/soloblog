import { Post, MarketIndex, NewsArticle } from "@/lib/types";
import ArticleCard from "./ArticleCard";
import StockTicker from "./StockTicker";
import NewsWidget from "./NewsWidget";

interface RightSidebarProps {
  trendingPosts: Post[];
  indices: MarketIndex[];
  news: NewsArticle[];
}

export default function RightSidebar({ trendingPosts, indices, news }: RightSidebarProps) {
  return (
    <aside className="w-[340px] flex-shrink-0 space-y-5 hidden xl:block">
      <StockTicker indices={indices} />

      <NewsWidget news={news} />

      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="text-sm font-bold text-foreground mb-4">Trending Articles</h3>
        <div className="space-y-1">
          {trendingPosts.slice(0, 4).map((post) => (
            <ArticleCard key={post.id} post={post} variant="compact" />
          ))}
        </div>
      </div>
    </aside>
  );
}
