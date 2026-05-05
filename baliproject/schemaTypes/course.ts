import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'course',
  title: 'Yoga Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (e.g., 200 Hours)',
      type: 'string',
    }),
    defineField({
      name: 'days',
      title: 'Days (e.g., 21 Days)',
      type: 'string',
    }),
    defineField({
      name: 'style',
      title: 'Style / Level',
      type: 'string',
    }),
    defineField({
      name: 'priceFrom',
      title: 'Price From (USD)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.max(4),
    }),
  ],
})
