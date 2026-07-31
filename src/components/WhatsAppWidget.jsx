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
        <div className="card shadow-lg border-0 mb-3" style={{ width: '320px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div className="card-header border-0 text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: '#075E54', padding: '0.85rem 1.1rem' }}>
            <div>
              <strong className="d-block" style={{ fontSize: '0.95rem' }}>Anderson Kunicki</strong>
              <small style={{ fontSize: '0.75rem', opacity: 0.9 }}>Corretor Imobiliário • Online</small>
            </div>
            <button onClick={() => setOpen(false)} className="btn text-white p-0 border-0">
              <X size={18} />
            </button>
          </div>

          <div className="card-body" style={{ backgroundColor: '#ECE5DD', minHeight: '100px', fontSize: '0.875rem' }}>
            <div className="bg-white p-2 rounded shadow-sm text-dark" style={{ maxWidth: '85%' }}>
              Olá! Como posso ajudar você a encontrar o imóvel ideal em Itaiópolis?
            </div>
          </div>

          <form onSubmit={handleSend} className="card-footer bg-white p-2 border-top d-flex gap-2">
            <input 
              type="text" 
              className="form-control form-control-sm" 
              placeholder="Escreva sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-whatsapp btn-sm">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button 
        onClick={() => setOpen(!open)}
        className="btn btn-whatsapp rounded-circle p-0 d-flex align-items-center justify-content-center shadow-lg"
        style={{
          width: '60px',
          height: '60px',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)'
        }}
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
