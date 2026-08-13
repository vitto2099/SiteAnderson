import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const customMsg = message || "Olá Anderson! Vim pelo site e gostaria de atendimento.";
    window.open(getWhatsAppUrl(customMsg), '_blank');
    setOpen(false);
    setMessage('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999 }}>
      {/* Popover Window */}
      {open && (
        <div style={{
          width: '330px',
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 12px 32px rgba(7, 23, 44, 0.22)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1rem',
          animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#075E54',
            color: '#FFFFFF',
            padding: '1rem 1.15rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#128C7E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: '2px solid #25D366'
              }}>
                AK
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', lineHeight: 1.2 }}>{SITE_CONFIG.brokerName}</strong>
                <span style={{ fontSize: '0.75rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#25D366', display: 'inline-block' }}></span>
                  {SITE_CONFIG.creci} • Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              style={{ color: '#FFFFFF', opacity: 0.85, padding: '0.2rem', borderRadius: '50%' }}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div style={{
            backgroundColor: '#E5DDD5',
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 0)',
            backgroundSize: '12px 12px',
            padding: '1.25rem 1rem',
            minHeight: '110px'
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '0.75rem 1rem',
              borderRadius: '0 14px 14px 14px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              color: 'var(--text-dark)',
              fontSize: '0.875rem',
              lineHeight: 1.45,
              maxWidth: '90%'
            }}>
              Olá! 👋 Como posso ajudar você a encontrar ou negociar seu imóvel ideal em Itaiópolis e região?
              <div style={{ fontSize: '0.68rem', color: '#94A3B8', textAlign: 'right', marginTop: '0.35rem' }}>Agora</div>
            </div>
          </div>

          {/* Footer Form */}
          <form 
            onSubmit={handleSend} 
            style={{
              padding: '0.75rem 0.85rem',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}
          >
            <input 
              type="text" 
              className="input-field" 
              placeholder="Escreva sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.55rem 0.85rem' }}
            />
            <button 
              type="submit" 
              className="btn btn-whatsapp"
              style={{ padding: '0.55rem 0.85rem', borderRadius: 'var(--radius-md)' }}
              title="Enviar no WhatsApp"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button 
        onClick={() => setOpen(!open)}
        className="btn btn-whatsapp"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          padding: 0,
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Abrir conversa no WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
