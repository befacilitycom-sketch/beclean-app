import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Sparkles, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../../config/constants';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contactez-nous | BeClean Société de Nettoyage au Maroc',
  description: 'Contacter BeClean Casablanca et Rabat. Obtenez des informations sur nos prestations de nettoyage de locaux ou demandez un contrat commercial.',
  keywords: 'adresse beclean casablanca, email contact nettoyage maroc, telephone societe proprete maroc',
  alternates: {
    canonical: '/contact',
  },
};

import { api } from '../../services/payloadClient';

export default async function ContactPage() {
  const siteSettings = await api.siteSettings() || {};
  const phone = siteSettings.phone || COMPANY_INFO.phone;
  const whatsapp = siteSettings.whatsapp || COMPANY_INFO.whatsapp;
  const email = siteSettings.email || COMPANY_INFO.email;
  const supportEmail = siteSettings.supportEmail || COMPANY_INFO.supportEmail;
  const address = siteSettings.address || COMPANY_INFO.address;
  const ice = siteSettings.ice || COMPANY_INFO.ice;

  const whatsappClean = whatsapp.replace('+', '').replace(/\s/g, '');
  const whatsappHref = `https://wa.me/${whatsappClean}?text=${encodeURIComponent('Bonjour BeClean, je souhaiterais obtenir des informations concernant vos services.')}`;

  return (
    <section className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Nous Contacter</span>
          <h1 className="section-title">Prenez contact avec nos experts</h1>
          <p className="section-desc">
            Une question sur nos tarifs ? Besoin d'un devis pour un nettoyage de bureaux ou une intervention 3D dans votre ville ? Envoyez-nous un message.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Column */}
          <div className="contact-info-column">
            <div className="glass-panel contact-card">
              <div className="contact-item-box">
                <MapPin className="contact-icon" size={20} aria-hidden="true" />
                <div className="contact-text">
                  <h4>Siège Social Maroc 🇲🇦</h4>
                  <p>{address}</p>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                    <FileText size={14} style={{ color: 'var(--accent-blue)' }} aria-hidden="true" />
                    <span>ICE : {ice}</span>
                  </div>
                </div>
              </div>

              <div className="contact-item-box">
                <Phone className="contact-icon" size={20} aria-hidden="true" />
                <div className="contact-text">
                  <h4>Ligne Fixe Maroc 🇲🇦</h4>
                  <p><a href={`tel:${phone.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{phone}</a></p>
                </div>
              </div>

              <div className="contact-item-box">
                <MessageSquare className="contact-icon" size={20} style={{ color: '#25D366' }} aria-hidden="true" />
                <div className="contact-text">
                  <h4>WhatsApp Maroc 🇲🇦</h4>
                  <p>
                    <a href={whatsappHref} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: '600' }}>
                      {whatsapp}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-item-box">
                <Mail className="contact-icon" size={20} aria-hidden="true" />
                <div className="contact-text">
                  <h4>Adresses E-mail</h4>
                  <p style={{ marginBottom: '0.2rem' }}>
                    <a href={`mailto:${email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{email}</a>
                  </p>
                  <p>
                    <a href={`mailto:${supportEmail}`} style={{ color: 'inherit', textDecoration: 'none' }}>{supportEmail}</a>
                  </p>
                </div>
              </div>

              <div className="contact-item-box" style={{ marginBottom: 0 }}>
                <Clock className="contact-icon" size={20} aria-hidden="true" />
                <div className="contact-text">
                  <h4>Heures d'ouverture</h4>
                  <p>Support Commercial : Lun - Sam / 8h00 - 18h00<br />Interventions d'urgence : 7j/7 - 24h/24</p>
                </div>
              </div>
            </div>

            {/* Cities covered */}
            <div className="glass-panel contact-card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} style={{ color: 'var(--accent-cyan)' }} aria-hidden="true" />
                <span>Zones de Couverture</span>
              </h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '1.2rem', color: 'var(--color-text-secondary)' }}>
                Nos équipes mobiles de nettoyage et d'hygiène 3D interviennent directement dans les villes suivantes :
              </p>
              <div className="contact-cities-box">
                {COMPANY_INFO.cities.map((city) => (
                  <span key={city} className="city-badge">{city}</span>
                ))}
              </div>
            </div>

            {/* Google Map iframe */}
            <div style={{ width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', marginTop: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8475260195614!2d-7.600913924773822!3d33.596259973331614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd1de74f3ff5%3A0xc3cf33887019d087!2sBelv%C3%A9d%C3%A8re%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1720810000000!5m2!1sfr!2sma" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(30%)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps BeClean Belvedere Casablanca"
              ></iframe>
            </div>
          </div>

          {/* Form Column */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
