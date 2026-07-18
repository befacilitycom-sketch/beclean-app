'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Star, CheckCircle2, Plus, Search, Loader2,
  AlertCircle, CheckCircle
} from 'lucide-react';
import SafeBlocksRenderer from '../../components/SafeBlocksRenderer';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../hooks/useProducts';

export default function BoutiquePageClient() {
  const { addToCart, setIsCartOpen } = useCart();
  const { data: fetchedProducts, loading: productsLoading } = useProducts();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [toastMessage, setToastMessage] = useState(null);

  // Synchro fetchedProducts -> state
  useEffect(() => {
    if (fetchedProducts) {
      setProducts(fetchedProducts);
      setIsLoading(productsLoading);
    }
  }, [fetchedProducts, productsLoading]);

  const toastTimerRef = useRef(null);

  const triggerToast = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const categories = [
    { id: 'all', label: 'Tous les produits', count: products.length },
    { id: 'chemicals', label: "Produits d'Entretien", count: products.filter(p => p.category === 'chemicals').length },
    { id: 'equipment', label: 'Matériel Professionnel', count: products.filter(p => p.category === 'equipment').length },
    { id: 'consumables', label: 'Consommables Ouate', count: products.filter(p => p.category === 'consumables').length },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDetailQty(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const adjustQty = (amount) => {
    setDetailQty(prev => Math.max(1, prev + amount));
  };

  // Sort and filter logic
  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        (p.categoryLabel || '').toLowerCase().includes(q) ||
        (p.desc && Array.isArray(p.desc) 
          ? p.desc.some(b => b.children && b.children.some(c => c.text && c.text.toLowerCase().includes(q)))
          : typeof p.desc === 'string' && p.desc.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default
    });

  if (selectedProduct) {
    const relatedProducts = products
      .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
      .slice(0, 3);

    return (
      <section className="section page-transition" style={{ paddingTop: '120px' }}>
        <div className="container">
          {/* Breadcrumb & Back button */}
          <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button 
              className="btn btn-secondary"
              style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
              onClick={() => setSelectedProduct(null)}
            >
              <ArrowLeft size={16} />
              <span>Retour à la Boutique</span>
            </button>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Boutique / {selectedProduct.categoryLabel} / <span style={{ color: 'var(--accent-cyan)' }}>{selectedProduct.name}</span>
            </div>
          </div>

          {/* Product Detail Layout */}
          <div className="devis-grid" style={{ marginBottom: '5rem' }}>
            {/* Left Column Group */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Product Image Box */}
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center', minHeight: '350px', position: 'relative' }}>
                <span style={{ fontSize: '7rem', opacity: 0.7, marginBottom: '2rem', display: 'block', animation: 'float 3s ease-in-out infinite' }} aria-hidden="true">
                  {selectedProduct.category === 'chemicals' ? '🧪' : selectedProduct.category === 'equipment' ? '🧹' : '🧻'}
                </span>
                {selectedProduct.isPopular && (
                  <span className="product-tag" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--accent-cyan)', color: '#000', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800' }}>
                    Best Seller
                  </span>
                )}
                {selectedProduct.inStock && (
                  <span style={{ color: '#25D366', fontSize: '0.85rem', fontWeight: '600', display: 'flex', gap: '0.4rem', alignItems: 'center', marginTop: '1rem' }}>
                    <span style={{ width: '8px', height: '8px', background: '#25D366', borderRadius: '50%' }}></span>
                    En Stock (Dépôt Casablanca & Rabat)
                  </span>
                )}
              </div>

              {/* Specification & Eco-labeling Widget */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: '#fff', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
                  📋 Fiche Éco-Engagement & Conseils
                </h3>
                
                {selectedProduct.category === 'chemicals' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Indice Biodégradabilité</span>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: '95%', height: '100%', background: 'linear-gradient(to right, #00b4d8, #00f5d4)', borderRadius: '3px' }}></div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '0.2rem', display: 'block', textAlign: 'right', fontWeight: 'bold' }}>95% Biodégradable (Éco-responsable)</span>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem', display: 'flex', gap: '0.6rem', fontSize: '0.85rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>🔬</span>
                      <div>
                        <strong style={{ color: '#fff' }}>pH Neutre (7.5)</strong>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: '0.1rem' }}>Sûr pour toutes les surfaces lavables.</p>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem', display: 'flex', gap: '0.6rem', fontSize: '0.85rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>💡</span>
                      <div>
                        <strong style={{ color: '#fff' }}>Conseil Pro BeClean</strong>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: '0.1rem' }}>Diluer à 1% pour le lavage manuel, laisser agir 2 min pour un effet brillant.</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProduct.category === 'equipment' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Indice de Réparabilité</span>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: '88%', height: '100%', background: 'linear-gradient(to right, #00b4d8, #00f5d4)', borderRadius: '3px' }}></div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '0.2rem', display: 'block', textAlign: 'right', fontWeight: 'bold' }}>8.8 / 10 (Pièces détachées disponibles)</span>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem', display: 'flex', gap: '0.6rem', fontSize: '0.85rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>🛡️</span>
                      <div>
                        <strong style={{ color: '#fff' }}>Garantie Constructeur BeFacility</strong>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: '0.1rem' }}>Garantie totale 2 ans avec assistance technique à domicile Casablanca/Rabat.</p>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem', display: 'flex', gap: '0.6rem', fontSize: '0.85rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>💡</span>
                      <div>
                        <strong style={{ color: '#fff' }}>Astuce d'entretien</strong>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: '0.1rem' }}>Vider la cuve et rincer le filtre HEPA après aspiration d'eau pour protéger les moteurs.</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProduct.category === 'consumables' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>Label Écologique</span>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to right, #00b4d8, #00f5d4)', borderRadius: '3px' }}></div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '0.2rem', display: 'block', textAlign: 'right', fontWeight: 'bold' }}>100% Pure Ouate Cellulose (Certifié FSC)</span>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem', display: 'flex', gap: '0.6rem', fontSize: '0.85rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>💧</span>
                      <div>
                        <strong style={{ color: '#fff' }}>Absorption Renforcée</strong>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: '0.1rem' }}>Double épaisseur avec gaufrage breveté haute résistance.</p>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem', display: 'flex', gap: '0.6rem', fontSize: '0.85rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>💡</span>
                      <div>
                        <strong style={{ color: '#fff' }}>Conseil de Stockage</strong>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: '0.1rem' }}>Conserver à l'abri de l'humidité pour garantir un pouvoir absorbant optimal.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Info & Purchase controls */}
            <div className="glass-panel" style={{ padding: '3rem 2.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {selectedProduct.categoryLabel}
              </span>
              <h1 style={{ fontSize: '2.2rem', marginTop: '0.5rem', marginBottom: '1rem', color: '#fff' }}>
                {selectedProduct.name}
              </h1>

              {/* Stars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(selectedProduct.rating) ? '#ffb703' : 'none'} 
                      stroke={i < Math.floor(selectedProduct.rating) ? 'none' : 'var(--color-text-muted)'} 
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff', marginLeft: '0.2rem' }}>{selectedProduct.rating} / 5</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}> (Avis clients vérifiés)</span>
              </div>

              {/* Price Details */}
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Prix Unitaire HT</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.2rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{selectedProduct.price} MAD</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>/ {selectedProduct.unit}</span>
                </div>
              </div>

              {/* Description */}
              <div 
                className="product-ckeditor-content" 
                style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', marginBottom: '2rem', fontSize: '1rem' }}
              >
                <SafeBlocksRenderer content={selectedProduct.desc} />
              </div>

              {/* Features List */}
              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <>
                  <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.8rem' }}>Points forts du produit :</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
                    {selectedProduct.features.map((feat, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.92rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--accent-cyan)', marginTop: '0.15rem', flexShrink: 0 }} aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Purchase controls */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Quantité</span>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden', width: 'fit-content' }}>
                    <button onClick={() => adjustQty(-1)} style={{ background: 'transparent', border: 'none', color: '#fff', padding: '0.6rem 1rem', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                    <span style={{ width: '40px', textAlign: 'center', fontWeight: '600', color: '#fff' }}>{detailQty}</span>
                    <button onClick={() => adjustQty(1)} style={{ background: 'transparent', border: 'none', color: '#fff', padding: '0.6rem 1rem', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                  </div>
                </div>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Total Estimé HT</span>
                  <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>
                    {selectedProduct.price * detailQty} MAD
                  </span>
                </div>

                <button 
                  className="btn btn-primary"
                  style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.8rem 2rem', color: '#000', marginTop: '1.2rem' }}
                  onClick={() => {
                    addToCart(selectedProduct, detailQty);
                    triggerToast(`${selectedProduct.name} (${detailQty}) ajouté au panier !`);
                    setIsCartOpen(true);
                  }}
                >
                  <Plus size={18} />
                  <span>Ajouter au Panier</span>
                </button>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '2rem', textAlign: 'left' }}>
                Produits Similaires
              </h2>
              <div className="grid-3">
                {relatedProducts.map((p) => (
                  <div 
                    key={p.id} 
                    className="glass-panel product-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleProductClick(p)}
                  >
                    <div className="product-img-box">
                      <span style={{ fontSize: '3rem', opacity: 0.5 }} aria-hidden="true">
                        {p.category === 'chemicals' ? '🧪' : p.category === 'equipment' ? '🧹' : '🧻'}
                      </span>
                    </div>
                    <div className="product-info">
                      <span className="product-category">{p.categoryLabel}</span>
                      <h3 style={{ fontSize: '1.25rem' }}>{p.name}</h3>
                      <p className="product-desc" style={{ fontSize: '0.85rem' }}>
                        {p.desc ? (Array.isArray(p.desc) ? p.desc[0]?.children?.[0]?.text?.slice(0, 80) + '...' : p.desc.replace(/<[^>]*>/g, '').slice(0, 80) + '...') : ''}
                      </p>
                      <div className="product-footer">
                        <div className="product-price">
                          <span className="price-val">{p.price} MAD</span>
                          <span className="price-unit">{p.unit}</span>
                        </div>
                        <button 
                          className="btn btn-primary"
                          style={{ padding: '0.4rem 0.6rem', borderRadius: '4px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p, 1);
                            triggerToast(`${p.name} ajouté au panier !`);
                            setIsCartOpen(true);
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Floating Animation CSS injection */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}} />
      </section>
    );
  }

  return (
    <>
      <section className="section page-transition" style={{ paddingTop: '120px' }}>
        {/* Toast Alert Banner */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'rgba(0, 0, 0, 0.95)',
            color: '#fff',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--accent-cyan)',
            boxShadow: '0 10px 30px rgba(0,245,212,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            zIndex: 1100,
            animation: 'slideIn 0.3s ease forwards',
            fontFamily: 'var(--font-heading)',
            fontWeight: '600'
          }}>
            <CheckCircle size={18} style={{ color: 'var(--accent-cyan)' }} aria-hidden="true" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="container">
          {/* Header */}
          <div className="section-header">
            <span className="section-badge">Boutique en Ligne</span>
            <h1 className="section-title">Produits d'Entretien & Matériel Professionnel</h1>
            <p className="section-desc">
              Commandez nos consommables écologiques et notre équipement de nettoyage certifiés de qualité industrielle. Commande expédiée via WhatsApp en 24/48h.
            </p>
          </div>

          {/* Search, Filter Tools */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%' }}>
              {/* Search */}
              <div style={{ position: 'relative', flexGrow: 1, minWidth: '280px' }}>
                <Search size={16} style={{
                  position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)'
                }} aria-hidden="true" />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Rechercher un produit (ex: détartrant, aspirateur, ouate)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '3rem', width: '100%' }}
                  aria-label="Rechercher un produit"
                />
              </div>

              {/* Sort by */}
              <div style={{ minWidth: '220px' }}>
                <select 
                  className="form-select" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ width: '100%' }}
                  aria-label="Trier les produits"
                >
                  <option value="default">Tri par défaut</option>
                  <option value="price-asc">Prix : croissant</option>
                  <option value="price-desc">Prix : décroissant</option>
                  <option value="rating">Mieux notés</option>
                </select>
              </div>
            </div>

            {/* Filter categories */}
            <div style={{
              display: 'flex',
              gap: '0.6rem',
              flexWrap: 'wrap',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              paddingTop: '1.2rem'
            }} role="tablist" aria-label="Catégories de produits">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  style={{
                    padding: '0.5rem 1.2rem',
                    fontSize: '0.85rem',
                    borderRadius: '30px',
                    borderColor: selectedCategory === cat.id ? 'var(--accent-cyan)' : 'var(--border-color)',
                    background: selectedCategory === cat.id ? 'rgba(0, 245, 212, 0.08)' : 'transparent',
                    color: selectedCategory === cat.id ? 'var(--accent-cyan)' : 'var(--color-text-secondary)',
                    fontWeight: '600'
                  }}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid View */}
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <Loader2 size={40} className="spin-animation" style={{ color: 'var(--accent-cyan)', margin: '0 auto 1rem auto' }} aria-hidden="true" />
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Mise à jour du catalogue en direct depuis Strapi v5...</p>
            </div>
          ) : (
            <div>
              {filteredProducts.length > 0 ? (
                <div className="grid-3">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="glass-panel product-card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="product-img-box">
                        <span style={{ fontSize: '3rem', opacity: 0.5 }} aria-hidden="true">
                          {product.category === 'chemicals' ? '🧪' : product.category === 'equipment' ? '🧹' : '🧻'}
                        </span>
                        {product.isPopular && (
                          <span className="product-tag">Populaire</span>
                        )}
                      </div>
                      
                      <div className="product-info">
                        <span className="product-category">{product.categoryLabel}</span>
                        <h3>{product.name}</h3>
                        <p className="product-desc">
                          {product.desc ? (Array.isArray(product.desc) ? product.desc[0]?.children?.[0]?.text?.slice(0, 90) + '...' : product.desc.replace(/<[^>]*>/g, '').slice(0, 90) + '...') : ''}
                        </p>
                        
                        {/* Star Rating */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem' }}>
                          <Star size={14} fill="#ffb703" stroke="none" aria-hidden="true" />
                          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{product.rating}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>(Avis)</span>
                        </div>

                        <div className="product-footer">
                          <div className="product-price">
                            <span className="price-val">{product.price} MAD</span>
                            <span className="price-unit">{product.unit}</span>
                          </div>
                          <button
                            className="btn btn-primary"
                            style={{ padding: '0.5rem 0.8rem', borderRadius: '6px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, 1);
                              triggerToast(`${product.name} ajouté au panier !`);
                              setIsCartOpen(true);
                            }}
                          >
                            <Plus size={16} />
                            <span>Ajouter</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}>
                  <AlertCircle size={40} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', margin: '0 auto 1rem' }} aria-hidden="true" />
                  <h3>Aucun produit ne correspond à votre recherche</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                    Essayez d'ajuster vos mots-clés ou réinitialisez les catégories de filtres.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .spin-animation {
            animation: spin 1.2s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}} />
      </section>
    </>
  );
}
