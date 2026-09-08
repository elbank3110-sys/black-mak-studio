"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const t = (localStorage.getItem("bm-theme") || "dark") as string;
    if (t === "light") {
      document.documentElement.dataset.theme = "light";
      setLight(true);
    }
  }, []);

  const toggle = () => {
    if (light) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("bm-theme", "dark");
      setLight(false);
    } else {
      document.documentElement.dataset.theme = "light";
      localStorage.setItem("bm-theme", "light");
      setLight(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid h-10 w-10 place-items-center border border-line-strong text-muted transition-colors hover:border-ink hover:text-ink"
    >
      <svg className="icon-moon h-4 w-4" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg className="icon-sun h-4 w-4" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
