import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Mail, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../config/constants';
import BrandLogo from './BrandLogo';

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);


const XIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.95-1.72-.1-.09-.17-.14-.26-.24V14c0 1.94-.77 3.84-2.18 5.17-1.42 1.35-3.41 2.05-5.36 1.9-2.02-.15-3.89-1.32-4.9-3.09-1.07-1.87-1.05-4.28-.02-6.15 1.02-1.86 3.03-3.1 5.16-3.18V12.7c-1.31.11-2.52.92-3.03 2.12-.52 1.22-.32 2.74.52 3.73.84.99 2.22 1.4 3.47 1.05 1.25-.36 2.13-1.54 2.13-2.85V.02z"/>
  </svg>
);

const PinterestIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.17-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.12-2.9 1 0 1.48.75 1.48 1.65 0 1-.64 2.5-1 3.9-.28 1.18.59 2.14 1.75 2.14 2.1 0 3.72-2.22 3.72-5.42 0-2.83-2.04-4.82-4.94-4.82-3.37 0-5.35 2.53-5.35 5.14 0 1 .38 2.1 0.88 2.7.1.12.1.23.07.36-.1.4-.3.1.28-.4-.36-1.5-1.12-2.48-1.12-3.98 0-3.65 2.65-7 7.65-7 4 0 7.1 2.87 7.1 6.67 0 4-2.5 7.18-6 7.18-1.17 0-2.27-.6-2.65-1.33 0 0-.58 2.2-.72 2.74-.26 1-.97 2.25-1.44 3.02 1.12.35 2.3.54 3.5.54 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
  </svg>
);

const SnapchatIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" {...props}>
    <path d="M12 2.75c-3.13 0-5.75 2.58-5.75 6.07 0 .68.17 1.34.49 1.94-.48.45-.74 1.11-.74 1.84 0 1.65 1.23 2.58 2.8 2.58.17 0 .34-.01.5-.04.47.53 1.18 1.11 2.7 1.11s2.23-.58 2.7-1.11c.16.03.33.04.5.04 1.57 0 2.8-.93 2.8-2.58 0-.73-.26-1.39-.74-1.84.32-.6.49-1.26.49-1.94 0-3.49-2.62-6.07-5.75-6.07zm0 10.75c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5z"/>
  </svg>
);

const ThreadsIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M17 12v1a4 4 0 0 1-8 0v-2.5a5.5 5.5 0 1 1 9.77 3.32" />
  </svg>
);

const GoogleMyBusinessIcon = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" {...props}>
    <path d="M21.9 9.1L20 4H4L2.1 9.1c-.2.5-.1 1.1.3 1.5.4.4.9.5 1.4.2.4-.2.6-.7.6-1.2.1-1.3 1.2-2.3 2.5-2.2 1.2 0 2.2.9 2.3 2.1.1 1.3 1.2 2.3 2.5 2.2 1.2 0 2.2-.9 2.3-2.1.1-1.3 1.2-2.3 2.5-2.2 1.2 0 2.2.9 2.3 2.1.1 1.3 1.2 2.3 2.5 2.2.5.3 1-.2 1.4-.2.4-.4.5-1 .3-1.5z"/>
    <path d="M4 12v7c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-7h-2v5c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1v-5H4z"/>
    <path d="M12 16.5v-1.7H9.5v1h1.9c-.2.6-.8 1-1.4 1-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6c.5 0 1 .2 1.3.6l.8-.7c-.5-.6-1.3-1-2.1-1-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8c1.5 0 2.6-1 2.6-2.6z"/>
  </svg>
);

import { api } from '../services/payloadClient';

export default async function Footer() {
  const siteSettings = await api.siteSettings() || {};
  const legalName = siteSettings.legalName || COMPANY_INFO.legalName;
  const tagline = siteSettings.tagline || COMPANY_INFO.tagline;
  const phone = siteSettings.phone || COMPANY_INFO.phone;
  const whatsapp = siteSettings.whatsapp || COMPANY_INFO.whatsapp;
  const email = siteSettings.email || COMPANY_INFO.email;
  const supportEmail = siteSettings.supportEmail || COMPANY_INFO.supportEmail;
  const address = siteSettings.address || COMPANY_INFO.address;
  const ice = siteSettings.ice || COMPANY_INFO.ice;
  const socials = siteSettings.socials || COMPANY_INFO.socials;

  const whatsappClean = whatsapp.replace('+', '').replace(/\s/g, '');
  
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          marginBottom: '1.5rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <BrandLogo />
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
              {tagline}
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 36px)', 
              gap: '0.5rem', 
              marginTop: '1.2rem',
              width: 'fit-content'
            }}>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn BeClean">
              <LinkedinIcon size={16} />
              </a>
              <a href={socials.google} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Google My Business BeClean">
                <GoogleMyBusinessIcon size={16} />
              </a>
              <a href={socials.facebook} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook BeClean">
              <FacebookIcon size={16} />
              </a>
              <a href={socials.instagram} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram BeClean">
              <InstagramIcon size={16} />
              </a>
              <a href={socials.tiktok} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="TikTok BeClean">
                <TikTokIcon size={16} />
              </a>
              <a href={socials.youtube} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="YouTube BeClean">
              <YoutubeIcon size={16} />
              </a>
              <a href={socials.twitter} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter X BeClean">
                <XIcon size={16} />
              </a>
              <a href={socials.pinterest} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Pinterest BeClean">
                <PinterestIcon size={16} />
              </a>
              <a href={socials.snapchat} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Snapchat BeClean">
                <SnapchatIcon size={16} />
              </a>
              <a href={socials.threads} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Threads BeClean">
                <ThreadsIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ marginBottom: '0.8rem', fontSize: '1.1rem', position: 'relative' }}>
              Liens Rapides
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <Link href="/" className="nav-link" style={{ fontSize: '0.9rem', width: 'fit-content' }}>Accueil</Link>
              <Link href="/services" className="nav-link" style={{ fontSize: '0.9rem', width: 'fit-content' }}>Nos Services</Link>
              <Link href="/boutique" className="nav-link" style={{ fontSize: '0.9rem', width: 'fit-content' }}>Boutique en Ligne</Link>
              <Link href="/blog" className="nav-link" style={{ fontSize: '0.9rem', width: 'fit-content' }}>Blog & Conseils</Link>
              <Link href="/devis" className="nav-link" style={{ fontSize: '0.9rem', width: 'fit-content' }}>Devis Automatique</Link>
              <Link href="/about" className="nav-link" style={{ fontSize: '0.9rem', width: 'fit-content' }}>À Propos</Link>
              <Link href="/contact" className="nav-link" style={{ fontSize: '0.9rem', width: 'fit-content' }}>Contact & Agences</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="footer-contact-col">
            <h4 style={{ marginBottom: '0.8rem', fontSize: '1.1rem' }}>
              Contact Maroc
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '0.15rem' }} aria-hidden="true" />
                <span>{address}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} aria-hidden="true" />
                <span>Ligne / Support : <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{phone}</a></span>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <MessageCircle size={18} style={{ color: '#25D366', flexShrink: 0 }} aria-hidden="true" />
                <span>GSM / WhatsApp : <a href={`https://wa.me/${whatsappClean}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: '600' }}>{whatsapp}</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <Mail size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} aria-hidden="true" />
                  <a href={`mailto:${email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{email}</a>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <Mail size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} aria-hidden="true" />
                  <a href={`mailto:${supportEmail}`} style={{ color: 'inherit', textDecoration: 'none' }}>{supportEmail}</a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                <FileText size={16} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} aria-hidden="true" />
                <span>ICE: {ice}</span>
              </div>
            </div>
          </div>

          {/* Newsletter / Direct WhatsApp Call */}
          <div>
            <h4 style={{ marginBottom: '0.8rem', fontSize: '1.1rem' }}>
              Demande d'informations
            </h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.8rem', color: 'var(--color-text-secondary)' }}>
              Discutez directement avec un conseiller commercial BeClean sur WhatsApp pour votre entreprise.
            </p>
            <a 
              href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent('Bonjour BeClean, je souhaiterais obtenir des informations concernant vos services.')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', display: 'flex', gap: '0.5rem', color: '#000', justifyContent: 'center' }}
            >
              <MessageCircle size={18} />
              <span>WhatsApp Business</span>
            </a>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)'
        }}>
          <p>© {new Date().getFullYear()} {legalName}. Tous droits réservés. | <span style={{ color: 'var(--accent-cyan)' }}>Created by BeNext</span></p>
          <div style={{ display: 'flex', gap: '1.5rem', marginLeft: 'auto' }}>
            <Link href="/privacy" className="nav-link" style={{ fontSize: '0.85rem' }}>Politique de Confidentialité</Link>
            <Link href="/terms" className="nav-link" style={{ fontSize: '0.85rem' }}>Mentions Légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
