"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRequireAuth } from "../hooks/useRequireAuth ";
import { supabase } from "../lib/supabase-browser";
import ThoughtForm from "../components/ThoughtForm";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsPinAngleFill } from "react-icons/bs";
import { SlBubble } from "react-icons/sl";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export default function HomePage() {
  const { loading } = useRequireAuth();
  const [thoughts, setThoughts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const thoughtsPerPage = 5;
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadThoughts();
  }, []);

  useEffect(() => {
    const fetchThoughts = async () => {
      const { data, error } = await supabase
        .from("thoughts")
        .select("*")
        .order("created_at", { ascending: false })
        .range((page - 1) * thoughtsPerPage, page * thoughtsPerPage - 1);

      if (!error) setThoughts(data || []);
    };

    fetchThoughts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (bottom && hasMore && !loadingMore) {
        loadThoughts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadingMore]);

  const loadThoughts = async () => {
    setLoadingMore(true);

    const { data, error } = await supabase
      .from("thoughts")
      .select("*")
      .order("created_at", { ascending: false })
      .range((page - 1) * thoughtsPerPage, page * thoughtsPerPage - 1);

    if (error) {
      console.error(error);
      setLoadingMore(false);
      return;
    }

    if (data.length < thoughtsPerPage) {
      setHasMore(false);
    }

    setThoughts((prev) => {
      const newThoughts = data.filter(
        (t) => !prev.some((existing) => existing.id === t.id)
      );
      return [...prev, ...newThoughts];
    });
    setPage((prev) => prev + 1);
    setLoadingMore(false);
  };

  const handleDeleteThought = async (thoughtId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this thought?"
    );
    if (!confirm) return;

    const { error } = await supabase
      .from("thoughts")
      .delete()
      .eq("id", thoughtId);

    if (error) {
      console.error("Failed to delete thought:", error.message);
    } else {
      // Refresh the list
      setThoughts((prev) => prev.filter((t) => t.id !== thoughtId));
      toast("Thought Deleted!", { duration: 2000 });
    }
  };

  return (
    <main className="px-4">
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
                <div className="relative">
                  <p className="text-gray-800 whitespace-pre-line">
                    {thought.content}
                  </p>
                  <button
                    onClick={() => handleDeleteThought(thought.id)}
                    className="absolute top-0 right-2 text-gray-400 hover:text-red-600 text-xl font-bold cursor-pointer"
                    title="Delete thought"
                  >
                    <FiTrash2
                      size={20}
                      className="text-blue-700 hover:text-red-600"
                    />
                  </button>
                </div>

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
                    <div>
                      <SlBubble className="text-blue-600 mb-2" />{" "}
                      <p className="text-sm text-gray-900 italic">
                        {thought.echo}
                      </p>
                    </div>

                    <div className="text-xs text-gray-600 mt-2 flex justify-between">
                      <span>
                        Growth Area: {thought.growthArea}{" "}
                        {thought.mood !== "negative" && thought.xp_awarded && (
                          <span className="text-green-600 font-medium">
                            - 🪄+15 XP
                          </span>
                        )}
                        {thought.mood === "negative" && (
                          <span className="flex items-center gap-1">
                            <BsPinAngleFill className="text-blue-600" />
                            <a href="/profile" className="cursor-pointer">
                              <span className="text-blue-600 font-medium">
                                - New task on profile
                              </span>
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
                <div className="flex justify-end gap-2 items-center mt-2 text-sm text-gray-500 mb-2">
                  <FaRegCalendarAlt color="#155dfc" />{" "}
                  {formatDate(thought.created_at)}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {loadingMore && (
          <div className="text-center py-6 text-sm text-gray-500">
            Loading more...
          </div>
        )}
      </section>
    </main>
  );
}
