import React from 'react';
import ServicesPageClient from './ServicesPageClient';

// Static SEO metadata for Google Indexation (Next.js App Router optimization)
export const metadata = {
  title: 'Services de Nettoyage Professionnel au Maroc | BeClean',
  description: 'Société de nettoyage professionnel et solutions sanitaires au Maroc. Nettoyage de bureaux, usines, résidences, désinfection 3D ONSSA. Devis immédiat.',
  keywords: 'nettoyage bureaux casablanca, service nettoyage rabat, desinfection 3d maroc, entreprise proprete locaux',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
