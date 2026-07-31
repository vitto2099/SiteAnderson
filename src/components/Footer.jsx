import React from 'react';
import { MapPin, Mail, Facebook, Phone, Shield } from 'lucide-react';

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
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem' }}>
              Corretor Imobiliário • CRECI-SC 60173 F
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Sua referência em negócios imobiliários seguros em Itaiópolis e região. Compra, venda, aluguel e administração de imóveis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--accent-red)', width: 'fit-content', paddingBottom: '0.35rem' }}>
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
              <li>
                <button onClick={() => setCurrentTab('catalog')} style={{ color: '#CBD5E1', fontSize: '0.9rem' }}>
                  Imóveis Disponíveis
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('financing')} style={{ color: '#CBD5E1', fontSize: '0.9rem' }}>
                  Simulador de Financiamento
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} style={{ color: '#CBD5E1', fontSize: '0.9rem' }}>
                  Sobre & Contato
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('admin')} style={{ color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 700 }}>
                  Painel de Gestão (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--accent-red)', width: 'fit-content', paddingBottom: '0.35rem' }}>
              Atendimento Direct
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: 0, fontSize: '0.9rem', color: '#CBD5E1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} style={{ color: 'var(--accent-red)' }} />
                <span>Rua Francisco Mielzkovski, 173 - Itaiópolis - SC</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} style={{ color: 'var(--accent-red)' }} />
                <a href="mailto:andersonkunicki@gmail.com" style={{ color: 'inherit' }}>andersonkunicki@gmail.com</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Facebook size={16} style={{ color: '#1877F2' }} />
                <a href="https://www.facebook.com/anderson.kunicki.9" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  facebook.com/anderson.kunicki.9
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#64748B'
        }}>
          <div>
            &copy; 2026 Anderson Kunicki - Corretor Imobiliário (CRECI-SC 60173 F). Todos os direitos reservados.
          </div>
          <div>
            Desenvolvido com padrão visual exclusivo e tecnologia React.
          </div>
        </div>
      </div>
    </footer>
  );
}
