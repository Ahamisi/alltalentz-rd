import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'successStoryCategory',
  title: 'Success Story Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Shown as the filter chip on the success stories page (e.g. "Healthcare").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Used in the ?category= filter link, so keep it stable once the URL has been shared.',
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
        'Lower numbers appear first in the filter rail. Categories without an order fall to the end, alphabetically.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional. Internal note / short intro for the industry.',
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
