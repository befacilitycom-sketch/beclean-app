import { GlobalConfig } from 'payload';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Page d\'Accueil',
  access: {
    read: () => true, // Accessible public via API
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Bannière Principale (Hero)',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre Principal',
          defaultValue: 'Votre Partenaire Propreté Complet au Maroc',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Sous-titre',
          defaultValue: 'Protocoles de désinfection certifiés et nettoyage éco-responsable pour vos bureaux et locaux',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistiques Clés',
      minRows: 1,
      maxRows: 4,
      defaultValue: [
        { number: '150+', label: 'Clients B2B Actifs' },
        { number: '98%', label: 'Taux de Recommandation' },
        { number: '7', label: 'Villes Couvertes au Maroc' },
        { number: '2h', label: 'Délai d\'Intervention d\'Urgence' },
      ],
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'about',
      type: 'group',
      label: 'Section "Qui sommes-nous ?"',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'L\'Excellence au Service de Vos Locaux',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Fondée à Casablanca, BeClean est rapidement devenue une référence du nettoyage B2B et résidentiel haut de gamme. Nous allions l\'utilisation de technologies modernes (auto-laveuses silencieuses, détergents enzymatiques) avec une formation rigoureuse de nos agents.',
        },
      ],
    },
  ],
};
