import React, { useState } from 'react';
import { Phone, Shield, PlusCircle, Edit, Menu, X, MessageCircle } from 'lucide-react';

export default function Header({ currentTab, setCurrentTab, onOpenAdminModal }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const WHATSAPP_NUMBER = "5547999999999";
  const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent("Olá Anderson! Gostaria de informações sobre os imóveis disponíveis.")}`;

  const navItems = [
    { id: 'catalog', label: 'Imóveis', hash: '#imoveis' },
    { id: 'financing', label: 'Simulador', hash: '#simulador' },
    { id: 'about', label: 'Sobre & Contato', hash: '#sobre' },
    { id: 'admin', label: 'Painel Admin', hash: '#admin', isSpecial: true }
  ];

  return (
    <>
      <header className="main-header" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'var(--shadow-md)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        {/* Top bar info */}
        <div style={{
          backgroundColor: 'var(--primary-dark)',
          color: '#CBD5E1',
          fontSize: '0.8rem',
          padding: '0.4rem 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>📍 Rua Francisco Mielzkovski, 173 - Itaiópolis - SC</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>✉️ andersonkunicki@gmail.com</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <a href="https://www.facebook.com/anderson.kunicki.9" target="_blank" rel="noopener noreferrer" style={{ color: '#93C5FD', textDecoration: 'none' }}>
                f /anderson.kunicki.9
              </a>
              <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>CRECI-SC 60173 F</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem' }}>
          <a href="#imoveis" onClick={() => setCurrentTab('catalog')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img 
              src="/510202027_30090792963900878_3408129173499351369_n.jpg" 
              alt="Anderson Kunicki Corretor Imobiliário" 
              style={{ height: '46px', width: 'auto', borderRadius: '6px', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Anderson <span style={{ color: 'var(--accent-red)' }}>Kunicki</span>
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Corretor Imobiliário • CRECI 60173 F
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navItems.map(item => (
                <li key={item.id}>
                  <a 
                    href={item.hash}
                    onClick={() => setCurrentTab(item.id)}
                    style={{ 
                      fontWeight: item.isSpecial ? 700 : 600, 
                      color: currentTab === item.id ? 'var(--accent-red)' : (item.isSpecial ? 'var(--primary-blue)' : 'var(--primary-dark)'), 
                      fontSize: '0.95rem', 
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      backgroundColor: item.isSpecial && currentTab === 'admin' ? 'var(--accent-red-subtle)' : 'transparent',
                      padding: item.isSpecial ? '0.35rem 0.75rem' : '0',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                    {item.isSpecial && <Shield size={16} />} {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action Buttons & Mobile Hamburger Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {currentTab === 'admin' ? (
              <button className="btn btn-red btn-sm" onClick={onOpenAdminModal}>
                <PlusCircle size={16} /> <span style={{ display: 'inline' }}>Criar Anúncio</span>
              </button>
            ) : (
              <a href="#admin" onClick={() => setCurrentTab('admin')} className="btn btn-outline btn-sm" style={{ fontWeight: 600 }}>
                <Edit size={16} /> <span style={{ display: 'none', smDisplay: 'inline' }}>Editar</span>
              </a>
            )}

            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
              <MessageCircle size={16} /> <span style={{ display: 'none', smDisplay: 'inline' }}>WhatsApp</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-main)',
                color: 'var(--primary-dark)'
              }}
              aria-label="Abrir Menu Mobile"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer Navigation Sidebar */}
      <aside className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
              Anderson <span style={{ color: 'var(--accent-red)' }}>Kunicki</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>CRECI-SC 60173 F</div>
          </div>
          <button onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {navItems.map(item => (
            <a
              key={item.id}
              href={item.hash}
              onClick={() => { setCurrentTab(item.id); setMobileOpen(false); }}
              style={{
                padding: '0.85rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '1rem',
                color: currentTab === item.id ? '#FFFFFF' : 'var(--primary-dark)',
                backgroundColor: currentTab === item.id ? 'var(--primary-navy)' : 'var(--bg-main)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}
            >
              {item.isSpecial && <Shield size={18} style={{ color: currentTab === item.id ? '#FFFFFF' : 'var(--accent-red)' }} />}
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
          <a 
            href={waUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-whatsapp" 
            style={{ width: '100%', padding: '0.85rem' }}
          >
            <MessageCircle size={18} /> WhatsApp Direto
          </a>
        </div>
      </aside>
    </>
  );
}
