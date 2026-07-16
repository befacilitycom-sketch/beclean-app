'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { COMPANY_INFO } from '../config/constants';

const CartContext = createContext();

/**
 * Safely loads cart from localStorage (handles SSR and JSON errors)
 */
function loadCartFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('beclean_cart');
    const parsed = raw ? JSON.parse(raw) : [];
    // Basic validation: ensure it's an array of { product: { id }, quantity: number }
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(item => item?.product?.id !== undefined && typeof item.quantity === 'number');
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  // Lazy initializer — reads localStorage once at mount, avoids SSR crash
  const [cart, setCart] = useState(() => loadCartFromStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Track if the initial load is done to avoid overwriting on first render
  const hasLoadedRef = useRef(false);

  // Sync cart to localStorage (skip on the very first mount render = avoids overwrite race)
  useEffect(() => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      return; // Don't save on first mount — lazy initializer already loaded the data
    }
    localStorage.setItem('beclean_cart', JSON.stringify(cart));
  }, [cart]);

  // Use functional setState to avoid stale closures
  const addToCart = useCallback((product, quantityToAdd = 1) => {
    const qty = Math.max(1, Number(quantityToAdd) || 1);
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + qty, 99) }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  }, []);

  const updateQuantity = useCallback((productId, amount) => {
    setCart(prev => {
      const item = prev.find(i => i.product.id === productId);
      if (!item) return prev;
      const newQty = item.quantity + amount;
      if (newQty <= 0) return prev.filter(i => i.product.id !== productId);
      return prev.map(i =>
        i.product.id === productId ? { ...i, quantity: Math.min(newQty, 99) } : i
      );
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // Memoized computed values — avoid recalculation on every render
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const getCartTotal = useCallback(() => cartTotal, [cartTotal]);
  const getCartCount = useCallback(() => cartCount, [cartCount]);

  const generateWhatsAppOrderText = useCallback(() => {
    const itemsText = cart
      .map(item => `- ${item.quantity}x ${item.product.name} (${item.product.unit}) : ${item.product.price * item.quantity} MAD`)
      .join('\n');
    return `Bonjour BeClean, je souhaiterais passer commande :\n\n${itemsText}\n\n*Total:* ${cartTotal} MAD\nMerci de me recontacter.`;
  }, [cart, cartTotal]);

  const handleCartCheckout = useCallback(() => {
    if (cart.length === 0) return;
    const text = generateWhatsAppOrderText();
    const cleanPhone = COMPANY_INFO.whatsapp.replace('+', '').replace(/\s/g, '');
    // Open WhatsApp FIRST, then clear cart — avoids losing order if popup is blocked
    const opened = window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
    if (opened !== null) {
      // Only clear cart if the window actually opened (not blocked)
      clearCart();
      setIsCartOpen(false);
    }
  }, [cart, generateWhatsAppOrderText, clearCart]);

  // Memoize context value to prevent all consumers from re-rendering on isCartOpen changes
  const contextValue = useMemo(() => ({
    cart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    handleCartCheckout,
  }), [cart, cartTotal, cartCount, isCartOpen, addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount, handleCartCheckout]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
