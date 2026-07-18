import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, MessageCircle, Calculator } from 'lucide-react';
import SafeBlocksRenderer from '../../../components/SafeBlocksRenderer';
import { BLOG_ARTICLES, COMPANY_INFO } from '../../../config/constants';
import { api } from '../../../services/payloadClient';

// Helper to extract a media URL from Payload upload objects
function getMediaURL(image) {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (image.url) return image.url;
  return '';
}

// Helper to fetch single article data with automated static fallback
async function getArticleData(slug) {
  try {
    const article = await api.blogPostBySlug(slug);
    if (article) return article;
  } catch (err) {
    console.warn(`[BlogPost SSR] Payload offline/unreachable for slug "${slug}". Using local static fallback.`);
  }
  return BLOG_ARTICLES.find(a => a.slug === slug);
}

// Helper to fetch all articles for sidebar / related posts
async function getAllArticles() {
  try {
    const articles = await api.blogPosts();
    if (articles && articles.length > 0) return articles;
  } catch (err) {
    // fallback
  }
  return BLOG_ARTICLES;
}

// Dynamic SEO metadata generation for search engine indexation (Google SEO friendly)
export async function generateMetadata({ params }) {
  const article = await getArticleData(params.slug);
  if (!article) {
    return {
      title: 'Article Non Trouvé | BeClean Blog',
    };
  }
  return {
    title: `${article.title} | BeClean Blog`,
    description: article.summary || article.excerpt || 'Article de blog BeClean Maroc sur l\'hygiène et la propreté professionnelle.',
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary || article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt || undefined,
    },
  };
}

/**
 * Minimal markdown-like renderer for article content
 * Handles **bold**, headers (lines starting with #), bullet lists, and tables
 */
function renderContent(content) {
  if (!content) return null;
  if (Array.isArray(content)) {
    return <SafeBlocksRenderer content={content} />;
  }

  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (!line.trim()) {
      i++;
      continue;
    }

    // H2 (##)
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{ fontSize: '1.5rem', fontWeight: '700', margin: '2rem 0 1rem', color: 'var(--color-text-primary)' }}>
          {line.replace('## ', '')}
        </h2>
      );
      i++;
      continue;
    }

    // H3 (###)
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{ fontSize: '1.2rem', fontWeight: '700', margin: '1.5rem 0 0.8rem', color: 'var(--accent-cyan)' }}>
          {line.replace('### ', '')}
        </h3>
      );
      i++;
      continue;
    }

    // Bold headers (**text**)
    if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(
        <h4 key={i} style={{ fontSize: '1.05rem', fontWeight: '700', margin: '1.5rem 0 0.6rem', color: 'var(--color-text-primary)' }}>
          {line.slice(2, -2)}
        </h4>
      );
      i++;
      continue;
    }

    // Table row (|---|)
    if (line.startsWith('|') && line.includes('|---|')) {
      // Skip separator row
      i++;
      continue;
    }

    // Table header
    if (line.startsWith('|') && lines[i + 1] && lines[i + 1].includes('|---|')) {
      const headers = line.split('|').filter(Boolean).map(h => h.trim());
      const tableRows = [];
      let j = i + 2;
      while (j < lines.length && lines[j].startsWith('|')) {
        const cells = lines[j].split('|').filter(Boolean).map(c => c.trim());
        tableRows.push(cells);
        j++;
      }
      elements.push(
        <div key={i} style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr>
                {headers.map((h, hi) => (
                  <th key={hi} style={{ padding: '0.8rem 1rem', borderBottom: '2px solid var(--border-color)', textAlign: 'left', color: 'var(--accent-cyan)', fontWeight: '700' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '0.7rem 1rem', borderBottom: '1px solid var(--border-color)', color: 'var(--color-text-secondary)' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      i = j;
      continue;
    }

    // Bullet list (- item or 1. item)
    if (line.startsWith('- ') || /^\d+\. /.test(line)) {
      const listItems = [];
      let j = i;
      while (j < lines.length && (lines[j].startsWith('- ') || /^\d+\. /.test(lines[j]))) {
        const text = lines[j].replace(/^- /, '').replace(/^\d+\. /, '');
        listItems.push(renderInline(text, j));
        j++;
      }
      elements.push(
        <ul key={i} style={{ listStyle: 'none', margin: '0.8rem 0 1.2rem', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {listItems.map((item, idx) => (
            <li key={idx} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              <span style={{ color: 'var(--accent-cyan)', marginTop: '0.3rem', fontSize: '0.7rem', flexShrink: 0 }}>◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      i = j;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
        {renderInline(line, i)}
      </p>
    );
    i++;
  }

  return elements;
}

// Render inline **bold**
function renderInline(text, key) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} style={{ color: 'var(--color-text-primary)', fontWeight: '700' }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default async function BlogPost({ params }) {
  const article = await getArticleData(params.slug);

  if (!article) {
    return (
      <section className="section" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <div className="container">
          <h2>Article non trouvé</h2>
          <Link href="/blog" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Retour au Blog
          </Link>
        </div>
      </section>
    );
  }

  const articles = await getAllArticles();

  const { title, slug, summary, excerpt, content, date, publishedAt, category, readTime, image } = article;
  const displayDate = date || (publishedAt
    ? new Date(publishedAt).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })
    : '');
  const displayExcerpt = summary || excerpt || '';
  const imageUrl = getMediaURL(image);

  // Related articles (same category, exclude current)
  const related = articles
    .filter(a => a.category === category && a.slug !== slug)
    .slice(0, 2);

  const whatsappClean = COMPANY_INFO.whatsapp.replace('+', '').replace(/\s/g, '');
  const whatsappHref = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(`Bonjour BeClean, j'ai lu votre article "${title}" et je souhaiterais obtenir des informations.`)}`;

  return (
    <>
      <section style={{ paddingTop: '120px', paddingBottom: '5rem' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }} aria-label="Fil d'Ariane">
            <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Accueil
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>{category}</span>
          </nav>

          <div className="blog-layout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '4rem', alignItems: 'start' }}>
            {/* Main Article */}
            <article>
              {/* Back button */}
              <Link
                href="/blog"
                className="btn btn-secondary"
                style={{ marginBottom: '2rem', fontSize: '0.85rem', display: 'inline-flex', gap: '0.4rem', padding: '0.6rem 1.2rem', alignItems: 'center' }}
              >
                <ArrowLeft size={15} aria-hidden="true" />
                <span>Retour au Blog</span>
              </Link>

              {/* Article Image Banner */}
              {imageUrl && (
                <div style={{
                  width: '100%',
                  height: '380px',
                  maxHeight: '40vh',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '2.5rem',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative'
                }}>
                  <Image 
                    src={imageUrl} 
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 850px"
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
              )}

              {/* Category & Meta */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span style={{
                  background: 'rgba(0,245,212,0.08)',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(0,245,212,0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {category}
                </span>
                {displayDate && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    <Calendar size={13} aria-hidden="true" />
                    {displayDate}
                  </span>
                )}
                {readTime && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    <Clock size={13} aria-hidden="true" />
                    {readTime} de lecture
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 style={{ fontSize: '2.4rem', lineHeight: '1.2', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>
                {title}
              </h1>

              {/* Excerpt */}
              {displayExcerpt && (
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: 'var(--color-text-primary)',
                  borderLeft: '3px solid var(--accent-cyan)',
                  paddingLeft: '1.5rem',
                  marginBottom: '2.5rem',
                  fontStyle: 'italic',
                }}>
                  {displayExcerpt}
                </p>
              )}

              {/* Article Content */}
              <div style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                {renderContent(content)}
              </div>

              {/* Article Footer CTA */}
              <div className="glass-panel" style={{
                marginTop: '3rem',
                padding: '2rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                background: 'linear-gradient(135deg, rgba(0,180,216,0.05) 0%, rgba(0,245,212,0.05) 100%)',
                border: '1px solid rgba(0,245,212,0.2)',
              }}>
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: '#fff' }}>Besoin d'un devis personnalisé ?</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>Calculez votre tarif en 2 minutes avec notre simulateur gratuit.</p>
                </div>
                <Link href="/devis" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#000' }}>
                  <Calculator size={16} aria-hidden="true" />
                  <span>Devis Gratuit</span>
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '100px' }}>
              {/* Related Articles */}
              {related.length > 0 && (
                <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <h4 style={{ marginBottom: '1.2rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.82rem' }}>
                    Articles liés
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {related.map(rel => (
                      <Link
                        key={rel.slug}
                        href={`/blog/${rel.slug}`}
                        style={{ cursor: 'pointer', textDecoration: 'none' }}
                      >
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', display: 'block', marginBottom: '0.3rem' }}>{rel.category}</span>
                        <h5 style={{ fontSize: '0.9rem', fontWeight: '600', lineHeight: '1.4', color: 'var(--color-text-primary)', transition: 'color 0.2s' }} className="related-link-title">{rel.title}</h5>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* WhatsApp CTA */}
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: '#fff' }}>Une question ?</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.2rem' }}>
                  Nos experts BeClean répondent à vos questions sur WhatsApp en moins de 30 minutes.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', display: 'flex', gap: '0.5rem', border: '1px solid #25d366', color: '#25d366', justifyContent: 'center' }}
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </aside>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .related-link-title:hover {
            color: var(--accent-cyan) !important;
          }
          @media (max-width: 992px) {
            .blog-layout-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}} />
      </section>
    </>
  );
}

// Generate static params for static exports at build time
export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}
