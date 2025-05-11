import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white text-gray-800 p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-900">
          Welcome to Innernet.
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          A brighter social space for your inner world. Share your real
          thoughts, receive reflections from AI, and grow your inner skill tree.
        </p>
        <a
          href="/tour"
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}
