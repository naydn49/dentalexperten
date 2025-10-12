"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StripeCheckout from "@/components/stripe-checkout"
import PayPalCheckout from "@/components/paypal-checkout"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  packageId: string
  packageName: string
  packagePrice: string
}

export default function PaymentModal({ isOpen, onClose, packageId, packageName, packagePrice }: PaymentModalProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t.selectPaymentMethod}</DialogTitle>
          <p className="text-muted-foreground mt-2">
            {packageName} - {packagePrice}
          </p>
        </DialogHeader>

        <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "card" | "paypal")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              {t.creditCard}
            </TabsTrigger>
            <TabsTrigger value="paypal" className="flex items-center gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 0 1-.794.68H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z" />
                <path d="M2.379 0h7.99c1.384 0 2.485.296 3.089 1.03.581.706.76 1.747.76 2.73 0 .395-.034.812-.105 1.247-.692 4.238-3.88 5.155-7.59 5.155H4.096a.95.95 0 0 0-.936.79L2.1 16.588a.57.57 0 0 1-.562.479H.492a.483.483 0 0 1-.477-.558L2.379 0z" />
              </svg>
              PayPal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="mt-6">
            <StripeCheckout productId={packageId} />
          </TabsContent>

          <TabsContent value="paypal" className="mt-6">
            <PayPalCheckout productId={packageId} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
