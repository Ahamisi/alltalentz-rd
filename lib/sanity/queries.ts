import { groq } from 'next-sanity'

const POST_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  _updatedAt,
  featured,
  mainImage,
  "author": author->{ name, role, image, bio },
  "categories": categories[]->{ title, "slug": slug.current },
  "charCount": length(pt::text(body))
`

const FILTER_CLAUSE = groq`
  _type == "post"
  && !(_id in path("drafts.**"))
  && ($category == "" || $category in categories[]->slug.current)
  && ($search == "" || title match $search || excerpt match $search)
`

export const featuredPostQuery = groq`
  coalesce(
    *[_type == "post" && featured == true && !(_id in path("drafts.**"))]
    | order(publishedAt desc)[0],
    *[_type == "post" && !(_id in path("drafts.**"))]
    | order(publishedAt desc)[0]
  ) {
    ${POST_FIELDS}
  }
`

// GROQ needs a literal sort direction, hence one query per direction.
export const postsQueryDesc = groq`
  *[${FILTER_CLAUSE}]
  | order(publishedAt desc)
  [$offset...$limit] {
    ${POST_FIELDS}
  }
`

export const postsQueryAsc = groq`
  *[${FILTER_CLAUSE}]
  | order(publishedAt asc)
  [$offset...$limit] {
    ${POST_FIELDS}
  }
`

export const postCountQuery = groq`
  count(*[${FILTER_CLAUSE}])
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${POST_FIELDS},
    body
  }
`

export const allSlugsQuery = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current
`

export const allPostsForSitemapQuery = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(publishedAt desc) {
    "slug": slug.current,
    "lastModified": coalesce(_updatedAt, publishedAt)
  }
`

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current
  }
`

export const faqCategoriesWithFaqsQuery = groq`
  *[_type == "faqCategory" && !(_id in path("drafts.**"))]
  | order(coalesce(order, 999) asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "faqs": *[
      _type == "faq"
      && !(_id in path("drafts.**"))
      && category._ref == ^._id
    ] | order(coalesce(order, 999) asc, _createdAt asc) {
      _id,
      question,
      answer
    }
  }
`

export const featuredFaqsQuery = groq`
  *[_type == "faq" && showOnHomepage == true && !(_id in path("drafts.**"))]
  | order(coalesce(order, 999) asc, _createdAt asc) {
    _id,
    question,
    answer
  }
`

const SUCCESS_STORY_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  _updatedAt,
  featured,
  mainImage,
  clientName,
  clientLocation,
  clientLogo,
  metrics,
  testimonial,
  videoUrl,
  "categories": categories[]->{ title, "slug": slug.current },
  "charCount": length(pt::text(body))
`

const SUCCESS_STORY_FILTER = groq`
  _type == "successStory"
  && !(_id in path("drafts.**"))
  && ($category == "" || $category in categories[]->slug.current)
  && ($search == "" || title match $search || excerpt match $search || clientName match $search)
`

// GROQ needs a literal sort direction, hence one query per direction.
export const successStoriesQueryDesc = groq`
  *[${SUCCESS_STORY_FILTER}]
  | order(featured desc, publishedAt desc)
  [$offset...$limit] {
    ${SUCCESS_STORY_FIELDS}
  }
`

export const successStoriesQueryAsc = groq`
  *[${SUCCESS_STORY_FILTER}]
  | order(featured desc, publishedAt asc)
  [$offset...$limit] {
    ${SUCCESS_STORY_FIELDS}
  }
`

export const successStoryCountQuery = groq`
  count(*[${SUCCESS_STORY_FILTER}])
`

export const successStoryBySlugQuery = groq`
  *[_type == "successStory" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${SUCCESS_STORY_FIELDS},
    body
  }
`

export const allSuccessStorySlugsQuery = groq`
  *[_type == "successStory" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current
`

export const allSuccessStoriesForSitemapQuery = groq`
  *[_type == "successStory" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(publishedAt desc) {
    "slug": slug.current,
    "lastModified": coalesce(_updatedAt, publishedAt)
  }
`

export const allSuccessStoryCategoriesQuery = groq`
  *[_type == "successStoryCategory" && !(_id in path("drafts.**"))]
  | order(coalesce(order, 999) asc, title asc) {
    title,
    "slug": slug.current
  }
`

export const relatedSuccessStoriesQuery = groq`
  *[
    _type == "successStory"
    && !(_id in path("drafts.**"))
    && slug.current != $slug
    && count((categories[]->slug.current)[@ in $categories]) > 0
  ]
  | order(publishedAt desc)[0...3] {
    ${SUCCESS_STORY_FIELDS}
  }
`

export const relatedPostsQuery = groq`
  *[
    _type == "post"
    && !(_id in path("drafts.**"))
    && slug.current != $slug
    && count((categories[]->slug.current)[@ in $categories]) > 0
  ]
  | order(publishedAt desc)[0...3] {
    ${POST_FIELDS}
  }
`
