"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.paymentSuccessTitle}</h1>

        <p className="text-lg text-muted-foreground mb-8 text-pretty">{t.paymentSuccessDescription}</p>

        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-lg mb-3">{t.whatHappensNext}</h2>
          <ul className="text-left space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>{t.paymentSuccessStep1}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>{t.paymentSuccessStep2}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>{t.paymentSuccessStep3}</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">{t.backToHome}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#contact">{t.contactUs}</Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">{t.paymentSuccessFooter}</p>
      </Card>
    </div>
  )
}
