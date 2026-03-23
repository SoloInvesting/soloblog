import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  return {
    title: q ? `Search: "${q}" — Solo` : "Search — Solo",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";
  const allPosts = getAllPosts();

  const results = query
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.tags.some((t) => t.toLowerCase().includes(query))
      )
    : [];

  return (
    <>
      <Header />
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            {query ? `Results for "${q}"` : "Search"}
          </h1>
          {query && (
            <p className="text-muted mt-1">
              {results.length} {results.length === 1 ? "article" : "articles"} found
            </p>
          )}
        </div>

        {!query && (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <p className="text-muted text-lg">Enter a search term to find articles</p>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <p className="text-muted text-lg mb-2">No articles found for &ldquo;{q}&rdquo;</p>
            <p className="text-muted text-sm">Try different keywords or browse categories</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((post, i) => (
            <div
              key={post.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <ArticleCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
