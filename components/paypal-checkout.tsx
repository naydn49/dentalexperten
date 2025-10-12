"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { PRODUCTS } from "@/lib/products"

interface PayPalCheckoutProps {
  productId: string
}

declare global {
  interface Window {
    paypal?: any
  }
}

export default function PayPalCheckout({ productId }: PayPalCheckoutProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const paypalRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const product = PRODUCTS.find((p) => p.id === productId)

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

    console.log("[v0] PayPal Client ID configured:", !!clientId)

    if (!clientId) {
      setError("PayPal ist nicht konfiguriert. Bitte fügen Sie NEXT_PUBLIC_PAYPAL_CLIENT_ID hinzu.")
      setIsLoading(false)
      return
    }

    if (!product) {
      setError(t.productNotFound || "Product not found")
      setIsLoading(false)
      return
    }

    // Load PayPal SDK
    const loadPayPalScript = () => {
      if (window.paypal) {
        initializePayPal()
        return
      }

      const script = document.createElement("script")
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&locale=${language === "de" ? "de_DE" : "en_US"}`
      script.async = true
      script.onload = () => {
        console.log("[v0] PayPal SDK loaded successfully")
        initializePayPal()
      }
      script.onerror = () => {
        console.error("[v0] Failed to load PayPal SDK")
        setError(t.paypalLoadError || "Failed to load PayPal")
        setIsLoading(false)
      }
      document.body.appendChild(script)
    }

    const initializePayPal = () => {
      if (!window.paypal || !paypalRef.current) {
        setIsLoading(false)
        return
      }

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
          },
          createOrder: async () => {
            try {
              console.log("[v0] Creating PayPal order for product:", product.id)
              const response = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  packageId: product.id,
                  packageName: language === "de" ? product.name : product.nameEn,
                  amount: (product.priceInCents / 100).toFixed(2),
                  currency: "EUR",
                }),
              })

              const order = await response.json()
              console.log("[v0] PayPal order created:", order)

              if (order.error) {
                throw new Error(order.error)
              }

              return order.id
            } catch (err) {
              console.error("[v0] Error creating PayPal order:", err)
              setError(t.paymentError || "Payment error occurred")
              throw err
            }
          },
          onApprove: async (data: any) => {
            try {
              console.log("[v0] PayPal payment approved, capturing order:", data.orderID)
              const response = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderID: data.orderID,
                }),
              })

              const captureData = await response.json()
              console.log("[v0] PayPal order captured:", captureData)

              if (captureData.error) {
                throw new Error(captureData.error)
              }

              // Payment successful
              window.location.href = "/payment/success"
            } catch (err) {
              console.error("[v0] Error capturing PayPal order:", err)
              setError(t.paymentError || "Payment error occurred")
            }
          },
          onError: (err: any) => {
            console.error("[v0] PayPal error:", err)
            setError(t.paymentError || "Payment error occurred")
          },
        })
        .render(paypalRef.current)
        .then(() => {
          console.log("[v0] PayPal buttons rendered successfully")
          setIsLoading(false)
        })
        .catch((err: any) => {
          console.error("[v0] Error rendering PayPal buttons:", err)
          setError(t.paypalLoadError || "Failed to load PayPal")
          setIsLoading(false)
        })
    }

    loadPayPalScript()
  }, [productId, product, language, t])

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-4">{error}</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">{t.loadingPayment || "Loading payment..."}</p>
        </div>
      )}
      <div ref={paypalRef} className={isLoading ? "hidden" : ""} />
    </div>
  )
}
