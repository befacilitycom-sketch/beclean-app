import { PRODUCTS, SERVICES, BLOG_ARTICLES } from '../config/constants.js';

/**
 * Payload CMS API Client — Frontend Only
 *
 * In Docker: server-side fetches go directly to the backend container
 * via http://beclean-backend:3000 (Docker internal network)
 *
 * Client-side fetches use the public backend URL via NEXT_PUBLIC_API_URL
 */
const isServer = typeof window === 'undefined';

const tenant = process.env.NEXT_PUBLIC_TENANT || 'beclean';

const apiUrl = isServer
  ? (process.env.PAYLOAD_API_URL || 'http://beclean-backend:3000')   // Docker internal
  : (process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.137:8091'); // Public access

function buildQueryString(params) {
  const searchParams = new URLSearchParams();
  searchParams.append('where[tenant][equals]', tenant);
  searchParams.append('limit', '100');

  Object.entries(params).forEach(([key, val]) => {
    if (key === 'slug') searchParams.append('where[slug][equals]', val);
    else if (key === 'category') searchParams.append('where[category][equals]', val);
    else if (key === 'isActive') searchParams.append('where[isActive][equals]', val ? 'true' : 'false');
  });

  return searchParams.toString();
}

export async function payloadGet(collection, params = {}) {
  const query = buildQueryString(params);
  const url = `${apiUrl}/api/${collection}?${query}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[API] Failed to fetch "${collection}":`, err.message);
    return { docs: null };
  }
}

export async function payloadGetGlobal(slug) {
  const url = `${apiUrl}/api/globals/${slug}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[API] Failed to fetch global "${slug}":`, err.message);
    return null;
  }
}

export function normalizePayloadResponse(response, fallback = []) {
  if (!response || !response.docs || response.docs.length === 0) return fallback;
  return response.docs.map(doc => {
    let imageUrl = '';
    if (doc.image) {
      if (typeof doc.image === 'string') imageUrl = doc.image;
      else if (doc.image.url) imageUrl = doc.image.url;
    }
    return {
      ...doc,
      features: Array.isArray(doc.features)
        ? doc.features.map(f => typeof f === 'string' ? f : f.text)
        : doc.features || [],
      image: imageUrl || doc.image || '',
    };
  });
}

export const api = {
  siteSettings: () => payloadGetGlobal('site-settings'),
  homePage: () => payloadGetGlobal('home-page'),
  services: async () => {
    const res = await payloadGet('services', { isActive: true });
    return normalizePayloadResponse(res, SERVICES);
  },
  products: async (category = 'all') => {
    const filter = category !== 'all' ? { category } : {};
    const res = await payloadGet('products', filter);
    return normalizePayloadResponse(res, PRODUCTS);
  },
  blogPosts: async () => {
    const res = await payloadGet('blog-posts');
    return normalizePayloadResponse(res, BLOG_ARTICLES);
  },
  blogPostBySlug: async (slug) => {
    const res = await payloadGet('blog-posts', { slug });
    const docs = normalizePayloadResponse(res, BLOG_ARTICLES);
    return docs.find(p => p.slug === slug) || BLOG_ARTICLES.find(p => p.slug === slug) || null;
  },
};
