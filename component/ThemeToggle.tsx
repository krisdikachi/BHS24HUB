"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  // undefined until mounted, so we don't render a wrong icon before we know
  // the real theme (the inline script in layout.tsx already set the .dark
  // class on <html> before paint, so there's no visual flash either way).
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-full border border-transparent hover:border-[var(--brand-light)] hover:bg-[var(--brand-light)] dark:hover:bg-gray-800 transition"
    >
      {isDark === undefined ? (
        <span className="block h-[18px] w-[18px]" />
      ) : isDark ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-gray-700" />
      )}
    </button>
  );
}