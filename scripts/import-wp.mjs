import fs from "fs";
import path from "path";

const xmlPath = path.join(process.cwd(), "soloinvesting.WordPress.2026-03-23.xml");
const xml = fs.readFileSync(xmlPath, "utf-8");

const items = xml.split("<item>").slice(1);

function extract(text, tag) {
  const re = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`);
  const m = text.match(re);
  return m ? m[1].trim() : "";
}

function extractSimple(text, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`);
  const m = text.match(re);
  return m ? m[1].trim() : "";
}

function extractFirstImage(html) {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return m ? m[1] : "";
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\[caption[^\]]*\]/g, "")
    .replace(/\[\/caption\]/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadTime(html) {
  const text = stripHtml(html);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function slugify(text) {
  return text
    .replace(/[^\w\s\u0590-\u05FF-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .substring(0, 80);
}

const defaultImages = [
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
];

const categoryMap = {
  "uncategorized": "כללי",
  "כללי": "כללי",
};

const posts = [];
let id = 1;

for (const item of items) {
  const postType = extractSimple(item, "wp:post_type")
    .replace("<![CDATA[", "").replace("]]>", "").trim();
  const status = extractSimple(item, "wp:status")
    .replace("<![CDATA[", "").replace("]]>", "").trim();

  if (postType !== "post" || status !== "publish") continue;

  const title = extract(item, "title");
  if (!title) continue;

  const content = extract(item, "content:encoded");
  if (!content || content.length < 100) continue;

  const excerpt = extract(item, "excerpt:encoded");
  const postName = extractSimple(item, "wp:post_name")
    .replace("<![CDATA[", "").replace("]]>", "").trim();
  const pubDate = extractSimple(item, "wp:post_date")
    .replace("<![CDATA[", "").replace("]]>", "").trim();

  // Extract categories
  const catMatches = [...item.matchAll(/category domain="category"[^>]*><!\[CDATA\[([^\]]+)\]\]>/g)];
  const categories = catMatches.map(m => m[1]);
  const tagMatches = [...item.matchAll(/category domain="post_tag"[^>]*><!\[CDATA\[([^\]]+)\]\]>/g)];
  const tags = tagMatches.map(m => m[1]);

  let category = categories[0] || "כללי";
  if (categoryMap[category]) category = categoryMap[category];

  let coverImage = extractFirstImage(content);
  if (!coverImage || coverImage.includes("wp-content/uploads")) {
    coverImage = defaultImages[id % defaultImages.length];
  }

  const slug = postName
    ? decodeURIComponent(postName)
    : slugify(title);

  const cleanContent = content
    .replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/g, (_, inner) => {
      const imgMatch = inner.match(/<img[^>]+>/);
      return imgMatch ? imgMatch[0] : "";
    })
    .replace(/\[embed\](.*?)\[\/embed\]/g, '<a href="$1">$1</a>')
    .replace(/\[youtube[^\]]*\](.*?)\[\/youtube\]/g, '<a href="$1">צפייה ביוטיוב</a>');

  posts.push({
    id: id++,
    slug,
    title,
    excerpt: excerpt
      ? stripHtml(excerpt).substring(0, 250) + "..."
      : stripHtml(content).substring(0, 250) + "...",
    content: cleanContent,
    coverImage,
    author: { name: "סולו", avatar: "/logo.png" },
    category,
    tags,
    publishedAt: new Date(pubDate || Date.now()).toISOString(),
    readTime: estimateReadTime(content),
    featured: id <= 5,
  });
}

// Sort by date descending
posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

// Mark first 4 as featured
posts.forEach((p, i) => { p.featured = i < 4; });

const outPath = path.join(process.cwd(), "src/data/posts.json");
fs.writeFileSync(outPath, JSON.stringify(posts, null, 2), "utf-8");

console.log(`Imported ${posts.length} posts to ${outPath}`);
posts.forEach((p, i) => {
  console.log(`  ${i + 1}. [${p.category}] ${p.title} (${p.slug})`);
});
