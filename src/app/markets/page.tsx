import Header from "@/components/Header";
import MarketsView from "@/components/MarketsView";
import NewsWidget from "@/components/NewsWidget";

export const metadata = {
  title: "שווקים ונתוני מניות — סולו",
  description: "מדדי שוק בזמן אמת, מחירי מניות ונתונים פיננסיים.",
};

export default function MarketsPage() {
  return (
    <>
      <Header />
      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        <div className="flex-1 min-w-0 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">שווקים</h1>
            <p className="text-muted mt-1">נתוני שוק ומחירי מניות בזמן אמת</p>
          </div>
          <MarketsView />
        </div>

        <aside className="w-[340px] flex-shrink-0 hidden xl:block">
          <div className="sticky top-20">
            <NewsWidget />
          </div>
        </aside>
      </div>
    </>
  );
}
