import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Image as ImageIcon, ArrowLeft, ArrowRight, Star, Trash2, Plus, Video, Sparkles, Check, Tag } from 'lucide-react';

const DEFAULT_AMENITIES = [
  'Suíte',
  'Churrasqueira',
  'Piscina',
  'Quintal Amplo',
  'Portão Eletrônico',
  'Ar Condicionado',
  'Mobiliado',
  'Área de Festas',
  'Aceita Financiamento',
  'Escriturado',
  'Sacada com Vista',
  'Vaga Coberta',
  'Cozinha Sob Medida',
  'Poço Artesiano',
  'Sistema de Segurança',
  'Energia Solar',
  'Alarme',
  'Horta'
];

const AMENITIES_STORAGE_KEY = 'anderson_kunicki_custom_amenities_v1';

export default function PropertyFormModal({ isOpen, onClose, onSave, editingProperty }) {
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    type: 'casa',
    purpose: 'venda',
    status: 'ativo',
    price: '',
    area: '',
    landArea: '',
    bedrooms: '',
    suites: '',
    bathrooms: '',
    garages: '',
    address: '',
    neighborhood: '',
    city: 'Itaiópolis - SC',
    iptu: '',
    condoFee: '',
    videoUrl: '',
    description: '',
    features: '',
    featured: false
  });

  // Persistent Custom Amenities
  const [availableAmenities, setAvailableAmenities] = useState(() => {
    try {
      const stored = localStorage.getItem(AMENITIES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_AMENITIES;
  });

  const [newAmenityInput, setNewAmenityInput] = useState('');

  // Array of image URLs / Base64 strings
  const [images, setImages] = useState([]);
  const [customUrl, setCustomUrl] = useState('');

  const saveAmenitiesList = (newList) => {
    setAvailableAmenities(newList);
    localStorage.setItem(AMENITIES_STORAGE_KEY, JSON.stringify(newList));
  };

  const handleCreateNewAmenity = () => {
    const trimmed = newAmenityInput.trim();
    if (!trimmed) return;

    // Check case insensitive
    const exists = availableAmenities.some(a => a.toLowerCase() === trimmed.toLowerCase());
    let updatedList = availableAmenities;

    if (!exists) {
      updatedList = [...availableAmenities, trimmed];
      saveAmenitiesList(updatedList);
    }

    // Automatically check/select the new amenity for the current property
    const currentFeaturesList = formData.features
      ? formData.features.split(',').map(f => f.trim()).filter(Boolean)
      : [];
    
    if (!currentFeaturesList.some(f => f.toLowerCase() === trimmed.toLowerCase())) {
      const newFeaturesStr = [...currentFeaturesList, trimmed].join(', ');
      setFormData(prev => ({ ...prev, features: newFeaturesStr }));
    }

    setNewAmenityInput('');
  };

  const handleDeleteAmenityTag = (amenityToDelete) => {
    const updated = availableAmenities.filter(a => a !== amenityToDelete);
    saveAmenitiesList(updated);
  };

  useEffect(() => {
    if (editingProperty) {
      setFormData({
        code: editingProperty.code || editingProperty.id || '',
        title: editingProperty.title || '',
        type: editingProperty.type || 'casa',
        purpose: editingProperty.purpose || 'venda',
        status: editingProperty.status || 'ativo',
        price: editingProperty.price || '',
        area: editingProperty.area || '',
        landArea: editingProperty.landArea || '',
        bedrooms: editingProperty.bedrooms || '',
        suites: editingProperty.suites || '',
        bathrooms: editingProperty.bathrooms || '',
        garages: editingProperty.garages || '',
        address: editingProperty.address || '',
        neighborhood: editingProperty.neighborhood || '',
        city: editingProperty.city || 'Itaiópolis - SC',
        iptu: editingProperty.iptu || '',
        condoFee: editingProperty.condoFee || '',
        videoUrl: editingProperty.videoUrl || '',
        description: editingProperty.description || '',
        features: editingProperty.features ? editingProperty.features.join(', ') : '',
        featured: !!editingProperty.featured
      });
      const initialImages = editingProperty.images && editingProperty.images.length > 0 
        ? editingProperty.images 
        : (editingProperty.imageUrl ? [editingProperty.imageUrl] : []);
      setImages(initialImages);

      // Auto sync custom features from property into availableAmenities list
      if (editingProperty.features && Array.isArray(editingProperty.features)) {
        let listChanged = false;
        let newList = [...availableAmenities];
        editingProperty.features.forEach(feat => {
          if (feat && !newList.some(a => a.toLowerCase() === feat.toLowerCase())) {
            newList.push(feat);
            listChanged = true;
          }
        });
        if (listChanged) {
          saveAmenitiesList(newList);
        }
      }
    } else {
      setFormData({
        code: `AK-${Math.floor(100 + Math.random() * 900)}`,
        title: '',
        type: 'casa',
        purpose: 'venda',
        status: 'ativo',
        price: '',
        area: '',
        landArea: '',
        bedrooms: '',
        suites: '',
        bathrooms: '',
        garages: '',
        address: '',
        neighborhood: '',
        city: 'Itaiópolis - SC',
        iptu: '',
        condoFee: '',
        videoUrl: '',
        description: '',
        features: '',
        featured: false
      });
      setImages([]);
    }
    setCustomUrl('');
  }, [editingProperty, isOpen]);

  if (!isOpen) return null;

  // Handle local image file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setImages(prev => [...prev, base64]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Add external image URL
  const handleAddCustomUrl = () => {
    if (!customUrl.trim()) return;
    setImages(prev => [...prev, customUrl.trim()]);
    setCustomUrl('');
  };

  // Reorder Images
  const moveImage = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);
  };

  // Set as Cover/Primary image
  const setPrimaryImage = (index) => {
    if (index === 0) return;
    const newImages = [...images];
    const selected = newImages.splice(index, 1)[0];
    newImages.unshift(selected);
    setImages(newImages);
  };

  // Remove image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Quick Amenities Tag Toggle
  const toggleAmenity = (amenity) => {
    const currentList = formData.features
      ? formData.features.split(',').map(f => f.trim()).filter(Boolean)
      : [];
    
    let updatedList;
    if (currentList.includes(amenity)) {
      updatedList = currentList.filter(item => item !== amenity);
    } else {
      updatedList = [...currentList, amenity];
    }
    setFormData(prev => ({ ...prev, features: updatedList.join(', ') }));
  };

  const isAmenitySelected = (amenity) => {
    if (!formData.features) return false;
    const currentList = formData.features.split(',').map(f => f.trim().toLowerCase());
    return currentList.includes(amenity.toLowerCase());
  };

  // Format currency helper
  const formattedPricePreview = formData.price ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(formData.price) : 'R$ 0';

  const handleSubmit = (e) => {
    e.preventDefault();

    const rawFeatures = formData.features
      ? formData.features.split(',').map(f => f.trim()).filter(Boolean)
      : [];

    const defaultImg = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';
    const finalImages = images.length > 0 ? images : [defaultImg];

    const dataToSave = {
      ...formData,
      code: formData.code.trim() || `AK-${Date.now().toString().slice(-4)}`,
      price: parseFloat(formData.price) || 0,
      area: parseFloat(formData.area) || 0,
      landArea: parseFloat(formData.landArea) || 0,
      bedrooms: parseInt(formData.bedrooms, 10) || 0,
      suites: parseInt(formData.suites, 10) || 0,
      bathrooms: parseInt(formData.bathrooms, 10) || 0,
      garages: parseInt(formData.garages, 10) || 0,
      iptu: parseFloat(formData.iptu) || 0,
      condoFee: parseFloat(formData.condoFee) || 0,
      imageUrl: finalImages[0], // primary cover image
      images: finalImages,      // full reordered gallery
      features: rawFeatures
    };

    onSave(dataToSave, editingProperty ? editingProperty.id : null);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      zIndex: 1500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 1rem'
    }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
        maxWidth: '860px',
        width: '100%',
        maxHeight: '92vh',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--primary-dark)',
          color: '#FFFFFF'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {editingProperty ? 'Edição de Anúncio' : 'Novo Anúncio Imobiliário'}
            </span>
            <h3 style={{ fontSize: '1.35rem', margin: '0.2rem 0 0', color: '#FFFFFF', fontWeight: 800 }}>
              {editingProperty ? `Editar Imóvel: ${editingProperty.code || editingProperty.id}` : 'Cadastrar Novo Imóvel'}
            </h3>
          </div>
          <button onClick={onClose} style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem', overflowY: 'auto', flex: 1 }}>
          
          {/* Section 1: Informações Principais */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '0.5rem' }}>
              1. Identificação e Título
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Código Ref *
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Ex: AK-101" 
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Título Completo do Anúncio *
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Ex: Linda Casa Residencial no Centro com Suíte e Área de Festas" 
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Type, Purpose, Status & Price */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Tipo *
                </label>
                <select 
                  className="input-field" 
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  required
                >
                  <option value="casa">Casa</option>
                  <option value="terreno">Terreno</option>
                  <option value="sitio">Sítio / Chácara</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="comercial">Comercial</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Finalidade *
                </label>
                <select 
                  className="input-field"
                  value={formData.purpose}
                  onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                  required
                >
                  <option value="venda">Venda</option>
                  <option value="aluguel">Aluguel</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Status no Painel *
                </label>
                <select 
                  className="input-field"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  required
                >
                  <option value="ativo">🟢 Ativo (Disponível)</option>
                  <option value="reservado">🟡 Reservado</option>
                  <option value="vendido">🔴 Vendido / Alugado</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Preço (R$) *
                </label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="480000" 
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
                {formData.price && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 700, marginTop: '0.2rem' }}>
                    {formattedPricePreview}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Dimensões e Cômodos */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '0.5rem' }}>
              2. Medidas e Distribuição Interna
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Área Construída (m²)
                </label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="180" 
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Área do Terreno (m²)
                </label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="450" 
                  value={formData.landArea}
                  onChange={(e) => setFormData(prev => ({ ...prev, landArea: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Quartos Totais
                </label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="3" 
                  value={formData.bedrooms}
                  onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Suítes
                </label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="1" 
                  value={formData.suites}
                  onChange={(e) => setFormData(prev => ({ ...prev, suites: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Banheiros
                </label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="2" 
                  value={formData.bathrooms}
                  onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Vagas Garagem
                </label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="2" 
                  value={formData.garages}
                  onChange={(e) => setFormData(prev => ({ ...prev, garages: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Endereço e Custos Adicionais */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '0.5rem' }}>
              3. Localização e Custos Extras
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Rua / Logradouro
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Rua Francisco Mielzkovski, 173" 
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Bairro
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Centro" 
                  value={formData.neighborhood}
                  onChange={(e) => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Cidade / UF
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  IPTU Anual (R$)
                </label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="650" 
                  value={formData.iptu}
                  onChange={(e) => setFormData(prev => ({ ...prev, iptu: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Condomínio Mensal (R$)
                </label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="0" 
                  value={formData.condoFee}
                  onChange={(e) => setFormData(prev => ({ ...prev, condoFee: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                  Link de Vídeo / Tour Virtual (YouTube/Vimeo)
                </label>
                <input 
                  type="url" 
                  className="input-field" 
                  placeholder="https://youtube.com/watch?v=..." 
                  value={formData.videoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Galeria de Fotos */}
          <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}>
              <ImageIcon size={18} style={{ color: 'var(--accent-red)' }} /> Galeria de Fotos do Imóvel ({images.length} fotos)
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Faça upload de fotos locais ou insira URLs externas. Defina a foto de capa clicando na estrela ⭐.
            </p>

            {/* Upload Controls */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <label className="btn btn-navy btn-sm" style={{ cursor: 'pointer' }}>
                <Upload size={16} /> Upload de Fotos Locais
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleFileUpload} 
                  style={{ display: 'none' }}
                />
              </label>

              <div style={{ display: 'flex', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
                <input 
                  type="url" 
                  className="input-field" 
                  placeholder="Ou cole a URL de uma imagem na web..."
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                />
                <button type="button" className="btn btn-outline btn-sm" onClick={handleAddCustomUrl}>
                  <Plus size={16} /> Adicionar
                </button>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
                {images.map((imgUrl, idx) => (
                  <div key={idx} style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: idx === 0 ? '2.5px solid var(--accent-red)' : '1px solid var(--border-subtle)',
                    backgroundColor: '#FFFFFF',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <img 
                      src={imgUrl} 
                      alt="" 
                      style={{ width: '100%', height: '90px', objectFit: 'cover', display: 'block' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80'; }}
                    />
                    
                    {idx === 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        backgroundColor: 'var(--accent-red)',
                        color: '#FFFFFF',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '0.15rem 0.4rem',
                        borderRadius: '3px',
                        textTransform: 'uppercase'
                      }}>
                        Capa
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem', backgroundColor: '#F8FAFC', borderTop: '1px solid var(--border-subtle)' }}>
                      <button 
                        type="button" 
                        onClick={() => moveImage(idx, -1)} 
                        disabled={idx === 0}
                        style={{ color: idx === 0 ? '#CBD5E1' : 'var(--primary-dark)', cursor: idx === 0 ? 'default' : 'pointer', background: 'none', border: 'none' }}
                        title="Mover para esquerda"
                      >
                        <ArrowLeft size={14} />
                      </button>

                      {idx !== 0 && (
                        <button 
                          type="button" 
                          onClick={() => setPrimaryImage(idx)} 
                          style={{ color: 'var(--gold-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
                          title="Definir como Capa Principal"
                        >
                          <Star size={14} />
                        </button>
                      )}

                      <button 
                        type="button" 
                        onClick={() => moveImage(idx, 1)} 
                        disabled={idx === images.length - 1}
                        style={{ color: idx === images.length - 1 ? '#CBD5E1' : 'var(--primary-dark)', cursor: idx === images.length - 1 ? 'default' : 'pointer', background: 'none', border: 'none' }}
                        title="Mover para direita"
                      >
                        <ArrowRight size={14} />
                      </button>

                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)} 
                        style={{ color: 'var(--accent-red)', background: 'none', border: 'none', cursor: 'pointer' }}
                        title="Remover foto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '1rem 0' }}>
                Nenhuma foto adicionada ainda. Faça upload de imagens ou adicione links acima.
              </div>
            )}
          </div>

          {/* Section 5: Diferenciais Rápidos */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                5. Seletor Rápido de Diferenciais e Comodidades
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Clique nas tags para ativar/desativar
              </span>
            </div>

            {/* Input to Create New Custom Amenity */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1rem',
              backgroundColor: '#F8FAFC',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-subtle)'
            }}>
              <input
                type="text"
                className="input-field"
                placeholder="Criar nova comodidade (ex: Aquecimento Solar, Garagem Dupla...)"
                value={newAmenityInput}
                onChange={(e) => setNewAmenityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreateNewAmenity();
                  }
                }}
                style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem', backgroundColor: '#FFFFFF' }}
              />
              <button
                type="button"
                className="btn btn-navy btn-sm"
                onClick={handleCreateNewAmenity}
                style={{ whiteSpace: 'nowrap', fontWeight: 700 }}
              >
                <Plus size={16} /> Adicionar Nova Tag
              </button>
            </div>

            {/* Dynamic Amenity Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {availableAmenities.map(amenity => {
                const active = isAmenitySelected(amenity);
                const isCustom = !DEFAULT_AMENITIES.includes(amenity);

                return (
                  <div
                    key={amenity}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: active ? '1px solid var(--accent-red)' : '1px solid var(--border-subtle)',
                      backgroundColor: active ? 'rgba(200, 29, 37, 0.1)' : '#FFFFFF',
                      transition: 'all 0.2s'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        color: active ? 'var(--accent-red)' : 'var(--primary-dark)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      {active ? <Check size={14} /> : <Tag size={13} style={{ color: 'var(--text-muted)' }} />}
                      <span>{amenity}</span>
                    </button>

                    {/* Allow deleting custom amenities */}
                    {isCustom && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAmenityTag(amenity);
                        }}
                        style={{
                          padding: '0.35rem 0.4rem',
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          borderLeft: '1px solid rgba(0,0,0,0.05)'
                        }}
                        title={`Remover tag "${amenity}" da lista salva`}
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
              Diferenciais Adicionais (separados por vírgula)
            </label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Ex: Sacada com churrasqueira, Vista panôramica, Canil" 
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
            />
          </div>

          {/* Section 6: Descrição & Destaque */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '0.5rem' }}>
              6. Descrição Detalhada e Exibição
            </h4>

            <textarea 
              className="input-field" 
              rows={4} 
              placeholder="Descreva as qualidades, facilidades de pagamento, acabamentos e proximidades do imóvel..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              style={{ marginBottom: '1.25rem' }}
            />

            <div style={{
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <input 
                type="checkbox" 
                id="chkFeaturedModal"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent-red)' }}
              />
              <label htmlFor="chkFeaturedModal" style={{ fontWeight: 700, color: 'var(--primary-dark)', cursor: 'pointer', fontSize: '0.9rem' }}>
                ⭐ Destacar este imóvel no Carrossel da Página Inicial (Vitrine Destaque)
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-red" style={{ padding: '0.75rem 1.5rem', fontWeight: 700 }}>
              <Save size={18} /> {editingProperty ? 'Salvar Alterações do Anúncio' : 'Cadastrar Anúncio'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
