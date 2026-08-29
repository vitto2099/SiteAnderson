/**
 * Utilitários de formatação de moeda, números e strings
 */

export const formatMoney = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value || 0);
};

export const formatArea = (area) => {
  return area ? `${area} m²` : '';
};

export const formatPhone = (phoneRaw) => {
  if (!phoneRaw) return '';
  const cleaned = phoneRaw.replace(/\D/g, '');
  if (cleaned.length === 13) {
    // 5547992139207 -> (47) 99213-9207
    return `(${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
  }
  return phoneRaw;
};
