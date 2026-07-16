import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BrandLogo({ onClick }) {
  return (
    <Link 
      href="/" 
      className="brand-logo interactive-scale" 
      onClick={onClick} 
      aria-label="Accueil BeClean"
      style={{ display: 'inline-block', position: 'relative' }}
    >
      <Image 
        src="/logo-be.png" 
        alt="BeClean Logo" 
        width={140} 
        height={40} 
        style={{ objectFit: 'contain' }}
        priority
      />
    </Link>
  );
}
