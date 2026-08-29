import React from 'react';
import { MapPin, Mail, Facebook, Instagram, ShieldCheck, Github } from 'lucide-react';
import { SITE_CONFIG } from '../../config';

export default function Footer({ setCurrentTab }) {
  return (
    <footer style={{
      backgroundColor: 'var(--primary-dark)',
      color: '#FFFFFF',
      padding: '4rem 0 2rem',
      borderTop: '4px solid var(--accent-red)'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem' }}>
              Anderson <span style={{ color: 'var(--accent-red)' }}>Kunicki</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.04em' }}>
              Corretor Imobiliário • {SITE_CONFIG.creci}
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Sua referência em negócios imobiliários transparentes e seguros em Itaiópolis e toda a região norte catarinense.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--accent-red)', width: 'fit-content', paddingBottom: '0.35rem', fontWeight: 700 }}>
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
              <li>
                <button onClick={() => setCurrentTab('home')} style={{ color: '#CBD5E1', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left', background: 'none', border: 'none', padding: 0 }}>
                  Imóveis Disponíveis
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} style={{ color: '#CBD5E1', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left', background: 'none', border: 'none', padding: 0 }}>
                  Sobre & Contato
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('privacy')} style={{ color: '#CBD5E1', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left', background: 'none', border: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={14} style={{ color: 'var(--gold-primary)' }} /> Política de Privacidade
                </button>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--accent-red)', width: 'fit-content', paddingBottom: '0.35rem', fontWeight: 700 }}>
              Atendimento Direto
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: 0, fontSize: '0.9rem', color: '#CBD5E1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} style={{ color: 'var(--accent-red)', flexShrink: 0 }} />
                <span>{SITE_CONFIG.fullAddress}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} style={{ color: 'var(--accent-red)', flexShrink: 0 }} />
                <a href={`mailto:${SITE_CONFIG.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{SITE_CONFIG.email}</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Instagram size={15} style={{ color: '#E1306C', flexShrink: 0 }} />
                <a href={SITE_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {SITE_CONFIG.instagramHandle || '@kunickianderson'}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Facebook size={15} style={{ color: '#1877F2', flexShrink: 0 }} />
                <a href={SITE_CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  facebook.com/anderson.kunicki.9
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#64748B'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span>
              &copy; {new Date().getFullYear()} Anderson Kunicki - Corretor Imobiliário ({SITE_CONFIG.creci}).
            </span>
            <button 
              onClick={() => setCurrentTab('privacy')} 
              style={{ color: '#94A3B8', textDecoration: 'underline', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.82rem' }}
            >
              Privacidade & Termos (LGPD)
            </button>
          </div>
          <div>
            Desenvolvido por <strong style={{ color: '#E2E8F0' }}>Vitor Kunicki</strong>{' '}
            <a 
              href="https://github.com/vitto2099" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: '#93C5FD', 
                fontWeight: 600, 
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginLeft: '0.25rem'
              }}
            >
              <Github size={13} /> @vitto2099
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
