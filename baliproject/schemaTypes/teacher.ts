import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teacher',
  title: 'Yoga Teacher',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image URL (fallback)',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'styles',
      title: 'Teaching Styles',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
