"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types";

interface ArticleCardProps {
  post: Post;
  variant?: "default" | "compact";
}

export default function ArticleCard({ post, variant = "default" }: ArticleCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (variant === "compact") {
    return (
      <Link
        href={`/post/${post.slug}`}
        className="flex gap-4 p-3 rounded-xl hover:bg-muted-light transition-colors group"
      >
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-primary">{post.category}</span>
          </div>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-xs text-muted mt-1">{date}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/post/${post.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-primary">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-xs text-muted">{post.author.name}</span>
          <span className="text-xs text-muted">·</span>
          <span className="text-xs text-muted">{date}</span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-muted line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <span className="text-xs text-muted">{post.readTime} min read</span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => e.preventDefault()}
              className="p-1.5 rounded-lg hover:bg-muted-light transition-colors text-muted hover:text-foreground"
            >
              <BookmarkIcon className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="p-1.5 rounded-lg hover:bg-muted-light transition-colors text-muted hover:text-foreground"
            >
              <ShareIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}
