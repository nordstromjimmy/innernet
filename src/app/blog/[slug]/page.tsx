import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";

type BlogMeta = {
  title: string;
  slug: string;
  growthArea: string;
  excerpt: string;
  date: string;
};

type BlogPost = {
  meta: BlogMeta;
  content: string;
};

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    return { slug };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 px-6 py-12">
      <Header />
      <article className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 mb-2">
          {post.meta.date} • {post.meta.growthArea}
        </p>
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          {post.meta.title}
        </h1>
        <div
          className="prose prose-lg prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(process.cwd(), "content/blog", `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);

  const html = await marked(content);

  return {
    meta: data as BlogMeta,
    content: html,
  };
}
