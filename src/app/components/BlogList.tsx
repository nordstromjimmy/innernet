"use client";
import { useState } from "react";
import { BlogMeta } from "../types/blog";

type Props = {
  posts: BlogMeta[];
  visibleAreas: string[];
};

export default function BlogList({ posts, visibleAreas }: Props) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredPosts = activeFilter
    ? posts.filter((post) => post.growthArea === activeFilter)
    : posts;

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-10">
        {visibleAreas.map((area) => (
          <button
            key={area}
            onClick={() =>
              setActiveFilter((prev) => (prev === area ? null : area))
            }
            className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer ${
              activeFilter === area
                ? "bg-blue-600 text-white border-blue-600"
                : "text-blue-700 border-blue-300 hover:bg-blue-100"
            }`}
          >
            {area.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Blog post previews */}
      <div className="space-y-8">
        {filteredPosts.map((post) => (
          <div key={post.slug} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-700 mb-3">{post.excerpt}</p>
            <a
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline font-medium"
            >
              Read More
            </a>
          </div>
        ))}
        {filteredPosts.length === 0 && (
          <p className="text-gray-500 italic">
            No posts found for that category.
          </p>
        )}
      </div>
    </>
  );
}
