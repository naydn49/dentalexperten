import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory rate limiting store
// In production, use Redis or a database
const rateLimitStore = new Map<string, number>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, timestamp] of rateLimitStore.entries()) {
    if (now - timestamp > 30000) {
      rateLimitStore.delete(key)
    }
  }
}, 300000)

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY not configured")
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
    return data.success && data.score >= 0.5 // reCAPTCHA v3 score threshold
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, practice, message, recaptchaToken } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Check rate limit (30 seconds)
    const lastSubmission = rateLimitStore.get(ip)
    const now = Date.now()

    if (lastSubmission && now - lastSubmission < 30000) {
      const remainingTime = Math.ceil((30000 - (now - lastSubmission)) / 1000)
      return NextResponse.json({ error: "rate_limit", remainingTime }, { status: 429 })
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json({ error: "Missing reCAPTCHA token" }, { status: 400 })
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
    if (!isValidRecaptcha) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 })
    }

    // Update rate limit
    rateLimitStore.set(ip, now)

    // Send email using nodemailer
    const nodemailer = require("nodemailer")

    // Create transporter (using Gmail as example, configure with your SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
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

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
