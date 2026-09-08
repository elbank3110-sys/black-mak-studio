import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseView from "@/components/CaseView";
import { getCase, CASES } from "@/lib/cases";

const BASE = "https://black-mak-v4.vercel.app";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const title = `${c.en.title} — BLACK-MAK`;
  const description = c.en.summary;
  const url = `${BASE}/work/${c.slug}`;
  const image = `${BASE}${c.cover}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: image, width: 1200, height: 675, alt: c.en.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  return <CaseView slug={c.slug} />;
}
