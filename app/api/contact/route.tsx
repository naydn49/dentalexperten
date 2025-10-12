import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, number>()
const RATE_LIMIT_WINDOW = 30000 // 30 seconds in milliseconds

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Contact form submission from IP:", request.ip || "unknown")

    // Parse request body
    const body = await request.json()
    const { name, email, practice, message, recaptchaToken } = body

    console.log("[v0] Form data received:", {
      name,
      email,
      practice,
      messageLength: message?.length,
    })

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify reCAPTCHA token
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (!recaptchaSecret) {
      console.error("[v0] RECAPTCHA_SECRET_KEY not configured")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    if (!recaptchaToken) {
      console.log("[v0] No reCAPTCHA token provided")
      return NextResponse.json({ error: "reCAPTCHA token missing" }, { status: 400 })
    }

    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
    })

    const recaptchaData = await recaptchaResponse.json()
    console.log("[v0] reCAPTCHA verification result:", {
      success: recaptchaData.success,
      "error-codes": recaptchaData["error-codes"],
    })

    if (!recaptchaData.success) {
      console.log("[v0] Invalid reCAPTCHA token")
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 })
    }

    // Rate limiting by IP
    const clientIp = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const now = Date.now()
    const lastSubmission = rateLimitStore.get(clientIp)

    if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW) {
      const remainingTime = Math.ceil((RATE_LIMIT_WINDOW - (now - lastSubmission)) / 1000)
      console.log("[v0] Rate limit exceeded for IP:", clientIp, "Remaining time:", remainingTime)
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          remainingTime,
        },
        { status: 429 },
      )
    }

    // Update rate limit store
    rateLimitStore.set(clientIp, now)

    // Send email via SMTP
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPassword = process.env.SMTP_PASSWORD

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      console.error("[v0] SMTP configuration missing")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    console.log("[v0] Creating SMTP transporter with:", {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
    })

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number.parseInt(smtpPort),
      secure: Number.parseInt(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    })

    // Verify SMTP connection
    try {
      await transporter.verify()
      console.log("[v0] SMTP connection verified")
    } catch (error) {
      console.error("[v0] SMTP verification failed:", error)
      return NextResponse.json({ error: "Email service connection failed" }, { status: 500 })
    }

    // Send email
    const mailOptions = {
      from: smtpUser,
      to: "jain@die-dentalexperten.de",
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${practice ? `<p><strong>Praxis:</strong> ${practice}</p>` : ""}
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
Neue Kontaktanfrage

Name: ${name}
E-Mail: ${email}
${practice ? `Praxis: ${practice}` : ""}

Nachricht:
${message}
      `,
    }

    console.log("[v0] Sending email to:", mailOptions.to)

    await transporter.sendMail(mailOptions)

    console.log("[v0] Email sent successfully")

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
