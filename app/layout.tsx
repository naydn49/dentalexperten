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
  title: "Die Dentalexperten Jain & Jain - Professional Practice Management",
  description: "Streamline your dental practice with expert invoicing and coaching solutions",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans">
        <LanguageProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
