// /lib/leveling.ts

export function getSkillLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getSkillProgress(xp: number): number {
  return xp % 100;
}

export function getMainLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1;
}

export function getMainProgress(xp: number): number {
  return xp % 1000;
}

export function formatSkillName(raw: string): string {
  return raw
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export const skillColors: Record<string, string> = {
  "self-worth": "bg-yellow-400",
  awareness: "bg-blue-500",
  resilience: "bg-green-500",
  empathy: "bg-purple-500",
  doubt: "bg-orange-400",
  gratitude: "bg-pink-400",
};

export const skillIcons: Record<string, string> = {
  "self-worth": "💪",
  awareness: "🧠",
  resilience: "🛡️",
  empathy: "💛",
  doubt: "🌀",
  gratitude: "🌸",
};
