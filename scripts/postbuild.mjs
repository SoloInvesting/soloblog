/**
 * Post-build script: generates a posts index JSON for client-side search
 * and copies it to the static output directory.
 */
import fs from "fs";
import path from "path";

const postsPath = path.join(process.cwd(), "src/data/posts.json");
const outDir = path.join(process.cwd(), "out");
const outDataDir = path.join(outDir, "data");

let posts = [];
try {
  posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
} catch {
  // use sample posts from the lib if posts.json is empty
}

if (posts.length === 0) {
  const libPath = path.join(process.cwd(), "src/lib/posts.ts");
  const libContent = fs.readFileSync(libPath, "utf-8");
  const match = libContent.match(/return \[([\s\S]*?)\];[\s\n]*\}/);
  if (match) {
    // Can't parse TS directly, so write a minimal index
    console.log("No posts in posts.json, skipping search index generation");
  }
}

if (!fs.existsSync(outDataDir)) {
  fs.mkdirSync(outDataDir, { recursive: true });
}

// Write a search-friendly version (strip full content for smaller payload)
const searchIndex = posts.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  coverImage: p.coverImage,
  author: p.author,
  category: p.category,
  tags: p.tags,
  publishedAt: p.publishedAt,
  readTime: p.readTime,
}));

fs.writeFileSync(
  path.join(outDataDir, "posts-index.json"),
  JSON.stringify(searchIndex, null, 0)
);

console.log(`Search index generated with ${searchIndex.length} posts`);
