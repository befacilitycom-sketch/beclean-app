import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';

// Helper to extract image URL from Payload upload objects or plain strings
function getMediaURL(image) {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (image.url) return image.url;
  return '';
}

/**
 * BlogCard - Carte d'article de blog réutilisable en Next.js
 */
export default function BlogCard({ article }) {
  const {
    title,
    slug,
    summary,
    excerpt,
    date,
    publishedAt,
    category,
    readTime,
    image,
  } = article;

  // Normalisation : Payload utilise publishedAt, statique utilise date
  const displayDate = date || (publishedAt
    ? new Date(publishedAt).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })
    : '');

  const displayExcerpt = summary || excerpt || '';

  const imageUrl = getMediaURL(image);

  // Catégorie couleur
  const categoryColors = {
    'Conseils Bureaux': { bg: 'rgba(0, 180, 216, 0.1)', text: 'var(--accent-blue)' },
    'Réglementation': { bg: 'rgba(114, 9, 183, 0.1)', text: '#b5a5f5' },
    'Chantier & BTP': { bg: 'rgba(0, 245, 212, 0.1)', text: 'var(--accent-cyan)' },
    'Résidentiel': { bg: 'rgba(255, 183, 3, 0.1)', text: '#ffb703' },
    'Hygiène': { bg: 'rgba(255, 77, 77, 0.1)', text: '#ff6b6b' },
  };
  const catStyle = categoryColors[category] || { bg: 'rgba(148, 163, 184, 0.1)', text: 'var(--color-text-secondary)' };

  return (
    <Link
      href={`/blog/${slug}`}
      className="glass-panel"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        height: '100%',
        textDecoration: 'none'
      }}
    >
      {/* Image ou Placeholder */}
      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.08) 0%, rgba(0, 245, 212, 0.05) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-color)',
      }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.4 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📰</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Article BeClean</span>
          </div>
        )}

        {/* Catégorie Badge */}
        <span style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: catStyle.bg,
          color: catStyle.text,
          fontSize: '0.72rem',
          fontWeight: '700',
          padding: '0.3rem 0.8rem',
          borderRadius: '20px',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${catStyle.text}33`,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {category}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem' }}>
          {displayDate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              <Clock size={12} />
              {displayDate}
            </span>
          )}
          {readTime && (
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              · {readTime} de lecture
            </span>
          )}
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.8rem', lineHeight: '1.4', flexGrow: 0, color: '#fff' }}>
          {title}
        </h3>

        <p style={{ fontSize: '0.88rem', lineHeight: '1.65', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>
          {displayExcerpt.length > 130 ? displayExcerpt.slice(0, 130) + '…' : displayExcerpt}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--accent-cyan)',
          fontSize: '0.85rem',
          fontWeight: '600',
          marginTop: 'auto',
        }}>
          Lire l'article
          <ArrowRight size={15} />
        </div>
      </div>
    </Link>
  );
}
