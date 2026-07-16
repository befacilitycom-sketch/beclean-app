'use client';

import React, { useState } from 'react';
import { 
  Trophy, Users, Landmark, Map, Calendar,
  ShieldCheck, Heart, Sparkles, CheckCircle2, ChevronRight, Award
} from 'lucide-react';

export default function AboutStatsAndValues() {
  const [activeTab, setActiveTab] = useState('values');

  const stats = [
    {
      val: "10+",
      label: "Années d'Expérience",
      desc: "Au service de la performance immobilière au Maroc.",
      icon: Trophy,
      color: "var(--accent-cyan)"
    },
    {
      val: "1 500+",
      label: "Collaborateurs Déclarés",
      desc: "Des agents de propreté formés, déclarés et valorisés.",
      icon: Users,
      color: "var(--accent-blue)"
    },
    {
      val: "500+",
      label: "Clients Corporate",
      desc: "De la PME locale aux multinationales de Casablanca Finance City.",
      icon: Landmark,
      color: "#a2d2ff"
    },
    {
      val: "7",
      label: "Villes du Royaume",
      desc: "Casablanca, Rabat, Marrakech, Tanger, Agadir, Fès, Kénitra.",
      icon: Map,
      color: "#ff865e"
    }
  ];

  const timeline = [
    {
      year: "2016",
      title: "Fondation de BeFacility",
      desc: "Création du pôle d'ingénierie et de Facility Management à Casablanca pour gérer l'exploitation technique des immeubles tertiaires."
    },
    {
      year: "2019",
      title: "Lancement de BeClean",
      desc: "Face à la demande croissante en Soft Services, création de la filiale propreté, hygiène et distribution de consommables sanitaires."
    },
    {
      year: "2021",
      title: "Déploiement National",
      desc: "Expansion de nos équipes mobiles de nettoyage industriel et régulier dans toutes les grandes villes du Royaume (Tanger, Agadir, Marrakech)."
    },
    {
      year: "2023",
      title: "Pôles Spécialisés BeSafe & BeNext",
      desc: "Lancement des filiales sécurité (BeSafe) et transition digitale/Smart Building (BeNext) pour une offre à 360° unique au Maroc."
    },
    {
      year: "2026",
      title: "Consolidation & Certification",
      desc: "Positionnement comme premier opérateur marocain de Facility Management intégré, alliant propreté de précision et tech."
    }
  ];

  const values = [
    {
      title: "Rigueur & Conformité",
      desc: "Nous appliquons des protocoles d'hygiène stricts et veillons au respect total de la législation sociale (CNSS, AMO) pour nos équipes.",
      icon: ShieldCheck,
      color: "var(--accent-cyan)"
    },
    {
      title: "Excellence Opérationnelle",
      desc: "Chaque prestation est pilotée avec rigueur et fait l'objet d'audits qualité réguliers pour garantir un niveau de service irréprochable.",
      icon: Award,
      color: "#ffb703"
    },
    {
      title: "Capital Humain",
      desc: "Nos collaborateurs sont au cœur de notre réussite. Nous assurons des formations régulières et une valorisation constante de nos métiers.",
      icon: Heart,
      color: "#ff865e"
    },
    {
      title: "Innovation & Écologie",
      desc: "Utilisation de machines basse consommation, de produits écologiques éco-labellisés et de solutions digitales pour le suivi qualité.",
      icon: Sparkles,
      color: "var(--accent-blue)"
    },
    {
      title: "Proximité & Flexibilité",
      desc: "Un interlocuteur unique dédié et une réactivité sous 2 heures en cas de besoin ou d'intervention d'urgence.",
      icon: CheckCircle2,
      color: "#c8b6ff"
    }
  ];

  return (
    <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>
      {/* Tabs Selector */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '0.8rem', 
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => setActiveTab('values')}
          className={`btn ${activeTab === 'values' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ color: activeTab === 'values' ? '#000' : 'inherit', fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
        >
          Nos Valeurs Fondatrices
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`btn ${activeTab === 'stats' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ color: activeTab === 'stats' ? '#000' : 'inherit', fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
        >
          Notre Groupe en Chiffres
        </button>
        <button 
          onClick={() => setActiveTab('timeline')}
          className={`btn ${activeTab === 'timeline' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ color: activeTab === 'timeline' ? '#000' : 'inherit', fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
        >
          Notre Histoire & Jalons
        </button>
      </div>

      {/* Tab Contents */}
      <div className="tab-container" style={{ minHeight: '320px' }}>
        
        {/* STATS CONTENT */}
        {activeTab === 'stats' && (
          <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', animation: 'fadeIn 0.4s ease' }}>
            {stats.map((st, i) => {
              const IconComp = st.icon;
              return (
                <div 
                  key={i} 
                  className="glass-panel" 
                  style={{ 
                    padding: '2.5rem 1.8rem', 
                    textAlign: 'center',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    borderBottom: `2px solid ${st.color}`
                  }}
                >
                  <div 
                    className="service-icon-box" 
                    style={{ 
                      width: '45px', 
                      height: '45px', 
                      marginBottom: '1.2rem', 
                      color: st.color,
                      border: `1px solid ${st.color}33`,
                      background: `${st.color}11`
                    }}
                  >
                    <IconComp size={20} aria-hidden="true" />
                  </div>
                  <span style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '2.4rem', 
                    fontWeight: '800', 
                    color: '#fff',
                    lineHeight: '1.1',
                    marginBottom: '0.5rem'
                  }}>
                    {st.val}
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.8rem', color: st.color }}>
                    {st.label}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* TIMELINE CONTENT */}
        {activeTab === 'timeline' && (
          <div style={{ 
            maxWidth: '750px', 
            margin: '0 auto', 
            position: 'relative', 
            paddingLeft: '2rem',
            borderLeft: '2px dashed rgba(0, 245, 212, 0.2)',
            animation: 'fadeIn 0.4s ease'
          }}>
            {timeline.map((tl, i) => (
              <div 
                key={i} 
                className="timeline-item" 
                style={{ 
                  position: 'relative', 
                  marginBottom: '2.5rem' 
                }}
              >
                {/* Bullet */}
                <div style={{
                  position: 'absolute',
                  left: 'calc(-2rem - 6px)',
                  top: '0.2rem',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--accent-cyan)',
                  border: '3px solid #080a10',
                  boxShadow: '0 0 10px var(--accent-cyan)'
                }}></div>

                <div className="glass-panel" style={{ padding: '1.5rem 2rem', position: 'relative' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '1.1rem', 
                    fontWeight: '800', 
                    color: 'var(--accent-cyan)',
                    background: 'rgba(0,245,212,0.05)',
                    border: '1px solid rgba(0,245,212,0.15)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    display: 'inline-block',
                    marginBottom: '0.8rem'
                  }}>
                    {tl.year}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.5rem' }}>{tl.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    {tl.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VALUES CONTENT */}
        {activeTab === 'values' && (
          <div className="about-values-grid" style={{ animation: 'fadeIn 0.4s ease' }}>
            {values.map((val, i) => {
              const IconComp = val.icon;
              return (
                <div 
                  key={i} 
                  className="glass-panel" 
                  style={{ 
                    padding: '2rem 1.2rem',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'flex-start',
                    borderTop: `3px solid ${val.color}`,
                    height: '100%'
                  }}
                >
                  <div 
                    className="service-icon-box" 
                    style={{ 
                      width: '45px', 
                      height: '45px', 
                      margin: '0 auto 1.2rem auto', 
                      color: val.color,
                      border: `1px solid ${val.color}33`,
                      background: `${val.color}11`
                    }}
                  >
                    <IconComp size={20} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.8rem', color: '#fff' }}>{val.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1200px) {
          .about-values-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .about-values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .about-values-grid {
            grid-template-columns: 1fr;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
