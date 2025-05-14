import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import { BlogMeta } from "../types/blog";
import { createSupabaseServerClient } from "../lib/supabase-server";

export default async function BlogPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: skills } = await supabase
    .from("skills")
    .select("category")
    .eq("user_id", user?.id || "");

  const discoveredAreas = skills?.map((s) => s.category) || [];

  const posts = await getAllBlogPosts();

  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-br from-white to-blue-50 text-gray-800 p-6">
      <Header />
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Blog posts</h1>
        <p className="text-gray-600 mb-10">
          Reflections, essays, and stories written by selected users and
          contributors. Dive deeper into the themes behind InnerNet.
        </p>
        <p className="text-gray-600 mb-4">Filter by Growth Area</p>
        <BlogList posts={posts} visibleAreas={discoveredAreas} />
      </div>
    </main>
  );
}

async function getAllBlogPosts(): Promise<BlogMeta[]> {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  return files.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return data as BlogMeta;
  });
}
