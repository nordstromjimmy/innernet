"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase-browser";
import toast from "react-hot-toast";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase
      .from("waitlist_emails")
      .insert([{ email }]);

    if (error) {
      toast.error("Something went wrong. Try again.");
    } else {
      toast.success("Thanks! We’ll notify you when Innernet is live.");
      setEmail("");
    }

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleEmailSubmit}
      className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 w-full sm:w-64"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Notify Me"}
      </button>
    </form>
  );
}
