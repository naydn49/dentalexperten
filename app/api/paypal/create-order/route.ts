import { type NextRequest, NextResponse } from "next/server"

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com"

async function getAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  console.log("[v0] PayPal credentials configured:", {
    clientId: !!clientId,
    clientSecret: !!clientSecret,
    apiBase: PAYPAL_API_BASE,
  })

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

  console.log("[v0] PayPal access token obtained")
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const { packageId, packageName, amount, currency } = await request.json()

    console.log("[v0] Creating PayPal order:", { packageId, packageName, amount, currency })

    const accessToken = await getAccessToken()

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency || "EUR",
              value: amount,
            },
            description: `Die Dentalexperten Jain & Jain - ${packageName}`,
            custom_id: packageId,
          },
        ],
      }),
    })

    const orderText = await response.text()
    console.log("[v0] PayPal raw response status:", response.status)
    console.log("[v0] PayPal raw response body:", orderText)

    let order: any
    try {
      order = JSON.parse(orderText)
    } catch {
      console.error("[v0] PayPal returned non-JSON response:", orderText)
      return NextResponse.json({ error: "Invalid response from PayPal" }, { status: 500 })
    }

    if (!response.ok) {
      console.error("[v0] PayPal order creation error:", JSON.stringify(order, null, 2))
      const details = order.details?.map((d: any) => d.description || d.issue).join(", ") || ""
      return NextResponse.json(
        { error: order.message || "Failed to create order", details },
        { status: 500 },
      )
    }

    console.log("[v0] PayPal order created successfully:", order.id)
    return NextResponse.json(order)
  } catch (error) {
    console.error("[v0] Error creating PayPal order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
