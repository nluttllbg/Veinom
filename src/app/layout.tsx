import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import { amenities, modalities, siteConfig } from "@/config/site";
import { asset } from "@/lib/asset";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "lenis/dist/lenis.css";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const ogImage = `${siteConfig.url}/images/og-veinom.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url + "/"),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "academia Tijucal",
    "academia em Cuiabá",
    "academia Cuiabá MT",
    "Veinom Fitness",
    "academia para iniciantes",
    "academia para idosos",
    "musculação Tijucal",
    "boxe Cuiabá",
    "capoeira Cuiabá",
    "jump",
    "fitness dance",
  ],
  alternates: { canonical: "./" },
  icons: { icon: asset("/images/icon-veinom.png"), apple: asset("/images/icon-veinom.png") },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url + "/",
    images: [
      {
        url: ogImage,
        width: 1280,
        height: 720,
        alt: "Salão de musculação da Veinom Fitness iluminado com LED verde neon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050605",
  colorScheme: "dark",
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["HealthClub", "SportsActivityLocation"],
  "@id": `${siteConfig.url}/#academia`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  slogan: siteConfig.slogan,
  description: siteConfig.description,
  url: siteConfig.url + "/",
  image: ogImage,
  logo: `${siteConfig.url}/images/logo-veinom.webp`,
  telephone: siteConfig.phone.international,
  email: siteConfig.email,
  foundingDate: siteConfig.foundingDate,
  taxID: siteConfig.cnpj,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.lat,
    longitude: siteConfig.geo.lng,
  },
  hasMap: siteConfig.geo.mapsUrl,
  openingHoursSpecification: siteConfig.hours.flatMap((h) =>
    h.periods.map((p) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${dayNames[d]}`),
      opens: p.opens,
      closes: p.closes,
    })),
  ),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.rating.value,
    reviewCount: siteConfig.rating.count,
    bestRating: 5,
    worstRating: 1,
  },
  amenityFeature: amenities.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  makesOffer: modalities.map((m) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: m.title },
  })),
  sameAs: [siteConfig.instagram.url, siteConfig.facebook],
};

const motionScript = `(function(){try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion');setTimeout(function(){d.classList.add('motion-fallback')},4000)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-preto font-sans text-white antialiased">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
