export const SITE_CONFIG = {
  brokerName: "Anderson Kunicki",
  creci: "CRECI-SC 60173 F",
  phoneRaw: "554792139207",
  phoneFormatted: "+55 (47) 92139-207",
  email: "andersonkunicki@gmail.com",
  address: "Rua Francisco Mielzkovski, 173 - Itaiópolis - SC, 89340-000, Brasil",
  cityState: "Itaiópolis - SC",
  facebookUrl: "https://www.facebook.com/anderson.kunicki.9",
  defaultOgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
};

export const getWhatsAppUrl = (customText) => {
  const defaultText = "Olá Anderson! Vim pelo site e gostaria de mais informações.";
  const text = encodeURIComponent(customText || defaultText);
  return `https://api.whatsapp.com/send?phone=${SITE_CONFIG.phoneRaw}&text=${text}`;
};
