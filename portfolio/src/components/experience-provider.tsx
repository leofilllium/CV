"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import type { Locale } from "@/lib/content";

function read(key: string) { try { return localStorage.getItem(key); } catch { return null; } }
function subscribe(callback: () => void) {
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const theme = matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("portfolio-preferences", callback);
  window.addEventListener("storage", callback);
  motion.addEventListener("change", callback);
  theme.addEventListener("change", callback);
  return () => {
    window.removeEventListener("portfolio-preferences", callback);
    window.removeEventListener("storage", callback);
    motion.removeEventListener("change", callback);
    theme.removeEventListener("change", callback);
  };
}
const getCalm = () => read("portfolio-motion") === "calm" || matchMedia("(prefers-reduced-motion: reduce)").matches;
const getTheme = () => read("portfolio-theme") ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
function save(key: string, value: string) { try { localStorage.setItem(key, value); } catch {} window.dispatchEvent(new Event("portfolio-preferences")); }
const ExperienceContext = createContext({ locale: "en" as Locale, calm: false, systemReduced: false, theme: "dark", toggleCalm: () => {}, toggleTheme: () => {} });
export const useExperience = () => useContext(ExperienceContext);
export function ExperienceProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const calm = useSyncExternalStore(subscribe, getCalm, () => false);
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");
  const systemReduced = useSyncExternalStore(subscribe, () => matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.motion = calm ? "calm" : "full";
    document.documentElement.lang = locale;
  }, [theme, calm, locale]);
  return <ExperienceContext.Provider value={{ locale, calm, systemReduced, theme, toggleCalm: () => save("portfolio-motion", calm ? "full" : "calm"), toggleTheme: () => save("portfolio-theme", theme === "dark" ? "light" : "dark") }}>
    <MotionConfig reducedMotion={calm ? "always" : "user"}><div lang={locale} style={{ display: "contents" }}>{children}</div></MotionConfig>
  </ExperienceContext.Provider>;
}
