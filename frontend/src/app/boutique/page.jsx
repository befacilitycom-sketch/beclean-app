import React from 'react';
import BoutiquePageClient from './BoutiquePageClient';

// Static SEO metadata for Google Indexation (Next.js App Router optimization)
export const metadata = {
  title: 'Boutique en Ligne d\'Hygiène & Matériel de Nettoyage au Maroc | BeClean',
  description: 'Commandez en ligne vos produits d\'entretien écologiques, matériel professionnel et consommables d\'hygiène au Maroc. Livraison rapide 24/48h.',
  keywords: 'materiel nettoyage maroc, grossiste produits entretien casablanca, ouate de cellulose maroc, aspirateur professionnel rabat',
  alternates: {
    canonical: '/boutique',
  },
};

export default function BoutiquePage() {
  return <BoutiquePageClient />;
}
