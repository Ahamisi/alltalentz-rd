import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description: 'Plain text. Keep it to one or two sentences — the accordion is for scanning.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'faqCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'Position within the category. Questions without an order fall to the end, oldest first.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Feature in short FAQ blocks',
      type: 'boolean',
      description:
        'Surface this question in the condensed FAQ sections used on the homepage and landing pages.',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Category, then order',
      name: 'categoryOrder',
      by: [
        { field: 'category.title', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category.title',
      order: 'order',
      featured: 'showOnHomepage',
    },
    prepare({ title, category, order, featured }) {
      return {
        title,
        subtitle: [category ?? 'Uncategorised', order != null ? `#${order}` : null, featured ? '★ featured' : null]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})
