import React from 'react';
import { COMPANY_INFO } from '../../config/constants';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Mentions Légales & Conditions d\'Utilisation | BeClean',
  description: 'Mentions légales, conditions d\'utilisation et informations juridiques concernant l\'éditeur du site BeClean.',
};

export default function Terms() {
  return (
    <section className="section" style={{ paddingTop: '120px', paddingBottom: '5rem' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-badge">Identité Légale</span>
          <h1 className="section-title">Mentions Légales</h1>
          <p className="section-desc">Informations d'identification juridique et conditions générales d'utilisation du site BeClean.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', alignItems: 'start', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'rgba(0, 180, 216, 0.05)',
            border: '1px solid rgba(0, 180, 216, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={36} style={{ color: 'var(--accent-blue)' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Dernière mise à jour : 12 Juillet 2026</p>
            
            <div className="legal-content" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>1. Éditeur du Site</h3>
                <p>
                  Le site internet BeClean est édité et exploité par la société <strong>{COMPANY_INFO.legalName}</strong>, filiale du groupe <strong>BeFacility</strong>.<br />
                  Société à Responsabilité Limitée (S.A.R.L.) au capital social marocain.<br />
                  <strong>ICE (Identifiant Commun de l'Entreprise) :</strong> {COMPANY_INFO.ice}<br />
                  <strong>Siège Social :</strong> Belvedere, Casablanca, Maroc.<br />
                  <strong>Ligne commercial fixe :</strong> {COMPANY_INFO.phoneFormatted}<br />
                  <strong>GSM / Support :</strong> {COMPANY_INFO.whatsappFormatted}<br />
                  <strong>E-mail :</strong> {COMPANY_INFO.email} / {COMPANY_INFO.supportEmail}
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>2. Propriété intellectuelle</h3>
                <p>
                  L'ensemble des contenus de ce site (structure générale, textes, logos, slogans, charte graphique, icônes, images et codes sources de l'application web) sont la propriété exclusive de la société <strong>{COMPANY_INFO.legalName}</strong> ou de sa société mère <strong>BeFacility</strong>.<br />
                  Toute reproduction, représentation, modification ou publication, totale ou partielle, de ces éléments par quelque procédé que ce soit est strictement interdite sans notre accord préalable écrit.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>3. Limites de responsabilité</h3>
                <p>
                  Les informations contenues sur notre site (notamment les prix indicatifs générés par le calculateur de devis) sont fournies de bonne foi à des fins informatives. Bien que nous nous efforcions d'assurer l'exactitude des calculs, des variations de tarifs peuvent survenir selon la configuration réelle de vos locaux. Seuls les devis validés et contresignés par écrit ou par notre service de planification client engagent juridiquement notre responsabilité contractuelle.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>4. Hébergement et Technologies</h3>
                <p>
                  Ce site internet utilise la technologie moderne React / Next.js. Les formulaires de commande sont connectés via la messagerie WhatsApp de l'utilisateur pour le traitement rapide par nos dépôts logistiques à Casablanca.<br />
                  L'hébergement est géré de manière privée sur des serveurs sécurisés connectés par liaison tunnel.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>5. Droit applicable</h3>
                <p>
                  Le présent site web et ses mentions légales sont régis et interprétés conformément aux lois en vigueur au <strong>Royaume du Maroc</strong>. Tout litige relatif à l'utilisation du site relève de la compétence exclusive du Tribunal de Commerce de Casablanca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
