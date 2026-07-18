import React from 'react';
import { 
  Building, Users, Sparkles, Shield, Cpu, 
  Compass, Monitor, Briefcase, Wrench, Sun, 
  Megaphone
} from 'lucide-react';
import AboutAccordion from './AboutAccordion';
import AboutStatsAndValues from './AboutStatsAndValues';

export const metadata = {
  title: 'À Propos de BeClean & Groupe BeFacility | Expert Hygiène au Maroc',
  description: 'Découvrez BeClean et notre maison-mère BeFacility, leader du Facility Management au Maroc. Nos filiales couvrent la propreté, la sécurité, la digitalisation et l\'intérim.',
  keywords: 'befacility maroc, syndic copropriete casablanca, conciergerie entreprise maroc, maintenance technique locaux maroc',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const subsidiaries = [
    {
      name: "BeFacility",
      role: "Parent & Integrated Facility Management",
      desc: "Leader de l'exploitation immobilière intégrée au Maroc. Pilote la maintenance technique, les services généraux, le syndic professionnel et la valorisation d'actifs.",
      color: "var(--accent-blue)",
      icon: Building
    },
    {
      name: "BeClean",
      role: "Hygiène, Propreté & Solutions Sanitaires",
      desc: "Spécialiste de la propreté professionnelle de haute précision, de la désinfection ONSSA (3D/4D) et de la vente en gros de matériel d'hygiène.",
      color: "var(--accent-cyan)",
      icon: Sparkles
    },
    {
      name: "BeJob",
      role: "Ressources Humaines & Intérim",
      desc: "Solutions de recrutement de personnel, d'intérim réglementé et d'externalisation complète de la gestion administrative RH au Maroc.",
      color: "#a2d2ff",
      icon: Users
    },
    {
      name: "BeSafe",
      role: "Sécurité Électronique & Sécurité Incendie",
      desc: "Protection de vos locaux : intégration de sécurité électronique (vidéosurveillance IA) et de conformité incendie réglementaire.",
      color: "#ff865e",
      icon: Shield
    },
    {
      name: "BeNext",
      role: "Smart Building, Réseaux & Transition Digitale",
      desc: "Architecte du bâtiment connecté : solutions GTB/GMAO, réseaux informatiques haute disponibilité et intégration de systèmes IoT.",
      color: "#c8b6ff",
      icon: Cpu
    }
  ];

  const activities = [
    {
      title: "Conseil, Ingénierie & Organisation",
      icon: "Compass",
      points: [
        "Conseil stratégique, opérationnel et organisationnel pour entreprises et administrations publiques.",
        "Assistance à la Maîtrise d’Ouvrage (AMO), audits techniques et pilotage de projets multiservices et énergétiques.",
        "Optimisation des performances opérationnelles et ingénierie globale de services généraux."
      ]
    },
    {
      title: "Ressources Humaines, Intérim & Externalisation",
      icon: "Users",
      points: [
        "Recrutement spécialisé, évaluation et placement de personnel qualifié ou opérationnel.",
        "Solutions de travail temporaire (intérim) et délégation de main-d'œuvre partout au Maroc.",
        "Externalisation de la gestion administrative, de la paie et de la conformité RH."
      ]
    },
    {
      title: "Facility Management & Exploitation Immobilière",
      icon: "Building",
      points: [
        "Pilotage global des services généraux de vos sites (Hard Services & Soft Services).",
        "Exploitation, maintenance multitechnique et gestion de parcs immobiliers tertiaires ou industriels.",
        "Syndic de copropriété professionnel, gestion locative active et services de conciergerie d'entreprise."
      ]
    },
    {
      title: "Smart Building & Gestion Technique (BMS)",
      icon: "Cpu",
      points: [
        "Étude, conception et intégration de systèmes BMS / GTB / GTC pour bâtiments intelligents.",
        "Intégration de solutions IoT, capteurs connectés, automates et supervision technique en temps réel.",
        "Optimisation technique et opérationnelle automatisée pour réduire les coûts d'exploitation."
      ]
    },
    {
      title: "Informatique, Réseaux & Digitalisation",
      icon: "Monitor",
      points: [
        "Installation, configuration et maintenance d'infrastructures IT, serveurs et cybersécurité.",
        "Déploiement de réseaux informatiques sécurisés (fibre optique, LAN, WAN, Wi-Fi haut débit).",
        "Intégration d'outils digitaux collaboratifs, cloud computing et progiciels ERP / GMAO."
      ]
    },
    {
      title: "Prestations Multiservices & Services Généraux",
      icon: "Briefcase",
      points: [
        "Prestations multiservices sur-mesure pour accompagner le fonctionnement quotidien des entreprises.",
        "Assistance logistique interne, manutention sur site et gestion des flux physiques.",
        "Courses express, transport interne et conciergerie opérationnelle."
      ]
    },
    {
      title: "Nettoyage Professionnel, Hygiène & Environnement",
      icon: "Sparkles",
      points: [
        "Nettoyage industriel et tertiaire de haute qualité (bureaux, usines, résidences).",
        "Prestations d'hygiène 3D certifiées : Désinfection, Dératisation et Désinsectisation.",
        "Entretien d'espaces verts, élagage et maintenance technique des piscines."
      ]
    },
    {
      title: "Travaux Tous Corps d’État & Maintenance",
      icon: "Wrench",
      points: [
        "Rénovation, aménagement et travaux de second œuvre (électricité, plomberie, peinture, cloisons).",
        "Installation, entretien et dépannage de systèmes CVC (climatisation, ventilation, chauffage).",
        "Dépannage électromécanique, maintenance de pompes et moteurs industriels."
      ]
    },
    {
      title: "Sécurité Électronique & Protection Incendie",
      icon: "Shield",
      points: [
        "Installation et maintenance réglementaire d'extincteurs, réseaux RIA et alarmes incendie.",
        "Intégration de solutions de vidéosurveillance intelligente, alarme anti-intrusion et contrôle d'accès.",
        "Audits de conformité de sécurité et mise en place de plans d'évacuation."
      ]
    },
    {
      title: "Énergie Solaire & Efficacité Énergétique",
      icon: "Sun",
      points: [
        "Étude de faisabilité, pose et maintenance de centrales solaires photovoltaïques.",
        "Audits énergétiques réglementaires et optimisation de la performance des installations.",
        "Solutions d'économie d'énergie actives pour réduire l'empreinte carbone."
      ]
    },
    {
      title: "Marketing, Événementiel & Restauration",
      icon: "Megaphone",
      points: [
        "Conseil en marketing digital, communication de marque (branding) et réseaux sociaux.",
        "Conception, coordination logistique et gestion d'événements d'entreprise de A à Z.",
        "Services de restauration événementielle et buffets professionnels."
      ]
    }
  ];

  return (
    <>
      <section className="section page-transition" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <span className="section-badge">Qui sommes-nous ?</span>
            <h1 className="section-title">BEFACILITY & ses Filiales</h1>
            <p className="section-desc">
              Un groupe de services intégrés aux entreprises et aux bâtiments au Maroc. Grâce à nos filiales expertes, nous vous proposons une offre à 360° pour gérer, entretenir, digitaliser et sécuriser vos locaux.
            </p>
          </div>

          <div className="about-subsidiaries-grid" style={{ marginBottom: '5rem' }}>
            {subsidiaries.map((sub, i) => {
              const IconComp = sub.icon;
              return (
                <div 
                  key={i} 
                  className="glass-panel" 
                  style={{ 
                    padding: '2rem 1.2rem', 
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderTop: `3px solid ${sub.color}`,
                    height: '100%'
                  }}
                >
                  <div 
                    className="service-icon-box" 
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      marginBottom: '1rem', 
                      color: sub.color,
                      border: `1px solid ${sub.color}33`,
                      background: `${sub.color}11`
                    }}
                  >
                    <IconComp size={22} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>{sub.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: sub.color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.8rem' }}>
                    {sub.role}
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                    {sub.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <AboutStatsAndValues />

          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <h2 className="section-title" style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '2.5rem' }}>
              Nos Secteurs d'Activités & Métiers
            </h2>

            <AboutAccordion activities={activities} />
          </div>
        </div>
      </section>

      {/* Animation slideDown and grid style injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .about-subsidiaries-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1200px) {
          .about-subsidiaries-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .about-subsidiaries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .about-subsidiaries-grid {
            grid-template-columns: 1fr;
          }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </>
  );
}
