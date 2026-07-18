'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

    const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de réseau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '3rem' }}>
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '2rem' }}>
        <MessageSquare style={{ color: 'var(--accent-cyan)' }} size={24} aria-hidden="true" />
        <h3 style={{ fontSize: '1.4rem' }}>Formulaire de contact</h3>
      </div>

      {isSubmitted ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <CheckCircle2 style={{ color: 'var(--accent-cyan)', margin: '0 auto 1.5rem', width: '64px', height: '64px' }} />
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>Message Envoyé !</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
            Merci <strong>{formData.name}</strong>, votre demande a bien été reçue. <br/>
            Notre équipe vous recontactera sous 2 heures ouvrées.
          </p>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => { 
              setIsSubmitted(false); 
              setFormData({ name: '', email: '', subject: '', message: '' }); 
            }}
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nom complet / Entreprise</label>
            <input 
              type="text" 
              name="name"
              className="form-input" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Prénom Nom" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Adresse e-mail</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              value={formData.email}
              onChange={handleInputChange}
              placeholder="prenom.nom@email.com" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sujet de votre demande</label>
            <input 
              type="text" 
              name="subject"
              className="form-input" 
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Ex: Demande de contrat annuel bureaux" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea 
              name="message"
              className="form-input" 
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Décrivez votre besoin en quelques lignes..." 
              style={{ resize: 'vertical' }}
              required
            ></textarea>
          </div>

          <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%', color: '#000', display: 'flex', gap: '0.5rem', justifyContent: 'center', opacity: isLoading ? 0.7 : 1 }}>
            <Send size={18} aria-hidden="true" />
            <span>{isLoading ? 'Envoi en cours...' : 'Envoyer le Message'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
