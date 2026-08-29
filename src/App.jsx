import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppWidget from './components/layout/WhatsAppWidget';
import Toast from './components/common/Toast';

import Hero from './components/sections/Hero';
import AboutContact from './components/sections/AboutContact';
import PrivacyPage from './components/sections/PrivacyPage';

import PropertyCard from './components/property/PropertyCard';
import PropertyFilters from './components/property/PropertyFilters';
import PropertyModal from './components/property/PropertyModal';

import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import PropertyFormModal from './components/admin/PropertyFormModal';

import { useToast } from './hooks/useToast';
import { useAuth } from './hooks/useAuth';
import { useProperties } from './hooks/useProperties';

import { Building, PlusCircle } from 'lucide-react';
import WhatsAppIcon from './components/common/WhatsAppIcon';
import { getWhatsAppUrl } from './config';

function getTabFromHash(hash) {
  const cleanHash = hash.replace('#', '').toLowerCase();
  if (cleanHash === 'admin') return 'admin';
  if (cleanHash === 'sobre' || cleanHash === 'contato') return 'about';
  if (cleanHash === 'privacidade' || cleanHash === 'lgpd' || cleanHash === 'termos') return 'privacy';
  return 'home';
}

export default function App() {
  const [currentTab, setCurrentTabState] = useState(() => getTabFromHash(window.location.hash));
  const [selectedPropertyModal, setSelectedPropertyModal] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Custom Hooks
  const { toastMessage, showToast } = useToast();
  const { currentUser, login, logout, updateUserPassword } = useAuth(showToast);
  const {
    properties,
    featuredProperties,
    filteredProperties,
    filters,
    setFilters,
    resetFilters,
    saveProperty,
    deleteProperty,
    toggleFeatured,
    duplicateProperty,
    toggleStatus,
    bulkDelete,
    bulkStatusChange,
    exportBackupJSON,
    importBackupJSON
  } = useProperties(showToast);

  // Sync tab with URL Hash & Scroll to Top
  const setCurrentTab = (tabName) => {
    setCurrentTabState(tabName);
    const hashMap = {
      home: 'home',
      about: 'sobre',
      privacy: 'privacidade',
      admin: 'admin'
    };
    window.location.hash = hashMap[tabName] || 'home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const tab = getTabFromHash(window.location.hash);
      setCurrentTabState(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSavePropertyForm = (formData, editId) => {
    saveProperty(formData, editId);
    setIsFormModalOpen(false);
    setEditingProperty(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      
      {/* Dynamic Floating Toast Alerts */}
      <Toast message={toastMessage} />

      {/* Main Header & Navigation */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onOpenAdminModal={() => { setEditingProperty(null); setIsFormModalOpen(true); }} 
        currentUser={currentUser}
      />

      {/* Dynamic Views */}
      <main style={{ flex: 1 }}>
        {currentTab === 'home' && (
          <>
            {/* Hero Section */}
            <Hero 
              filters={filters} 
              setFilters={setFilters} 
              onSearch={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
            />

            {/* Featured Properties Section */}
            {featuredProperties.length > 0 && (
              <section style={{ padding: '3.5rem 0 2rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="container">
                  <div style={{ marginBottom: '1.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Oportunidades em Destaque
                    </span>
                    <h2 style={{ fontSize: '1.85rem', margin: '0.2rem 0', color: 'var(--primary-dark)', fontWeight: 800 }}>
                      Seleção de Imóveis
                    </h2>
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

            {/* Full Property Catalog Section */}
            <section id="catalog-section" style={{ padding: '3.5rem 0 5rem' }}>
              <div className="container">
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Vitrine de Imóveis
                    </span>
                    <h2 style={{ fontSize: '2rem', margin: '0.2rem 0 0', color: 'var(--primary-dark)', fontWeight: 900 }}>
                      Catálogo Completo
                    </h2>
                  </div>
                </div>

                {/* Filter Controls */}
                <PropertyFilters 
                  filters={filters} 
                  setFilters={setFilters} 
                  totalCount={filteredProperties.length}
                  onReset={resetFilters}
                />

                {/* Properties Grid or Clean Empty State */}
                {filteredProperties.length === 0 ? (
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    border: '1px dashed var(--border-subtle)',
                    boxShadow: 'var(--shadow-sm)',
                    maxWidth: '650px',
                    margin: '2rem auto'
                  }}>
                    <Building size={56} style={{ color: '#CBD5E1', marginBottom: '1.25rem' }} />
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-dark)', fontWeight: 800, marginBottom: '0.4rem' }}>
                      {properties.length === 0 ? 'Nenhum imóvel disponível no momento' : 'Nenhum imóvel encontrado para estes filtros'}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
                      {properties.length === 0 
                        ? 'Entre em contato diretamente pelo WhatsApp para consultar novidades e captações exclusivas.' 
                        : 'Tente limpar ou ajustar os filtros de busca para encontrar outras oportunidades.'}
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button className="btn btn-outline" onClick={resetFilters}>
                        Limpar Filtros de Busca
                      </button>
                      <a href={getWhatsAppUrl("Olá Anderson! Gostaria de consultar opções de imóveis disponíveis em Itaiópolis.")} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                        <WhatsAppIcon size={18} color="#FFFFFF" /> Consultar Corretor no WhatsApp
                      </a>
                    </div>
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

        {currentTab === 'about' && (
          <AboutContact />
        )}

        {currentTab === 'privacy' && (
          <PrivacyPage onBackToCatalog={() => setCurrentTab('home')} />
        )}

        {currentTab === 'admin' && (
          currentUser ? (
            <AdminDashboard 
              properties={properties}
              onOpenAddModal={() => { setEditingProperty(null); setIsFormModalOpen(true); }}
              onEditProperty={(prop) => { setEditingProperty(prop); setIsFormModalOpen(true); }}
              onDeleteProperty={deleteProperty}
              onDuplicateProperty={duplicateProperty}
              onToggleFeatured={toggleFeatured}
              onToggleStatus={toggleStatus}
              onBulkDelete={bulkDelete}
              onBulkStatusChange={bulkStatusChange}
              onExportBackup={exportBackupJSON}
              onImportBackup={importBackupJSON}
              onSelectProperty={(p) => setSelectedPropertyModal(p)}
              currentUser={currentUser}
              onLogout={logout}
              onUpdatePassword={updateUserPassword}
            />
          ) : (
            <AdminLogin onLogin={login} />
          )
        )}
      </main>

      {/* Modals */}
      {selectedPropertyModal && (
        <PropertyModal 
          property={selectedPropertyModal} 
          onClose={() => setSelectedPropertyModal(null)} 
        />
      )}

      <PropertyFormModal 
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); setEditingProperty(null); }}
        onSave={handleSavePropertyForm}
        editingProperty={editingProperty}
      />

      <WhatsAppWidget />
      <Footer setCurrentTab={setCurrentTab} />

    </div>
  );
}
