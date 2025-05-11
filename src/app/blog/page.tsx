import React from "react";
import Header from "../components/Header";

export default function BlogPage() {
  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-br from-white to-blue-50 text-gray-800 p-6">
      <Header />
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Blog posts</h1>
        <p className="text-gray-600 mb-10">
          Reflections, essays, and stories written by selected users and
          contributors. Dive deeper into the themes behind Innernet.
        </p>

        <div className="space-y-8">
          {/* Example blog post preview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">
              Becoming Visible Again
            </h2>
            <p className="text-gray-700 mb-3">
              A personal journey about reclaiming space in a noisy world, and
              how digital reflection helped me find my voice again...
            </p>
            <button className="text-blue-600 hover:underline font-medium cursor-pointer">
              Read More
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">
              Why AI Can Be a Better Listener Than People
            </h2>
            <p className="text-gray-700 mb-3">
              Exploring how emotion-aware AI reflections can support emotional
              growth without judgment...
            </p>
            <button className="text-blue-600 hover:underline font-medium cursor-pointer">
              Read More
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
