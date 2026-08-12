import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'successStory',
  title: 'Success Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The headline result, phrased as the card should read it — e.g. "68% reduction in billing costs".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'One or two lines shown under the title on the card and in the detail hero (120–200 chars ideal).',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description:
        'Fills the lower half of the card and the detail banner. Optional — stories without one fall back to a branded placeholder.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Industries',
      type: 'array',
      description: 'Drives the filter chips. The first one is shown as the story’s badge.',
      of: [{ type: 'reference', to: { type: 'successStoryCategory' } }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'e.g. "Puroclean of Lynwood". Leave blank for anonymised stories.',
    }),
    defineField({
      name: 'clientLocation',
      title: 'Client Location',
      type: 'string',
      description: 'e.g. "Washington, USA".',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      description: 'Optional. Shown beside the client name on the detail page.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'metrics',
      title: 'Key Results',
      type: 'array',
      description:
        'Up to four headline numbers shown as a stat row on the detail page (e.g. 68% · "Fewer billing denials").',
      of: [
        {
          type: 'object',
          name: 'metric',
          title: 'Result',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g. "68%", "3 weeks", "$120k".',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'What the number measures, e.g. "Reduction in billing costs".',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      description: 'Optional pull-quote from the client, shown after the story body.',
      fields: [
        { name: 'quote', title: 'Quote', type: 'text', rows: 4 },
        { name: 'name', title: 'Name', type: 'string' },
        {
          name: 'role',
          title: 'Role / Company',
          type: 'string',
          description: 'e.g. "SVP Operations, Alacrity Solutions".',
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Optional YouTube link to the client’s video testimonial.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Story',
      type: 'boolean',
      description: 'Mark this story to pin it first in the unfiltered listing.',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Oldest',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      client: 'clientName',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, client, media, publishedAt } = selection
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'No date'
      return {
        title,
        subtitle: `${client ? `${client} · ` : ''}${date}`,
        media,
      }
    },
  },
})
