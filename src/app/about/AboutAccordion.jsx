'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, ChevronUp, CheckCircle2, 
  Compass, Users, Building, Cpu, Monitor, 
  Briefcase, Sparkles, Wrench, Shield, Sun, 
  Megaphone
} from 'lucide-react';

const ICON_MAP = {
  Compass, Users, Building, Cpu, Monitor, 
  Briefcase, Sparkles, Wrench, Shield, Sun, 
  Megaphone
};

export default function AboutAccordion({ activities }) {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {activities.map((act, idx) => {
        const IconComp = ICON_MAP[act.icon] || Sparkles;
        const isOpen = activeAccordion === idx;
        return (
          <div 
            key={idx} 
            className="glass-panel" 
            style={{ 
              padding: '0', 
              overflow: 'hidden', 
              borderRadius: '12px',
              border: isOpen ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Header trigger */}
            <button
              onClick={() => toggleAccordion(idx)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                cursor: 'pointer',
                color: isOpen ? 'var(--accent-cyan)' : 'var(--color-text-primary)',
                transition: 'color var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ color: isOpen ? 'var(--accent-cyan)' : 'var(--color-text-muted)' }}>
                  <IconComp size={20} aria-hidden="true" />
                </div>
                <span style={{ fontSize: '1.05rem', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>
                  {act.title}
                </span>
              </div>
              {isOpen ? <ChevronUp size={20} aria-hidden="true" /> : <ChevronDown size={20} aria-hidden="true" />}
            </button>

            {/* Content panels */}
            {isOpen && (
              <div style={{
                padding: '0 1.5rem 1.5rem 1.5rem',
                background: 'rgba(0, 0, 0, 0.1)',
                animation: 'slideDown var(--transition-medium) forwards',
                borderTop: '1px solid rgba(255,255,255,0.03)'
              }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                  {act.points.map((pt, pIdx) => (
                    <li key={pIdx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '0.2rem' }} aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
