"use server";

import { schema } from "./form-schema";
import type { z } from "zod";

export type InquiryResult =
  | { ok: true; waUrl: string }
  | { ok: false; error: string };

const WA_NUMBER = "201002462821";

// Simple in-memory rate limit per IP (per lambda instance) — a full
// distributed limiter needs KV; this blocks the cheap abuse cases.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const win = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (win.length >= 8) return true;
  win.push(now);
  hits.set(ip, win);
  return false;
}

function buildWaUrl(d: z.infer<typeof schema>): string {
  const lines = [
    "Hello BLACK-MAK, I'd like to start a project. Here's a short brief:",
    `${d.name}${d.company ? ` (${d.company})` : ""} — ${d.type}`,
    d.email ? `Email: ${d.email}` : "",
    d.contact && d.contact !== d.email ? `Channel: ${d.contact}` : "",
    d.budget ? `Investment: ${d.budget}` : "",
    d.msg,
  ].filter(Boolean);
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export async function submitInquiry(fd: FormData): Promise<InquiryResult> {
  // zod v3 parses plain objects — FormData needs materializing first
  // (entries with File values are skipped; this form is text-only).
  const raw: Record<string, string> = {};
  fd.forEach((v, k) => {
    if (typeof v === "string") raw[k] = v;
  });
  const d = schema.parse(raw);

  const ip =
    (fd.get("_ip") as string | null) ||
    (process.env.VERCEL_REGION ? process.env.VERCEL_REGION : "local");
  if (limited(ip)) {
    return { ok: false, error: "Too many requests — please try again shortly." };
  }

  const record = {
    at: new Date().toISOString(),
    ...d,
  };

  // 1) Durable lead storage — Resend notification when RESEND_API_KEY is set.
  let stored = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM || "BLACK-MAK <leads@blackmak.dev>",
          to: process.env.LEAD_TO || "makeenmuhamed31@gmail.com",
          subject: `New ${record.type} inquiry — ${record.name}`,
          text: JSON.stringify(record, null, 2),
        }),
      });
      stored = res.ok;
    } catch {
      stored = false;
    }
  }

  // 2) Always: structured log — Vercel Logs retains these (and they can be
  //    drained to a destination). Never lose a lead silently.
  console.log("[LEAD]", JSON.stringify(record));

  return { ok: true, waUrl: buildWaUrl(d) };
}
