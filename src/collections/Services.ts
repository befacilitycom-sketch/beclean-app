import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
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
      name: 'shortDesc',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
    {
      name: 'baseRate',
      type: 'number',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
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
    {
      name: 'isActive',
      type: 'boolean',
      defaultValue: true,
    },
  ],
};
