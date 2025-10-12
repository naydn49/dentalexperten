import { type NextRequest, NextResponse } from "next/server"
import { sendPaymentNotification } from "@/lib/send-payment-notification"

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com"

async function getAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials not configured")
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()

  if (!response.ok) {
    console.error("[v0] PayPal auth error:", data)
    throw new Error("Failed to get PayPal access token")
  }

  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const { orderID } = await request.json()

    console.log("[v0] Capturing PayPal order:", orderID)

    const accessToken = await getAccessToken()

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const captureData = await response.json()

    if (!response.ok) {
      console.error("[v0] PayPal capture error:", captureData)
      return NextResponse.json({ error: captureData.message || "Failed to capture order" }, { status: 500 })
    }

    console.log("[v0] PayPal order captured successfully:", captureData.id)

    try {
      const payer = captureData.payer
      const purchaseUnit = captureData.purchase_units?.[0]
      const capture = purchaseUnit?.payments?.captures?.[0]

      const paymentDetails = {
        packageId: purchaseUnit?.custom_id || "unknown",
        customerName: `${payer?.name?.given_name || ""} ${payer?.name?.surname || ""}`.trim() || "Unbekannt",
        customerEmail: payer?.email_address || "Keine E-Mail angegeben",
        amount: capture?.amount?.value || purchaseUnit?.amount?.value || "0",
        currency: capture?.amount?.currency_code || purchaseUnit?.amount?.currency_code || "EUR",
        transactionId: capture?.id || captureData.id,
        paymentMethod: "PayPal" as const,
        timestamp: new Date().toLocaleString("de-DE", {
          dateStyle: "full",
          timeStyle: "long",
          timeZone: "Europe/Berlin",
        }),
      }

      console.log("[v0] Sending payment notification email:", paymentDetails)
      await sendPaymentNotification(paymentDetails)
    } catch (emailError) {
      console.error("[v0] Failed to send payment notification email:", emailError)
      // Don't fail the payment capture if email fails
    }

    return NextResponse.json(captureData)
  } catch (error) {
    console.error("[v0] Error capturing PayPal order:", error)
    return NextResponse.json({ error: "Failed to capture order" }, { status: 500 })
  }
}
