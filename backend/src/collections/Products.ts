import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Chemicals / Produits d\'entretien', value: 'chemicals' },
        { label: 'Hygiene / Articles d\'hygiène', value: 'hygiene' },
        { label: 'Tools / Matériel de nettoyage', value: 'tools' },
        { label: 'Paper / Consommables papier', value: 'paper' },
        { label: 'Industrial / Nettoyage industriel', value: 'industrial' },
      ],
    },
    {
      name: 'categoryLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'unit',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
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
      name: 'inStock',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 4.5,
    },
    {
      name: 'isPopular',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
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
