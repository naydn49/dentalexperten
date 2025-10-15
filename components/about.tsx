"use client"

import { useLanguage } from "@/lib/language-context"
import { Heart, Award, Users } from "lucide-react"
import Image from "next/image"

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-balance">{t.aboutTitle}</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image column */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="max-w-lg mx-auto">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/jana-professional-headshot.png"
                    alt="Jana Jain - Die Dentalexperten"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <p className="text-center mt-3 font-semibold text-lg">Jana</p>
              </div>
              <div className="max-w-lg mx-auto">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/fabian-professional-headshot.png"
                    alt="Fabian Jain - Die Dentalexperten"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-3 font-semibold text-lg">Fabian</p>
              </div>
              <div className="max-w-lg mx-auto">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/sarah-professional-headshot.png"
                    alt="Sarah - Die Dentalexperten"
                    fill
                    className="object-cover object-[center_20%]"
                  />
                </div>
                <p className="text-center mt-3 font-semibold text-lg">Sarah</p>
              </div>
            </div>

            {/* Text column */}
            <div className="order-1 lg:order-2 space-y-8 text-lg leading-relaxed">
              {/* Intro paragraph with heart icon */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground">{t.aboutIntro}</p>
              </div>

              {/* Jana's experience */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground">{t.janaExperience}</p>
              </div>

              {/* Fabian's experience */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground">{t.fabianExperience}</p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground">{t.sarahExperience}</p>
              </div>

              {/* Team approach */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground font-medium">{t.teamApproach}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
