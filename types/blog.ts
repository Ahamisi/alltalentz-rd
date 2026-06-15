import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
}

export interface SanityCategory {
  title: string
  slug: string
}

export interface SanityAuthor {
  name: string
  role?: string
  image?: SanityImage
}

export interface SanityPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  featured?: boolean
  mainImage: SanityImage
  author: SanityAuthor
  categories: SanityCategory[]
  body?: PortableTextBlock[]
}
