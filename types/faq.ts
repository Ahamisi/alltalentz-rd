export interface SanityFaq {
  _id: string
  question: string
  answer: string
}

export interface SanityFaqCategory {
  _id: string
  title: string
  slug: string
  description?: string
  faqs: SanityFaq[]
}
