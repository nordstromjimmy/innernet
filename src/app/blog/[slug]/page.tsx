export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { createSupabaseServerClient } from "@/app/lib/supabase-server";
import Header from "@/app/components/Header";
import MarkAsReadButton from "@/app/components/MarkAsReadButton";

export async function generateStaticParams() {
  return [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return notFound();

  const html = marked(data.content || "");

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 px-6">
      <Header />
      <div className="mt-16">
        <section className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            {data.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {new Date(data.created_at).toLocaleDateString()} •{" "}
            {data.growth_area.replace("-", " ")}
          </p>

          <div
            className="prose prose-lg prose-blue max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="flex justify-end">
            <MarkAsReadButton slug={slug} growthArea={data.growth_area} />
          </div>
        </section>
      </div>
    </main>
  );
}
