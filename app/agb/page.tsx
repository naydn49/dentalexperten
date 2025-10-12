"use client"

import { useLanguage } from "@/lib/language-context"

export default function AGBPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h1 className="text-4xl font-bold mb-8 text-balance">{t.agbTitle}</h1>

        <div className="prose prose-slate max-w-none space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. {t.agbSection1Title}</h2>
            <p className="mb-4 leading-relaxed">
              <strong>1.1</strong> {t.agbSection1Para1}
            </p>
            <p className="leading-relaxed">
              <strong>1.2</strong> {t.agbSection1Para2}
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. {t.agbSection2Title}</h2>
            <p className="leading-relaxed">{t.agbSection2Content}</p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. {t.agbSection3Title}</h2>
            <p className="leading-relaxed">{t.agbSection3Content}</p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. {t.agbSection4Title}</h2>
            <p className="mb-4 leading-relaxed">
              <strong>4.1</strong> {t.agbSection4Para1}
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>4.2</strong> {t.agbSection4Para2}
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>4.3</strong> {t.agbSection4Para3}
            </p>
            <p className="leading-relaxed">
              <strong>4.4</strong> {t.agbSection4Para4}
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. {t.agbSection5Title}</h2>
            <p className="mb-4 leading-relaxed">
              <strong>5.1</strong> {t.agbSection5Para1}
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>{t.agbSection5Bullet1}</li>
              <li>{t.agbSection5Bullet2}</li>
              <li>{t.agbSection5Bullet3}</li>
            </ul>
            <p className="mb-4 leading-relaxed">
              <strong>5.2</strong> {t.agbSection5Para2}
            </p>
            <p className="leading-relaxed">
              <strong>5.3</strong> {t.agbSection5Para3}
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. {t.agbSection6Title}</h2>
            <p className="leading-relaxed">{t.agbSection6Content}</p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. {t.agbSection7Title}</h2>
            <p className="mb-4 leading-relaxed">
              <strong>7.1</strong> {t.agbSection7Para1}
            </p>
            <p className="leading-relaxed">
              <strong>7.2</strong> {t.agbSection7Para2}
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. {t.agbSection8Title}</h2>
            <p className="mb-4 leading-relaxed">
              <strong>8.1</strong> {t.agbSection8Para1}
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>8.2</strong> {t.agbSection8Para2}
            </p>
            <p className="mb-4 leading-relaxed">
              <strong>8.3</strong> {t.agbSection8Para3}
            </p>
            <p className="leading-relaxed">
              <strong>8.4</strong> {t.agbSection8Para4}
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. {t.agbSection9Title}</h2>
            <p className="leading-relaxed">{t.agbSection9Content}</p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. {t.agbSection10Title}</h2>
            <p className="leading-relaxed">{t.agbSection10Content}</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
          <p>
            {t.agbLastUpdated}: {new Date().toLocaleDateString("de-DE")}
          </p>
        </div>
      </div>
    </div>
  )
}
