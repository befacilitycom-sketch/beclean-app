import { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du Site',
  access: {
    read: () => true, // Accessible par l'API frontend
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Nom de l\'entreprise',
      defaultValue: 'BeClean',
      required: true,
    },
    {
      name: 'legalName',
      type: 'text',
      label: 'Raison Sociale Légale',
      defaultValue: 'BeClean Filiale BeFacility S.A.R.L.',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Slogan (Tagline)',
      defaultValue: 'Le partenaire propreté complet au Maroc : Services, Produits & Matériel',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Téléphone Fixe',
          defaultValue: '+212 520 90 09 00',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'Numéro WhatsApp',
          defaultValue: '+212 663 10 08 40',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'text',
          label: 'Email de Contact',
          defaultValue: 'contact@befacility.com',
        },
        {
          name: 'supportEmail',
          type: 'text',
          label: 'Email du Support',
          defaultValue: 'support@befacility.com',
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Adresse Physique',
      defaultValue: 'Belvedere, Casablanca, Maroc',
    },
    {
      name: 'ice',
      type: 'text',
      label: 'Numéro ICE',
      defaultValue: '003954092000044',
    },
    {
      name: 'socials',
      type: 'group',
      label: 'Réseaux Sociaux',
      fields: [
        { name: 'linkedin', type: 'text', defaultValue: 'https://linkedin.com/company/beclean-maroc' },
        { name: 'facebook', type: 'text', defaultValue: 'https://facebook.com/beclean.ma' },
        { name: 'instagram', type: 'text', defaultValue: 'https://instagram.com/beclean.ma' },
        { name: 'tiktok', type: 'text', defaultValue: 'https://tiktok.com/@beclean.ma' },
        { name: 'youtube', type: 'text', defaultValue: 'https://youtube.com/@beclean.ma' },
        { name: 'twitter', type: 'text', defaultValue: 'https://x.com/beclean_ma' },
      ],
    },
  ],
};
