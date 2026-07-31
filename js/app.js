/* ==========================================================================
   Anderson Kunicki - Corretor Imobiliário | Application Logic
   ========================================================================== */

const STORAGE_KEY = 'anderson_kunicki_properties_v1';
const WHATSAPP_NUMBER = '5547999999999'; // Placeholder or configurable contact number

// State Management
let properties = [];
let activeFilters = {
  keyword: '',
  purpose: 'todos',
  type: 'todos',
  priceMax: Infinity,
  bedrooms: 'todos'
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadProperties();
  initEventListeners();
  renderCatalog();
  updateAdminStats();
  renderAdminTable();
});

// Load properties from LocalStorage or Fallback to INITIAL_PROPERTIES
function loadProperties() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      properties = JSON.parse(stored);
    } catch (e) {
      console.error('Error reading localStorage, resetting to defaults', e);
      properties = [...INITIAL_PROPERTIES];
      saveProperties();
    }
  } else {
    properties = [...INITIAL_PROPERTIES];
    saveProperties();
  }
}

function saveProperties() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  updateAdminStats();
}

// Utility: Format Currency to BRL
function formatCurrency(amount) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(amount);
}

// ==========================================================================
// Catalog Rendering & Filtering
// ==========================================================================
function renderCatalog() {
  const container = document.getElementById('propertiesGrid');
  const countEl = document.getElementById('resultsCount');
  if (!container) return;

  const filtered = properties.filter(prop => {
    // Status check for catalog
    if (prop.status === 'inativo') return false;

    // Filter Purpose
    if (activeFilters.purpose !== 'todos' && prop.purpose !== activeFilters.purpose) {
      return false;
    }

    // Filter Type
    if (activeFilters.type !== 'todos' && prop.type !== activeFilters.type) {
      return false;
    }

    // Filter Bedrooms
    if (activeFilters.bedrooms !== 'todos') {
      const minBeds = parseInt(activeFilters.bedrooms, 10);
      if (prop.bedrooms < minBeds) return false;
    }

    // Filter Keyword (Title, Address, Neighborhood, Description)
    if (activeFilters.keyword) {
      const kw = activeFilters.keyword.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(kw);
      const matchAddress = prop.address.toLowerCase().includes(kw);
      const matchNeigh = prop.neighborhood.toLowerCase().includes(kw);
      const matchDesc = prop.description.toLowerCase().includes(kw);
      if (!matchTitle && !matchAddress && !matchNeigh && !matchDesc) return false;
    }

    return true;
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} imóvel(is) encontrado(s)`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="ri-home-search-line"></i>
        <h3>Nenhum imóvel encontrado</h3>
        <p>Tente alterar os filtros de busca para encontrar outras opções.</p>
        <button class="btn btn-outline" onclick="resetFilters()" style="margin-top: 1rem;">
          <i class="ri-refresh-line"></i> Limpar Filtros
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prop => createPropertyCardHTML(prop)).join('');
}

function createPropertyCardHTML(prop) {
  const purposeBadgeClass = prop.purpose === 'venda' ? 'badge-purpose-venda' : 'badge-purpose-aluguel';
  const purposeText = prop.purpose === 'venda' ? 'Venda' : 'Aluguel';
  
  const featuredBadge = prop.featured ? `<span class="badge badge-featured"><i class="ri-star-fill"></i> Destaque</span>` : '';
  const soldBadge = prop.status === 'vendido' ? `<span class="badge badge-status-vendido">Vendido / Locado</span>` : '';

  const waMessage = encodeURIComponent(`Olá Anderson! Gostaria de mais informações sobre o imóvel: "${prop.title}" (Ref: ${prop.id}) em ${prop.city}.`);
  const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${waMessage}`;

  return `
    <article class="property-card">
      <div class="card-img-wrapper">
        <img src="${prop.imageUrl}" alt="${prop.title}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'">
        <div class="card-badge-container">
          <span class="badge ${purposeBadgeClass}">${purposeText}</span>
          ${featuredBadge}
          ${soldBadge}
        </div>
        <div class="card-price-overlay">
          ${formatCurrency(prop.price)}${prop.purpose === 'aluguel' ? '<span style="font-size:0.75rem">/mês</span>' : ''}
        </div>
      </div>
      
      <div class="card-body">
        <div class="card-type">${prop.type}</div>
        <h3 class="card-title">${prop.title}</h3>
        <div class="card-location">
          <i class="ri-map-pin-2-line" style="color: var(--accent-red)"></i>
          <span>${prop.neighborhood}, ${prop.city}</span>
        </div>

        <div class="card-features-bar">
          ${prop.area ? `<div class="feature-item"><i class="ri-ruler-2-line"></i> ${prop.area} m²</div>` : ''}
          ${prop.bedrooms ? `<div class="feature-item"><i class="ri-hotel-bed-line"></i> ${prop.bedrooms} Qts</div>` : ''}
          ${prop.bathrooms ? `<div class="feature-item"><i class="ri-drop-line"></i> ${prop.bathrooms} Banh</div>` : ''}
          ${prop.garages ? `<div class="feature-item"><i class="ri-car-line"></i> ${prop.garages} Vg</div>` : ''}
        </div>

        <div class="card-footer">
          <button class="btn btn-outline" onclick="openPropertyModal('${prop.id}')">
            <i class="ri-eye-line"></i> Ver Detalhes
          </button>
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp">
            <i class="ri-whatsapp-line"></i> Contato
          </a>
        </div>
      </div>
    </article>
  `;
}

// Reset Filters Action
function resetFilters() {
  activeFilters = {
    keyword: '',
    purpose: 'todos',
    type: 'todos',
    priceMax: Infinity,
    bedrooms: 'todos'
  };
  
  const searchInput = document.getElementById('searchKeyword');
  const purposeSelect = document.getElementById('searchPurpose');
  const typeSelect = document.getElementById('searchType');
  const bedroomsSelect = document.getElementById('searchBedrooms');

  if (searchInput) searchInput.value = '';
  if (purposeSelect) purposeSelect.value = 'todos';
  if (typeSelect) typeSelect.value = 'todos';
  if (bedroomsSelect) bedroomsSelect.value = 'todos';

  // Update pills UI
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.purpose === 'todos');
  });

  renderCatalog();
}

// ==========================================================================
// Property Detail Modal Handler
// ==========================================================================
function openPropertyModal(id) {
  const prop = properties.find(p => p.id === id);
  if (!prop) return;

  const modal = document.getElementById('propertyDetailModal');
  const content = document.getElementById('propertyDetailContent');
  if (!modal || !content) return;

  const waMessage = encodeURIComponent(`Olá Anderson Kunicki! Gostaria de agendar uma visita/saber mais detalhes sobre o imóvel: "${prop.title}" - Ref: ${prop.id}.`);
  const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${waMessage}`;

  const featuresList = (prop.features || []).map(f => `
    <div class="modal-feature-badge">
      <i class="ri-checkbox-circle-fill"></i> ${f}
    </div>
  `).join('');

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="badge ${prop.purpose === 'venda' ? 'badge-purpose-venda' : 'badge-purpose-aluguel'}">${prop.purpose.toUpperCase()}</span>
        <h2 class="modal-title" style="margin-top: 0.25rem;">${prop.title}</h2>
      </div>
      <button class="modal-close-btn" onclick="closeModal('propertyDetailModal')">&times;</button>
    </div>

    <div class="modal-body">
      <div class="details-gallery">
        <img src="${prop.imageUrl}" alt="${prop.title}" class="details-main-img" id="detailMainImg">
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-light);">
        <div>
          <div style="font-size: 0.9rem; color: var(--text-muted);">
            <i class="ri-map-pin-2-fill" style="color: var(--accent-red)"></i> ${prop.address}, ${prop.neighborhood} - ${prop.city}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
            Código de Referência: <strong>${prop.id}</strong>
          </div>
        </div>
        <div style="font-family: 'Outfit', sans-serif; font-size: 1.85rem; font-weight: 800; color: var(--accent-red);">
          ${formatCurrency(prop.price)} ${prop.purpose === 'aluguel' ? '<span style="font-size:0.9rem; color:var(--text-muted)">/mês</span>' : ''}
        </div>
      </div>

      <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem;">Características Principais</h3>
      <div class="modal-features-grid">
        ${prop.area ? `<div class="modal-feature-badge"><i class="ri-ruler-2-line"></i> <strong>Área Total:</strong> ${prop.area} m²</div>` : ''}
        ${prop.bedrooms ? `<div class="modal-feature-badge"><i class="ri-hotel-bed-line"></i> <strong>Quartos:</strong> ${prop.bedrooms}</div>` : ''}
        ${prop.bathrooms ? `<div class="modal-feature-badge"><i class="ri-drop-line"></i> <strong>Banheiros:</strong> ${prop.bathrooms}</div>` : ''}
        ${prop.garages ? `<div class="modal-feature-badge"><i class="ri-car-line"></i> <strong>Vagas:</strong> ${prop.garages}</div>` : ''}
        ${featuresList}
      </div>

      <h3 style="font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.55rem;">Descrição do Imóvel</h3>
      <p style="color: var(--text-secondary); white-space: pre-line; line-height: 1.7;">${prop.description}</p>

      <div style="margin-top: 2rem; background: var(--bg-alt); padding: 1.5rem; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h4 style="font-size: 1rem; color: var(--primary-navy);">Fale com Anderson Kunicki</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">CRECI-SC 60173 F | Atendimento personalizado</p>
        </div>
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="padding: 0.75rem 1.5rem; font-size: 1rem;">
          <i class="ri-whatsapp-line" style="font-size: 1.25rem;"></i> Tenho Interesse via WhatsApp
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// ==========================================================================
// Admin Management Logic (CRUD)
// ==========================================================================
function updateAdminStats() {
  const totalEl = document.getElementById('statTotal');
  const featuredEl = document.getElementById('statFeatured');
  const saleEl = document.getElementById('statSale');
  const rentEl = document.getElementById('statRent');

  if (totalEl) totalEl.textContent = properties.length;
  if (featuredEl) featuredEl.textContent = properties.filter(p => p.featured).length;
  if (saleEl) saleEl.textContent = properties.filter(p => p.purpose === 'venda').length;
  if (rentEl) rentEl.textContent = properties.filter(p => p.purpose === 'aluguel').length;
}

function renderAdminTable() {
  const tbody = document.getElementById('adminTableBody');
  if (!tbody) return;

  if (properties.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-muted);">
          Nenhum anúncio cadastrado no sistema.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = properties.map(prop => `
    <tr>
      <td>
        <img src="${prop.imageUrl}" alt="${prop.title}" class="table-thumb" onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80'">
      </td>
      <td>
        <strong style="color: var(--primary-navy);">${prop.title}</strong><br>
        <small style="color: var(--text-muted);">${prop.id} • ${prop.neighborhood}</small>
      </td>
      <td>
        <span class="badge ${prop.purpose === 'venda' ? 'badge-purpose-venda' : 'badge-purpose-aluguel'}">${prop.purpose.toUpperCase()}</span>
      </td>
      <td>${prop.type}</td>
      <td><strong>${formatCurrency(prop.price)}</strong></td>
      <td>
        <button class="btn btn-outline btn-icon" onclick="toggleFeatured('${prop.id}')" title="Alternar Destaque" style="color: ${prop.featured ? 'var(--gold-accent)' : 'var(--text-muted)'}">
          <i class="${prop.featured ? 'ri-star-fill' : 'ri-star-line'}"></i>
        </button>
      </td>
      <td>
        <div class="action-btn-group">
          <button class="btn btn-outline btn-icon" onclick="editProperty('${prop.id}')" title="Editar Anúncio">
            <i class="ri-edit-line"></i>
          </button>
          <button class="btn btn-outline btn-icon" onclick="deleteProperty('${prop.id}')" title="Excluir Anúncio" style="color: var(--accent-red);">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddPropertyModal() {
  const form = document.getElementById('propertyForm');
  if (form) form.reset();
  document.getElementById('propertyEditId').value = '';
  document.getElementById('adminModalTitle').textContent = 'Novo Anúncio de Imóvel';
  
  const modal = document.getElementById('adminFormModal');
  if (modal) modal.classList.add('active');
}

function editProperty(id) {
  const prop = properties.find(p => p.id === id);
  if (!prop) return;

  document.getElementById('propertyEditId').value = prop.id;
  document.getElementById('formTitle').value = prop.title;
  document.getElementById('formType').value = prop.type;
  document.getElementById('formPurpose').value = prop.purpose;
  document.getElementById('formPrice').value = prop.price;
  document.getElementById('formArea').value = prop.area || '';
  document.getElementById('formBedrooms').value = prop.bedrooms || 0;
  document.getElementById('formBathrooms').value = prop.bathrooms || 0;
  document.getElementById('formGarages').value = prop.garages || 0;
  document.getElementById('formAddress').value = prop.address || '';
  document.getElementById('formNeighborhood').value = prop.neighborhood || '';
  document.getElementById('formCity').value = prop.city || 'Itaiópolis - SC';
  document.getElementById('formImageUrl').value = prop.imageUrl || '';
  document.getElementById('formDescription').value = prop.description || '';
  document.getElementById('formFeatures').value = (prop.features || []).join(', ');
  document.getElementById('formFeatured').checked = !!prop.featured;

  document.getElementById('adminModalTitle').textContent = 'Editar Anúncio de Imóvel';
  
  const modal = document.getElementById('adminFormModal');
  if (modal) modal.classList.add('active');
}

function handlePropertyFormSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('propertyEditId').value;
  const title = document.getElementById('formTitle').value.trim();
  const type = document.getElementById('formType').value;
  const purpose = document.getElementById('formPurpose').value;
  const price = parseFloat(document.getElementById('formPrice').value) || 0;
  const area = parseFloat(document.getElementById('formArea').value) || 0;
  const bedrooms = parseInt(document.getElementById('formBedrooms').value, 10) || 0;
  const bathrooms = parseInt(document.getElementById('formBathrooms').value, 10) || 0;
  const garages = parseInt(document.getElementById('formGarages').value, 10) || 0;
  const address = document.getElementById('formAddress').value.trim();
  const neighborhood = document.getElementById('formNeighborhood').value.trim();
  const city = document.getElementById('formCity').value.trim() || 'Itaiópolis - SC';
  let imageUrl = document.getElementById('formImageUrl').value.trim();
  const description = document.getElementById('formDescription').value.trim();
  const rawFeatures = document.getElementById('formFeatures').value;
  const featured = document.getElementById('formFeatured').checked;

  if (!imageUrl) {
    imageUrl = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';
  }

  const features = rawFeatures
    ? rawFeatures.split(',').map(f => f.trim()).filter(Boolean)
    : [];

  if (editId) {
    // Edit existing
    const index = properties.findIndex(p => p.id === editId);
    if (index !== -1) {
      properties[index] = {
        ...properties[index],
        title, type, purpose, price, area, bedrooms, bathrooms, garages,
        address, neighborhood, city, imageUrl, description, features, featured
      };
      showToast('Anúncio atualizado com sucesso!');
    }
  } else {
    // Create new
    const newProp = {
      id: `prop-${Date.now()}`,
      title, type, purpose, price, area, bedrooms, bathrooms, garages,
      address, neighborhood, city, imageUrl, description, features, featured,
      status: 'ativo',
      createdAt: new Date().toISOString().split('T')[0]
    };
    properties.unshift(newProp);
    showToast('Novo anúncio cadastrado com sucesso!');
  }

  saveProperties();
  renderCatalog();
  renderAdminTable();
  closeModal('adminFormModal');
}

function deleteProperty(id) {
  if (confirm('Tem certeza de que deseja excluir este anúncio? Esta ação não pode ser desfeita.')) {
    properties = properties.filter(p => p.id !== id);
    saveProperties();
    renderCatalog();
    renderAdminTable();
    showToast('Anúncio removido com sucesso.');
  }
}

function toggleFeatured(id) {
  const prop = properties.find(p => p.id === id);
  if (prop) {
    prop.featured = !prop.featured;
    saveProperties();
    renderCatalog();
    renderAdminTable();
    showToast(prop.featured ? 'Imóvel marcado como Destaque!' : 'Destaque removido.');
  }
}

function resetToDefaultData() {
  if (confirm('Deseja restaurar os imóveis originais de exemplo? Todas as alterações personalizadas serão substituídas.')) {
    properties = [...INITIAL_PROPERTIES];
    saveProperties();
    renderCatalog();
    renderAdminTable();
    showToast('Imóveis restaurados para o padrão.');
  }
}

// ==========================================================================
// Event Listeners Setup
// ==========================================================================
function initEventListeners() {
  // Search Form Submit
  const mainSearchForm = document.getElementById('mainSearchForm');
  if (mainSearchForm) {
    mainSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      activeFilters.keyword = document.getElementById('searchKeyword').value;
      activeFilters.purpose = document.getElementById('searchPurpose').value;
      activeFilters.type = document.getElementById('searchType').value;
      activeFilters.bedrooms = document.getElementById('searchBedrooms').value;
      renderCatalog();
      
      const gridSection = document.getElementById('imoveis');
      if (gridSection) gridSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Purpose Filter Pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      activeFilters.purpose = e.target.dataset.purpose || 'todos';
      renderCatalog();
    });
  });

  // Admin Form Submit
  const propForm = document.getElementById('propertyForm');
  if (propForm) {
    propForm.addEventListener('submit', handlePropertyFormSubmit);
  }

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });
  }
}

// Toast Helper
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: #25D366; font-size: 1.25rem;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
