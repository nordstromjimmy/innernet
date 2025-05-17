"use client";
import Link from "next/link";
import { useState } from "react";
import { useUserProfile } from "../context/UserProfileContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { profile, loading } = useUserProfile();

  const avatarSrc =
    profile?.gender === "female"
      ? "/female-avatar.png"
      : profile?.gender === "male"
      ? "/male-avatar.png"
      : null;

  return (
    <header className="w-full max-w-5xl mx-auto mb-6 px-4">
      <div className="flex justify-between items-center py-4">
        {/* Logo and subtitle */}
        <div>
          <Link className="text-3xl font-bold text-blue-900" href="/thoughts">
            INNERNET
          </Link>
          <p className="text-sm text-gray-600 hidden sm:block">
            Grow your mind. One thought at a time.
          </p>
        </div>

        {/* Mobile: hamburger + avatar */}
        <div className="flex items-center gap-4 sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6 text-blue-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {!loading && (
            <Link href="/profile">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt="Profile"
                  className="w-10 h-10 rounded-full bg-gray-200 object-cover border border-gray-300 hover:ring-2 ring-blue-400 transition"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center border border-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4
                       1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4
                       v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                </div>
              )}
            </Link>
          )}
        </div>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link
            href="/thoughts"
            className="text-blue-600 hover:underline font-medium"
          >
            Thoughts
          </Link>
          <Link
            href="/blogs"
            className="text-blue-600 hover:underline font-medium"
          >
            Blog
          </Link>
          <Link
            href="/feed"
            className="text-blue-600 hover:underline font-medium"
          >
            Feed
          </Link>
          <Link href="/profile">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Profile"
                className="w-10 h-10 rounded-full bg-gray-200 object-cover border border-gray-300 hover:ring-2 ring-blue-400 transition"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center border border-gray-300 hover:ring-2 ring-blue-400 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4
                       1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4
                       v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
              </div>
            )}
          </Link>
        </div>
      </div>
      <div className="border-b-1 border-gray-300"></div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden bg-transparent border-t border-gray-200 pt-2 pb-4 px-4 space-y-2 ">
          <Link
            href="/thoughts"
            className="block text-blue-600 font-medium hover:underline"
          >
            Thoughts
          </Link>
          <Link
            href="/blogs"
            className="block text-blue-600 font-medium hover:underline"
          >
            Blog
          </Link>
          <Link
            href="/feed"
            className="block text-blue-600 font-medium hover:underline"
          >
            Live Feeds
          </Link>
        </div>
      )}
    </header>
  );
}
