import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function PropertyFilters({ filters, setFilters, totalCount, onReset }) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      padding: '1.25rem 1.5rem',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)',
      marginBottom: '2rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        {/* Purpose Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'todos', label: 'Todos os Imóveis' },
            { id: 'venda', label: 'À Venda' },
            { id: 'aluguel', label: 'Para Alugar' }
          ].map(pill => (
            <button
              key={pill.id}
              onClick={() => setFilters(prev => ({ ...prev, purpose: pill.id }))}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: filters.purpose === pill.id ? 'var(--primary-navy)' : 'var(--bg-main)',
                color: filters.purpose === pill.id ? '#FFFFFF' : 'var(--text-body)',
                border: '1px solid ' + (filters.purpose === pill.id ? 'var(--primary-navy)' : 'var(--border-subtle)'),
                transition: 'var(--transition)'
              }}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Counter & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {totalCount} imóvel(is) encontrado(s)
          </span>
          <button 
            onClick={onReset} 
            className="btn btn-outline btn-sm"
            title="Limpar todos os filtros"
          >
            <RotateCcw size={14} /> Limpar
          </button>
        </div>
      </div>

      {/* Extended Filters row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>
            Tipo de Imóvel
          </label>
          <select 
            className="input-field" 
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.875rem' }}
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
          >
            <option value="todos">Todos os Tipos</option>
            <option value="casa">Casas</option>
            <option value="terreno">Terrenos</option>
            <option value="sitio">Sítios & Chácaras</option>
            <option value="apartamento">Apartamentos</option>
            <option value="comercial">Salas Comerciais</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>
            Dormitórios
          </label>
          <select 
            className="input-field" 
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.875rem' }}
            value={filters.bedrooms}
            onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
          >
            <option value="todos">Qualquer quantidade</option>
            <option value="1">1+ Quartos</option>
            <option value="2">2+ Quartos</option>
            <option value="3">3+ Quartos</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>
            Preço Máximo
          </label>
          <select 
            className="input-field" 
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.875rem' }}
            value={filters.maxPrice}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
          >
            <option value="Infinity">Sem limite de preço</option>
            <option value="200000">Até R$ 200.000</option>
            <option value="400000">Até R$ 400.000</option>
            <option value="600000">Até R$ 600.000</option>
            <option value="1000000">Até R$ 1.000.000</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>
            Palavra-chave
          </label>
          <input 
            type="text"
            className="input-field"
            placeholder="Ex: Suíte, Centro..."
            style={{ padding: '0.55rem 0.85rem', fontSize: '0.875rem' }}
            value={filters.keyword}
            onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
}
