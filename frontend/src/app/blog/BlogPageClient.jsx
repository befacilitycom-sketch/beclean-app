'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BlogCard from '../../components/BlogCard';
import GlowCard from '../../components/GlowCard';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { BookOpen, Search, Loader2, AlertCircle } from 'lucide-react';

const ALL_CATEGORIES = ['Tous', 'Conseils Bureaux', 'Réglementation', 'Chantier & BTP', 'Résidentiel', 'Hygiène'];

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: articles, loading } = useBlogPosts();

  // Filter articles by category and search query
  const filtered = articles.filter(article => {
    const matchesCategory = activeCategory === 'Tous' || article.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      (article.title || '').toLowerCase().includes(q) ||
      (article.summary || article.excerpt || '').toLowerCase().includes(q) ||
      (article.category || '').toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Determine if we should show the featured article layout
  const isDefaultView = activeCategory === 'Tous' && !searchQuery;

  return (
    <>
      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <span className="section-badge">Expertise & Conseils</span>
            <h1 className="section-title">
              Blog BeClean — <span className="text-gradient">Hygiène & Propreté</span>
            </h1>
            <p className="section-desc">
              Nos experts partagent leurs connaissances sur le nettoyage professionnel, la réglementation sanitaire marocaine, et les meilleures pratiques pour maintenir vos locaux impeccables.
            </p>
          </div>

          {/* Search & Filters bar */}
          <div style={{
            display: 'flex',
            gap: '1.2rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            {/* Search input */}
            <div style={{ position: 'relative', flexGrow: 1, minWidth: '260px' }}>
              <Search size={16} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
              }} aria-hidden="true" />
              <input
                type="text"
                className="form-input"
                placeholder="Rechercher un article de blog..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.8rem', width: '100%' }}
                aria-label="Rechercher un article de blog"
              />
            </div>

            {/* Category pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} role="tablist" aria-label="Catégories du blog">
              {ALL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: '30px',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? 'var(--accent-cyan)' : 'var(--border-color)',
                    background: activeCategory === cat ? 'rgba(0,245,212,0.06)' : 'transparent',
                    color: activeCategory === cat ? 'var(--accent-cyan)' : 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0', color: 'var(--color-text-muted)' }}>
              <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true" />
              <span className="sr-only">Chargement des articles...</span>
            </div>
          )}

          {/* Featured Article Layout (Default view only) */}
          {!loading && isDefaultView && filtered.length > 0 && (
            (() => {
              const featured = filtered[0];
              const remaining = filtered.slice(1);
              return (
                <div style={{ marginBottom: '4rem' }}>
                  {/* Link wrapper around the entire card content, now wrapped inside GlowCard */}
                  <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '4rem' }}>
                    <GlowCard 
                      className="featured-blog-panel" 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem',
                        padding: '3rem',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderRadius: '16px'
                      }}
                    >
                      {/* Left: Featured graphic */}
                      <div className="featured-image-container" style={{
                        background: 'linear-gradient(135deg, rgba(0,180,216,0.1) 0%, rgba(0,245,212,0.1) 100%)',
                        borderRadius: '12px',
                        height: '320px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(0,245,212,0.15)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <BookOpen size={90} style={{ color: 'var(--accent-cyan)', opacity: 0.8 }} aria-hidden="true" />
                        <span style={{
                          position: 'absolute',
                          top: '1.5rem',
                          left: '1.5rem',
                          background: 'var(--accent-cyan)',
                          color: '#000',
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          padding: '0.4rem 1rem',
                          borderRadius: '20px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          zIndex: 3
                        }}>
                          À la une
                        </span>
                      </div>

                      {/* Right: Info */}
                      <div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                          <span style={{ color: 'var(--accent-cyan)', fontWeight: '700', textTransform: 'uppercase' }}>{featured.category}</span>
                          <span>•</span>
                          <span>{featured.date || (featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' }) : '')}</span>
                          <span>•</span>
                          <span>{featured.readTime || '5 min'} de lecture</span>
                        </div>
                        <h2 className="featured-title-text" style={{ fontSize: '2.2rem', lineHeight: '1.2', marginBottom: '1.2rem', color: '#fff', transition: 'color var(--transition-fast)' }}>
                          {featured.title}
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', marginBottom: '2rem', fontSize: '1rem' }}>
                          {featured.summary || featured.excerpt || ''}
                        </p>
                        <span className="btn btn-primary" style={{ color: '#000', padding: '0.7rem 1.8rem', display: 'inline-flex' }}>
                          Lire l'Article
                        </span>
                      </div>
                    </GlowCard>
                  </Link>

                  <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>
                    Articles Récents
                  </h3>

                  {remaining.length > 0 ? (
                    <div className="grid-3">
                      {remaining.map(article => (
                        <BlogCard
                          key={article.id || article.slug}
                          article={article}
                        />
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem 0' }}>Aucun autre article disponible pour le moment.</p>
                  )}
                </div>
              );
            })()
          )}

          {/* Standard Grid Layout (When search/category filters are active) */}
          {!loading && !isDefaultView && filtered.length > 0 && (
            <div className="grid-3">
              {filtered.map(article => (
                <BlogCard
                  key={article.id || article.slug}
                  article={article}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-text-muted)' }}>
              <AlertCircle size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} aria-hidden="true" />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Aucun article trouvé</h3>
              <p style={{ fontSize: '0.9rem' }}>Essayez un autre terme de recherche ou une autre catégorie.</p>
              <button
                className="btn btn-secondary"
                style={{ marginTop: '1.5rem' }}
                onClick={() => { setActiveCategory('Tous'); setSearchQuery(''); }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="glass-panel" style={{
            marginTop: '5rem',
            padding: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            background: 'linear-gradient(135deg, rgba(0,180,216,0.05) 0%, rgba(0,245,212,0.05) 100%)',
            border: '1px solid rgba(0,245,212,0.2)',
          }}>
            <div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Un projet de nettoyage en vue ?
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Obtenez un devis personnalisé gratuit en moins de 2 minutes.
              </p>
            </div>
            <Link href="/devis" className="btn btn-primary">
              Calculer mon devis en ligne
            </Link>
          </div>
        </div>
      </section>

      {/* Embedded Modern Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .featured-blog-panel {
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s !important;
        }
        .featured-blog-panel:hover {
          border-color: rgba(0, 245, 212, 0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 245, 212, 0.08) !important;
        }
        .featured-blog-panel:hover .featured-title-text {
          color: var(--accent-cyan) !important;
        }
        @media (max-width: 992px) {
          .featured-image-container {
            height: 220px !important;
          }
        }
      `}} />
    </>
  );
}
