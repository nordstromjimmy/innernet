"use client";
import React from "react";
import Header from "../components/Header";
import { useRequireAuth } from "../hooks/useRequireAuth ";

export default function LivePage() {
  const { loading } = useRequireAuth();
  return (
    <main className="flex flex-col items-center px-4">
      <Header />
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Live Feeds</h1>
        <p className="text-gray-600">Coming soon</p>
      </div>
    </main>
  );
}
