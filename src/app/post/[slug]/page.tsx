import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import RightSidebar from "@/components/RightSidebar";
import Header from "@/components/Header";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "הדף לא נמצא" };
  return {
    title: `${post.title} — סולו`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const posts = getAllPosts();

  const date = new Date(post.publishedAt).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        <article className="flex-1 min-w-0 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            חזרה לדף הראשי
          </Link>

          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="relative aspect-[21/9]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="p-8 md:p-12 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary-light text-primary text-sm font-semibold rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-muted">{post.readTime} דק׳ קריאה</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-foreground">{post.author.name}</p>
                  <p className="text-sm text-muted">{date}</p>
                </div>
              </div>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-muted-light text-muted text-sm rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>

        <RightSidebar
          trendingPosts={posts.filter((p) => p.slug !== slug).slice(0, 4)}
        />
      </div>
    </>
  );
}
