import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

/** Static fallback used when a blog post has no main image (e.g. WordPress imports). */
export const FALLBACK_BLOG_IMAGE = '/twitter/twitter-card.png'

/**
 * Resolve a blog image to a URL, falling back to a branded placeholder when the
 * source image is missing. `build` lets callers apply the usual transforms.
 */
export function blogImageUrl(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any,
  build?: (b: ReturnType<typeof builder.image>) => ReturnType<typeof builder.image>,
): string {
  if (!source?.asset?._ref) return FALLBACK_BLOG_IMAGE
  const img = builder.image(source)
  return (build ? build(img) : img).url()
}
