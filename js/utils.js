/* ============================================================
   UTILS.JS
   Funciones auxiliares compartidas por los demás módulos.
============================================================ */

/** Selector corto para un solo elemento */
export const qs = (selector, scope = document) => scope.querySelector(selector);

/** Selector corto que devuelve un array de elementos */
export const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/** Formatea un número como moneda en pesos colombianos (COP) */
export function formatCOP(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/** Debounce: retrasa la ejecución de fn hasta que pase `wait` ms sin nuevas llamadas */
export function debounce(fn, wait = 150) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Muestra un mensaje "toast" temporal en la esquina inferior de la pantalla.
 * @param {string} message - Texto a mostrar.
 * @param {'success'|'error'} type - Estilo del toast.
 */
export function showToast(message, type = 'success') {
  const toast = qs('#toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.toggle('toast--error', type === 'error');
  toast.classList.add('is-visible');

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3800);
}

/** Construye un enlace de WhatsApp a partir del número y un mensaje opcional */
export function buildWhatsAppLink(phoneE164, message = '') {
  const base = `https://wa.me/${phoneE164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Devuelve la fecha de hoy en formato YYYY-MM-DD (para inputs type="date") */
export function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().split('T')[0];
}

/** Convierte 'YYYY-MM-DD' a un objeto Date local (evita desfases de zona horaria) */
export function parseISODate(isoString) {
  const [y, m, d] = isoString.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Genera un código de referencia corto y legible para confirmaciones de reserva */
export function generateBookingRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'IB-';
  for (let i = 0; i < 5; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

/** Hash numérico simple y determinista a partir de un string (para simular disponibilidad) */
export function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
