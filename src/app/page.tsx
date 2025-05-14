"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "./lib/supabase";
import Footer from "./components/Footer";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("waitlist_emails")
      .insert([{ email }]);

    if (error) {
      toast.error("Something went wrong. Try again.");
    } else {
      toast.success("Thanks! We’ll notify you when innernet is live.");
      setEmail("");
    }
  };

  return (
    <main className="text-gray-800 bg-gradient-to-br from-blue-100 to-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <img src="/logo.png" alt="InnerNet Logo" className="h-64" />
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
          Welcome to Innernet.
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          A quiet space for your real thoughts — and a mirror to help you grow.
        </p>
        <p className="text-gray-500 italic mb-6">
          No likes. No followers. Just you and your inner voice.
        </p>
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
          >
            Notify Me
          </button>
        </form>

        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce text-blue-600 text-2xl">↓</div>
      </section>

      {/* Rest of the page scrolls below */}
      <section className="px-6 py-20 max-w-4xl mx-auto space-y-24">
        {/* Thought */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              🌱 Share Your Thoughts
            </h2>
            <p className="text-gray-700 mb-3">
              Write what’s really on your mind - no filters, no pressure.
              Whether it's confusion, clarity, emotion, or insight, Innernet
              gives you a space to explore your inner voice privately and
              honestly.
            </p>
            <p className="text-gray-700 mb-4">
              Once posted, our emotionally intelligent AI offers a gentle
              reflection - called an <strong>Echo</strong> - helping you
              understand your thought from a deeper angle. It’s like journaling,
              but with a companion who listens and responds with kindness.
            </p>
          </div>

          {/* Image */}
          <div
            onClick={() => setModalImage("/thoughts-screen.png")}
            className="md:w-1/2 cursor-pointer rounded-xl overflow-hidden shadow-md border hover:ring-2 ring-blue-400 transition"
          >
            <img
              src="/thoughts-screen.png"
              alt="InnerNet Thought UI"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Skill Tree */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          {/* Text */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              🌳 Grow Your Inner Tree
            </h2>
            <p className="text-gray-700 mb-3">
              Every reflection helps you grow. Innernet tracks your progress
              across emotional and mental skills like{" "}
              <strong>resilience</strong>, <strong>self-worth</strong>,{" "}
              <strong>emotional awareness</strong>, and more.
            </p>
            <p className="text-gray-700 mb-4">
              As you engage, you’ll earn XP and level up your personal{" "}
              <strong>Inner Tree</strong>, unlocking new growth areas over time.
              It’s like an emotional RPG - but the boss is your own mind.
            </p>
          </div>

          {/* Image */}
          <div
            onClick={() => setModalImage("/profile-screen.png")}
            className="md:w-1/2 cursor-pointer rounded-xl overflow-hidden shadow-md border hover:ring-2 ring-blue-400 transition"
          >
            <img
              src="/profile-screen.png"
              alt="InnerNet Skill Tree UI"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            Ready to Go Inward?
          </h2>
          <p className="text-gray-700 mb-6">
            Join the waitlist and be first to know when Innernet launches.
          </p>
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
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
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Full preview"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
          />
          <button
            onClick={() => setModalImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
          >
            ×
          </button>
        </div>
      )}
      {/* Footer */}
      <Footer />
    </main>
  );
}
