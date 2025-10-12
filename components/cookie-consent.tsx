"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setShowBanner(false)
    setShowSettings(false)
  }

  const rejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setShowBanner(false)
    setShowSettings(false)
  }

  const savePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setShowBanner(false)
    setShowSettings(false)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      {!showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
          <Card className="mx-auto max-w-4xl border-2 bg-background p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold">{t.cookieTitle}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{t.cookieDescription}</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t.cookieDetailsText}{" "}
                  <Link href="/datenschutz" className="underline hover:text-foreground">
                    {t.privacyPolicy}
                  </Link>
                  .
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} size="sm">
                    {t.acceptAll}
                  </Button>
                  <Button onClick={rejectAll} variant="outline" size="sm">
                    {t.rejectAll}
                  </Button>
                  <Button onClick={() => setShowSettings(true)} variant="ghost" size="sm">
                    {t.cookieSettings}
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0" onClick={rejectAll} aria-label={t.close}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background p-6">
            <div className="mb-6 flex items-start justify-between">
              <h2 className="text-2xl font-bold">{t.cookieSettingsTitle}</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)} aria-label={t.close}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="mb-6 text-sm text-muted-foreground">{t.cookieSettingsDescription}</p>

            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <h3 className="mb-2 font-semibold">{t.necessaryCookies}</h3>
                  <p className="text-sm text-muted-foreground">{t.necessaryCookiesDesc}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-muted-foreground">{t.alwaysActive}</span>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <h3 className="mb-2 font-semibold">{t.analyticsCookies}</h3>
                  <p className="text-sm text-muted-foreground">{t.analyticsCookiesDesc}</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"></div>
                </label>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <h3 className="mb-2 font-semibold">{t.marketingCookies}</h3>
                  <p className="text-sm text-muted-foreground">{t.marketingCookiesDesc}</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"></div>
                </label>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={savePreferences}>{t.savePreferences}</Button>
              <Button onClick={acceptAll} variant="outline">
                {t.acceptAll}
              </Button>
              <Button onClick={rejectAll} variant="ghost">
                {t.rejectAll}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
