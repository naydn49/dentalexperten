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

        <h1 className="text-4xl font-bold mb-8">{t.impressumTitle}</h1>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          {/* Company Information */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t.impressumCompanyInfo}</h2>
            <p className="mb-2">
              <strong>Die Dentalexperten Jain & Jain GbR</strong>
            </p>
            <p className="mb-2">{t.impressumAddress}</p>
            <p className="mb-2">
              <strong>{t.phone}:</strong> +49 (0) 123 456789
            </p>
            <p className="mb-2">
              <strong>{t.email}:</strong> info@dentalexperten-jain.de
            </p>
          </section>

          {/* Representatives */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t.impressumRepresentatives}</h2>
            <p>Fabian Jain</p>
            <p>Jana Jain</p>
          </section>

          {/* VAT ID */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t.impressumVatId}</h2>
            <p>{t.impressumVatIdNumber}</p>
          </section>

          {/* Responsible for content */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t.impressumResponsible}</h2>
            <p>Fabian Jain & Jana Jain</p>
            <p>Die Dentalexperten Jain & Jain GbR</p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t.impressumDisclaimer}</h2>
            <p className="mb-4">{t.impressumDisclaimerText}</p>
          </section>

          {/* Copyright */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t.impressumCopyright}</h2>
            <p>{t.impressumCopyrightText}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
