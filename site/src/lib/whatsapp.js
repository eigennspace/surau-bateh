// Helper untuk membuat tautan wa.me dari nomor lokal (08xx) + pesan pra-isi.
// Dipakai oleh ContactCard (AgendaSection) dan ContactPage agar perilaku
// tombol WhatsApp konsisten di seluruh situs.

export function buildWhatsAppLink(phone, message) {
  if (!phone) return null;
  const international = phone.replace(/\D/g, '').replace(/^0/, '62');
  const params = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${international}${params}`;
}

export function openWhatsApp(phone, message) {
  const link = buildWhatsAppLink(phone, message);
  if (link) window.open(link, '_blank', 'noopener,noreferrer');
}
