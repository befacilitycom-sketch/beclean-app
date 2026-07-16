'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home, Briefcase, Factory, HardHat, ShieldAlert, Calendar,
  Trees, Key, Wrench, Sparkles, Search, X, CheckCircle,
  ArrowRight, Phone, MessageCircle, AlertCircle, Loader2
} from 'lucide-react';
import SafeBlocksRenderer from '../../components/SafeBlocksRenderer';
import { useServices } from '../../hooks/useServices';

const ICON_MAP = {
  Home, Briefcase, Factory, HardHat, ShieldAlert, Calendar,
  Trees, Key, Wrench, Sparkles,
};

export default function ServicesPageClient() {
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: services, loading } = useServices();

  const renderIcon = (iconName) => {
    const IconComponent = ICON_MAP[iconName] || Sparkles;
    return <IconComponent size={28} aria-hidden="true" />;
  };

  const tabs = [
    { id: 'all', label: 'Tous les services' },
    { id: 'b2b', label: 'Entreprises & B2B' },
    { id: 'b2c', label: 'Particuliers & B2C' },
    { id: 'specialized', label: 'Technique & Spécialisé' }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem', paddingTop: '120px' }}>
        <Loader2 className="animate-spin" size={40} style={{ color: 'var(--accent-cyan)' }} />
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Chargement des prestations...</p>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}} />
      </div>
    );
  }

  const filteredServices = services.filter(service => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      (service.title || '').toLowerCase().includes(q) ||
      (service.shortDesc || '').toLowerCase().includes(q) ||
      (service.features || []).some(f => f.toLowerCase().includes(q));

    const matchesTab = activeTab === 'all' || service.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <>
      <section className="section page-transition" style={{ paddingTop: '120px' }}>
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <span className="section-badge">Nos Prestations</span>
            <h1 className="section-title">Solutions Professionnelles de Nettoyage & d'Hygiène</h1>
            <p className="section-desc">
              Particuliers, syndics, commerces ou industries : BeClean déploie des équipes expertes équipées de technologies de pointe pour garantir la pureté de vos espaces partout au Maroc.
            </p>
          </div>

          {/* Search, Filter Tools */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            {/* Search Input */}
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
                placeholder="Rechercher une prestation, mot-clé, tâche..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.8rem', width: '100%' }}
                aria-label="Rechercher une prestation"
              />
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} role="tablist" aria-label="Filtres de prestations">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: '30px',
                    border: '1px solid',
                    borderColor: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--border-color)',
                    background: activeTab === tab.id ? 'rgba(0, 245, 212, 0.06)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          {filteredServices.length > 0 ? (
            <div className="grid-3">
              {filteredServices.map((service) => (
                <div key={service.id} className="glass-panel service-card" style={{ transition: 'all 0.3s ease' }}>
                  <div className="service-icon-box">
                    {renderIcon(service.icon)}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.shortDesc}</p>
                  
                  <ul className="service-features-list">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i}>
                        <CheckCircle size={14} aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="service-card-footer">
                    <div className="starting-price">
                      Tarif indicatif<br />
                      <span>{service.baseRate} MAD/m²</span>
                    </div>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
                      onClick={() => setSelectedService(service)}
                    >
                      Détails & Protocole
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}>
              <AlertCircle size={40} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', margin: '0 auto 1rem' }} aria-hidden="true" />
              <h3>Aucune prestation ne correspond à votre recherche</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                Essayez d'utiliser des termes plus larges ou réinitialisez les filtres.
              </p>
            </div>
          )}

          {/* CTA Banner */}
          <div className="glass-panel" style={{
            marginTop: '5rem',
            padding: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.05) 0%, rgba(0, 245, 212, 0.05) 100%)',
            border: '1px solid rgba(0, 245, 212, 0.2)'
          }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Besoin d'un devis sur-mesure pour vos locaux ?</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Obtenez un chiffrage instantané en renseignant votre surface et la fréquence souhaitée.</p>
            </div>
            <Link href="/devis" className="btn btn-primary">
              Calculer mon devis en 2 min
            </Link>
          </div>
        </div>

        {/* Service Protocol Details Modal */}
        {selectedService && (
          <div className="modal-overlay" onClick={() => setSelectedService(null)}>
            <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedService(null)} aria-label="Fermer la modale">
                <X size={24} aria-hidden="true" />
              </button>
              
              <div className="modal-header-flex">
                <div className="service-icon-box" style={{ marginBottom: 0 }}>
                  {renderIcon(selectedService.icon)}
                </div>
                <h2 style={{ fontSize: '1.8rem' }}>{selectedService.title}</h2>
              </div>
              
              <div style={{ fontSize: '1.05rem', color: 'var(--color-text-primary)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                <SafeBlocksRenderer content={selectedService.desc} />
              </div>

              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                Ce qui est inclus dans le protocole BeClean :
              </h4>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                {selectedService.features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: 'var(--color-text-secondary)' }}>
                    <CheckCircle size={18} style={{ color: 'var(--accent-cyan)', marginTop: '0.15rem', flexShrink: 0 }} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="modal-footer-flex">
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Tarif indicatif de base</span>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--accent-cyan)' }}>{selectedService.baseRate} MAD <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>/ m²</span></h3>
                </div>
                <div className="modal-footer-buttons">
                  <button className="btn btn-secondary" onClick={() => setSelectedService(null)}>Fermer</button>
                  <Link 
                    href="/devis"
                    className="btn btn-primary"
                    onClick={() => setSelectedService(null)}
                  >
                    Estimer ce Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
