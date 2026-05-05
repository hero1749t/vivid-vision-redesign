import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'schedule',
  title: 'Batch Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{type: 'course'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Open', value: 'Open'},
          {title: 'Few Seats Left', value: 'Few Seats Left'},
          {title: 'Waitlist', value: 'Waitlist'},
          {title: 'Sold Out', value: 'Sold Out'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Batch Price (USD)',
      type: 'number',
    }),
    defineField({
      name: 'discountPrice',
      title: 'Discount Price (USD)',
      type: 'number',
      description: 'Leave blank if no discount',
    }),
  ],
  preview: {
    select: {
      title: 'course.title',
      subtitle: 'startDate',
    },
  },
})
