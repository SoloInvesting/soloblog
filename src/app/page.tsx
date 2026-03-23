import Header from "@/components/Header";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import ArticleCard from "@/components/ArticleCard";
import RightSidebar from "@/components/RightSidebar";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { getMarketIndices, getLatestNews } from "@/lib/fmp";

export default async function Home() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts();
  const indices = await getMarketIndices();
  const news = await getLatestNews(10);

  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <>
      <Header />
      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        <div className="flex-1 min-w-0 space-y-6">
          <FeaturedCarousel posts={featured} />

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

          {regularPosts.length === 0 && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted text-lg">No posts yet. Import your WordPress content to get started.</p>
            </div>
          )}
        </div>

        <RightSidebar
          trendingPosts={posts.slice(0, 4)}
          indices={indices}
          news={news}
        />
      </div>
    </>
  );
}
