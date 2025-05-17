"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase-browser";
import { useRequireAuth } from "../hooks/useRequireAuth ";
import {
  getMainLevel,
  getMainProgress,
  getSkillLevel,
  getSkillProgress,
  formatSkillName,
  skillColors,
  skillIcons,
} from "../lib/leveling";
import { useUserProfile } from "../context/UserProfileContext";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { loading } = useRequireAuth();
  const router = useRouter();
  const [profile, setProfile] = useState({ name: "", gender: "" });
  const [skills, setSkills] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  const { refreshProfile } = useUserProfile();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: skillsData } = await supabase
        .from("skills")
        .select("*")
        .eq("user_id", user.id);

      const { data: taskData } = await supabase
        .from("thoughts")
        .select("*")
        .eq("user_id", user.id)
        .eq("mood", "negative")
        .eq("xp_awarded", false)
        .order("created_at", { ascending: false });

      setSkills(skillsData || []);
      setTasks(taskData || []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) setProfile(data);
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      name: profile.name,
      gender: profile.gender,
    });
    toast.success("Profile updated!", { duration: 2000 });
    setShowSettings(false);
    await refreshProfile(); // ⬅️ refresh the context
  };

  const handleCompleteTask = async (thoughtId: string, growthArea: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // 1. Grant XP
    const { data: existingSkill } = await supabase
      .from("skills")
      .select("*")
      .eq("user_id", user.id)
      .eq("category", growthArea)
      .single();

    if (existingSkill) {
      await supabase
        .from("skills")
        .update({ xp: existingSkill.xp + 15 })
        .eq("id", existingSkill.id);
    } else {
      await supabase.from("skills").insert([
        {
          user_id: user.id,
          category: growthArea,
          xp: 15,
        },
      ]);
    }

    // 2. Mark thought as resolved
    await supabase
      .from("thoughts")
      .update({ xp_awarded: true })
      .eq("id", thoughtId);

    // 3. Refresh UI
    setTasks((prev) => prev.filter((task) => task.id !== thoughtId));
    setSkills((prev) => {
      const existing = prev.find((s) => s.category === growthArea);
      if (existing) {
        return prev.map((s) =>
          s.category === growthArea ? { ...s, xp: s.xp + 15 } : s
        );
      } else {
        return [...prev, { category: growthArea, xp: 15 }];
      }
    });
  };

  return (
    <main className="flex flex-col items-center text-gray-800 px-4">
      <Header />

      <div className="w-full max-w-2xl space-y-10">
        {/* 1. Profile Info */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            {profile.name ? `Hello, ${profile.name}!` : "Hello,"}
          </h1>
          <p className="text-gray-600 mb-4">
            {profile.name
              ? "Here’s your growth journey so far."
              : "Let’s personalize your experience."}
          </p>
          <button
            onClick={() => setShowSettings((prev) => !prev)}
            className="text-sm text-blue-600 hover:underline mb-4 cursor-pointer"
          >
            {showSettings ? "Close Settings" : "Edit Profile"}
          </button>
          {showSettings && (
            <div className="flex flex-col items-center space-y-2 mb-4 w-full max-w-sm mx-auto">
              <input
                type="text"
                placeholder="Your name"
                value={profile.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />

              <select
                value={profile.gender}
                onChange={(e) => handleProfileChange("gender", e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <button
                onClick={saveProfile}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 cursor-pointer"
              >
                Save Profile
              </button>
            </div>
          )}
          <div className="flex flex-col">
            <button
              onClick={() => console.log("Reset")}
              className="text-sm text-blue-600 hover:underline mb-4 cursor-pointer"
            >
              Reset password
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-blue-600 hover:underline mb-4 cursor-pointer"
            >
              Log out
            </button>
          </div>
        </section>

        {/* 2. Level + Skill Tree */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {skills.length > 0 ? (
            (() => {
              const totalXp = skills.reduce((sum, s) => sum + s.xp, 0);
              const mainLevel = getMainLevel(totalXp);
              const mainProgress = getMainProgress(totalXp);
              const percent = Math.min((mainProgress / 1000) * 100, 100);

              const radius = 50;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference - (percent / 100) * circumference;

              return (
                <div className="flex flex-col items-center mb-8">
                  <h2 className="text-xl font-semibold text-blue-800 mb-4">
                    Overall Growth
                  </h2>

                  <div className="relative w-32 h-32">
                    <svg
                      className="transform -rotate-90"
                      width="100%"
                      height="100%"
                    >
                      <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke="#E5E7EB" // gray-200
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke="#8B5CF6" // purple-500
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-900 font-bold">
                      <div className="text-lg">Level</div>
                      <div className="text-2xl">{mainLevel}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {mainProgress}/1000 XP
                  </p>
                </div>
              );
            })()
          ) : (
            <p className="text-gray-600 mb-6">No XP yet.</p>
          )}

          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Skill Tree{" "}
            <p className="text-sm text-gray-400">
              Post your thoughts to discover new skill categories
            </p>
          </h2>
          {skills.length === 0 ? (
            <p className="text-gray-600">No skills earned yet.</p>
          ) : (
            <div className="space-y-4">
              {skills.map((skill) => {
                const icon = skillIcons[skill.category] || "✨";
                const skillName = formatSkillName(skill.category);
                const level = getSkillLevel(skill.xp);
                const xpInLevel = getSkillProgress(skill.xp);
                const percent = Math.min((xpInLevel / 100) * 100, 100);
                const colorClass = skillColors[skill.category] || "bg-gray-400";

                return (
                  <div key={skill.category}>
                    <p className="text-sm text-gray-700 mb-1">
                      {icon} {skillName} — Level {level} ({xpInLevel}/100 XP)
                    </p>
                    <div className="w-full bg-gray-200 rounded h-3">
                      <div
                        className={`h-3 rounded transition-all duration-500 ${colorClass}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 3. Growth Tasks */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Growth Tasks
          </h2>
          {tasks.length === 0 ? (
            <p className="text-gray-600">No tasks available 🎉</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded"
                >
                  <p className="text-sm text-gray-800 mb-2">
                    🧠 <span className="italic">"{task.content}"</span>
                  </p>
                  {task.echo && (
                    <p className="text-sm text-blue-800 italic mb-2">
                      💬 {task.echo}
                    </p>
                  )}
                  {task.action && (
                    <p className="text-sm text-gray-700 mb-3">
                      📌 <strong>Suggested reflection:</strong> {task.action}
                    </p>
                  )}

                  <p className="text-xs text-gray-600 mb-2">
                    Growth Area: {formatSkillName(task.growthArea)} — Earn 15 XP
                    by completing this task
                  </p>
                  <button
                    onClick={() => handleCompleteTask(task.id, task.growthArea)}
                    className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                  >
                    Complete Task
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
