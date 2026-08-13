import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import PropertyFilters from './components/PropertyFilters';
import PropertyModal from './components/PropertyModal';
import FinancingCalculator from './components/FinancingCalculator';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import PropertyFormModal from './components/PropertyFormModal';
import AboutContact from './components/AboutContact';
import WhatsAppWidget from './components/WhatsAppWidget';
import Footer from './components/Footer';
import { INITIAL_PROPERTIES } from './data/properties';
import { Building, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'anderson_kunicki_react_properties_v1';
const AUTH_STORAGE_KEY = 'anderson_kunicki_auth_user_v1';

// Helper to resolve hash to tab
function getTabFromHash(hash) {
  const cleanHash = hash.replace('#', '').toLowerCase();
  // Por segurança, ao recarregar a página o usuário não permanece na aba admin automaticamente
  if (cleanHash === 'simulador' || cleanHash === 'financiamento') return 'financing';
  if (cleanHash === 'sobre' || cleanHash === 'contato') return 'about';
  return 'catalog';
}

export default function App() {
  const [properties, setProperties] = useState([]);
  const [currentTab, setCurrentTabState] = useState(() => getTabFromHash(window.location.hash));
  const [selectedPropertyModal, setSelectedPropertyModal] = useState(null);
  
  // Authentication State (100% em memória: ao recarregar a página F5, a sessão encerra por segurança)
  const [currentUser, setCurrentUser] = useState(null);

  // Garantir limpeza de qualquer sessão residual ao carregar a página
  useEffect(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  // Helper for SHA-256 Password Hashing via WebCrypto API
  const hashPassword = async (plainText) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plainText);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async (usernameInput, passwordInput) => {
    const hashedInput = await hashPassword(passwordInput);

    // Pre-computed SHA-256 Hashes:
    // fiorino2026 -> 0a2fb47fa6a7f7d142ce049386d34b46294a282f6e9196b0bd59048a1c97042a
    // admin -> 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
    const validCredentials = [
      { user: 'andersonkunicki', passHash: '0a2fb47fa6a7f7d142ce049386d34b46294a282f6e9196b0bd59048a1c97042a' },
      { user: 'admin', passHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' }
    ];

    const found = validCredentials.find(
      c => c.user.toLowerCase() === usernameInput.toLowerCase() && c.passHash === hashedInput
    );

    if (found) {
      setCurrentUser(found.user);
      showToast(`Bem-vindo, ${found.user}! Sessão iniciada.`);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setCurrentTab('catalog');
    showToast('Sessão encerrada com sucesso.');
  };

  // Inactivity Auto-Logout Security (30 Minutes Timeout)
  useEffect(() => {
    if (!currentUser) return;

    let timeoutId;
    const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleLogout();
        alert('Sua sessão foi encerrada automaticamente por 30 minutos de inatividade para a sua segurança.');
      }, INACTIVITY_LIMIT);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(ev => window.addEventListener(ev, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(ev => window.removeEventListener(ev, resetTimer));
    };
  }, [currentUser]);
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const [toastMessage, setToastMessage] = useState('');

  const [filters, setFilters] = useState({
    keyword: '',
    purpose: 'todos',
    type: 'todos',
    bedrooms: 'todos',
    maxPrice: 'Infinity',
    sortBy: 'recente'
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

  const handleDuplicateProperty = (prop) => {
    const duplicated = {
      ...prop,
      id: `prop-${Date.now()}`,
      code: `${prop.code || prop.id}-COPIA`,
      title: `${prop.title} (Cópia)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    saveProperties([duplicated, ...properties]);
    showToast(`Imóvel duplicado com sucesso! Código: ${duplicated.code}`);
  };

  const handleToggleStatus = (id, newStatus) => {
    const updated = properties.map(p => p.id === id ? { ...p, status: newStatus } : p);
    saveProperties(updated);
    showToast(`Status atualizado para ${newStatus.toUpperCase()}`);
  };

  const handleBulkDelete = (ids) => {
    if (window.confirm(`Tem certeza de que deseja excluir ${ids.length} imóvel(is) selecionado(s)?`)) {
      const updated = properties.filter(p => !ids.includes(p.id));
      saveProperties(updated);
      showToast(`${ids.length} imóvel(is) excluído(s) em lote.`);
    }
  };

  const handleBulkStatusChange = (ids, newStatus) => {
    const updated = properties.map(p => ids.includes(p.id) ? { ...p, status: newStatus } : p);
    saveProperties(updated);
    showToast(`Status de ${ids.length} imóvel(is) alterado para ${newStatus.toUpperCase()}`);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(properties, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `backup_imoveis_anderson_kunicki_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON exportado com sucesso!');
  };

  const handleImportJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          saveProperties(importedData);
          showToast(`${importedData.length} imóvel(is) importado(s) com sucesso!`);
        } else {
          alert('Arquivo JSON inválido. Certifique-se de que é uma lista de imóveis.');
        }
      } catch (err) {
        alert('Erro ao ler o arquivo JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar os imóveis de exemplo originais?')) {
      saveProperties(INITIAL_PROPERTIES);
      showToast('Lista de imóveis restaurada.');
    }
  };

  // Filter & Sort Logic for Public Catalog (Shows only ATIVO properties)
  const activeProperties = properties.filter(prop => prop.status === 'ativo');
  const featuredProperties = activeProperties.filter(prop => prop.featured);

  const filteredProperties = activeProperties.filter(prop => {
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
  }).sort((a, b) => {
    if (filters.sortBy === 'preco-asc') return a.price - b.price;
    if (filters.sortBy === 'preco-desc') return b.price - a.price;
    // Default: recente (using createdAt date string or id)
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
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
        currentUser={currentUser}
        onLogout={handleLogout}
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

            {/* Featured Properties Banner */}
            {featuredProperties.length > 0 && (
              <section style={{ padding: '3.5rem 0 1rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="container">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        ★ Seleção Especial
                      </span>
                      <h2 style={{ fontSize: '1.75rem', margin: '0.2rem 0', color: 'var(--primary-dark)' }}>
                        Imóveis em Destaque
                      </h2>
                    </div>
                  </div>

                  <div className="grid-properties">
                    {featuredProperties.slice(0, 3).map(prop => (
                      <PropertyCard 
                        key={prop.id} 
                        property={prop} 
                        onSelectProperty={(p) => setSelectedPropertyModal(p)} 
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section id="catalog-section" style={{ padding: '4rem 0 5rem' }}>
              <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Oportunidades em Itaiópolis - SC
                  </span>
                  <h2 style={{ fontSize: '2.25rem', margin: '0.5rem 0' }}>Catálogo Completo de Imóveis</h2>
                  <p style={{ color: 'var(--text-muted)' }}>
                    Casas, terrenos, sítios e apartamentos rigorosamente selecionados com garantia imobiliária.
                  </p>
                </div>

                <PropertyFilters 
                  filters={filters} 
                  setFilters={setFilters} 
                  totalCount={filteredProperties.length}
                  onReset={() => setFilters({ keyword: '', purpose: 'todos', type: 'todos', bedrooms: 'todos', maxPrice: 'Infinity', sortBy: 'recente' })}
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
          currentUser ? (
            <AdminDashboard 
              properties={properties}
              onOpenAddModal={() => { setEditingProperty(null); setIsFormModalOpen(true); }}
              onEditProperty={(prop) => { setEditingProperty(prop); setIsFormModalOpen(true); }}
              onDeleteProperty={handleDeleteProperty}
              onDuplicateProperty={handleDuplicateProperty}
              onToggleFeatured={handleToggleFeatured}
              onToggleStatus={handleToggleStatus}
              onBulkDelete={handleBulkDelete}
              onBulkStatusChange={handleBulkStatusChange}
              onExportBackup={handleExportJSON}
              onImportBackup={handleImportJSON}
              onResetDefaults={handleResetDefaults}
              onSelectProperty={(p) => setSelectedPropertyModal(p)}
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          ) : (
            <AdminLogin onLogin={handleLogin} />
          )
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
