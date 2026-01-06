import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");
const WORDS_PER_MINUTE = 180;

export interface ArticleMeta {
  title: string;
  description: string;
  date: string;
  dateFormatted: string;
  published: boolean;
  slug: string;
  readTime: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function calculateReadTime(content: string): string {
  // Strip MDX/JSX components and markdown syntax for accurate word count
  const plainText = content
    .replace(/<[^>]+>/g, "") // Remove JSX/HTML tags
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove links but keep text
    .replace(/[#*`~>-]/g, "") // Remove markdown syntax
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return `${minutes} min read`;
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
      const { data, content } = matter(raw);

      const title = String(data.title ?? "");
      const description = String(data.description ?? "");
      const date = String(data.date ?? "");
      const published = Boolean(data.published ?? true);

      return {
        title,
        description,
        date,
        dateFormatted: formatDate(date),
        published,
        slug: toSlug(file),
        readTime: calculateReadTime(content),
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

    const date = String(data.date ?? "");

    return {
      meta: {
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        date,
        dateFormatted: formatDate(date),
        published: Boolean(data.published ?? true),
        readTime: calculateReadTime(content),
      },
      content,
    };
  }
);
