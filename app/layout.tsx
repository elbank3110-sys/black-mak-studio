import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import WebGLBackground from "@/components/WebGLBackground";
import UIEffects from "@/components/UIEffects";
import MagicLayer from "@/components/MagicLayer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Intro from "@/components/Intro";

export const metadata: Metadata = {
  title: "BLACK-MAK — Logo & Visual Identity Designer",
  description:
    "BLACK-MAK is the design practice of Muhamed Alaa Elbank: logo design, Arabic and Latin typography, and visual identity systems built with precision.",
  metadataBase: new URL("https://black-mak-v4.vercel.app/"),
  alternates: {
    canonical: "https://black-mak-v4.vercel.app/",
    languages: {
      en: "https://black-mak-v4.vercel.app/",
      ar: "https://black-mak-v4.vercel.app/",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "BLACK-MAK — Logo & Visual Identity Design",
    description:
      "Marks with meaning. Identity systems built for real-world scale, clarity, and character.",
    type: "website",
    url: "https://black-mak-v4.vercel.app/",
    locale: "en_US",
    siteName: "BLACK-MAK",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLACK-MAK — Logo & Visual Identity Design",
    description:
      "Marks with meaning. Identity systems built for real-world scale, clarity, and character.",
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhamed Alaa Elbank",
  alternateName: "BLACK-MAK",
  url: "https://black-mak.vercel.app/",
  jobTitle: "Logo & Visual Identity Designer",
  email: "mailto:muhemedalaa2699@gmail.com",
  telephone: "+201002462821",
  address: { "@type": "PostalAddress", addressLocality: "New Valley", addressCountry: "EG" },
  sameAs: [
    "https://www.behance.net/Muhmed-alaa-el-bank",
    "https://mu-cv.vercel.app/",
  ],
  knowsAbout: ["Logo Design", "Brand Identity", "Typography", "Arabic Calligraphy", "Visual Identity"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var l=localStorage.getItem('bm-lang');if(!l){var n=navigator.language||'en';l=n.toLowerCase().indexOf('ar')===0?'ar':'en';}if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';}var t=localStorage.getItem('bm-theme');if(t==='light'){document.documentElement.dataset.theme='light';}}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800;900&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[300] focus:border focus:border-line-strong focus:bg-bg focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <I18nProvider>
          <Intro />
          <WebGLBackground />
          <UIEffects />
          <MagicLayer />
          <Header />
          {children}
          <Footer />
          <WhatsAppFloat />
        </I18nProvider>
      </body>
    </html>
  );
}
