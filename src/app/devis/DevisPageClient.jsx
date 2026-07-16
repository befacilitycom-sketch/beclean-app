'use client';

import React, { useState, useEffect } from 'react';
import { SERVICES, DEVIS_CONFIG, COMPANY_INFO } from '../../config/constants';
import { Calculator, CheckCircle2, MessageCircle, Mail, Sparkles, X } from 'lucide-react';

export default function DevisPageClient() {
  const [service, setService] = useState('residential');
  const [area, setArea] = useState(100);
  const [frequency, setFrequency] = useState('ponctuel');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [calcResult, setCalcResult] = useState({
    baseCost: 0,
    discountedCost: 0,
    optionsCost: 0,
    total: 0
  });

  // Calculate devis real-time
  useEffect(() => {
    const baseRate = DEVIS_CONFIG.serviceBaseRates[service] || 15;
    const baseCost = area * baseRate;
    
    const freqMult = DEVIS_CONFIG.frequencyMultipliers[frequency] || 1.0;
    const discountedCost = baseCost * freqMult;
    
    const optionsCost = selectedOptions.reduce((sum, optId) => {
      const opt = DEVIS_CONFIG.options.find(o => o.id === optId);
      return sum + (opt ? opt.price : 0);
    }, 0);
    
    const total = discountedCost + optionsCost;
    
    setCalcResult({
      baseCost,
      discountedCost,
      optionsCost,
      total: Math.round(total)
    });
  }, [service, area, frequency, selectedOptions]);

  const handleOptionToggle = (optId) => {
    if (selectedOptions.includes(optId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optId));
    } else {
      setSelectedOptions([...selectedOptions, optId]);
    }
  };

  const getServiceName = (id) => {
    const s = SERVICES.find(x => x.id === id);
    return s ? s.title : id;
  };

  const getFrequencyLabel = (id) => {
    const labels = {
      ponctuel: 'Ponctuel (Sans engagement)',
      mensuel: 'Mensuel (1 passage/mois)',
      biweekly: 'Bi-mensuel (2 passages/mois)',
      weekly: 'Hebdomadaire (4 passages/mois)'
    };
    return labels[id] || id;
  };

  const generateWhatsAppMessage = () => {
    const serviceName = getServiceName(service);
    const freqLabel = getFrequencyLabel(frequency);
    const optionsNames = selectedOptions.map(optId => {
      const opt = DEVIS_CONFIG.options.find(o => o.id === optId);
      return opt ? opt.name : optId;
    }).join(', ');

    return `Bonjour BeClean, j'ai réalisé une estimation de devis sur votre site web:
*Service:* ${serviceName}
*Surface:* ${area} m²
*Fréquence:* ${freqLabel}
*Options:* ${optionsNames || 'Aucune'}
*Prix Total Estimé:* ${calcResult.total} MAD / mois (ou par prestation)

Merci de me recontacter pour planifier l'intervention.`;
  };

  const handleWhatsAppRedirect = () => {
    const text = generateWhatsAppMessage();
    const cleanPhone = COMPANY_INFO.whatsapp.replace('+', '').replace(/\s/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { name: clientName, phone: clientPhone, email: clientEmail },
          devis: { service, area, frequency, selectedOptions, total: calcResult.total }
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Erreur lors de l'envoi de votre demande de devis.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section page-transition" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Simulateur Tarifaire</span>
          <h1 className="section-title">Calculateur de Devis Instantané</h1>
          <p className="section-desc">
            Obtenez une estimation claire et précise pour le nettoyage et l'entretien de vos locaux. Renseignez les paramètres ci-dessous.
          </p>
        </div>

        <div className="devis-grid">
          {/* Form Side */}
          <div className="glass-panel devis-form">
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '2rem' }}>
              <Calculator style={{ color: 'var(--accent-cyan)' }} size={24} aria-hidden="true" />
              <h3 style={{ fontSize: '1.4rem' }}>Paramètres du devis</h3>
            </div>

            {/* Service */}
            <div className="form-group">
              <label htmlFor="devis-service-select" className="form-label">Type de Local / Service</label>
              <select 
                id="devis-service-select"
                className="form-select" 
                value={service} 
                onChange={(e) => setService(e.target.value)}
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.title} ({s.baseRate} MAD/m²)</option>
                ))}
              </select>
            </div>

            {/* Surface Area */}
            <div className="form-group">
              <label htmlFor="devis-area-slider" className="form-label">Surface totale à nettoyer (en m²)</label>
              <div className="range-slider-container">
                <input 
                  id="devis-area-slider"
                  type="range" 
                  min="20" 
                  max="1500" 
                  step="5"
                  className="range-slider" 
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value))}
                  aria-valuemin={20}
                  aria-valuemax={1500}
                  aria-valuenow={area}
                />
                <input 
                  type="number" 
                  className="form-input range-val-input" 
                  value={area}
                  onChange={(e) => setArea(Math.max(10, parseInt(e.target.value) || 20))}
                  aria-label="Surface totale en mètres carrés"
                />
              </div>
            </div>

            {/* Frequency */}
            <div className="form-group">
              <label htmlFor="devis-frequency-select" className="form-label">Fréquence de passage</label>
              <select 
                id="devis-frequency-select"
                className="form-select" 
                value={frequency} 
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="ponctuel">Ponctuel (Sans engagement, prix normal)</option>
                <option value="mensuel">Mensuel (-5%)</option>
                <option value="biweekly">Bi-mensuel / 2 fois par mois (-10%)</option>
                <option value="weekly">Hebdomadaire / 4 fois par mois (-15%)</option>
              </select>
            </div>

            {/* Options */}
            <div className="form-group">
              <label className="form-label">Prestations et options complémentaires</label>
              <div className="options-grid">
                {DEVIS_CONFIG.options.map((opt) => (
                  <div 
                    key={opt.id} 
                    className={`option-checkbox-label ${selectedOptions.includes(opt.id) ? 'selected' : ''}`}
                    onClick={() => handleOptionToggle(opt.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <input 
                      type="checkbox" 
                      className="checkbox-custom" 
                      checked={selectedOptions.includes(opt.id)}
                      onChange={() => {}} // handled by click on parent div
                      aria-label={opt.name}
                    />
                    <div className="option-info">
                      <span className="option-name">{opt.name}</span>
                      <span className="option-price">+{opt.price} MAD</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time breakdown sticky panel */}
          <div className="glass-panel devis-summary-panel">
            <h3 className="devis-summary-title">Chiffrage Estimatif</h3>
            
            <div className="summary-row">
              <span>Coût de base ({area} m²)</span>
              <span>{calcResult.baseCost} MAD</span>
            </div>

            <div className="summary-row" style={{ color: 'var(--color-text-secondary)' }}>
              <span>Fréquence choisie</span>
              <span>{frequency === 'ponctuel' ? 'Aucune remise' : `Remise ${Math.round((1 - DEVIS_CONFIG.frequencyMultipliers[frequency]) * 100)}%`}</span>
            </div>

            <div className="summary-row">
              <span>Options de nettoyage</span>
              <span>+{calcResult.optionsCost} MAD</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <div>
                <span className="total-label">Total Estimé HT</span>
                <span className="total-period">
                  {frequency === 'ponctuel' ? 'Par intervention' : 'Par mois'}
                </span>
              </div>
              <div className="total-val-box">
                <span className="total-val" aria-live="polite">{calcResult.total} MAD</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block' }}>~ {Math.round(calcResult.total * 1.2)} MAD TTC</span>
              </div>
            </div>

            <div className="devis-actions">
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', color: '#000', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
                onClick={() => setIsSubmitOpen(true)}
              >
                <Mail size={18} aria-hidden="true" />
                <span>Recevoir Devis Officiel PDF</span>
              </button>
              
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%', display: 'flex', gap: '0.5rem', border: '1px solid #25d366', color: '#25d366', justifyContent: 'center' }}
                onClick={handleWhatsAppRedirect}
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>Confirmer via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submission popup to collect details */}
      {isSubmitOpen && (
        <div className="modal-overlay" onClick={() => setIsSubmitOpen(false)}>
          <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Informations de facturation">
            <button className="modal-close-btn" onClick={() => setIsSubmitOpen(false)} aria-label="Fermer la modale">
              <X size={20} aria-hidden="true" />
            </button>
            
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 style={{ color: '#00f5d4', margin: '0 auto 1.5rem', width: '72px', height: '72px' }} />
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>Félicitations {clientName} !</h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                  Votre simulation a été enregistrée avec succès. Nos experts vont l'analyser et vous recevrez le <strong>Devis PDF Officiel</strong> par email d'ici 30 minutes.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => { setIsSubmitOpen(false); setIsSubmitted(false); }}>
                    Fermer
                  </button>
                  <button type="button" className="btn btn-primary" style={{ color: '#000', display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={handleWhatsAppRedirect}>
                    <MessageCircle size={18} /> Continuer sur WhatsApp
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <Sparkles style={{ color: 'var(--accent-cyan)' }} size={24} aria-hidden="true" />
                  <h2 style={{ fontSize: '1.6rem' }}>Coordonnées de Facturation</h2>
                </div>
                
                <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Pour que notre service technique prépare votre devis PDF complet (et valide les frais de déplacement spécifiques à votre ville), merci de renseigner ces champs.
                </p>
                
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label">Nom complet / Entreprise</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={clientName} 
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: Hôtellerie Bennani SARL" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Téléphone Maroc</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      value={clientPhone} 
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Ex: 06 61 00 00 00" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Adresse E-mail</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={clientEmail} 
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="Ex: direct@bennani.ma" 
                      required 
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsSubmitOpen(false)} disabled={isLoading}>Annuler</button>
                    <button type="submit" className="btn btn-primary" style={{ color: '#000', opacity: isLoading ? 0.7 : 1 }} disabled={isLoading}>
                      {isLoading ? 'Génération...' : 'Générer mon devis PDF'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
