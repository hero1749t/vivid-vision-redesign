import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'object',
      fields: [
        {name: 'phone', type: 'string'},
        {name: 'whatsapp', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'address', type: 'text'},
        {name: 'location', type: 'string', title: 'Location (City/Region)'},
      ]
    }),
    defineField({
      name: 'heroContent',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'subtitle', type: 'text'},
      ]
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'instagram', type: 'url'},
        {name: 'facebook', type: 'url'},
        {name: 'youtube', type: 'url'},
        {name: 'tiktok', type: 'url'},
      ]
    }),
  ],
})
