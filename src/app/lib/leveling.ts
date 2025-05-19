import {
  FiHeart,
  FiTarget,
  FiShield,
  FiSearch,
  FiSmile,
  FiZap,
  FiHeadphones,
  FiFeather,
  FiUsers,
  FiSun,
  FiCompass,
} from "react-icons/fi";
import { BsEmojiSmile, BsQuestionDiamond } from "react-icons/bs";
import { MdPsychology, MdSelfImprovement } from "react-icons/md";
import { IconType } from "react-icons";

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
  doubt: "bg-orange-400",
  resilience: "bg-green-500",
  awareness: "bg-blue-500",
  "emotional-awareness": "bg-sky-500",
  acceptance: "bg-gray-400",
  vulnerability: "bg-rose-400",
  purpose: "bg-indigo-500",
  forgiveness: "bg-teal-400",
  focus: "bg-cyan-500",
  healing: "bg-lime-500",
  courage: "bg-red-500",
  gratitude: "bg-pink-400",
  curiosity: "bg-violet-500",
  connection: "bg-emerald-500",
  empathy: "bg-purple-500", // In case you still use this
};

export const skillIcons: Record<string, IconType> = {
  "self-worth": MdSelfImprovement,
  doubt: BsQuestionDiamond,
  resilience: FiShield,
  awareness: FiCompass,
  "emotional-awareness": FiHeart,
  acceptance: FiSmile,
  vulnerability: FiFeather,
  purpose: FiTarget,
  forgiveness: FiSun,
  focus: FiHeadphones,
  healing: FiHeart,
  courage: FiZap,
  gratitude: BsEmojiSmile,
  curiosity: FiSearch,
  connection: FiUsers,
  empathy: MdPsychology,
};
