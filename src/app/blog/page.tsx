import BlogFilterWrapper from "../components/BlogFilterWrapper";
import Header from "../components/Header";
import { useRequireAuth } from "../hooks/useRequireAuth ";
import { createSupabaseServerClient } from "../lib/supabase-server";
import { BlogMeta } from "../types/blog";

export default async function BlogPage() {
  //const { loading } = useRequireAuth(); TODO make client?
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, growth_area, created_at")
    .order("created_at", { ascending: false });

  const rawPosts = data as {
    title: string;
    slug: string;
    excerpt: string;
    growth_area: string;
    created_at: string;
  }[];

  const posts: BlogMeta[] = rawPosts.map((post) => ({
    ...post,
    growthArea: post.growth_area, // ✅ rename the key
  }));

  const { data: reads } = await supabase
    .from("blog_reads")
    .select("post_slug")
    .eq("user_id", user?.id || "");

  const readSlugs = reads?.map((r) => r.post_slug) || [];

  const { data: skills } = await supabase
    .from("skills")
    .select("category")
    .eq("user_id", user?.id || "");

  const discoveredAreas = skills?.map((s) => s.category) || [];

  if (error) {
    console.error("Error loading blog posts:", error.message);
    return null;
  }

  return (
    <main className="px-4">
      <Header />

      <section className=" w-full max-w-5xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
            ✍️ Blog Posts
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Reflections, essays, and stories by contributors and mindful voices.
            Discover perspectives across emotional growth and self-discovery.
          </p>
        </div>
        <div className="grid md:grid-cols-1 gap-8">
          <BlogFilterWrapper
            posts={posts}
            readSlugs={readSlugs}
            visibleAreas={discoveredAreas}
          />
        </div>
      </section>
    </main>
  );
}
