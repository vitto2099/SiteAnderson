import React from 'react';
import { Search, Award, MapPin, Building, Home, CheckCircle } from 'lucide-react';

export default function Hero({ filters, setFilters, onSearch }) {
  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(7, 23, 44, 0.9), rgba(19, 64, 116, 0.85)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80") center/cover no-repeat',
      padding: '4rem 0 6rem',
      color: '#FFFFFF'
    }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '850px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '0.4rem 1.1rem',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.25rem',
          color: '#F8FAFC'
        }}>
          <Award size={16} style={{ color: 'var(--gold-primary)' }} />
          Parceria de Sucesso para Vender ou Comprar seu Imóvel
        </div>

        <h1 style={{ fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Imóveis Exclusivos em <span style={{ color: '#93C5FD' }}>Itaiópolis & Região</span>
        </h1>
        
        <p style={{ fontSize: '1.15rem', opacity: 0.9, marginBottom: '2.5rem', fontWeight: 300, lineHeight: 1.6 }}>
          Atendimento personalizado com segurança jurídica, transparência e conhecimento do mercado imobiliário local.
        </p>

        {/* Quick Search Floating Box */}
        <div className="glass-card" style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          textAlign: 'left',
          color: 'var(--text-dark)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-navy)', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>
                O que você procura?
              </label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Bairro, rua ou palavra-chave..."
                value={filters.keyword}
                onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-navy)', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>
                Finalidade
              </label>
              <select 
                className="input-field"
                value={filters.purpose}
                onChange={(e) => setFilters(prev => ({ ...prev, purpose: e.target.value }))}
              >
                <option value="todos">Todas (Venda / Aluguel)</option>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-navy)', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>
                Tipo de Imóvel
              </label>
              <select 
                className="input-field"
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="todos">Todos os Tipos</option>
                <option value="casa">Casa</option>
                <option value="terreno">Terreno</option>
                <option value="sitio">Sítio / Chácara</option>
                <option value="apartamento">Apartamento</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            <div>
              <button 
                className="btn btn-red" 
                onClick={onSearch}
                style={{ width: '100%', height: '46px' }}
              >
                <Search size={18} /> Buscar Imóveis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
