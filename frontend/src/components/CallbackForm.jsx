'use client';

import React from 'react';

export default function CallbackForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Votre demande de rappel a bien été enregistrée. Un conseiller vous contactera dans les plus brefs délais.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" placeholder="Votre nom complet" className="form-input" required />
      </div>
      <div className="form-group">
        <input type="tel" placeholder="Votre numéro de téléphone (Maroc)" className="form-input" required />
      </div>
      <div className="form-group">
        <select className="form-select" required>
          <option value="">Sélectionnez votre besoin</option>
          <option value="bureau">Nettoyage de Bureaux (Contrat annuel)</option>
          <option value="industrial">Nettoyage Industriel / Entrepôt</option>
          <option value="3d">Dératisation / Désinfection 3D</option>
          <option value="chantier">Fin de chantier / Après travaux</option>
          <option value="villa">Résidentiel (Villas / Appartements)</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        Me faire rappeler gratuitement
      </button>
    </form>
  );
}
