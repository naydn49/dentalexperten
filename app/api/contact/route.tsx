import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// In-memory rate limiting store
const rateLimitStore = new Map<string, number>()
const RATE_LIMIT_WINDOW = 30000 // 30 seconds in milliseconds

// Clean up old entries every minute
setInterval(() => {
  const now = Date.now()
  for (const [ip, timestamp] of rateLimitStore.entries()) {
    if (now - timestamp > RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(ip)
    }
  }
}, 60000)

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error("[v0] RECAPTCHA_SECRET_KEY not configured")
    return false
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    console.log("[v0] reCAPTCHA verification result:", data)

    return data.success && data.score >= 0.5
  } catch (error) {
    console.error("[v0] reCAPTCHA verification error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    console.log("[v0] Contact form submission from IP:", ip)

    // Check rate limiting
    const now = Date.now()
    const lastSubmission = rateLimitStore.get(ip)

    if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW) {
      const remainingTime = Math.ceil((RATE_LIMIT_WINDOW - (now - lastSubmission)) / 1000)
      console.log("[v0] Rate limit exceeded for IP:", ip, "Remaining time:", remainingTime)
      return NextResponse.json({ error: "Rate limit exceeded", remainingTime }, { status: 429 })
    }

    // Parse request body
    const body = await request.json()
    const { name, email, practice, message, recaptchaToken } = body

    console.log("[v0] Form data received:", { name, email, practice, messageLength: message?.length })

    // Validate required fields
    if (!name || !email || !message) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      console.log("[v0] Missing reCAPTCHA token")
      return NextResponse.json({ error: "Missing reCAPTCHA token" }, { status: 400 })
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
    if (!isValidRecaptcha) {
      console.log("[v0] Invalid reCAPTCHA token")
      return NextResponse.json({ error: "Invalid reCAPTCHA" }, { status: 400 })
    }

    // Check SMTP configuration
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPassword = process.env.SMTP_PASSWORD

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      console.error("[v0] SMTP configuration missing:", {
        hasHost: !!smtpHost,
        hasPort: !!smtpPort,
        hasUser: !!smtpUser,
        hasPassword: !!smtpPassword,
      })
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    console.log("[v0] Creating SMTP transporter with:", {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
    })

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number.parseInt(smtpPort),
      secure: Number.parseInt(smtpPort) === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
      console.log("[v0] SMTP transporter verified successfully")
    } catch (error) {
      console.error("[v0] SMTP transporter verification failed:", error)
      return NextResponse.json({ error: "Email service configuration error" }, { status: 500 })
    }

    // Send email
    const mailOptions = {
      from: smtpUser,
      to: "jain@die-dentalexperten.de",
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `
Name: ${name}
E-Mail: ${email}
Praxis: ${practice || "Nicht angegeben"}

Nachricht:
${message}
      `,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Praxis:</strong> ${practice || "Nicht angegeben"}</p>
        <h3>Nachricht:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    console.log("[v0] Sending email to:", mailOptions.to)
    await transporter.sendMail(mailOptions)
    console.log("[v0] Email sent successfully")

    // Update rate limit store
    rateLimitStore.set(ip, now)

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
