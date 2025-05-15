"use client";

import { useState } from "react";
import BlogList from "./BlogList";

export default function BlogFilterWrapper({
  posts,
  visibleAreas,
  readSlugs,
}: {
  posts: any[];
  visibleAreas: string[];
  readSlugs: string[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? posts.filter((p) => p.growthArea === selected)
    : posts;

  return (
    <div>
      {/* Filter Buttons */}
      <p className="text-sm text-center mb-2 font-bold">
        Filter discovered skills
      </p>
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          onClick={() => setSelected(null)}
          className={`px-4 py-1 rounded-full text-sm font-medium border cursor-pointer ${
            selected === null
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border-blue-300"
          }`}
        >
          All
        </button>

        {visibleAreas.map((area) => (
          <button
            key={area}
            onClick={() => setSelected(area)}
            className={`px-4 py-1 rounded-full text-sm font-medium border capitalize cursor-pointer ${
              selected === area
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border-blue-300"
            }`}
          >
            {area.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Blog List */}
      <BlogList
        posts={filtered}
        readSlugs={readSlugs}
        visibleAreas={visibleAreas}
      />
    </div>
  );
}
