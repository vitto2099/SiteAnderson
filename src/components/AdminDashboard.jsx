import React, { useState } from 'react';
import { Building, Star, Tag, Key, Plus, Edit, Trash2, RotateCcw, Search, Eye, Filter, CheckCircle } from 'lucide-react';

export default function AdminDashboard({ properties, onOpenAddModal, onEditProperty, onDeleteProperty, onToggleFeatured, onResetDefaults, onSelectProperty }) {
  const [adminTab, setAdminTab] = useState('list'); // 'list' | 'stats'
  const [searchTerm, setSearchTerm] = useState('');
  const [purposeFilter, setPurposeFilter] = useState('todos');

  const total = properties.length;
  const featured = properties.filter(p => p.featured).length;
  const sale = properties.filter(p => p.purpose === 'venda').length;
  const rent = properties.filter(p => p.purpose === 'aluguel').length;

  const filteredProperties = properties.filter(p => {
    if (purposeFilter !== 'todos' && p.purpose !== purposeFilter) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.id.toLowerCase().includes(term) ||
      p.neighborhood.toLowerCase().includes(term) ||
      p.type.toLowerCase().includes(term)
    );
  });

  const formatMoney = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section style={{ padding: '4rem 0', backgroundColor: '#EEF2F6', minHeight: '85vh' }} id="admin-panel">
      <div className="container">
        
        {/* Admin Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Painel Restrito • CRECI-SC 60173 F
            </span>
            <h2 style={{ fontSize: '2.1rem', color: 'var(--primary-dark)', margin: '0.25rem 0' }}>
              Gestão de Anúncios Imobiliários
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-outline" onClick={onResetDefaults}>
              <RotateCcw size={16} /> Restaurar Exemplo
            </button>
            <button className="btn btn-red" onClick={onOpenAddModal}>
              <Plus size={18} /> Novo Anúncio
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(19, 64, 116, 0.1)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{total}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Imóveis Cadastrados</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#B48B1B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{featured}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Em Destaque</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(200, 29, 37, 0.1)', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tag size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{sale}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>À Venda</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(37, 211, 102, 0.15)', color: '#1EBE5D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Key size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{rent}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Para Alugar</div>
            </div>
          </div>
        </div>

        {/* Dedicated Admin Action Header Bar */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '260px' }}>
            <Search size={18} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Buscar imóvel por código, título ou bairro no painel..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', padding: '0.2rem 0' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Filtrar:</span>
            <select 
              className="input-field" 
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value)}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', width: 'auto' }}
            >
              <option value="todos">Todos</option>
              <option value="venda">Apenas Venda</option>
              <option value="aluguel">Apenas Aluguel</option>
            </select>
          </div>
        </div>

        {/* Listings Table */}
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', overflowX: 'auto', boxShadow: 'var(--shadow-sm)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F1F5F9', color: 'var(--primary-dark)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '1rem 1.25rem' }}>Foto</th>
                <th style={{ padding: '1rem 1.25rem' }}>Título / Ref</th>
                <th style={{ padding: '1rem 1.25rem' }}>Finalidade</th>
                <th style={{ padding: '1rem 1.25rem' }}>Tipo</th>
                <th style={{ padding: '1rem 1.25rem' }}>Valor</th>
                <th style={{ padding: '1rem 1.25rem' }}>Destaque</th>
                <th style={{ padding: '1rem 1.25rem' }}>Ações de Edição</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    Nenhum imóvel encontrado para edição com os critérios informados.
                  </td>
                </tr>
              ) : (
                filteredProperties.map(prop => (
                  <tr key={prop.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <img 
                        src={prop.imageUrl} 
                        alt={prop.title} 
                        style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80'; }}
                      />
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <strong style={{ color: 'var(--primary-dark)' }}>{prop.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{prop.id} • {prop.neighborhood}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <span className={`badge ${prop.purpose === 'venda' ? 'badge-venda' : 'badge-aluguel'}`}>
                        {prop.purpose.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', textTransform: 'capitalize' }}>{prop.type}</td>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>{formatMoney(prop.price)}</td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <button 
                        onClick={() => onToggleFeatured(prop.id)}
                        style={{ color: prop.featured ? 'var(--gold-primary)' : 'var(--text-light)', cursor: 'pointer' }}
                        title="Alternar Imóvel em Destaque"
                      >
                        <Star size={20} fill={prop.featured ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => onSelectProperty(prop)} title="Visualizar">
                          <Eye size={14} />
                        </button>
                        <button className="btn btn-navy btn-sm" onClick={() => onEditProperty(prop)} title="Editar Anúncio">
                          <Edit size={14} /> Editar
                        </button>
                        <button className="btn btn-outline btn-sm" onClick={() => onDeleteProperty(prop.id)} style={{ color: 'var(--accent-red)' }} title="Excluir">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
