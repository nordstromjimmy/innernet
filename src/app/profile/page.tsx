"use client";
import React from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-br from-white to-blue-100 text-gray-800 p-6">
      <Header />
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Your Profile</h1>
        <p className="text-gray-600 mb-6">
          Here's what you’ve shared and how you’re growing.
        </p>

        <div className="text-left">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Username</h2>
          <p className="mb-4">inneruser</p>

          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Skill Growth (Mock Data)
          </h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Emotional Awareness: Level 3</li>
            <li>Self-Worth: Level 2</li>
            <li>Metacognition: Level 1</li>
          </ul>
          <button
            onClick={handleLogout}
            className=" w-22 bg-blue-600 text-white py-2 mt-12 rounded-md font-medium hover:bg-blue-700 cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    </main>
  );
}
