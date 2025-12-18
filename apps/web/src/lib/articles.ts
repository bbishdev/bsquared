import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");

export interface ArticleMeta {
  title: string;
  description: string;
  date: string;
  published: boolean;
  slug: string;
}

function toSlug(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

function isMdxFile(filename: string): boolean {
  return filename.endsWith(".mdx") || filename.endsWith(".md");
}

export const getAllArticles = cache((): ArticleMeta[] => {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR);

  return files
    .filter(isMdxFile)
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data } = matter(raw);

      const title = String(data.title ?? "");
      const description = String(data.description ?? "");
      const date = String(data.date ?? "");
      const published = Boolean(data.published ?? true);

      return {
        title,
        description,
        date,
        published,
        slug: toSlug(file),
      };
    })
    .filter((article) => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const getArticleBySlug = cache(
  (
    slug: string
  ): {
    meta: Omit<ArticleMeta, "slug">;
    content: string;
  } => {
    const filePathMdx = path.join(CONTENT_DIR, `${slug}.mdx`);
    const filePathMd = path.join(CONTENT_DIR, `${slug}.md`);

    const filePath = fs.existsSync(filePathMdx)
      ? filePathMdx
      : fs.existsSync(filePathMd)
      ? filePathMd
      : null;

    if (!filePath) {
      throw new Error(`Article not found for slug: ${slug}`);
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    return {
      meta: {
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        published: Boolean(data.published ?? true),
      },
      content,
    };
  }
);
