"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { Post } from "@/lib/types";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [posts, setPosts] = useState<Post[]>([]);
  const [results, setResults] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/data/posts-index.json")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  useEffect(() => {
    if (!q) { setResults([]); return; }
    const query = q.toLowerCase();
    setResults(
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.tags.some((t) => t.toLowerCase().includes(query))
      )
    );
  }, [q, posts]);

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {q ? `תוצאות עבור "${q}"` : "חיפוש"}
        </h1>
        {q && (
          <p className="text-muted mt-1">
            נמצאו {results.length} {results.length === 1 ? "מאמר" : "מאמרים"}
          </p>
        )}
      </div>

      {!q && (
        <div className="text-center py-20 bg-white rounded-2xl border border-border">
          <p className="text-muted text-lg">הזן מונח חיפוש כדי למצוא מאמרים</p>
        </div>
      )}

      {q && results.length === 0 && posts.length > 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-border">
          <p className="text-muted text-lg mb-2">לא נמצאו מאמרים עבור &ldquo;{q}&rdquo;</p>
          <p className="text-muted text-sm">נסה מילות מפתח שונות או עיין בקטגוריות</p>
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
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="p-6 text-center text-muted">טוען...</div>}>
        <SearchContent />
      </Suspense>
    </>
  );
}
