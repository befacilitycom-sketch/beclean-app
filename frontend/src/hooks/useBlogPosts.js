import { useState, useEffect } from 'react';
import { usePayloadData } from './usePayloadData';
import { api } from '../services/payloadClient';
import { BLOG_ARTICLES } from '../config/constants';

/**
 * useBlogPosts - Récupère la liste des articles depuis Payload CMS avec fallback statique
 */
export const useBlogPosts = (limit = null) => {
  const fallback = limit ? BLOG_ARTICLES.slice(0, limit) : BLOG_ARTICLES;

  return usePayloadData(
    () => api.blogPosts(),
    fallback,
    [limit]
  );
};

/**
 * useBlogPost - Récupère un article unique par son slug
 */
export const useBlogPost = (slug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    const fetchPost = async () => {
      setLoading(true);

      try {
        const result = await api.blogPostBySlug(slug);
        if (!cancelled && result) {
          setData(result);
        } else {
          // Fallback sur données statiques
          const staticPost = BLOG_ARTICLES.find(a => a.slug === slug);
          if (!cancelled) setData(staticPost || null);
        }
      } catch {
        if (!cancelled) {
          const staticPost = BLOG_ARTICLES.find(a => a.slug === slug);
          setData(staticPost || null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPost();
    return () => { cancelled = true; };
  }, [slug]);

  return { data, loading, error };
};
