import React from 'react';
import DevisPageClient from './DevisPageClient';

// Static SEO metadata for Google Indexation (Next.js App Router optimization)
export const metadata = {
  title: 'Calculateur de Devis Nettoyage Instantané Maroc | BeClean',
  description: 'Simulateur de prix en ligne pour vos prestations de nettoyage de bureaux, locaux, maisons ou fin de chantier au Maroc. Estimation immédiate et devis PDF.',
  keywords: 'simulateur prix nettoyage maroc, devis nettoyage gratuit en ligne, calcul tarif proprete bureau casablanca',
  alternates: {
    canonical: '/devis',
  },
};

export default function DevisPage() {
  return <DevisPageClient />;
}
