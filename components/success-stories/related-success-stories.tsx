import SuccessStoryCard from './success-story-card'
import type { SanitySuccessStory } from '@/types/success-story'

interface RelatedSuccessStoriesProps {
  stories: SanitySuccessStory[]
}

export default function RelatedSuccessStories({ stories }: RelatedSuccessStoriesProps) {
  if (stories.length === 0) return null

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">More Success Stories</h2>
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {stories.map((story, i) => (
            <SuccessStoryCard key={story._id} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
