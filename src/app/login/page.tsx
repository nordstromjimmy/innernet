"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/thoughts");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white to-blue-100 p-6 text-gray-800">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
          Log in
        </h1>
        <input
          type="text"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 cursor-pointer"
        >
          Log In
        </button>
      </div>
      <p className="mt-2">
        Not a member?{" "}
        <a href="/signup" className="text-blue-500 underline cursor-pointer">
          Sign up
        </a>
      </p>
    </main>
  );
}
