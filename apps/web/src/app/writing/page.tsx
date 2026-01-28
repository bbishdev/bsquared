import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { getAllArticles } from "@/lib/articles";
import { BLUR_FADE_DELAY } from "@/constants/animation";

export const metadata = {
  title: "Writing",
  description: "Thoughts on technology, AI, and building products.",
};

export default async function WritingPage() {
  const articles = getAllArticles();

  return (
    <main className="flex flex-col min-h-dvh space-y-10">
      <section>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Writing
          </h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="mt-4 text-muted-foreground">
            Thoughts on technology, AI, and building products.
          </p>
        </BlurFade>
      </section>

      <section>
        <div className="flex flex-col gap-4">
          {articles.length === 0 && (
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="text-sm text-muted-foreground">
                Nothing published yet.
              </p>
            </BlurFade>
          )}
          {articles.map((article, id) => (
            <BlurFade
              key={article.slug}
              delay={BLUR_FADE_DELAY * 3 + id * 0.05}
            >
              <Link
                href={`/writing/${article.slug}`}
                className="block group py-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-medium group-hover:underline">
                    {article.title}
                  </h2>
                  <div className="flex flex-col text-xs text-muted-foreground tabular-nums text-right shrink-0">
                    <time>{article.dateFormatted}</time>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {article.description}
                </p>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>
    </main>
  );
}
