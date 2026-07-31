import React, { useState } from 'react';
import { Phone, Shield, PlusCircle, Edit, Menu, X, MessageCircle } from 'lucide-react';

export default function Header({ currentTab, setCurrentTab, onOpenAdminModal }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const WHATSAPP_NUMBER = "5547999999999";
  const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent("Olá Anderson! Gostaria de informações sobre os imóveis disponíveis.")}`;

  return (
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
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span>📍 Rua Francisco Mielzkovski, 173 - Itaiópolis - SC</span>
            <span>✉️ andersonkunicki@gmail.com</span>
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
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.5rem' }}>
        <a href="#imoveis" onClick={() => setCurrentTab('catalog')} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
          <img 
            src="/510202027_30090792963900878_3408129173499351369_n.jpg" 
            alt="Anderson Kunicki Corretor Imobiliário" 
            style={{ height: '48px', width: 'auto', borderRadius: '6px', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', letterSpacing: '-0.02em' }}>
              Anderson <span style={{ color: 'var(--accent-red)' }}>Kunicki</span>
            </div>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Corretor Imobiliário • CRECI 60173 F
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <a 
                href="#imoveis"
                onClick={() => { setCurrentTab('catalog'); setMobileOpen(false); }} 
                style={{ fontWeight: 600, color: currentTab === 'catalog' ? 'var(--accent-red)' : 'var(--primary-dark)', fontSize: '0.95rem', textDecoration: 'none' }}>
                Imóveis
              </a>
            </li>
            <li>
              <a 
                href="#simulador"
                onClick={() => { setCurrentTab('financing'); setMobileOpen(false); }} 
                style={{ fontWeight: 600, color: currentTab === 'financing' ? 'var(--accent-red)' : 'var(--primary-dark)', fontSize: '0.95rem', textDecoration: 'none' }}>
                Simulador
              </a>
            </li>
            <li>
              <a 
                href="#sobre"
                onClick={() => { setCurrentTab('about'); setMobileOpen(false); }} 
                style={{ fontWeight: 600, color: currentTab === 'about' ? 'var(--accent-red)' : 'var(--primary-dark)', fontSize: '0.95rem', textDecoration: 'none' }}>
                Sobre & Contato
              </a>
            </li>
            <li>
              <a 
                href="#admin"
                onClick={() => { setCurrentTab('admin'); setMobileOpen(false); }} 
                style={{ 
                  fontWeight: 700, 
                  color: currentTab === 'admin' ? 'var(--accent-red)' : 'var(--primary-blue)', 
                  fontSize: '0.95rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.35rem',
                  textDecoration: 'none',
                  backgroundColor: currentTab === 'admin' ? 'var(--accent-red-subtle)' : 'transparent',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)'
                }}>
                <Shield size={16} /> Painel Admin
              </a>
            </li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {currentTab === 'admin' ? (
            <button className="btn btn-red btn-sm" onClick={onOpenAdminModal}>
              <PlusCircle size={16} /> Criar Anúncio
            </button>
          ) : (
            <a href="#admin" onClick={() => setCurrentTab('admin')} className="btn btn-outline btn-sm" style={{ fontWeight: 600 }}>
              <Edit size={16} /> Editar Anúncios
            </a>
          )}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
