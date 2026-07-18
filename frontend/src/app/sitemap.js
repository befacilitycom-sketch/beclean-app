import { BLOG_ARTICLES } from '../config/constants';

export default async function sitemap() {
  const baseUrl = 'https://beclean.ma';

  const staticUrls = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/boutique`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/devis`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
  ];

  const blogUrls = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt || new Date()),
  }));

  return [...staticUrls, ...blogUrls];
}
