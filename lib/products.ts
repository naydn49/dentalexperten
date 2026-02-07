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
    description: "Basis-Abrechnungsanalyse für 1-3 Behandler",
    descriptionEn: "Basic billing analysis for 1-3 practitioners",
    priceInCents: 100, // €1
    currency: "eur",
  },
  {
    id: "essential",
    name: "Essential",
    nameEn: "Essential",
    description: "Umfassende Abrechnungsanalyse mit Empfehlungen für 1-3 Behandler",
    descriptionEn: "Comprehensive billing analysis with recommendations for 1-3 practitioners",
    priceInCents: 39900, // €399
    currency: "eur",
  },
  {
    id: "pro",
    name: "Pro",
    nameEn: "Pro",
    description: "Vollständige Abrechnungsanalyse mit persönlicher Beratung für 1-3 Behandler",
    descriptionEn: "Complete billing analysis with personal consultation for 1-3 practitioners",
    priceInCents: 74900, // €749
    currency: "eur",
  },
]
