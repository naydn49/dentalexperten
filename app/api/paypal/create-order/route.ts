import { type NextRequest, NextResponse } from "next/server"

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com"

async function getAccessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const { packageId, packageName, amount, currency } = await request.json()

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
        application_context: {
          brand_name: "Die Dentalexperten Jain & Jain",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/cancel`,
        },
      }),
    })

    const order = await response.json()
    return NextResponse.json(order)
  } catch (error) {
    console.error("[v0] Error creating PayPal order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
