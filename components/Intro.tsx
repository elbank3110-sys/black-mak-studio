"use client";

import { useEffect, useState } from "react";

export default function Intro() {
  const [show, setShow] = useState(true);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      setGone(true);
      return;
    }
    const t1 = setTimeout(() => setShow(false), 1300);
    const t2 = setTimeout(() => setGone(true), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-bg transition-opacity duration-700 ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <svg
          viewBox="356.27 0.48 115.96 123.06"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="h-20 w-20 text-ink"
        >
          <polygon points="472.23 .48 472.23 36.39 466.12 36.39 466.12 15.21 424.59 56.75 424.59 123.54 418.48 123.54 418.48 54.22 472.23 .48" />
          <polygon points="472.23 29.01 472.23 37.64 471.33 38.54 467.01 34.23 472.23 29.01" />
          <path d="M466.12,35.12l-7.57,7.57-2.7,2.69-17.71,17.71v60.44h34.09V46.1l-6.11,6.11v65.22h-21.88v-51.8l15.93-15.93,5.95-5.95,5.2-5.21.9-.9v-8.62l-6.11,6.11Z" />
          <polygon points="410.02 54.22 410.02 123.54 403.91 123.54 403.91 56.75 362.38 15.21 362.38 36.39 356.27 36.39 356.27 .48 410.02 54.22" />
          <polygon points="361.49 34.23 357.17 38.54 356.27 37.64 356.27 29.01 361.49 34.23" />
          <path d="M372.65,45.38l-2.7-2.69-7.57-7.57-6.11-6.11v8.62l.9.9,5.21,5.21,5.95,5.95,15.93,15.93v51.8h-21.88V52.21l-6.11-6.11v77.44h34.09v-60.44l-17.71-17.71Z" />
          <rect x="405.26" y="117.43" width="16.35" height="6.11" />
        </svg>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-muted">
          BLACK-MAK
        </span>
      </div>
    </div>
  );
}
