import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqCategory',
  title: 'FAQ Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Shown as the chip above the group and in the sidebar nav (e.g. "Construction").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the in-page anchor (/faq#construction), so keep it stable once shared.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'Lower numbers appear first on the FAQ page. Categories without an order fall to the end, alphabetically.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional. Internal note / short intro for the group.',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      description: 'description',
    },
    prepare({ title, order, description }) {
      return {
        title,
        subtitle: [order != null ? `#${order}` : null, description].filter(Boolean).join(' · '),
      }
    },
  },
})
