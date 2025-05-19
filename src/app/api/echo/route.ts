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

  // --- STEP 1: Classify Intent ---
  const classificationPrompt = `
You are an intent classifier for a journaling and self-reflection app.

A user submitted this message:
"${content}"

Does this message appear to be emotionally reflective, introspective, or relevant for inner growth?

Respond with JSON only:
{
  "relevant": true | false,
  "reason": "<brief explanation>"
}
`;

  try {
    const classification = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0,
      messages: [{ role: "user", content: classificationPrompt }],
    });

    const parsed = JSON.parse(
      classification.choices[0].message?.content || "{}"
    );

    if (!parsed.relevant) {
      // Update Supabase with fallback echo
      await supabase
        .from("thoughts")
        .update({
          echo: "Hmm, this doesn’t seem like a reflective thought. I’m best at helping with personal growth and self-awareness. Try sharing how you feel or what’s been on your mind lately.",
          growthArea: null,
          mood: "neutral",
        })
        .eq("id", thoughtId);

      return NextResponse.json({
        success: true,
        echo: "Hmm, this doesn’t seem like a reflective thought. I’m best at helping with personal growth and self-awareness.",
        growthArea: null,
        mood: "neutral",
      });
    }

    // --- STEP 2: Proceed with Echo if Relevant ---
    const echoPrompt = `
You are a wise, emotionally intelligent AI guide. A user has shared the following thought:

"${content}"

Please return a JSON object with:
{
  "echo": "<A kind, insightful reflection (2–4 sentences) that helps the user gently see their thought from a new perspective. Speak warmly and humanely, as if you're a compassionate mentor or inner guide.>",
  "growthArea": "<A single word that captures the inner theme of this thought — such as self-worth, identity, resilience, doubt, purpose, emotional-awareness, vulnerability, healing, or connection. This should reflect the *area of personal growth* this thought touches.>",
  "mood": "<positive | neutral | negative — based on the emotional tone of the original thought.>"
  "action": "<If mood is negative, suggest a small, practical inner exercise or reflection the user can try. Keep it gentle and doable (e.g. 'Try writing down three things you need to forgive yourself for.'). If mood is positive or neutral, return an empty string.>"
  "externalResource": "<A helpful article or video URL if available, otherwise empty string>"
}
  If you provide an externalResource, only link to well-known mental health or psychology resources (e.g. Verywell Mind, Psychology Today, YouTube TED Talks, etc). If none available, return an empty string.
  Only return the JSON object — do not explain or add anything else.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [{ role: "user", content: echoPrompt }],
    });

    const echoResponse = JSON.parse(
      completion.choices[0].message?.content || "{}"
    );

    const { echo, growthArea, mood, action, externalResource } = echoResponse;

    if (!echo || !growthArea || !mood) {
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
        .eq("category", growthArea)
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
            category: growthArea,
            xp: 15,
          },
        ]);
      }

      xp_awarded = true;
    }

    // Update thought with GPT response and XP info
    const { error } = await supabase
      .from("thoughts")
      .update({ echo, growthArea, action, mood, xp_awarded, externalResource })
      .eq("id", thoughtId);

    if (error) {
      console.error("Supabase update error:", error.message);
      return NextResponse.json(
        { error: "Failed to update thought" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      echo,
      growthArea,
      action,
      mood,
      externalResource,
    });
  } catch (err: any) {
    console.error("GPT error:", err.message);
    return NextResponse.json({ error: "GPT failed" }, { status: 500 });
  }
}
