import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import PropertyFilters from './components/PropertyFilters';
import PropertyModal from './components/PropertyModal';
import FinancingCalculator from './components/FinancingCalculator';
import AdminDashboard from './components/AdminDashboard';
import PropertyFormModal from './components/PropertyFormModal';
import AboutContact from './components/AboutContact';
import WhatsAppWidget from './components/WhatsAppWidget';
import Footer from './components/Footer';
import { INITIAL_PROPERTIES } from './data/properties';
import { Building, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'anderson_kunicki_react_properties_v1';

// Helper to resolve hash to tab
function getTabFromHash(hash) {
  const cleanHash = hash.replace('#', '').toLowerCase();
  if (cleanHash === 'admin' || cleanHash === 'gerenciar') return 'admin';
  if (cleanHash === 'simulador' || cleanHash === 'financiamento') return 'financing';
  if (cleanHash === 'sobre' || cleanHash === 'contato') return 'about';
  return 'catalog';
}

export default function App() {
  const [properties, setProperties] = useState([]);
  const [currentTab, setCurrentTabState] = useState(() => getTabFromHash(window.location.hash));
  const [selectedPropertyModal, setSelectedPropertyModal] = useState(null);
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const [toastMessage, setToastMessage] = useState('');

  const [filters, setFilters] = useState({
    keyword: '',
    purpose: 'todos',
    type: 'todos',
    bedrooms: 'todos',
    maxPrice: 'Infinity'
  });

  // Sync tab with URL Hash
  const setCurrentTab = (tabName) => {
    setCurrentTabState(tabName);
    const hashMap = {
      catalog: 'imoveis',
      financing: 'simulador',
      about: 'sobre',
      admin: 'admin'
    };
    window.location.hash = hashMap[tabName] || 'imoveis';
  };

  useEffect(() => {
    const handleHashChange = () => {
      const tab = getTabFromHash(window.location.hash);
      setCurrentTabState(tab);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Load properties on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProperties(JSON.parse(stored));
      } catch (e) {
        setProperties(INITIAL_PROPERTIES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
      }
    } else {
      setProperties(INITIAL_PROPERTIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
    }
  }, []);

  const saveProperties = (updatedProps) => {
    setProperties(updatedProps);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProps));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Property CRUD handlers
  const handleSaveProperty = (formData, editId) => {
    if (editId) {
      const updated = properties.map(p => p.id === editId ? { ...p, ...formData } : p);
      saveProperties(updated);
      showToast('Anúncio atualizado com sucesso!');
    } else {
      const newProp = {
        id: `prop-${Date.now()}`,
        ...formData,
        status: 'ativo',
        createdAt: new Date().toISOString().split('T')[0]
      };
      saveProperties([newProp, ...properties]);
      showToast('Novo anúncio cadastrado com sucesso!');
    }
    setIsFormModalOpen(false);
    setEditingProperty(null);
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este anúncio permanentemente?')) {
      const updated = properties.filter(p => p.id !== id);
      saveProperties(updated);
      showToast('Anúncio excluído com sucesso.');
    }
  };

  const handleToggleFeatured = (id) => {
    const updated = properties.map(p => p.id === id ? { ...p, featured: !p.featured } : p);
    saveProperties(updated);
    const target = updated.find(p => p.id === id);
    showToast(target.featured ? 'Imóvel destacado!' : 'Destaque removido.');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar os imóveis de exemplo originais?')) {
      saveProperties(INITIAL_PROPERTIES);
      showToast('Lista de imóveis restaurada.');
    }
  };

  // Filter Logic
  const filteredProperties = properties.filter(prop => {
    if (filters.purpose !== 'todos' && prop.purpose !== filters.purpose) return false;
    if (filters.type !== 'todos' && prop.type !== filters.type) return false;
    if (filters.bedrooms !== 'todos') {
      const minBeds = parseInt(filters.bedrooms, 10);
      if (prop.bedrooms < minBeds) return false;
    }
    if (filters.maxPrice !== 'Infinity') {
      const maxP = parseFloat(filters.maxPrice);
      if (prop.price > maxP) return false;
    }
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      const mTitle = prop.title.toLowerCase().includes(kw);
      const mAddress = prop.address.toLowerCase().includes(kw);
      const mNeigh = prop.neighborhood.toLowerCase().includes(kw);
      if (!mTitle && !mAddress && !mNeigh) return false;
    }
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          zIndex: 2000,
          backgroundColor: 'var(--primary-dark)',
          color: '#FFFFFF',
          padding: '0.85rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          borderLeft: '4px solid var(--accent-red)',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Sparkles size={18} style={{ color: 'var(--gold-primary)' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onOpenAdminModal={() => { setEditingProperty(null); setIsFormModalOpen(true); }} 
      />

      {/* Dynamic Tab Views */}
      <main style={{ flex: 1 }}>
        {currentTab === 'catalog' && (
          <>
            <Hero 
              filters={filters} 
              setFilters={setFilters} 
              onSearch={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
            />

            <section id="catalog-section" style={{ padding: '5rem 0' }}>
              <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Oportunidades em Itaiópolis - SC
                  </span>
                  <h2 style={{ fontSize: '2.25rem', margin: '0.5rem 0' }}>Catálogo de Imóveis</h2>
                  <p style={{ color: 'var(--text-muted)' }}>
                    Casas, terrenos, sítios e apartamentos rigorosamente selecionados com garantia imobiliária.
                  </p>
                </div>

                <PropertyFilters 
                  filters={filters} 
                  setFilters={setFilters} 
                  totalCount={filteredProperties.length}
                  onReset={() => setFilters({ keyword: '', purpose: 'todos', type: 'todos', bedrooms: 'todos', maxPrice: 'Infinity' })}
                />

                {filteredProperties.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-subtle)' }}>
                    <Building size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem' }}>Nenhum imóvel atende aos critérios da busca</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.35rem' }}>Tente ajustar os filtros acima para encontrar outras opções.</p>
                  </div>
                ) : (
                  <div className="grid-properties">
                    {filteredProperties.map(prop => (
                      <PropertyCard 
                        key={prop.id} 
                        property={prop} 
                        onSelectProperty={(p) => setSelectedPropertyModal(p)} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {currentTab === 'financing' && (
          <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-main)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
              <FinancingCalculator />
            </div>
          </section>
        )}

        {currentTab === 'about' && (
          <AboutContact />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard 
            properties={properties}
            onOpenAddModal={() => { setEditingProperty(null); setIsFormModalOpen(true); }}
            onEditProperty={(prop) => { setEditingProperty(prop); setIsFormModalOpen(true); }}
            onDeleteProperty={handleDeleteProperty}
            onToggleFeatured={handleToggleFeatured}
            onResetDefaults={handleResetDefaults}
            onSelectProperty={(p) => setSelectedPropertyModal(p)}
          />
        )}
      </main>

      {/* Property Details Lightbox Modal */}
      {selectedPropertyModal && (
        <PropertyModal 
          property={selectedPropertyModal} 
          onClose={() => setSelectedPropertyModal(null)} 
        />
      )}

      {/* Create / Edit Form Modal */}
      <PropertyFormModal 
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); setEditingProperty(null); }}
        onSave={handleSaveProperty}
        editingProperty={editingProperty}
      />

      {/* WhatsApp Floating Lead Widget */}
      <WhatsAppWidget />

      {/* Footer */}
      <Footer setCurrentTab={setCurrentTab} />

    </div>
  );
}
