import React, { useState } from 'react';
import { X, MapPin, Maximize2, Bed, Bath, Car, CheckCircle2, MessageCircle, Calculator, Share2, Copy, Check } from 'lucide-react';
import FinancingCalculator from './FinancingCalculator';
import { getWhatsAppUrl } from '../config';

export default function PropertyModal({ property, onClose }) {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImg, setSelectedImg] = useState(property.imageUrl);
  const [copied, setCopied] = useState(false);

  if (!property) return null;

  const formatMoney = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const waUrl = getWhatsAppUrl(`Olá Anderson Kunicki! Gostaria de agendar uma visita para o imóvel: "${property.title}" (Ref: ${property.id}) no valor de ${formatMoney(property.price)}.`);

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#imoveis`;
    navigator.clipboard.writeText(`${shareUrl}\nConfira este imóvel: ${property.title} (${formatMoney(property.price)})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const allImages = property.images && property.images.length > 0 ? property.images : [property.imageUrl];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
        
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--bg-card)',
          zIndex: 10
        }}>
          <div>
            <span className={`badge ${property.purpose === 'venda' ? 'badge-venda' : 'badge-aluguel'}`}>
              {property.purpose.toUpperCase()}
            </span>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', marginTop: '0.25rem' }}>
              {property.title}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleCopyLink}
              className="btn btn-outline btn-sm"
              title="Copiar dados para compartilhar"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
            >
              {copied ? <Check size={15} style={{ color: '#16A34A' }} /> : <Share2 size={15} />}
              {copied ? 'Copiado!' : 'Compartilhar'}
            </button>

            <button 
              onClick={onClose} 
              style={{ padding: '0.4rem', borderRadius: '50%', backgroundColor: 'var(--bg-main)', color: 'var(--text-muted)' }}
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem' }}>
          {/* Photo Viewer */}
              <div style={{ height: '380px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem', position: 'relative' }}>
                <img 
                  src={selectedImg} 
                  alt={property.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'; }}
                />
              </div>

              {/* Image Thumbnails Strip */}
              {allImages.length > 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                  {allImages.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt="" 
                      onClick={() => setSelectedImg(img)}
                      style={{
                        width: '80px',
                        height: '60px',
                        borderRadius: 'var(--radius-sm)',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: selectedImg === img ? '2.5px solid var(--accent-red)' : '1px solid var(--border-subtle)',
                        opacity: selectedImg === img ? 1 : 0.7
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Price & Address Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={16} style={{ color: 'var(--accent-red)' }} />
                    <span>{property.address}, {property.neighborhood} - {property.city}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                    Código de Referência: <strong>{property.id}</strong>
                  </div>
                </div>

                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 800, color: 'var(--accent-red)' }}>
                  {formatMoney(property.price)} {property.purpose === 'aluguel' ? <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mês</span> : ''}
                </div>
              </div>

              {/* Specs Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {property.area > 0 && (
                  <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600 }}>
                    <Maximize2 size={16} style={{ color: 'var(--primary-blue)', verticalAlign: 'middle', marginRight: '0.35rem' }} />
                    Área: {property.area} m²
                  </div>
                )}
                {property.bedrooms > 0 && (
                  <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600 }}>
                    <Bed size={16} style={{ color: 'var(--primary-blue)', verticalAlign: 'middle', marginRight: '0.35rem' }} />
                    Quartos: {property.bedrooms}
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600 }}>
                    <Bath size={16} style={{ color: 'var(--primary-blue)', verticalAlign: 'middle', marginRight: '0.35rem' }} />
                    Banheiros: {property.bathrooms}
                  </div>
                )}
                {property.garages > 0 && (
                  <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600 }}>
                    <Car size={16} style={{ color: 'var(--primary-blue)', verticalAlign: 'middle', marginRight: '0.35rem' }} />
                    Vagas: {property.garages}
                  </div>
                )}
              </div>

              {/* Features Tags */}
              {property.features && property.features.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>Diferenciais & Comodidades</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {property.features.map((feat, idx) => (
                      <span key={idx} style={{
                        backgroundColor: 'var(--accent-red-subtle)',
                        color: 'var(--accent-red)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        <CheckCircle2 size={14} /> {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Descrição Completa</h4>
                <p style={{ color: 'var(--text-body)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{property.description}</p>
              </div>

              {/* Broker Contact Box */}
              <div style={{
                backgroundColor: 'var(--primary-dark)',
                color: '#FFFFFF',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem' }}>Anderson Kunicki - Corretor Imobiliário</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>CRECI-SC 60173 F • Atendimento direto via WhatsApp</p>
                </div>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ padding: '0.75rem 1.5rem' }}>
                  <MessageCircle size={18} /> Agendar Visita via WhatsApp
                </a>
              </div>
        </div>
      </div>
    </div>
  );
}
