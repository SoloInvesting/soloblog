/**
 * WordPress XML Export Importer
 *
 * Usage:
 *   npx tsx scripts/import-wordpress.ts path/to/wordpress-export.xml
 *
 * This script reads a WordPress WXR export file and converts posts
 * into the JSON format used by the Solo blog.
 *
 * Prerequisites:
 *   npm install tsx xml2js
 */

import * as fs from "fs";
import * as path from "path";
import { parseString } from "xml2js";

interface WPPost {
  title: string[];
  link: string[];
  "wp:post_name": string[];
  "wp:post_date": string[];
  "wp:post_type": string[];
  "wp:status": string[];
  "content:encoded": string[];
  "excerpt:encoded": string[];
  category?: Array<{ _: string; $: { domain: string; nicename: string } }>;
}

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: { name: string; avatar: string };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

function extractFirstImage(html: string): string {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80";
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

async function main() {
  const xmlPath = process.argv[2];
  if (!xmlPath) {
    console.error("Usage: npx tsx scripts/import-wordpress.ts <path-to-wordpress-export.xml>");
    process.exit(1);
  }

  const xmlContent = fs.readFileSync(xmlPath, "utf-8");

  parseString(xmlContent, { explicitArray: false }, (err, result) => {
    if (err) {
      console.error("Failed to parse XML:", err);
      process.exit(1);
    }

    const channel = result.rss.channel;
    const items: WPPost[] = Array.isArray(channel.item) ? channel.item : [channel.item];

    const posts: Post[] = items
      .filter((item) => {
        const postType = item["wp:post_type"];
        const status = item["wp:status"];
        return postType === "post" && status === "publish";
      })
      .map((item, index) => {
        const content = item["content:encoded"] || "";
        const excerpt = item["excerpt:encoded"] || "";
        const categories = Array.isArray(item.category)
          ? item.category
          : item.category
          ? [item.category]
          : [];

        const postCategories = categories
          .filter((c) => c.$ && c.$.domain === "category")
          .map((c) => c._);
        const postTags = categories
          .filter((c) => c.$ && c.$.domain === "post_tag")
          .map((c) => c._);

        return {
          id: index + 1,
          slug: item["wp:post_name"] || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: item.title,
          excerpt: excerpt ? stripHtml(excerpt) : stripHtml(content).slice(0, 200) + "...",
          content: content,
          coverImage: extractFirstImage(content),
          author: { name: "Solo Investing", avatar: "/logo.png" },
          category: postCategories[0] || "General",
          tags: postTags,
          publishedAt: new Date(item["wp:post_date"]).toISOString(),
          readTime: estimateReadTime(content),
          featured: index < 4,
        };
      });

    const outputDir = path.join(process.cwd(), "src/data");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, "posts.json");
    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));

    console.log(`Successfully imported ${posts.length} posts to ${outputPath}`);
  });
}

main();
