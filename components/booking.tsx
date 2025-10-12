"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
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
      features: [t.lightFeature1, t.lightFeature2, t.lightFeature3, t.lightFeature4],
      popular: false,
    },
    {
      id: "essential",
      name: t.essentialPackage,
      description: t.essentialPackageDesc,
      price: t.essentialPrice,
      features: [
        t.essentialFeature1,
        t.essentialFeature2,
        t.essentialFeature3,
        t.essentialFeature4,
        t.essentialFeature5,
      ],
      popular: true,
    },
    {
      id: "pro",
      name: t.proPackage,
      description: t.proPackageDesc,
      price: t.proPrice,
      features: [t.proFeature1, t.proFeature2, t.proFeature3, t.proFeature4, t.proFeature5, t.proFeature6],
      popular: false,
    },
  ]

  const handlePackageSelect = (pkg: { id: string; name: string; price: string }) => {
    setSelectedPackage(pkg)
    setIsPaymentModalOpen(true)
  }

  return (
    <>
      <section id="booking" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    {t.mostPopular}
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <CardDescription className="text-base mb-4">{pkg.description}</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-primary">
                      {pkg.price}
                      <sup className="text-lg">*</sup>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{t.priceNet}</div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
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

          <div className="flex items-center gap-4 mt-8 mb-8">
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
