import React from 'react';
import Link from 'next/link';

const InterlockingBe = () => (
  <svg 
    width="55" 
    height="55" 
    viewBox="0 0 130 130" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="be-logo-container"
    style={{ overflow: 'visible', marginRight: '8px' }}
  >
    <defs>
      <linearGradient id="grad-b" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#00f5d4" />
      </linearGradient>
      <linearGradient id="grad-e" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f5d4" />
        <stop offset="100%" stopColor="#0077b6" />
      </linearGradient>

      {/* Base geometry */}
      <path id="path-b-bowl" d="M 30 45 A 40 40 0 1 1 30 109" />
      <g id="path-e">
        <line x1="40" y1="77" x2="114" y2="77" />
        <path d="M 114 77 A 40 40 0 1 0 95 110" />
      </g>
      {/* Top segment of b to create interlock overlap */}
      <path id="path-b-top" d="M 30 45 A 40 40 0 0 1 78 45" />
    </defs>
    
    <g strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
      {/* 1. Letter 'b' stem and bowl */}
      <line x1="30" y1="10" x2="30" y2="115" stroke="url(#grad-b)" className="be-animate-draw" />
      <use href="#path-b-bowl" stroke="url(#grad-b)" className="be-animate-draw" style={{ animationDelay: '0.2s' }} />
      
      {/* 2. Letter 'e' rendered on top, with gap */}
      <use href="#path-e" stroke="#050811" strokeWidth="26" />
      <use href="#path-e" stroke="url(#grad-e)" className="be-animate-draw" style={{ animationDelay: '0.4s' }} />
      
      {/* 3. Top of 'b' rendered back on top to complete the interlock */}
      <use href="#path-b-top" stroke="#050811" strokeWidth="26" />
      <use href="#path-b-top" stroke="url(#grad-b)" className="be-animate-draw" style={{ animationDelay: '0.6s' }} />
    </g>
  </svg>
);

export default function BrandLogo({ onClick }) {
  return (
    <Link 
      href="/" 
      className="brand-logo interactive-scale" 
      onClick={onClick} 
      aria-label="Accueil BeClean"
    >
      <InterlockingBe />
      <span className="logo-clean">Clean</span>
    </Link>
  );
}
