export interface Product {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  priceInCents: number
  currency: string
}

// Product catalog - source of truth for all packages
export const PRODUCTS: Product[] = [
  {
    id: "light",
    name: "Light",
    nameEn: "Light",
    description: "Basis-Abrechnungsanalyse mit schriftlichem Bericht",
    descriptionEn: "Basic billing analysis with written report",
    priceInCents: 49900, // €499
    currency: "eur",
  },
  {
    id: "essential",
    name: "Essential",
    nameEn: "Essential",
    description: "Ausführliche Analyse mit Optimierungstipps und Beratungsgespräch",
    descriptionEn: "Detailed analysis with optimization tips and consultation",
    priceInCents: 79900, // €799
    currency: "eur",
  },
  {
    id: "pro",
    name: "Pro",
    nameEn: "Pro",
    description: "Komplettpaket mit Software-Optimierung, Support und Live-Webinar",
    descriptionEn: "Complete package with software optimization, support, and live webinar",
    priceInCents: 249900, // €2.499
    currency: "eur",
  },
]
