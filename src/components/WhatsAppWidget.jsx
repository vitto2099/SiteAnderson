import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const WHATSAPP_NUMBER = "5547999999999";

  const handleSend = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(message || "Olá Anderson! Vim pelo site e gostaria de atendimento.");
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${text}`, '_blank');
    setOpen(false);
    setMessage('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999 }}>
      {/* Popover Window */}
      {open && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)',
          width: '320px',
          marginBottom: '1rem',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{
            backgroundColor: '#075E54',
            color: '#FFFFFF',
            padding: '1rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Anderson Kunicki</strong>
              <small style={{ fontSize: '0.75rem', opacity: 0.9 }}>Corretor Imobiliário • Online</small>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: '#FFFFFF' }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#ECE5DD', minHeight: '100px', fontSize: '0.875rem' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '0.75rem',
              borderRadius: '8px',
              maxWidth: '85%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              color: '#333'
            }}>
              Olá! 👋 Como posso ajudar você a encontrar o imóvel ideal em Itaiópolis?
            </div>
          </div>

          <form onSubmit={handleSend} style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Escreva sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
            />
            <button type="submit" className="btn btn-whatsapp btn-sm" style={{ padding: '0.5rem 0.75rem' }}>
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
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
