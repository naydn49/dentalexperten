"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
              {t.professionalPractice}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance px-4 sm:px-0">
              {t.heroTitle}
            </h2>
            <div className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4 sm:px-0 space-y-3">
              <p>{t.heroDescription}</p>
              <p className="font-medium">{t.heroDescriptionSecondary}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button size="lg" className="group w-full sm:w-auto" asChild>
              <a href="#booking">
                {t.getStarted}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <a href="#services">{t.ourServices}</a>
            </Button>
          </div>

          <div className="pt-8 sm:pt-12 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-border shadow-2xl">
              <img
                src="/dental-assistant-blonde-glasses-looking-at-tablet.jpg"
                alt={t.dashboardAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
