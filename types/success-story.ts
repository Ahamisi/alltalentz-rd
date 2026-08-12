import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImage } from './blog'

export interface SuccessStoryCategory {
  title: string
  slug: string
}

export interface SuccessStoryMetric {
  _key?: string
  value: string
  label: string
}

export interface SuccessStoryTestimonial {
  quote?: string
  name?: string
  role?: string
}

export interface SanitySuccessStory {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  _updatedAt?: string
  featured?: boolean
  mainImage?: SanityImage
  categories?: SuccessStoryCategory[]
  clientName?: string
  clientLocation?: string
  clientLogo?: SanityImage
  metrics?: SuccessStoryMetric[]
  testimonial?: SuccessStoryTestimonial
  videoUrl?: string
  body?: PortableTextBlock[]
  charCount?: number
}
