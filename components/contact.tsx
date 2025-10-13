"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Calendar, CheckCircle2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Declare global grecaptcha type
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    practice: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "rate_limit" | null
    message: string
    remainingTime?: number
  }>({ type: null, message: "" })
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  // Load reCAPTCHA script
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) {
      console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY not configured")
      return
    }

    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    script.onload = () => setRecaptchaLoaded(true)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      if (!siteKey) {
        throw new Error("reCAPTCHA not configured")
      }

      // Get reCAPTCHA token
      const recaptchaToken = await window.grecaptcha.execute(siteKey, { action: "submit" })

      // Send form data
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: t.contactSuccess,
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          practice: "",
          message: "",
        })
      } else if (response.status === 429) {
        setSubmitStatus({
          type: "rate_limit",
          message: t.contactRateLimit.replace("{seconds}", data.remainingTime || "30"),
          remainingTime: data.remainingTime,
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: t.contactError,
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus({
        type: "error",
        message: t.contactError,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openCalendly = () => {
    window.open("https://www.calendly.com/die-dentalexperten", "_blank")
  }

  return (
    <section id="contact" className="pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{t.getInTouch}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">{t.sendMessage}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{t.sendMessageDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              {submitStatus.type && (
                <Alert
                  className={`mb-4 ${submitStatus.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={submitStatus.type === "success" ? "text-green-800" : "text-red-800"}>
                    {submitStatus.message}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder={t.yourName}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder={t.emailAddress}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Input
                    placeholder={t.practiceName}
                    value={formData.practice}
                    onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder={t.tellUsNeeds}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="h-[112px] resize-none whitespace-pre-wrap break-words"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting || !recaptchaLoaded}>
                  {isSubmitting ? t.sending : t.sendMessageBtn}
                </Button>
                <p className="text-xs text-muted-foreground text-center">{t.recaptchaNotice}</p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4 sm:space-y-6 flex flex-col">
            <Card className="flex-1">
              <CardContent className="py-4 h-full flex items-center">
                <div className="flex items-center gap-3 sm:gap-4 w-full">
                  <div className="p-2.5 sm:p-3 rounded-lg bg-accent/10 flex-shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm sm:text-base">{t.email}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">jain@die-dentalexperten.de</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardContent className="py-4 h-full flex items-center">
                <div className="flex items-center gap-3 sm:gap-4 w-full">
                  <div className="p-2.5 sm:p-3 rounded-lg bg-accent/10 flex-shrink-0">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm sm:text-base">{t.phone}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">+49 (0) 176 51899779</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardContent className="py-4 h-full flex items-center">
                <div className="flex items-center gap-3 sm:gap-4 w-full">
                  <div className="p-2.5 sm:p-3 rounded-lg bg-accent/10 flex-shrink-0">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm sm:text-base">{t.office}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Nuthestraße 24G
                      <br />
                      12307 Berlin
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="my-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-border"></div>
            <span className="text-xs uppercase text-muted-foreground">{t.orBookDirectly || "oder"}</span>
            <div className="flex-1 border-t border-border"></div>
          </div>
        </div>

        <Card className="border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-10 px-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 max-w-3xl mx-auto">
              <div className="p-5 rounded-lg bg-primary/10 flex-shrink-0">
                <Calendar className="h-14 w-14 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-xl mb-2">{t.bookAppointmentCalendly}</h3>
                <p className="text-base text-muted-foreground mb-5">{t.calendlyDescription}</p>
                <Button onClick={openCalendly} size="lg" className="w-full sm:w-auto">
                  <Calendar className="mr-2 h-5 w-5" />
                  {t.bookAppointmentCalendly}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
