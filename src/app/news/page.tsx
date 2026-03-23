import Header from "@/components/Header";
import NewsFeed from "@/components/NewsFeed";
import StockTicker from "@/components/StockTicker";

export const metadata = {
  title: "חדשות פיננסיות אחרונות — סולו",
  description: "הישארו מעודכנים עם החדשות הפיננסיות והשוק האחרונות.",
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">חדשות אחרונות</h1>
            <p className="text-muted mt-1">חדשות פיננסיות בזמן אמת מרחבי העולם</p>
          </div>
          <NewsFeed />
        </div>

        <aside className="w-[340px] flex-shrink-0 hidden xl:block">
          <div className="sticky top-20">
            <StockTicker />
          </div>
        </aside>
      </div>
    </>
  );
}
