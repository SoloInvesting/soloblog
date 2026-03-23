"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types";

interface FeaturedCarouselProps {
  posts: Post[];
}

export default function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + posts.length) % posts.length);
  }, [posts.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  if (posts.length === 0) return null;

  const post = posts[current];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-foreground group">
      <div className="relative aspect-[21/9] min-h-[320px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={32}
              height={32}
              className="rounded-full border-2 border-white/30"
            />
            <span className="text-white/80 text-sm">{post.author.name}</span>
            <span className="text-white/50">·</span>
            <span className="px-2.5 py-0.5 bg-primary rounded-full text-white text-xs font-medium">
              {post.category}
            </span>
          </div>

          <Link href={`/post/${post.slug}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 hover:text-primary-light transition-colors max-w-2xl">
              {post.title}
            </h2>
          </Link>
          <p className="text-white/70 text-sm max-w-xl line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
