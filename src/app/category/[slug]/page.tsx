import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import RightSidebar from "@/components/RightSidebar";
import { getAllPosts, getPostsByCategory, getCategories } from "@/lib/posts";
import { getMarketIndices, getLatestNews } from "@/lib/fmp";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    slug: cat.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const label = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${label} — Solo`,
    description: `Browse ${label} articles on Solo.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const label = slug.replace(/-/g, " ");
  const posts = getPostsByCategory(label);
  const allPosts = getAllPosts();

  if (posts.length === 0 && allPosts.length > 0) {
    notFound();
  }

  const indices = await getMarketIndices();
  const news = await getLatestNews(8);

  return (
    <>
      <Header />
      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground capitalize">{label}</h1>
            <p className="text-muted mt-1">{posts.length} articles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {posts.map((post, i) => (
              <div
                key={post.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <ArticleCard post={post} />
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-border">
              <p className="text-muted text-lg">No articles in this category yet.</p>
            </div>
          )}
        </div>

        <RightSidebar
          trendingPosts={allPosts.slice(0, 4)}
          indices={indices}
          news={news}
        />
      </div>
    </>
  );
}
