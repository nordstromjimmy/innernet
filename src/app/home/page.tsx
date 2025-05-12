"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRequireAuth } from "../hooks/useRequireAuth ";
import { supabase } from "../lib/supabase";
import ThoughtForm from "../components/ThoughtForm";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export default function HomePage() {
  const { loading } = useRequireAuth();
  const [thoughts, setThoughts] = useState<any[]>([]);

  useEffect(() => {
    const fetchThoughts = async () => {
      const { data, error } = await supabase
        .from("thoughts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setThoughts(data || []);
    };

    fetchThoughts();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-100 text-gray-800 p-6">
      <Header />

      <section className="w-full max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-md">
        <h1 className="text-xl font-semibold text-blue-800 mb-4">
          Share A Thought
        </h1>
        <ThoughtForm
          onNewThought={(newThought) => setThoughts([newThought, ...thoughts])}
        />
      </section>

      <section className="w-full max-w-3xl mx-auto mt-10">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Your Recent Thoughts
        </h2>
        {!thoughts.length && <p>No thoughts yet..</p>}
        <div className="space-y-4">
          <ul className="space-y-4">
            {thoughts.map((thought) => (
              <li key={thought.id} className="bg-white shadow p-4 rounded-lg">
                <p className="text-gray-800 whitespace-pre-line">
                  {thought.content}
                </p>

                {thought.echo ? (
                  <div
                    className={`mt-4 p-3 rounded-md border-l-4 ${
                      thought.mood === "positive"
                        ? "border-green-500 bg-green-50"
                        : thought.mood === "negative"
                        ? "border-red-500 bg-red-50"
                        : "border-blue-500 bg-blue-50"
                    }`}
                  >
                    <p className="text-sm text-gray-900 italic">
                      💬 {thought.echo}
                    </p>
                    <div className="text-xs text-gray-600 mt-2 flex justify-between">
                      <span>
                        Growth Area: {thought.growthArea}{" "}
                        {thought.mood !== "negative" && thought.xp_awarded && (
                          <span className="text-green-600 font-medium">
                            - 🪄+15 XP
                          </span>
                        )}
                        {thought.mood === "negative" && (
                          <span className="text-yellow-600 font-medium">
                            – 📌
                            <a href="/profile" className="cursor-pointer">
                              New task on profile
                            </a>
                          </span>
                        )}
                      </span>
                      <span>Mood: {thought.mood}</span>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-gray-500 italic">
                    ⏳ Loading echo...
                  </p>
                )}
                <div className="flex justify-end mt-2 text-sm text-gray-500 mb-2">
                  <span>🗓️ {formatDate(thought.created_at)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
