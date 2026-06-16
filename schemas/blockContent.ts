import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'table',
      title: 'Table',
      fields: [
        {
          name: 'headerRow',
          title: 'Header Row',
          description: 'Column headings (optional). Add one entry per column.',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'tableRow',
              title: 'Row',
              fields: [
                {
                  name: 'cells',
                  title: 'Cells',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
            },
          ],
        },
      ],
      preview: {
        select: { rows: 'rows' },
        prepare({ rows }: { rows?: unknown[] }) {
          const count = rows?.length ?? 0
          return { title: `Table (${count} row${count === 1 ? '' : 's'})` }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'ctaButton',
      title: 'CTA Button',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'url', type: 'url', title: 'URL' },
        {
          name: 'style',
          type: 'string',
          title: 'Style',
          initialValue: 'primary',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
            ],
            layout: 'radio',
          },
        },
        { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: false },
      ],
      preview: {
        select: { text: 'text', style: 'style' },
        prepare({ text, style }: { text?: string; style?: string }) {
          return { title: text ?? 'CTA Button', subtitle: style ?? 'primary' }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'faq',
      title: 'FAQ',
      fields: [
        {
          name: 'items',
          title: 'Questions',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'faqItem',
              title: 'Question',
              fields: [
                { name: 'question', title: 'Question', type: 'string' },
                {
                  name: 'answer',
                  title: 'Answer',
                  type: 'array',
                  of: [
                    {
                      type: 'block',
                      styles: [{ title: 'Normal', value: 'normal' }],
                      lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                      ],
                      marks: {
                        decorators: [
                          { title: 'Strong', value: 'strong' },
                          { title: 'Emphasis', value: 'em' },
                          { title: 'Code', value: 'code' },
                        ],
                        annotations: [
                          {
                            title: 'URL',
                            name: 'link',
                            type: 'object',
                            fields: [
                              { title: 'URL', name: 'href', type: 'url' },
                              { title: 'Open in new tab', name: 'blank', type: 'boolean' },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: { title: 'question' },
              },
            },
          ],
        },
      ],
      preview: {
        select: { items: 'items' },
        prepare({ items }: { items?: unknown[] }) {
          const count = items?.length ?? 0
          return { title: `FAQ (${count} question${count === 1 ? '' : 's'})` }
        },
      },
    }),
  ],
})
