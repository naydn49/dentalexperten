"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { TeethLogo } from "@/components/teeth-logo"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "de" ? "en" : "de")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <TeethLogo className="h-8 w-8" />
            <h1 className="text-xl font-semibold tracking-tight text-foreground">Die Dentalexperten Jain & Jain</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.services}
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.ourCompetencies}
            </a>
            <a href="#booking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.booking}
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.contact}
            </a>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              {language === "de" ? "EN" : "DE"}
            </button>
            <Button size="sm" className="ml-4" asChild>
              <a href="#booking">{t.getStarted}</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#services"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.services}
              </a>
              <a
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.ourCompetencies}
              </a>
              <a
                href="#booking"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.booking}
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.contact}
              </a>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-4 w-4" />
                {language === "de" ? "English" : "Deutsch"}
              </button>
              <Button size="sm" className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
                <a href="#booking">{t.getStarted}</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
