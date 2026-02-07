"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, TrendingUp, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import PaymentModal from "@/components/payment-modal"

export function Booking() {
  const { t } = useLanguage()
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{
    id: string
    name: string
    price: string
  } | null>(null)

  const packages = [
    {
      id: "light",
      name: t.lightPackage,
      description: t.lightPackageDesc,
      price: t.lightPrice,
      roi: t.lightRoi,
      features: [
        { text: t.lightFeature1, included: true },
        { text: t.lightFeature2, included: true },
        { text: t.lightFeature3, included: true },
        { text: t.lightFeature4, included: true },
        { text: t.lightFeature5, included: false },
      ],
      popular: false,
    },
    {
      id: "essential",
      name: t.essentialPackage,
      description: t.essentialPackageDesc,
      price: t.essentialPrice,
      roi: t.essentialRoi,
      features: [
        { text: t.essentialFeature1, included: true },
        { text: t.essentialFeature2, included: true },
        { text: t.essentialFeature3, included: true },
        { text: t.essentialFeature4, included: true },
        { text: t.essentialFeature5, included: true },
        { text: t.essentialFeature6, included: true },
        { text: t.essentialFeature7, included: true },
        { text: t.essentialFeature8, included: true },
      ],
      popular: true,
    },
    {
      id: "pro",
      name: t.proPackage,
      description: t.proPackageDesc,
      price: t.proPrice,
      roi: t.proRoi,
      features: [
        { text: t.proFeature1, included: true },
        { text: t.proFeature2, included: true },
        { text: t.proFeature3, included: true },
        { text: t.proFeature4, included: true },
        { text: t.proFeature5, included: true },
        { text: t.proFeature6, included: true },
      ],
      popular: false,
    },
  ]

  const handlePackageSelect = (pkg: { id: string; name: string; price: string }) => {
    setSelectedPackage(pkg)
    setIsPaymentModalOpen(true)
  }

  return (
    <>
      <section id="booking" className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              {t.bookConsulting}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {t.bookingSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative flex flex-col ${
                  pkg.popular ? "border-2 border-primary shadow-lg scale-105" : "border"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 whitespace-nowrap z-10">
                    <Sparkles className="h-4 w-4" />
                    {t.mostPopular}
                  </div>
                )}
                <CardHeader className={`text-center pb-8 ${pkg.popular ? "pt-10" : ""}`}>
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <CardDescription className="text-base mb-4">{pkg.description}</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-primary">
                      {pkg.price}
                      <sup className="text-lg">*</sup>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{t.priceNet}</div>
                  </div>
                  {pkg.roi && (
                    <div className="mt-5 flex justify-center">
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-semibold">
                        <TrendingUp className="h-4 w-4 flex-shrink-0" />
                        <span>{pkg.roi}</span>
                      </div>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mb-4 text-center">{t.practitionerNote}</p>
                  <Button
                    onClick={() => handlePackageSelect({ id: pkg.id, name: pkg.name, price: pkg.price })}
                    variant={pkg.popular ? "default" : "outline"}
                    size="lg"
                    className="w-full"
                  >
                    {t.selectPackage}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-16 mb-0">
            <div className="flex-1 border-t border-border"></div>
            <span className="text-sm sm:text-base text-muted-foreground whitespace-nowrap px-2">
              {t.notSureWhichPackage}
            </span>
            <div className="flex-1 border-t border-border"></div>
          </div>
        </div>
      </section>

      {selectedPackage && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          packageId={selectedPackage.id}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
        />
      )}
    </>
  )
}
