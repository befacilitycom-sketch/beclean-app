import React from 'react';
import BlogPageClient from './BlogPageClient';

// Static SEO metadata for Google Indexation (Next.js App Router optimization)
export const metadata = {
  title: 'Blog & Conseils Propreté | BeClean Maroc',
  description: 'Retrouvez les conseils d\'experts BeClean sur le nettoyage professionnel, la désinfection 3D/4D et la réglementation sanitaire ONSSA au Maroc.',
  keywords: 'blog nettoyage maroc, conseils hygiene bureau, guide desinfection casablanca, reglementation onssa proprete',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
