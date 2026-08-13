import React, { useState } from 'react';
import { MapPin, Mail, Facebook, Shield, PlusCircle, Menu, X, MessageCircle, User } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config';

export default function Header({ currentTab, setCurrentTab, onOpenAdminModal, currentUser, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const waUrl = getWhatsAppUrl("Olá Anderson! Gostaria de informações sobre os imóveis disponíveis.");

  const navItems = [
    { id: 'catalog', label: 'Imóveis', hash: '#imoveis' },
    { id: 'about', label: 'Sobre & Contato', hash: '#sobre' },
    { id: 'admin', label: 'Painel Admin', hash: '#admin', isSpecial: true }
  ];

  return (
    <>
      <header className="main-header sticky-top" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'var(--shadow-md)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Top bar info */}
        <div style={{
          backgroundColor: 'var(--primary-dark)',
          color: '#CBD5E1',
          fontSize: '0.8rem',
          padding: '0.45rem 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={13} style={{ color: 'var(--accent-red)' }} /> {SITE_CONFIG.address.split('-')[0]} - Itaiópolis - SC
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Mail size={13} style={{ color: 'var(--accent-red)' }} /> {SITE_CONFIG.email}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <a href={SITE_CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#93C5FD', textDecoration: 'none' }}>
                <Facebook size={13} /> /anderson.kunicki.9
              </a>
              <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>{SITE_CONFIG.creci}</span>
            </div>
          </div>
        </div>

        {/* Main navigation bar */}
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem' }}>
          {/* Logo & Brand */}
          <a href="#imoveis" onClick={() => setCurrentTab('catalog')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img 
              src="/510202027_30090792963900878_3408129173499351369_n.jpg" 
              alt="Anderson Kunicki Corretor Imobiliário" 
              style={{ height: '44px', width: 'auto', borderRadius: '6px', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Anderson <span style={{ color: 'var(--accent-red)' }}>Kunicki</span>
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Corretor Imobiliário • {SITE_CONFIG.creci}
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
            <ul style={{ display: 'flex', gap: '1.75rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
              {navItems.map(item => (
                <li key={item.id} style={{ margin: 0, padding: 0 }}>
                  <a 
                    href={item.hash}
                    onClick={() => setCurrentTab(item.id)}
                    style={{ 
                      fontWeight: item.isSpecial ? 700 : 600, 
                      color: currentTab === item.id ? 'var(--accent-red)' : (item.isSpecial ? 'var(--primary-blue)' : 'var(--primary-dark)'), 
                      fontSize: '0.95rem', 
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      backgroundColor: item.isSpecial && currentTab === 'admin' ? 'var(--accent-red-subtle)' : 'transparent',
                      padding: item.isSpecial ? '0.35rem 0.75rem' : '0',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    {item.isSpecial && <Shield size={16} />} {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {currentTab === 'admin' && currentUser && (
              <button className="btn btn-red btn-sm" onClick={onOpenAdminModal} style={{ fontWeight: 700 }}>
                <PlusCircle size={16} /> <span>Novo Anúncio</span>
              </button>
            )}

            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm" style={{ fontWeight: 700 }}>
              <MessageCircle size={16} /> <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                backgroundColor: 'var(--bg-main)',
                color: 'var(--primary-dark)',
                border: 'none',
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                alignItems: 'center',
                justifyContent: 'center'
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
              Anderson <span style={{ color: 'var(--accent-red)' }}>Kunicki</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{SITE_CONFIG.creci}</div>
            {currentUser && (
              <div style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 700, marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <User size={12} /> Conectado: <strong>{currentUser}</strong>
              </div>
            )}
          </div>
          <button onClick={() => setMobileOpen(false)} style={{ border: 0, backgroundColor: 'transparent', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map(item => (
            <a 
              key={item.id}
              href={item.hash}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                fontWeight: 600,
                backgroundColor: currentTab === item.id ? 'var(--accent-red)' : 'transparent',
                color: currentTab === item.id ? '#FFFFFF' : 'var(--primary-dark)'
              }}
            >
              {item.isSpecial && <Shield size={18} />}
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
