"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase-browser";
import toast from "react-hot-toast";
import { formatSkillName } from "../lib/leveling";

async function waitForEcho(thoughtId: string, maxTries = 10, delay = 2000) {
  for (let i = 0; i < maxTries; i++) {
    const { data, error } = await supabase
      .from("thoughts")
      .select("*")
      .eq("id", thoughtId)
      .single();

    if (data?.echo) return data;
    await new Promise((res) => setTimeout(res, delay));
  }

  return null;
}

export default function ThoughtForm({
  onNewThought,
}: {
  onNewThought: (thought: any) => void;
}) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No user found");
      setSubmitting(false);
      return;
    }

    // 🔍 Fetch existing skill categories
    const { data: skills } = await supabase
      .from("skills")
      .select("category")
      .eq("user_id", user.id);

    const existingCategories = skills?.map((s) => s.category) || [];

    const { data, error } = await supabase

      .from("thoughts")
      .insert([{ content, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error("Error saving thought:", error.message);
    } else {
      // Start echo generation
      await fetch("/api/echo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          thoughtId: data.id,
          content: data.content,
        }),
      });

      // Wait for echo to be generated before adding to UI
      const fullThought = await waitForEcho(data.id);

      if (fullThought) {
        onNewThought(fullThought);

        // 🧠 Check if a new type was unlocked
        if (
          fullThought.growthArea &&
          !existingCategories.includes(fullThought.growthArea)
        ) {
          toast.success(
            `🌱 New Growth Area Unlocked: ${formatSkillName(
              fullThought.growthArea
            )}`,
            { duration: 4000 }
          );
        }
      } else {
        onNewThought(data);
      }
      setContent("");
    }
    await fetch("/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        thoughtId: data.id,
        content: data.content,
      }),
    });

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-4 border rounded-lg text-gray-800"
        placeholder="What's on your mind?"
        rows={4}
        disabled={submitting}
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {submitting ? "Posting..." : "Post Thought"}
      </button>
    </form>
  );
}
