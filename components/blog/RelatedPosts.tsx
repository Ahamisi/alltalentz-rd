import type { SanityPost } from '@/types/blog'
import BlogCard from './BlogCard'

interface RelatedPostsProps {
  posts: SanityPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="bg-[#f8f8f8] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, i) => (
            <BlogCard key={post._id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
