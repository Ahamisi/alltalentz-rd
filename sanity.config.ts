import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '86d0qc2o'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'alltalentz-studio',
  title: 'All Talentz Blog Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author').title('Authors')),
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('Categories')),
            S.divider(),
            S.listItem()
              .title('Success Stories')
              .child(
                S.documentTypeList('successStory')
                  .title('Success Stories')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Success Story Categories')
              .child(
                S.documentTypeList('successStoryCategory')
                  .title('Success Story Categories')
                  .defaultOrdering([
                    { field: 'order', direction: 'asc' },
                    { field: 'title', direction: 'asc' },
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('FAQs')
              .child(
                S.documentTypeList('faq')
                  .title('FAQs')
                  .defaultOrdering([
                    { field: 'category.title', direction: 'asc' },
                    { field: 'order', direction: 'asc' },
                  ])
              ),
            S.listItem()
              .title('FAQ Categories')
              .child(
                S.documentTypeList('faqCategory')
                  .title('FAQ Categories')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
