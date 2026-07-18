export default function manifest() {
  return {
    name: 'BeClean Facility Group',
    short_name: 'BeClean',
    description: 'Services de nettoyage professionnel B2B, produits d\'hygiène et désinfection au Maroc.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050811',
    theme_color: '#00f5d4',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
  }
}
