'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, X, AlertCircle, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../config/constants';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
    handleCartCheckout
  } = useCart();

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isCartOpen) {
      setIsCartOpen(false);
    }
  }, [isCartOpen, setIsCartOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const whatsappHref = `https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '').replace(/\s/g, '')}?text=${encodeURIComponent('Bonjour BeClean, je souhaiterais obtenir des informations concernant vos services.')}`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Discuter avec BeClean sur WhatsApp"
      >
        <MessageSquare size={28} aria-hidden="true" />
      </a>

      {/* Backdrop overlay — click to close */}
      <div
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Cart Drawer Panel */}
      <div
        className={`cart-drawer ${isCartOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Panier d'achat"
      >
        <div className="cart-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
            <ShoppingCart size={20} style={{ color: 'var(--accent-cyan)' }} aria-hidden="true" />
            <span>Mon Panier ({getCartCount()})</span>
          </h3>
          <button
            className="cart-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Fermer le panier"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="cart-items" role="list">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--color-text-muted)' }}>
              <ShoppingCart size={48} style={{ opacity: 0.3, marginBottom: '1rem', margin: '0 auto 1rem' }} aria-hidden="true" />
              <p>Votre panier est vide.</p>
              <Link
                href="/boutique"
                className="btn btn-secondary"
                style={{ marginTop: '1.5rem', fontSize: '0.85rem', display: 'inline-flex' }}
                onClick={() => setIsCartOpen(false)}
              >
                Parcourir la boutique
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="cart-item" role="listitem">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.product.name}</div>
                  <div className="cart-item-price">
                    {item.product.price} MAD
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}> / {item.product.unit}</span>
                  </div>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.product.id, -1)}
                      aria-label={`Diminuer la quantité de ${item.product.name}`}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }} aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.product.id, 1)}
                      aria-label={`Augmenter la quantité de ${item.product.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label={`Retirer ${item.product.name} du panier`}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Total HT</span>
              <span className="cart-total-val" aria-live="polite">{getCartTotal()} MAD</span>
            </div>
            <div style={{
              display: 'flex', gap: '0.5rem', alignItems: 'center',
              background: 'rgba(0,180,216,0.05)', border: '1px solid rgba(0,180,216,0.2)',
              padding: '0.8rem', borderRadius: '8px', fontSize: '0.75rem',
              color: 'var(--color-text-secondary)', marginBottom: '1.5rem',
            }}>
              <AlertCircle size={18} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} aria-hidden="true" />
              <span>Commande transmise à notre dépôt de Casablanca via WhatsApp.</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%', color: '#000', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
              onClick={handleCartCheckout}
            >
              <MessageSquare size={18} aria-hidden="true" />
              <span>Commander via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
