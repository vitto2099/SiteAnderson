import React, { useState, useEffect } from 'react';
import { X, Send, CheckCheck } from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { SITE_CONFIG, getWhatsAppUrl } from '../../config';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (customText) => {
    const textToSend = customText || message || "Olá Anderson! Vim através do site e gostaria de atendimento.";
    window.open(getWhatsAppUrl(textToSend), '_blank');
    setOpen(false);
    setMessage('');
    setShowBubble(false);
  };

  const quickQuestions = [
    "Gostaria de agendar uma visita a um imóvel",
    "Quero avaliar meu imóvel para venda",
    "Dúvidas sobre simulação de financiamento"
  ];

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      
      {/* Floating Greeting Bubble (discreet notification) */}
      {!open && showBubble && (
        <div 
          onClick={() => { setOpen(true); setShowBubble(false); }}
          style={{
            backgroundColor: '#FFFFFF',
            color: 'var(--primary-dark)',
            padding: '0.65rem 1rem',
            borderRadius: '16px 16px 4px 16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '0.75rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            maxWidth: '260px'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E', display: 'inline-block', flexShrink: 0 }} />
          <span>Atendimento direto pelo WhatsApp</span>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
            style={{ color: 'var(--text-muted)', marginLeft: 'auto', padding: '0.1rem' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Popover Window */}
      {open && (
        <div style={{
          width: '330px',
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 20px 45px rgba(7, 21, 39, 0.3)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1rem',
          animation: 'modalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)',
            color: '#FFFFFF',
            padding: '1.1rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #25D366',
                backgroundColor: 'var(--primary-dark)',
                flexShrink: 0
              }}>
                <img 
                  src="/anderson-kunicki.jpg" 
                  alt="Anderson Kunicki" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', lineHeight: 1.2 }}>{SITE_CONFIG.brokerName}</strong>
                <span style={{ fontSize: '0.75rem', opacity: 0.95, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#25D366', display: 'inline-block' }}></span>
                  {SITE_CONFIG.creci} • Atendimento Direto
                </span>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              style={{ color: '#FFFFFF', opacity: 0.85, padding: '0.25rem', borderRadius: '50%', cursor: 'pointer' }}
              aria-label="Fechar conversa"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div style={{
            backgroundColor: '#EFEAE2',
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 0)',
            backgroundSize: '12px 12px',
            padding: '1.25rem 1rem',
            minHeight: '120px'
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '0.85rem 1.1rem',
              borderRadius: '0 14px 14px 14px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
              color: 'var(--text-dark)',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              maxWidth: '92%'
            }}>
              Olá! Seja bem-vindo ao nosso site. <br />
              Como posso orientar você na compra, venda ou locação de imóveis em Itaiópolis e região?
              <div style={{ fontSize: '0.65rem', color: '#94A3B8', textAlign: 'right', marginTop: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.2rem' }}>
                Agora <CheckCheck size={12} style={{ color: '#38BDF8' }} />
              </div>
            </div>

            {/* Quick Question Buttons */}
            <div style={{ marginTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(18, 140, 126, 0.25)',
                    color: '#075E54',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#25D366'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; e.currentTarget.style.borderColor = 'rgba(18, 140, 126, 0.25)'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(message); }} 
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
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.55rem 0.85rem', backgroundColor: 'var(--bg-subtle)' }}
            />
            <button 
              type="submit" 
              className="btn btn-whatsapp"
              style={{ padding: '0.55rem 0.9rem', borderRadius: 'var(--radius-sm)' }}
              title="Enviar mensagem no WhatsApp"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button with Pulsing Radar Ring */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          inset: '-6px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          opacity: 0.4,
          animation: 'radarWave 2.5s infinite ease-out',
          pointerEvents: 'none'
        }} />
        <button 
          onClick={() => { setOpen(!open); setShowBubble(false); }}
          className="btn btn-whatsapp"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            padding: 0,
            boxShadow: '0 8px 25px rgba(37, 211, 102, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 2
          }}
          aria-label="Abrir atendimento no WhatsApp"
        >
          <WhatsAppIcon size={32} color="#FFFFFF" />
        </button>
      </div>

    </div>
  );
}
