import React from 'react';
import Link from 'next/link';

export default function BrandLogo({ onClick }) {
  return (
    <Link 
      href="/" 
      className="brand-logo interactive-scale" 
      onClick={onClick} 
      aria-label="Accueil BeClean"
    >
      <span className="text-logo">
        BeClean
      </span>
    </Link>
  );
}
