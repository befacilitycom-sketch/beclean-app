'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import BrandLogo from './BrandLogo';

// Defined outside component to avoid recreation on every render
const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', path: '/' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'shop', label: 'Boutique', path: '/boutique' },
  { id: 'blog', label: 'Blog', path: '/blog' },
  { id: 'devis', label: 'Devis Instantané', path: '/devis' },
  { id: 'about', label: 'À Propos', path: '/about' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = React.useRef(0);
  const pathname = usePathname();
  const { getCartCount, setIsCartOpen } = useCart();
  const cartCount = getCartCount();

  // Smart scroll listener — hides header on scroll down, shows on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for background blur
      setIsScrolled(currentScrollY > 20);
      
      // Hide/Show logic based on direction (only apply if scrolled past header height to avoid jitter)
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true); // Scrolling down
      } else {
        setIsHidden(false); // Scrolling up
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes (e.g., browser back button)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
      <div className="container nav-container">

        {/* ——— LOGO ——— */}
        <BrandLogo onClick={closeMobileMenu} />

        {/* Desktop nav */}
        <nav aria-label="Navigation principale">
          <ul className="nav-menu">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={`nav-link interactive-scale ${pathname === item.path ? 'active' : ''}`}
                  aria-current={pathname === item.path ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          {/* Cart button */}
          <button
            className="btn btn-secondary interactive-scale"
            style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.4rem', border: 'none', position: 'relative' }}
            onClick={() => setIsCartOpen(true)}
            aria-label={`Ouvrir le panier${cartCount > 0 ? ` (${cartCount} article${cartCount > 1 ? 's' : ''})` : ''}`}
          >
            <ShoppingCart size={20} aria-hidden="true" />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute', top: '-5px', right: '-5px',
                  background: 'var(--accent-cyan)', color: '#000',
                  borderRadius: '50%', width: '18px', height: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: '800',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile toggle */}
          <button
            className="nav-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile menu drawer with CSS class transitions */}
      <nav
        id="mobile-nav"
        className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-label="Navigation mobile"
        aria-hidden={!isMobileMenuOpen}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: pathname === item.path ? 'var(--accent-cyan)' : 'var(--color-text-secondary)',
              paddingBottom: '0.6rem',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)',
              display: 'block'
            }}
            onClick={closeMobileMenu}
            aria-current={pathname === item.path ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
