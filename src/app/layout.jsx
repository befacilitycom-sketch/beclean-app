import './globals.css';
import '../styles/animations.css';
import { CartProvider } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import ScrollToTop from '../components/ScrollToTop';
import { Outfit, Inter } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beclean.ma';

export const viewport = {
  themeColor: '#00f5d4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: {
    default: 'BeClean | Expert de la Propreté et Produits d\'Hygiène au Maroc',
    template: '%s | BeClean Maroc',
  },
  description: 'Services de nettoyage professionnel, produits d\'hygiène et matériel pour particuliers, entreprises et industries au Maroc. Devis instantané en ligne.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    url: '/',
    title: 'BeClean | Expert de la Propreté et Produits d\'Hygiène au Maroc',
    description: 'Services de nettoyage professionnel, produits d\'hygiène et matériel pour particuliers, entreprises et industries au Maroc. Devis instantané en ligne.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BeClean Maroc — Société de nettoyage professionnelle',
      },
    ],
    locale: 'fr_MA',
    siteName: 'BeClean Maroc',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  keywords: ['nettoyage', 'propreté', 'hygiène', 'maroc', 'casablanca', 'entreprise nettoyage', 'nettoyage industriel'],
  twitter: {
    card: 'summary_large_image',
    title: 'BeClean | Expert de la Propreté et Produits d\'Hygiène au Maroc',
    description: 'Services de nettoyage professionnel, produits d\'hygiène et matériel pour particuliers, entreprises et industries au Maroc.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          {/* Skip to content — keyboard accessibility */}
          <a href="#main-content" className="skip-link">
            Aller au contenu principal
          </a>

          {/* Premium Ambient Background Blur Blobs */}
          <div className="blur-blob blur-blob-1" aria-hidden="true" />
          <div className="blur-blob blur-blob-2" aria-hidden="true" />

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
            <Header />
            <main id="main-content" style={{ flexGrow: 1 }} className="page-transition">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <ScrollToTop />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
