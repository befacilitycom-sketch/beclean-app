import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, ShieldCheck, Truck, Zap, ShoppingBag, ClipboardList } from 'lucide-react';
import { COMPANY_INFO } from '../config/constants';
import CallbackForm from '../components/CallbackForm';
import GlowCard from '../components/GlowCard';
import FadeIn from '../components/FadeIn';
import { api } from '../services/payloadClient';

export const metadata = {
  title: 'BeClean | Société de Nettoyage Professionnel & Vente de Produits au Maroc',
  description: 'BeClean est le partenaire propreté complet au Maroc : nettoyage de bureaux, résidentiel, industriel, désinfection 3D/4D et vente de produits d\'hygiène professionnels. Obtenez un devis gratuit en 2 min !',
  keywords: 'societe de nettoyage Maroc, nettoyage bureaux Casablanca, nettoyage industriel Maroc, nettoyage fin de chantier, produits de nettoyage en gros Maroc, fournisseur materiel de nettoyage Maroc, desinfection hygiene 3D Maroc, BeClean Maroc',
};

export default async function Home() {
  // Fetch from Payload CMS
  const siteSettings = await api.siteSettings() || {};
  const homeData = await api.homePage() || {};
  
  // Fallbacks in case Payload hasn't been seeded yet
  const name = siteSettings.companyName || COMPANY_INFO.name;
  const legalName = siteSettings.legalName || COMPANY_INFO.legalName;
  const phone = siteSettings.phone || COMPANY_INFO.phone;
  const email = siteSettings.email || COMPANY_INFO.email;
  const address = siteSettings.address || COMPANY_INFO.address;
  const socials = siteSettings.socials || COMPANY_INFO.socials;
  const cities = COMPANY_INFO.cities; // Not in global yet, keep constant

  const heroTitle = homeData.hero?.title || "Votre Partenaire Propreté Complet au Maroc";
  const heroSubtitle = homeData.hero?.subtitle || "Protocoles de désinfection certifiés et nettoyage éco-responsable pour vos bureaux et locaux";
  const stats = homeData.stats?.length > 0 ? homeData.stats : [
    { number: '150+', label: 'Clients B2B Actifs' },
    { number: '98%', label: 'Taux de Recommandation' },
    { number: '7', label: 'Villes Couvertes au Maroc' },
    { number: '2h', label: 'Délai d\'Intervention d\'Urgence' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: name,
    legalName: legalName,
    image: 'https://beclean.ma/images/logo-share.png',
    telephone: phone,
    email: email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: 'Casablanca',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.5962,
      longitude: -7.6009,
    },
    url: 'https://beclean.ma',
    sameAs: [
      socials.facebook,
      socials.instagram,
      socials.linkedin,
      socials.youtube,
      socials.twitter,
      socials.tiktok,
    ].filter(Boolean),
    priceRange: '$$',
    areaServed: cities.map(city => ({
      '@type': 'AdministrativeArea',
      name: city,
    })),
  };

  return (
    <>
      {/* JSON-LD Search Engine Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={14} />
                <span>Leader de l'Hygiène & de la Propreté au Maroc</span>
              </div>
              <h1 style={{ fontSize: '3rem', lineHeight: '1.2' }}>
                {heroTitle}
              </h1>
              <p>
                {heroSubtitle}
              </p>
              <div className="hero-buttons">
                <Link href="/devis" className="btn btn-primary">
                  Devis en Ligne Gratuit
                </Link>
                <Link href="/services" className="btn btn-secondary">
                  Découvrir nos Services
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-wrapper" style={{
                background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.1) 0%, rgba(0, 245, 212, 0.05) 100%)',
                border: '1px solid rgba(0, 245, 212, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2.5rem',
                borderRadius: '24px',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                minHeight: '340px'
              }}>
                {/* Visual bubble particle effects for cleaning theme */}
                <div className="bubble-particle" style={{ top: '15%', left: '15%', width: '12px', height: '12px' }}></div>
                <div className="bubble-particle" style={{ top: '25%', right: '15%', width: '8px', height: '8px', animationDelay: '1s' }}></div>
                <div className="bubble-particle" style={{ bottom: '20%', left: '20%', width: '16px', height: '16px', animationDelay: '1.5s' }}></div>
                <div className="bubble-particle" style={{ bottom: '30%', right: '25%', width: '10px', height: '10px', animationDelay: '0.5s' }}></div>

                {/* Central Circle with Sparkles & Shield */}
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 245, 212, 0.2) 0%, rgba(0, 180, 216, 0.05) 70%)',
                  border: '1px solid rgba(0, 245, 212, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '0 0 30px rgba(0, 245, 212, 0.2)'
                }}>
                  <ShieldCheck size={44} style={{ color: 'var(--accent-cyan)' }} />
                </div>

                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', textAlign: 'center', fontFamily: 'var(--font-heading)', color: '#fff', letterSpacing: '1px' }}>
                  Pureté & Protection
                </h3>
                <div style={{ width: '40px', height: '3px', background: 'var(--accent-cyan)', margin: '0.8rem auto', borderRadius: '2px' }}></div>
                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: '0.5rem', maxWidth: '300px', lineHeight: '1.6', fontWeight: '400' }}>
                  {heroSubtitle}
                </p>

                {/* Floating details cards - styled smaller and more elegant */}
                <div className="glass-panel floating-card floating-card-1" style={{ display: 'flex', gap: '0.6rem', padding: '0.6rem 1rem', alignItems: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 245, 212, 0.2)' }}>
                  <Zap size={16} style={{ color: 'var(--accent-cyan)' }} />
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff' }}>Devis Gratuit</h5>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>Simulateur instantané</p>
                  </div>
                </div>

                <div className="glass-panel floating-card floating-card-2" style={{ display: 'flex', gap: '0.6rem', padding: '0.6rem 1rem', alignItems: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 245, 212, 0.2)' }}>
                  <ShieldCheck size={15} style={{ color: 'var(--accent-blue)' }} />
                  <div>
                    <h5 style={{ fontSize: '0.78rem', fontWeight: '700' }}>100% Déclaré CNSS</h5>
                    <p style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Filiale BeFacility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Pillars Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-badge">Notre Approche</span>
              <h2 className="section-title">Les 3 Piliers BeClean</h2>
              <p className="section-desc">
                Nous réinventons le secteur du nettoyage professionnel au Maroc en proposant une offre intégrée unique sur le marché.
              </p>
            </div>
          </FadeIn>

          <div className="grid-3">
            {/* Pillar 1 */}
            <FadeIn delay={100}>
              <GlowCard style={{ padding: '3rem 2rem', textAlign: 'center', height: '100%' }}>
                <div className="service-icon-box" style={{ margin: '0 auto 1.5rem auto' }}>
                  <Sparkles size={28} />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>1. Prestations de Nettoyage</h3>
                <p style={{ fontSize: '0.95rem' }}>
                  Des agents d'entretien hautement qualifiés et encadrés pour vos bureaux, locaux industriels, fins de chantiers, résidences et traitements 3D/4D contre les nuisibles.
                </p>
              </GlowCard>
            </FadeIn>

            {/* Pillar 2 */}
            <FadeIn delay={200}>
              <GlowCard style={{ padding: '3rem 2rem', textAlign: 'center', height: '100%' }}>
                <div className="service-icon-box" style={{ margin: '0 auto 1.5rem auto' }}>
                  <ShoppingBag size={28} />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>2. Boutique Produits & Matériel</h3>
                <p style={{ fontSize: '0.95rem' }}>
                  Achat en ligne ou formule abonnement de consommables d'hygiène, produits d'entretien certifiés, et équipements professionnels de nettoyage avec livraison partout au Maroc.
                </p>
              </GlowCard>
            </FadeIn>

            {/* Pillar 3 */}
            <FadeIn delay={300}>
              <GlowCard style={{ padding: '3rem 2rem', textAlign: 'center', height: '100%' }}>
                <div className="service-icon-box" style={{ margin: '0 auto 1.5rem auto' }}>
                  <ClipboardList size={28} />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>3. Gestion 100% Digitale</h3>
                <p style={{ fontSize: '0.95rem' }}>
                  Devis automatisé instantané, calendrier de réservation, suivi en temps réel des interventions, et espace client professionnel sécurisé pour centraliser contrats et factures.
                </p>
              </GlowCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <FadeIn delay={100}>
              <span className="section-badge">Pourquoi BeClean ?</span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>
                L'excellence opérationnelle et légale au service de vos locaux
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '0.3rem' }}>Conformité Légale & Sociale</h4>
                    <p style={{ fontSize: '0.95rem' }}>Tous nos agents de nettoyage sont formés aux règles de sécurité, déclarés à la CNSS et assurés contre les accidents du travail. Zéro risque juridique pour vous.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '0.3rem' }}>Disponibilité 7j/7 & Urgences</h4>
                    <p style={{ fontSize: '0.95rem' }}>Parce que la propreté n'attend pas, nos équipes interviennent de jour comme de nuit, le week-end, et proposent un service d'urgence en moins de 2 heures.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '0.3rem' }}>Approche Éco-responsable</h4>
                    <p style={{ fontSize: '0.95rem' }}>Nous favorisons l'usage de produits d'entretien écologiques biodégradables (éco-labellisés) pour préserver la santé de vos collaborateurs et l'environnement.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="glass-panel interactive-scale" style={{ padding: '3rem', border: '1px solid rgba(0, 245, 212, 0.15)' }}>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', textAlign: 'center' }}>Demande de Rappel Commercial</h3>
                <p style={{ fontSize: '0.9rem', textAlign: 'center', marginBottom: '2rem' }}>
                  Entrez vos coordonnées et notre service commercial vous recontactera sous 30 minutes pour étudier votre besoin.
                </p>
                <CallbackForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>



      {/* Moroccan Coverage Stats */}
      <section className="section" style={{ paddingBottom: '0.5rem', paddingTop: '1rem' }}>
        <div className="container">
          <FadeIn>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              width: '100%'
            }}>
              {stats.map((stat, i) => (
                <div key={i} className="glass-panel interactive-scale" style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(0, 245, 212, 0.1)' }}>
                  <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>{stat.number}</h2>
                  <p style={{ color: 'var(--color-text-secondary)', fontWeight: '600', marginTop: '0.5rem', fontSize: '0.95rem' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
