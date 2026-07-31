import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Image as ImageIcon, ArrowLeft, ArrowRight, Star, Trash2, Plus } from 'lucide-react';

export default function PropertyFormModal({ isOpen, onClose, onSave, editingProperty }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'casa',
    purpose: 'venda',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    garages: '',
    address: '',
    neighborhood: '',
    city: 'Itaiópolis - SC',
    description: '',
    features: '',
    featured: false
  });

  // Array of image URLs/Base64 strings for gallery
  const [images, setImages] = useState([]);
  const [customUrl, setCustomUrl] = useState('');

  useEffect(() => {
    if (editingProperty) {
      setFormData({
        title: editingProperty.title || '',
        type: editingProperty.type || 'casa',
        purpose: editingProperty.purpose || 'venda',
        price: editingProperty.price || '',
        area: editingProperty.area || '',
        bedrooms: editingProperty.bedrooms || '',
        bathrooms: editingProperty.bathrooms || '',
        garages: editingProperty.garages || '',
        address: editingProperty.address || '',
        neighborhood: editingProperty.neighborhood || '',
        city: editingProperty.city || 'Itaiópolis - SC',
        description: editingProperty.description || '',
        features: editingProperty.features ? editingProperty.features.join(', ') : '',
        featured: !!editingProperty.featured
      });
      const initialImages = editingProperty.images && editingProperty.images.length > 0 
        ? editingProperty.images 
        : (editingProperty.imageUrl ? [editingProperty.imageUrl] : []);
      setImages(initialImages);
    } else {
      setFormData({
        title: '',
        type: 'casa',
        purpose: 'venda',
        price: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        garages: '',
        address: '',
        neighborhood: '',
        city: 'Itaiópolis - SC',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawFeatures = formData.features
      ? formData.features.split(',').map(f => f.trim()).filter(Boolean)
      : [];

    const defaultImg = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';
    const finalImages = images.length > 0 ? images : [defaultImg];

    const dataToSave = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      area: parseFloat(formData.area) || 0,
      bedrooms: parseInt(formData.bedrooms, 10) || 0,
      bathrooms: parseInt(formData.bathrooms, 10) || 0,
      garages: parseInt(formData.garages, 10) || 0,
      imageUrl: finalImages[0], // primary cover image
      images: finalImages,      // full reordered gallery
      features: rawFeatures
    };

    onSave(dataToSave, editingProperty ? editingProperty.id : null);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)' }}>
            {editingProperty ? `Editar Anúncio: ${editingProperty.id}` : 'Cadastrar Novo Anúncio de Imóvel'}
          </h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.75rem' }}>
          
          {/* Main Title */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
              Título do Anúncio *
            </label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Ex: Excelente Casa Residencial no Centro com Suíte e Área de Festas" 
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          {/* Type & Purpose */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                Tipo de Imóvel *
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
          </div>

          {/* Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
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
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                Área Total (m²)
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
                Quartos / Dormitórios
              </label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="3" 
                value={formData.bedrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
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
                Vagas de Garagem
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

          {/* Address */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
                Rua / Endereço
              </label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Rua Francisco Mielzkovski" 
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

          {/* Local Image Upload & Gallery Manager */}
          <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={18} style={{ color: 'var(--accent-red)' }} /> Galeria de Imagens do Imóvel
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Faça upload de fotos locais do seu computador ou adicione URLs externas. Você pode reordenar a sequência das fotos e definir a imagem principal.
            </p>

            {/* Upload Buttons Row */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <label className="btn btn-navy btn-sm" style={{ cursor: 'pointer' }}>
                <Upload size={16} /> Fazer Upload de Foto Local
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
                  placeholder="Ou cole uma URL de imagem externa..."
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                />
                <button type="button" className="btn btn-outline btn-sm" onClick={handleAddCustomUrl}>
                  <Plus size={16} /> Adicionar
                </button>
              </div>
            </div>

            {/* Reorderable Image Gallery Thumbnails */}
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

                    {/* Image Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem', backgroundColor: '#F8FAFC', borderTop: '1px solid var(--border-subtle)' }}>
                      <button 
                        type="button" 
                        onClick={() => moveImage(idx, -1)} 
                        disabled={idx === 0}
                        style={{ color: idx === 0 ? '#CBD5E1' : 'var(--primary-dark)', cursor: idx === 0 ? 'default' : 'pointer' }}
                        title="Mover para esquerda"
                      >
                        <ArrowLeft size={14} />
                      </button>

                      {idx !== 0 && (
                        <button 
                          type="button" 
                          onClick={() => setPrimaryImage(idx)} 
                          style={{ color: 'var(--gold-primary)' }}
                          title="Definir como foto principal de capa"
                        >
                          <Star size={14} />
                        </button>
                      )}

                      <button 
                        type="button" 
                        onClick={() => moveImage(idx, 1)} 
                        disabled={idx === images.length - 1}
                        style={{ color: idx === images.length - 1 ? '#CBD5E1' : 'var(--primary-dark)', cursor: idx === images.length - 1 ? 'default' : 'pointer' }}
                        title="Mover para direita"
                      >
                        <ArrowRight size={14} />
                      </button>

                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)} 
                        style={{ color: 'var(--accent-red)' }}
                        title="Remover foto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Nenhuma foto adicionada ainda. Faça o upload ou cole uma URL acima.
              </div>
            )}
          </div>

          {/* Features */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
              Comodidades & Diferenciais (separados por vírgula)
            </label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Suíte, Churrasqueira, Portão Eletrônico, Quintal Amplo, Vaga Coberta" 
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'block' }}>
              Descrição Detalhada
            </label>
            <textarea 
              className="input-field" 
              rows={4} 
              placeholder="Descreva todos os detalhes, acabamentos e localização do imóvel..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          {/* Featured Checkbox */}
          <div style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="checkbox" 
              id="chkFeaturedModal"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="chkFeaturedModal" style={{ fontWeight: 600, color: 'var(--primary-dark)', cursor: 'pointer' }}>
              Destacar imóvel na vitrine da página inicial
            </label>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-red">
              <Save size={18} /> {editingProperty ? 'Salvar Alterações' : 'Cadastrar Anúncio'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
