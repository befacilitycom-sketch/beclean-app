import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'stars',
      type: 'number',
      required: true,
      defaultValue: 5,
    },
    {
      name: 'isActive',
      type: 'boolean',
      defaultValue: true,
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
