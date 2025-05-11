"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useRequireAuthLoggedIn } from "../hooks/useRequireAuth ";

export default function Home() {
  const router = useRouter();
  const { loading } = useRequireAuthLoggedIn();
  return (
    <main className="flex flex-col min-h-screen items-center justify-start bg-gradient-to-br from-blue-100 to-white text-gray-800 p-6">
      <div className="max-w-3xl w-full text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-900">
          Welcome to Innernet Tour
        </h1>
        <p className="text-xl text-gray-700 mb-6">How it works</p>
      </div>

      <section className="max-w-4xl w-full mb-16 text-left">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            Your Thoughts Matter
          </h2>
          <p className="text-gray-700 mb-4">
            Share real, raw thoughts without judgment. No likes. No followers.
            Just honesty.
          </p>
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">[Image coming soon]</span>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            Meet Your Echo
          </h2>
          <p className="text-gray-700 mb-4">
            Each thought gets a gentle reflection from AI — like journaling with
            a mirror that sees deeper.
          </p>
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">[Image coming soon]</span>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            Grow Your Mind
          </h2>
          <p className="text-gray-700 mb-4">
            Level up your emotional awareness, self-worth, and expression
            through an AI-powered skill tree.
          </p>
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">[Image coming soon]</span>
          </div>
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            Start Your Journey
          </h2>
          <p className="text-gray-700 mb-6">
            If this feels like your kind of space, let's begin.
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}
