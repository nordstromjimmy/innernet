import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { thoughtId, content } = await req.json();

  if (!thoughtId || !content) {
    return NextResponse.json({ error: "Missing input" }, { status: 400 });
  }

  const prompt = `
You are a wise, emotionally intelligent AI guide.

A user has shared the following personal thought:
"${content}"

Please return a JSON object with the following structure:
{
  "echo": "<A kind, insightful reflection (2–4 sentences)>",
  "type": "<Growth category: self-worth, doubt, resilience, awareness, etc.>",
  "mood": "<positive | neutral | negative>"
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const rawResponse = completion.choices[0]?.message?.content;
    const parsed = JSON.parse(rawResponse || "{}");
    const { echo, type, mood } = parsed;

    if (!echo || !type || !mood) {
      return NextResponse.json(
        { error: "Invalid response from GPT" },
        { status: 500 }
      );
    }

    // Get the user_id from the thought
    const { data: thought } = await supabase
      .from("thoughts")
      .select("user_id")
      .eq("id", thoughtId)
      .single();

    const userId = thought?.user_id;

    if (!userId) {
      return NextResponse.json(
        { error: "User not found for thought" },
        { status: 400 }
      );
    }

    let xp_awarded = false;

    if (mood !== "negative") {
      // Grant XP to skill
      const { data: existingSkill } = await supabase
        .from("skills")
        .select("*")
        .eq("user_id", userId)
        .eq("category", type)
        .single();

      if (existingSkill) {
        await supabase
          .from("skills")
          .update({
            xp: existingSkill.xp + 15,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingSkill.id);
      } else {
        await supabase.from("skills").insert([
          {
            user_id: userId,
            category: type,
            xp: 15,
          },
        ]);
      }

      xp_awarded = true;
    }

    // Update thought with GPT response and XP info
    const { error } = await supabase
      .from("thoughts")
      .update({ echo, type, mood, xp_awarded })
      .eq("id", thoughtId);

    if (error) {
      console.error("Supabase update error:", error.message);
      return NextResponse.json(
        { error: "Failed to update thought" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, echo, type, mood });
  } catch (err: any) {
    console.error("GPT error:", err.message);
    return NextResponse.json({ error: "GPT failed" }, { status: 500 });
  }
}
