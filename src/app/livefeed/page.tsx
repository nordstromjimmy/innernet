"use client";
import React from "react";
import Header from "../components/Header";
import { useRequireAuth } from "../hooks/useRequireAuth ";

export default function LivePage() {
  const { loading } = useRequireAuth();
  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-br from-blue-50 to-white text-gray-800 p-6">
      <Header />
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Live feeds</h1>
        <p className="text-gray-600 mb-10">
          These are thoughts that users have chosen to share with the world.
          Quietly witness what’s on people's minds.
        </p>

        <div className="space-y-6">
          {/* Example public thought */}
          <div className="p-5 bg-white rounded-lg shadow">
            <p className="text-gray-800 text-lg mb-2">
              "I feel like I’m starting over every week, and it’s exhausting."
            </p>
            <p className="text-sm text-gray-500">Shared 2 hours ago</p>
          </div>

          <div className="p-5 bg-white rounded-lg shadow">
            <p className="text-gray-800 text-lg mb-2">
              "Sometimes I post and then delete because I’m scared to be known."
            </p>
            <p className="text-sm text-gray-500">Shared 5 hours ago</p>
          </div>

          <div className="p-5 bg-white rounded-lg shadow">
            <p className="text-gray-800 text-lg mb-2">
              "There’s a version of me I want to meet, but I’m not sure how to
              become him."
            </p>
            <p className="text-sm text-gray-500">Shared 1 day ago</p>
          </div>
        </div>
      </div>
    </main>
  );
}
