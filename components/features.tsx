"use client"

import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      title: t.automatedInvoicing,
      description: t.automatedInvoicingDesc,
    },
    {
      title: t.teamTrainingPortal,
      description: t.teamTrainingPortalDesc,
    },
    {
      title: t.insuranceIntegration,
      description: t.insuranceIntegrationDesc,
    },
    {
      title: t.performanceMetrics,
      description: t.performanceMetricsDesc,
    },
    {
      title: t.secureCloudStorage,
      description: t.secureCloudStorageDesc,
    },
    {
      title: t.expertSupport,
      description: t.expertSupportDesc,
    },
  ]

  return (
    <section id="features" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{t.featuresTitle}</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{t.featuresDescription}</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1 text-sm sm:text-base">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="aspect-square rounded-lg overflow-hidden border border-border shadow-xl">
              <img
                src="/dental-assistant-using-tablet-with-practice-manage.jpg"
                alt={t.softwareAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
