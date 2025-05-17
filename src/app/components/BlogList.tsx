import { BlogMeta } from "../types/blog";
import BlogCard from "./BlogCard";

export default function BlogList({
  posts,
  readSlugs,
  visibleAreas,
}: {
  posts: BlogMeta[];
  readSlugs: string[];
  visibleAreas: string[];
}) {
  const filtered = posts.filter((post) =>
    visibleAreas.includes(post.growthArea)
  );

  return (
    <div className="space-y-8">
      {filtered.map((post) => (
        <BlogCard
          key={post.slug}
          post={post}
          isRead={readSlugs.includes(post.slug)}
        />
      ))}
      {filtered.length === 0 && (
        <p className="text-gray-500 italic text-center">
          No blog posts found for that category.
        </p>
      )}
    </div>
  );
}
