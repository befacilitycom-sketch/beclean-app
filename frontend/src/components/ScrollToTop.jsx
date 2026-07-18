'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Remonter en haut de page"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        color: 'var(--accent-cyan)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-md)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, box-shadow 0.2s',
        zIndex: 998,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
        e.currentTarget.style.boxShadow = 'var(--shadow-neon)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      <ArrowUp size={22} aria-hidden="true" />
    </button>
  );
}
