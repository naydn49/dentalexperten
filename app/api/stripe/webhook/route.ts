import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { sendPaymentNotification } from "@/lib/send-payment-notification"
import type Stripe from "stripe"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error("[v0] Stripe webhook secret not configured")
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("[v0] Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    console.log("[v0] Stripe checkout completed:", session.id)

    try {
      // Extract payment details
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
      const productName = lineItems.data[0]?.description || "Unknown Package"

      // Determine package ID from product name
      let packageId = "unknown"
      if (productName.includes("Light")) packageId = "light"
      else if (productName.includes("Essential")) packageId = "essential"
      else if (productName.includes("Pro")) packageId = "pro"

      const paymentDetails = {
        packageId,
        customerName: session.customer_details?.name || "Unbekannt",
        customerEmail: session.customer_details?.email || "Keine E-Mail angegeben",
        amount: ((session.amount_total || 0) / 100).toFixed(2),
        currency: session.currency?.toUpperCase() || "EUR",
        transactionId: session.payment_intent as string,
        paymentMethod: "Stripe" as const,
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
    }
  }

  return NextResponse.json({ received: true })
}
