import React, { useState } from 'react';
import { MapPin, Mail, Facebook, Shield, PlusCircle, Edit, Menu, X, MessageCircle } from 'lucide-react';

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
      <header className="main-header sticky-top" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
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
          <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <span className="d-flex align-items-center gap-1">
                <MapPin size={13} style={{ color: 'var(--accent-red)' }} /> Rua Francisco Mielzkovski, 173 - Itaiópolis - SC
              </span>
              <span className="d-flex align-items-center gap-1">
                <Mail size={13} style={{ color: 'var(--accent-red)' }} /> andersonkunicki@gmail.com
              </span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <a href="https://www.facebook.com/anderson.kunicki.9" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-1" style={{ color: '#93C5FD', textDecoration: 'none' }}>
                <Facebook size={13} /> /anderson.kunicki.9
              </a>
              <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>CRECI-SC 60173 F</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="container d-flex justify-content-between align-items-center" style={{ padding: '0.85rem 1rem' }}>
          <a href="#imoveis" onClick={() => setCurrentTab('catalog')} className="d-flex align-items-center gap-2 text-decoration-none">
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
          <nav className="desktop-nav d-none d-lg-flex align-items-center gap-3">
            <ul className="d-flex gap-4 list-unstyled m-0 p-0">
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
          <div className="d-flex align-items-center gap-2">
            {currentTab === 'admin' ? (
              <button className="btn btn-red btn-sm" onClick={onOpenAdminModal}>
                <PlusCircle size={16} /> <span>Criar Anúncio</span>
              </button>
            ) : (
              <a href="#admin" onClick={() => setCurrentTab('admin')} className="btn btn-outline-secondary btn-sm fw-semibold">
                <Edit size={16} /> <span className="d-none d-sm-inline">Editar</span>
              </a>
            )}

            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
              <MessageCircle size={16} /> <span className="d-none d-sm-inline">WhatsApp</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button 
              className="mobile-toggle-btn d-lg-none border-0 p-2 rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
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
        <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
              Anderson <span style={{ color: 'var(--accent-red)' }}>Kunicki</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>CRECI-SC 60173 F</div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="border-0 bg-transparent text-muted">
            <X size={24} />
          </button>
        </div>

        <nav className="d-flex flex-column gap-2">
          {navItems.map(item => (
            <a
              key={item.id}
              href={item.hash}
              onClick={() => { setCurrentTab(item.id); setMobileOpen(false); }}
              className="d-flex align-items-center gap-2 p-3 rounded text-decoration-none fw-bold"
              style={{
                fontSize: '1rem',
                color: currentTab === item.id ? '#FFFFFF' : 'var(--primary-dark)',
                backgroundColor: currentTab === item.id ? 'var(--primary-navy)' : 'var(--bg-main)',
                transition: 'var(--transition)'
              }}
            >
              {item.isSpecial && <Shield size={18} style={{ color: currentTab === item.id ? '#FFFFFF' : 'var(--accent-red)' }} />}
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-3 border-top">
          <a 
            href={waUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-whatsapp w-100 p-2"
          >
            <MessageCircle size={18} /> WhatsApp Direto
          </a>
        </div>
      </aside>
    </>
  );
}
