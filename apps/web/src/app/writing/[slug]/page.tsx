import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache, Suspense } from "react";
import { Tweet } from "react-tweet";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

// Force static generation to avoid hydration issues
export const dynamic = "force-static";

// Wrapper to handle Tweet with Suspense
function TweetEmbed({ id }: { id: string }) {
  return (
    <Suspense fallback={<div className="h-[400px] bg-muted/50 rounded-xl animate-pulse" />}>
      <Tweet id={id} />
    </Suspense>
  );
}

// MDX components available in articles
const mdxComponents = {
  Tweet: TweetEmbed,
};

const getCompiledArticle = cache(async (slug: string) => {
  try {
    const article = getArticleBySlug(slug);
    const { content } = await compileMDX({
      source: article.content,
      options: { parseFrontmatter: false },
      components: mdxComponents,
    });
    return { meta: article.meta, content };
  } catch {
    return null;
  }
});

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getCompiledArticle(slug);
  if (!article) {
    return { title: "Not Found" };
  }
  return {
    title: article.meta.title,
    description: article.meta.description,
  };
}

export default async function WritingArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getCompiledArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground no-underline mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to writing
      </Link>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{article.meta.title}</h1>
        <time className="text-muted-foreground">{article.meta.date}</time>
      </header>
      {article.content}
    </article>
  );
}

