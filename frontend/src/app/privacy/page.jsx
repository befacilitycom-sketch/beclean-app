import React from 'react';
import { COMPANY_INFO } from '../../config/constants';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Politique de Confidentialité - Loi 09-08 Maroc | BeClean',
  description: 'Politique de protection des données personnelles en conformité avec la loi marocaine 09-08 de BeClean.',
};

export default function Privacy() {
  return (
    <section className="section" style={{ paddingTop: '120px', paddingBottom: '5rem' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-badge">Cadre Légal</span>
          <h1 className="section-title">Politique de Confidentialité</h1>
          <p className="section-desc">Protection de vos données personnelles et conformité à la Loi N° 09-08 au Maroc.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', alignItems: 'start', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'rgba(0, 245, 212, 0.05)',
            border: '1px solid rgba(0, 245, 212, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Shield size={36} style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Dernière mise à jour : 12 Juillet 2026</p>
            
            <div className="legal-content" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>1. Introduction</h3>
                <p>
                  La présente Politique de Confidentialité décrit la manière dont <strong>{COMPANY_INFO.legalName}</strong> collecte, utilise et protège les informations que vous nous transmettez lorsque vous utilisez notre site internet. Nous accordons une importance primordiale à la confidentialité de vos données et nous engageons à la respecter scrupuleusement.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>2. Conformité avec la loi marocaine 09-08</h3>
                <p>
                  Conformément à la <strong>Loi N° 09-08</strong> relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel au Maroc, le traitement des données collectées via ce site fait l'objet d'une déclaration auprès de la Commission Nationale de contrôle de la protection des Données à caractère Personnel (CNDP).
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>3. Collecte des données</h3>
                <p>Nous pouvons recueillir des données de plusieurs manières :</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Coordonnées professionnelles et personnelles</strong> : Nom, adresse e-mail, numéro de téléphone fixe et mobile (GSM), adresse de livraison et de facturation, ICE lors de la saisie d'un formulaire de devis ou de contact.</li>
                  <li><strong>Données de commande</strong> : Liste des produits d'entretien et matériels commandés via le panier.</li>
                  <li><strong>Données de navigation</strong> : Adresse IP, type de navigateur, pages consultées via nos cookies d'optimisation.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>4. Finalités du traitement</h3>
                <p>Les informations que nous recueillons sont utilisées exclusivement pour :</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Établir vos devis personnalisés via notre calculateur de tarifs.</li>
                  <li>Traiter vos commandes de boutique et organiser les livraisons.</li>
                  <li>Assurer la maintenance de votre espace client et le suivi des interventions de nettoyage.</li>
                  <li>Améliorer le fonctionnement technique et le référencement (SEO) de notre plateforme.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>5. Sécurité de vos informations</h3>
                <p>
                  Toutes vos données sont stockées sur des serveurs sécurisés. Nous mettons en œuvre des mesures techniques et organisationnelles appropriées (connexions sécurisées SSL, chiffrement des données, limitation des accès personnels) pour empêcher tout accès non autorisé, altération ou divulgation de vos informations.
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: '700' }}>6. Vos Droits (Accès, Rectification, Opposition)</h3>
                <p>
                  Conformément à la Loi 09-08, vous disposez d'un droit d'accès, de rectification, de mise à jour et d'opposition au traitement de vos données personnelles. Vous pouvez exercer ce droit à tout moment en nous envoyant un courrier électronique à <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: 'var(--accent-cyan)' }}>{COMPANY_INFO.email}</a> ou en écrivant à notre adresse postale à Belvedere, Casablanca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
