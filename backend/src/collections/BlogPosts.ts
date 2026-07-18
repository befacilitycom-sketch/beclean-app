import type { CollectionConfig } from 'payload';

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Conseils Bureaux', value: 'Conseils Bureaux' },
        { label: 'Réglementation', value: 'Réglementation' },
        { label: 'Chantier & BTP', value: 'Chantier & BTP' },
        { label: 'Résidentiel', value: 'Résidentiel' },
        { label: 'Hygiène', value: 'Hygiène' },
      ],
    },
    {
      name: 'readTime',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tenant',
      type: 'select',
      required: true,
      options: [
        { label: 'BeClean', value: 'beclean' },
        { label: 'BeJob', value: 'bejob' },
      ],
      defaultValue: 'beclean',
    },
  ],
};
