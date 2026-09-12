import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { archivo, plexMono, asalArabic } from "@/lib/fonts";
import WebGLBackground from "@/components/WebGLBackground";
import UIEffects from "@/components/UIEffects";
import MagicLayer from "@/components/MagicLayer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Intro from "@/components/Intro";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "BLACK-MAK® — Logo & Visual Identity Designer | Arabic & Latin",
  description:
    "BLACK-MAK® is an independent logo and visual identity practice by Muhamed Alaa Elbank, specializing in Arabic & Latin typography, calligraphy, identity systems, and real-world brand applications.",
  metadataBase: new URL("https://black-mak-v4.vercel.app/"),
  alternates: {
    canonical: "https://black-mak-v4.vercel.app/",
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
  url: "https://black-mak-v4.vercel.app/",
  image: "https://black-mak-v4.vercel.app/profile.webp",
  jobTitle: "Logo & Visual Identity Designer",
  email: "makeenmuhamed31@gmail.com",
  telephone: "+201002462821",
  address: { "@type": "PostalAddress", addressLocality: "New Valley", addressCountry: "EG" },
  sameAs: [
    "https://www.behance.net/Muhmed-alaa-el-bank",
    "https://www.instagram.com/muhamedalaaelbank/",

    "https://mu-cv.vercel.app/",
  ],
  knowsAbout: ["Logo Design", "Brand Identity", "Typography", "Arabic Calligraphy", "Visual Identity"],
  knowsLanguage: ["ar", "en"],
};

const servicesLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BLACK-MAK Services",
  itemListElement: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Focused Logo Project", description: "Distinctive marks built to be recognized, remembered, and used everywhere. 2–3 initial directions, three structured concepts, editable final files." },
      priceCurrency: "USD",
      price: "159",
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Calligraphic Identity", description: "Custom wordmarks and calligraphy-led identities built around free-drawn letterforms. Four structured concepts." },
      priceCurrency: "USD",
      price: "249",
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Full Visual Identity", description: "A complete visual system: logo, typography, color, guidelines, and essential brand applications. Six structured concepts." },
      priceCurrency: "USD",
      price: "549",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable} ${asalArabic.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var l=localStorage.getItem('bm-lang');if(!l){var n=navigator.language||'en';l=n.toLowerCase().indexOf('ar')===0?'ar':'en';}if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';}var t=localStorage.getItem('bm-theme');if(t==='light'){document.documentElement.dataset.theme='light';}}catch(e){}})();",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }} />
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
          <SmoothScroll />
          <WebGLBackground />
          <UIEffects />
          <MagicLayer />
          <Header />
          {children}
          <Footer />
          <WhatsAppFloat />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
