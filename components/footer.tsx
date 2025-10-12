"use client"

import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Die Dentalexperten Jain & Jain</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.footerDescription}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.servicesFooter}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  {t.smartInvoicing}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  {t.practiceAnalytics}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  {t.assistantCoaching}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  {t.appointmentManagement}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.company}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  {t.ourCompetencies}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  {t.contactFooter}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.legal}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/impressum" className="hover:text-foreground transition-colors">
                  {t.imprint}
                </a>
              </li>
              <li>
                <a href="/agb" className="hover:text-foreground transition-colors">
                  {t.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Die Dentalexperten Jain & Jain. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
