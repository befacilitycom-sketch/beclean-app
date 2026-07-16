import { PRODUCTS, SERVICES, BLOG_ARTICLES } from '../config/constants';

// Determine URL based on environment (Server vs Client)
// On the server, we want to communicate locally (localhost:3000) to bypass DNS/SSL hairpin issues.
const tenant = process.env.NEXT_PUBLIC_TENANT || 'beclean';
const isServer = typeof window === 'undefined';
const siteUrl = isServer 
  ? (process.env.INTERNAL_URL || 'http://localhost:3000') 
  : (process.env.NEXT_PUBLIC_SITE_URL || '');

// Helper to construct query strings safely
function buildQueryString(params) {
  const searchParams = new URLSearchParams();
  
  // Add default tenant filter if none is specified
  searchParams.append('where[tenant][equals]', tenant);
  
  // Standard limit to fetch all records
  searchParams.append('limit', '100');
  
  // Handle other custom filters
  Object.entries(params).forEach(([key, val]) => {
    if (key === 'slug') {
      searchParams.append('where[slug][equals]', val);
    } else if (key === 'category') {
      searchParams.append('where[category][equals]', val);
    } else if (key === 'isActive') {
      searchParams.append('where[isActive][equals]', val ? 'true' : 'false');
    }
  });

  return searchParams.toString();
}

export async function payloadGet(collection, params = {}) {
  const query = buildQueryString(params);
  const url = `${siteUrl}/api/${collection}?${query}`;
  
  // AbortController to prevent build hangs if server is unreachable
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Payload HTTP Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[Payload Client] Failed to fetch collection "${collection}" from "${url}":`, err.message);
    return { docs: null };
  }
}

export async function payloadGetGlobal(slug) {
  const url = `${siteUrl}/api/globals/${slug}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Payload Global Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[Payload Client] Failed to fetch global "${slug}":`, err.message);
    return null;
  }
}

// Normalize Payload documents structure to be compatible with our frontend components
export function normalizePayloadResponse(response, fallback = []) {
  if (!response || !response.docs || response.docs.length === 0) {
    return fallback;
  }
  
  // Payload returns a direct array of documents inside .docs
  return response.docs.map(doc => {
    // In Payload, upload relationship fields like `image` are returned as objects: { url: '...', alt: '...' }
    let imageUrl = '';
    if (doc.image) {
      if (typeof doc.image === 'string') {
        imageUrl = doc.image;
      } else if (doc.image.url) {
        imageUrl = doc.image.url;
      }
    }
    
    // Return the flattened document
    return {
      ...doc,
      // Map features array of objects to plain text string array
      features: Array.isArray(doc.features) 
        ? doc.features.map(f => typeof f === 'string' ? f : f.text) 
        : doc.features || [],
      // Ensure image URL is extracted
      image: imageUrl || doc.image || '',
    };
  });
}

export const api = {
  siteSettings: async () => {
    return await payloadGetGlobal('site-settings');
  },
  homePage: async () => {
    return await payloadGetGlobal('home-page');
  },
  services: async () => {
    const res = await payloadGet('services', { isActive: true });
    return normalizePayloadResponse(res, SERVICES);
  },
  products: async (category = 'all') => {
    const filter = {};
    if (category !== 'all') {
      filter.category = category;
    }
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
    
    const match = docs.find(p => p.slug === slug);
    if (!match) {
      return BLOG_ARTICLES.find(p => p.slug === slug) || null;
    }
    return match;
  }
};
