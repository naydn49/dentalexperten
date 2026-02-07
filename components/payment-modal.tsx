"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t.selectPaymentMethod || "Zahlung"}</DialogTitle>
          <p className="text-muted-foreground mt-2">
            {packageName} - {packagePrice}
          </p>
        </DialogHeader>

        <div className="mt-4">
          <PayPalCheckout productId={packageId} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
