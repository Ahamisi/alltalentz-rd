import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { postBySlugQuery, allSlugsQuery, relatedPostsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { SanityPost } from '@/types/blog'
import Header from '@/components/Header'
import MainFooter from '@/components/MainFooter'
import PostDetail from '@/components/blog/PostDetail'
import RelatedPosts from '@/components/blog/RelatedPosts'

export const revalidate = 60

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug })

  if (!post) notFound()

  const heroImageUrl = urlFor(post.mainImage).width(1400).height(700).fit('crop').auto('format').url()
  const authorImageUrl = post.author.image
    ? urlFor(post.author.image).width(120).height(120).fit('crop').auto('format').url()
    : null

  const categorySlugList = post.categories?.map((c) => c.slug) ?? []
  const relatedPosts = categorySlugList.length > 0
    ? await client.fetch<SanityPost[]>(relatedPostsQuery, { slug, categories: categorySlugList })
    : []

  return (
    <>
      <div className="bg-primary">
        <Header />
      </div>
      <main className="bg-white">
        <PostDetail post={post} heroImageUrl={heroImageUrl} authorImageUrl={authorImageUrl} />
        <RelatedPosts posts={relatedPosts} />
      </main>
      <MainFooter />
    </>
  )
}
