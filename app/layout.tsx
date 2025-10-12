import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Roboto_Mono } from "next/font/google"
import { Suspense } from "react"
import { LanguageProvider } from "@/lib/language-context"
import { CookieConsent } from "@/components/cookie-consent"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://die-dentalexperten.de"),
  title: {
    default: "Die Dentalexperten Jain & Jain - Professionelle Abrechnungsanalyse für Zahnarztpraxen",
    template: "%s | Die Dentalexperten Jain & Jain",
  },
  description:
    "Professionelle Abrechnungsanalyse und -optimierung für Zahnarztpraxen in Berlin. Steigern Sie Ihren Umsatz durch optimierte BEMA und GOZ Abrechnung. Über 20 Jahre Erfahrung.",
  keywords: [
    "Zahnarzt Abrechnung",
    "Abrechnungsanalyse",
    "Zahnärztliche Abrechnung",
    "BEMA Abrechnung",
    "GOZ Abrechnung",
    "Praxismanagement",
    "Zahnarztpraxis Berlin",
    "Abrechnungsoptimierung",
    "Externe Abrechnung",
    "Team Schulung Zahnarzt",
  ],
  authors: [{ name: "Die Dentalexperten Jain & Jain" }],
  creator: "Die Dentalexperten Jain & Jain",
  publisher: "Die Dentalexperten Jain & Jain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Die Dentalexperten Jain & Jain",
    title: "Die Dentalexperten Jain & Jain - Professionelle Abrechnungsanalyse für Zahnarztpraxen",
    description:
      "Professionelle Abrechnungsanalyse und -optimierung für Zahnarztpraxen. Steigern Sie Ihren Umsatz durch optimierte BEMA und GOZ Abrechnung.",
    images: [
      {
        url: "/jana-professional-headshot.png",
        width: 1200,
        height: 630,
        alt: "Die Dentalexperten Jain & Jain - Professionelle Abrechnungsanalyse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Die Dentalexperten Jain & Jain - Professionelle Abrechnungsanalyse",
    description:
      "Professionelle Abrechnungsanalyse und -optimierung für Zahnarztpraxen. Steigern Sie Ihren Umsatz durch optimierte Abrechnung.",
    images: ["/jana-professional-headshot.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: "/",
    languages: {
      de: "/",
      en: "/",
    },
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://die-dentalexperten.de",
              name: "Die Dentalexperten Jain & Jain",
              image: "https://die-dentalexperten.de/jana-professional-headshot.png",
              description:
                "Professionelle Abrechnungsanalyse und -optimierung für Zahnarztpraxen in Berlin. Über 20 Jahre Erfahrung in zahnärztlicher Abrechnung.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Nuthestraße 24G",
                addressLocality: "Berlin",
                postalCode: "12307",
                addressCountry: "DE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 52.52,
                longitude: 13.405,
              },
              url: "https://die-dentalexperten.de",
              telephone: "+49 (0) 176 51899779",
              email: "jain@die-dentalexperten.de",
              priceRange: "€€",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "17:00",
                },
              ],
              sameAs: [
                // Add social media profiles here when available
                // "https://www.facebook.com/dentalexperten",
                // "https://www.linkedin.com/company/dentalexperten",
              ],
              founder: [
                {
                  "@type": "Person",
                  name: "Fabian Jain",
                  jobTitle: "Co-Founder",
                },
                {
                  "@type": "Person",
                  name: "Jana Jain",
                  jobTitle: "Co-Founder",
                },
              ],
              areaServed: {
                "@type": "Country",
                name: "Germany",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Dental Practice Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Abrechnungs-Analyse",
                      description:
                        "Professionelle Überprüfung und Optimierung Ihrer Abrechnungen für maximale Umsatzausschöpfung",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Externe Abrechnung",
                      description: "Komplette zahnärztliche Abrechnung für Ihre Praxis",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Team-Schulung",
                      description: "Gezielte Schulungen für optimale Abrechnungsqualität",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Praxis-Analyse",
                      description: "Umfassende Analyse Ihrer Praxisabläufe und Organisation",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <LanguageProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
