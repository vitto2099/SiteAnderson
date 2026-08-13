import React from 'react';
import { MapPin, Maximize2, Bed, Bath, Car, Star, Eye, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config';

export default function PropertyCard({ property, onSelectProperty }) {
  const formatMoney = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const waUrl = getWhatsAppUrl(`Olá Anderson Kunicki! Tenho interesse no imóvel: "${property.title}" (Ref: ${property.id}) - Valor: ${formatMoney(property.price)}.`);

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'var(--transition)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Image & Overlay */}
      <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'; }}
        />
        
        {/* Badges */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', zIndex: 2 }}>
          <span className={`badge ${property.purpose === 'venda' ? 'badge-venda' : 'badge-aluguel'}`}>
            {property.purpose.toUpperCase()}
          </span>
          {property.featured && (
            <span className="badge badge-featured">
              <Star size={12} fill="currentColor" /> Destaque
            </span>
          )}
          {property.status === 'vendido' && (
            <span className="badge badge-sold">Vendido / Locado</span>
          )}
        </div>

        {/* Price tag overlay */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          backgroundColor: 'rgba(7, 23, 44, 0.9)',
          backdropFilter: 'blur(4px)',
          color: '#FFFFFF',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 800,
          fontSize: '1.15rem'
        }}>
          {formatMoney(property.price)}{property.purpose === 'aluguel' ? <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>/mês</span> : ''}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-red)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          {property.type}
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {property.title}
        </h3>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1rem' }}>
          <MapPin size={15} style={{ color: 'var(--accent-red)' }} />
          <span>{property.neighborhood}, {property.city}</span>
        </div>

        {/* Features Specs Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 0',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '1.25rem',
          fontSize: '0.85rem',
          color: 'var(--text-body)'
        }}>
          {property.area > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <Maximize2 size={15} style={{ color: 'var(--primary-blue)' }} /> {property.area} m²
            </div>
          )}
          {property.bedrooms > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <Bed size={15} style={{ color: 'var(--primary-blue)' }} /> {property.bedrooms} qts
            </div>
          )}
          {property.bathrooms > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <Bath size={15} style={{ color: 'var(--primary-blue)' }} /> {property.bathrooms} banh
            </div>
          )}
          {property.garages > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <Car size={15} style={{ color: 'var(--primary-blue)' }} /> {property.garages} vg
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <button 
            className="btn btn-outline" 
            style={{ flex: 1, fontSize: '0.85rem', padding: '0.55rem' }}
            onClick={() => onSelectProperty(property)}
          >
            <Eye size={16} /> Ver Detalhes
          </button>

          <a 
            href={waUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-whatsapp" 
            style={{ flex: 1, fontSize: '0.85rem', padding: '0.55rem' }}
          >
            <MessageCircle size={16} /> Contato
          </a>
        </div>
      </div>
    </div>
  );
}
