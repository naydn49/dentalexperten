import nodemailer from "nodemailer"
import { PRODUCTS } from "./products"

interface PaymentDetails {
  packageId: string
  customerName: string
  customerEmail: string
  amount: string
  currency: string
  transactionId: string
  paymentMethod: "PayPal" | "Stripe"
  timestamp: string
}

export async function sendPaymentNotification(details: PaymentDetails) {
  // Find the product details
  const product = PRODUCTS.find((p) => p.id === details.packageId)
  const packageName = product ? product.name : details.packageId

  // Configure SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  // Email content in German
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0f766e; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .detail-row { margin: 10px 0; padding: 10px; background-color: white; border-radius: 4px; }
          .label { font-weight: bold; color: #0f766e; }
          .value { color: #333; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Neue Zahlung erhalten</h1>
          </div>
          <div class="content">
            <h2>Zahlungsdetails</h2>
            
            <div class="detail-row">
              <span class="label">Paket:</span>
              <span class="value">${packageName}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Kunde:</span>
              <span class="value">${details.customerName}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">E-Mail:</span>
              <span class="value">${details.customerEmail}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Betrag:</span>
              <span class="value">${details.amount} ${details.currency.toUpperCase()}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Zahlungsmethode:</span>
              <span class="value">${details.paymentMethod}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Transaktions-ID:</span>
              <span class="value">${details.transactionId}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Zeitpunkt:</span>
              <span class="value">${details.timestamp}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>Diese E-Mail wurde automatisch generiert.</p>
            <p>Die Dentalexperten Jain & Jain</p>
          </div>
        </div>
      </body>
    </html>
  `

  // Send email
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "jain@die-dentalexperten.de",
    subject: `Neue Zahlung: ${packageName} - ${details.customerName}`,
    html: emailHtml,
  })

  console.log("[v0] Payment notification email sent successfully")
}
