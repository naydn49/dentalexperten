"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Receipt, GraduationCap, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: FileText,
      title: t.smartInvoicing,
      description: t.smartInvoicingDesc,
      descriptionSecondary: t.smartInvoicingDescSecondary,
    },
    {
      icon: GraduationCap,
      title: t.practiceAnalytics,
      description: t.practiceAnalyticsDesc,
      descriptionSecondary: t.practiceAnalyticsDescSecondary,
    },
    {
      icon: Receipt,
      title: t.assistantCoaching,
      description: t.assistantCoachingDesc,
      descriptionSecondary: t.assistantCoachingDescSecondary,
    },
    {
      icon: TrendingUp,
      title: t.appointmentManagement,
      description: t.appointmentManagementDesc,
      descriptionSecondary: t.appointmentManagementDescSecondary,
    },
  ]

  return (
    <section id="services" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{t.ourServices}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-lg bg-accent/10 flex-shrink-0">
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  {service.description}
                </CardDescription>
                {service.descriptionSecondary && (
                  <CardDescription className="text-sm sm:text-base leading-relaxed mt-1">
                    {service.descriptionSecondary}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
