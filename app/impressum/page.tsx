"use client"

import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ImpressumPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t.backToHome}</span>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Impressum</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <p className="mb-2">
              <strong>Die Dentalexperten Jain & Jain GbR (in Gründung)</strong>
            </p>
            <p className="mb-2">Vertreten durch die Gesellschafter:</p>
            <p className="mb-2">Jana Jain und Fabian Jain</p>
            <p className="mb-2">Nuthestraße 24G</p>
            <p className="mb-2">12307 Berlin</p>
            <p className="mb-4">Deutschland</p>

            <p className="mb-2">Rechtsform: Gesellschaft bürgerlichen Rechts (GbR), in Gründung</p>
            <p className="mb-2">
              <strong>Telefon:</strong> +49 (0) 176 51899779
            </p>
            <p className="mb-4">
              <strong>E-Mail:</strong> jain@die-dentalexperten.de
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Vertretungsberechtigte Gesellschafter:</h2>
            <p className="mb-2">Jana Jain</p>
            <p className="mb-4">Fabian Jain</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV (Rundfunkstaatsvertrag):
            </h2>
            <p className="mb-2">Jana Jain und Fabian Jain</p>
            <p className="mb-2">Nuthestraße 24G</p>
            <p className="mb-4">12307 Berlin</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Hinweis zur Haftung:</h2>
            <p className="mb-4">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für
              den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Hinweis zur Unternehmensgründung:</h2>
            <p>
              Die Dentalexperten Jain & Jain GbR befindet sich derzeit in Gründung. Eine Steuernummer wurde noch nicht
              zugeteilt.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
