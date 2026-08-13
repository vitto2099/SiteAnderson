import React from 'react';
import { MapPin, Mail, Facebook, Phone, Award, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config';

export default function AboutContact() {
  const waUrl = getWhatsAppUrl("Olá Anderson! Vim pelo site e gostaria de tirar algumas dúvidas.");

  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-main)' }} id="sobre">
      <div className="container">
        
        {/* Main About Card */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          marginBottom: '4rem'
        }}>
          <div style={{ backgroundColor: 'var(--primary-dark)', position: 'relative', minHeight: '380px' }}>
            <img 
              src="/510202027_30090792963900878_3408129173499351369_n.jpg" 
              alt="Anderson Kunicki Corretor Imobiliário" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'; }}
            />
          </div>

          <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'var(--accent-red-subtle)',
              color: 'var(--accent-red)',
              fontWeight: 700,
              fontSize: '0.85rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1rem',
              width: 'fit-content'
            }}>
              CRECI-SC 60173 F
            </div>

            <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
              Anderson Kunicki
            </h2>

            <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Procurando uma parceria de sucesso para vender ou comprar seu imóvel em Itaiópolis e região? Oferecemos assessoria imobiliária completa com total transparência, avaliação justa de mercado e segurança em cada etapa da negociação.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-navy)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>Escritório Físico</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Rua Francisco Mielzkovski, 173 - Itaiópolis - SC, 89340-000, Brasil</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-navy)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>E-mail de Contato</strong>
                  <a href="mailto:andersonkunicki@gmail.com" style={{ color: 'var(--accent-red)', fontWeight: 600 }}>
                    andersonkunicki@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1877F2', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Facebook size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>Facebook Oficial</strong>
                  <a href="https://www.facebook.com/anderson.kunicki.9" target="_blank" rel="noopener noreferrer" style={{ color: '#1877F2', fontWeight: 600 }}>
                    facebook.com/anderson.kunicki.9
                  </a>
                </div>
              </div>
            </div>

            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: 'fit-content' }}>
              <Phone size={18} /> Conversar pelo WhatsApp
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.5rem', textAlign: 'center' }}>
            Nossa Localização em Itaiópolis - SC
          </h3>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
            Venha nos fazer uma visita ou agende seu horário de atendimento.
          </p>
        </div>

        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-subtle)', height: '420px', width: '100%' }}>
          <iframe 
            title="Mapa de Localização - Anderson Kunicki"
            src="https://maps.google.com/maps?q=Rua%20Francisco%20Mielzkovski,%20173%20Itai%C3%B3polis%20-%20SC&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
}
