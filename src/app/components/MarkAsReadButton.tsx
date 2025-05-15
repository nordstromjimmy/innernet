"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabase-browser";

export default function MarkAsReadButton({
  slug,
  growthArea,
}: {
  slug: string;
  growthArea: string;
}) {
  const [alreadyRead, setAlreadyRead] = useState(false);

  useEffect(() => {
    const checkRead = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("blog_reads")
        .select("post_slug")
        .eq("user_id", user.id)
        .eq("post_slug", slug)
        .maybeSingle();

      setAlreadyRead(!!data);
    };

    checkRead();
  }, [slug]);

  const handleMarkAsRead = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("blog_reads").upsert({
      user_id: user.id,
      post_slug: slug,
    });

    await supabase.rpc("add_xp", {
      user_id_input: user.id,
      amount: 20,
    });

    toast.success(`🎉 You gained 20 XP for reflecting on ${growthArea}`);
    setAlreadyRead(true);
  };

  return (
    <div className="mt-6 flex justify-end">
      {alreadyRead ? (
        <p className="text-green-600 font-semibold">✓ Read</p>
      ) : (
        <button
          onClick={handleMarkAsRead}
          className="bg-white text-blue-700 px-3 py-1 rounded border hover:bg-blue-200 transition cursor-pointer"
        >
          Mark as Read
        </button>
      )}
    </div>
  );
}
