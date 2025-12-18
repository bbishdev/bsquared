import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

const getCompiledArticle = cache(async (slug: string) => {
  try {
    const article = getArticleBySlug(slug);
    const { content } = await compileMDX({
      source: article.content,
      options: { parseFrontmatter: false },
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
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{article.meta.title}</h1>
        <time className="text-muted-foreground">{article.meta.date}</time>
      </header>
      {article.content}
    </article>
  );
}
