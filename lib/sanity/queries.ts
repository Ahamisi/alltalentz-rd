import { groq } from 'next-sanity'

const POST_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  mainImage,
  "author": author->{ name, role, image },
  "categories": categories[]->{ title, "slug": slug.current }
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

// Sort direction must be a literal in GROQ — generate two queries and pick at runtime
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

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current
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
