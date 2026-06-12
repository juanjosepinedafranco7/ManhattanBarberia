/* ============================================================
   MAIN.JS
   Punto de entrada. Inicializa todos los módulos y enlaza la
   información del negocio (config.js) con los elementos del
   DOM marcados con clases `js-*`, de modo que un solo cambio
   en config.js se refleje en toda la página.
============================================================ */

import { BUSINESS, HOURS } from './config.js';
import { qs, qsa, buildWhatsAppLink } from './utils.js';
import { initNavigation } from './navigation.js';
import { initServices } from './services.js';
import { initGallery } from './gallery.js';
import { initTeam } from './team.js';
import { initTestimonials } from './testimonials.js';
import { initBooking } from './booking.js';
import { initScrollReveal, initCounters, initPreloader } from './animations.js';

const SCISSORS_MARK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><line x1="7.8" y1="7.6" x2="20" y2="20"/><line x1="7.8" y1="16.4" x2="20" y2="4"/></svg>`;

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  bindBusinessInfo();
  initNavigation();
  initServices();
  initGallery();
  initTeam();
  initTestimonials();
  initBooking();
  initScrollReveal();
  initCounters();
});

/* ============================================================
   Enlaza la información del negocio con el markup estático.
   Convenciones de clases usadas en index.html:
   - .js-brand            → logo + nombre (navbar, menú, footer)
   - .js-phone            → texto del teléfono
   - .js-phone-link       → enlaces tel:
   - .js-email            → texto del correo
   - .js-email-link       → enlaces mailto:
   - .js-address          → dirección completa
   - .js-social-instagram, .js-social-facebook, .js-social-tiktok
   - .js-whatsapp-link    → cualquier enlace que deba abrir WhatsApp
   - #contactMap          → iframe del mapa
   - .js-hours            → contenedor donde renderizar el horario
   - #heroStats           → contenedor de estadísticas del hero
============================================================ */
function bindBusinessInfo() {
  const waLink = buildWhatsAppLink(BUSINESS.phoneE164, BUSINESS.whatsappMessage);

  // ---------- Marca / Logo ----------
  qsa('.js-brand').forEach(el => {
    el.innerHTML = `
      <span class="brand__mark">${SCISSORS_MARK}</span>
      <span class="brand__text">
        <span class="brand__name">${BUSINESS.name}<span>.</span>${BUSINESS.nameAccent}</span>
        <span class="brand__tag">${BUSINESS.tagline}</span>
      </span>
    `;
  });

  // ---------- Teléfono ----------
  qsa('.js-phone').forEach(el => el.textContent = BUSINESS.phoneDisplay);
  qsa('.js-phone-link').forEach(el => {
    el.href = `tel:+${BUSINESS.phoneE164}`;
    if (!el.textContent.trim()) el.textContent = BUSINESS.phoneDisplay;
  });

  // ---------- Correo ----------
  qsa('.js-email').forEach(el => el.textContent = BUSINESS.email);
  qsa('.js-email-link').forEach(el => {
    el.href = `mailto:${BUSINESS.email}`;
    if (!el.textContent.trim()) el.textContent = BUSINESS.email;
  });

  // ---------- Dirección ----------
  qsa('.js-address').forEach(el => {
    el.innerHTML = `${BUSINESS.addressLine}<br>${BUSINESS.addressCity}`;
  });
  qsa('.js-address-inline').forEach(el => {
    el.textContent = `${BUSINESS.addressLine}, ${BUSINESS.addressCity}`;
  });

  // ---------- Redes sociales ----------
  qsa('.js-social-instagram').forEach(el => el.href = BUSINESS.social.instagram);
  qsa('.js-social-facebook').forEach(el => el.href = BUSINESS.social.facebook);
  qsa('.js-social-tiktok').forEach(el => el.href = BUSINESS.social.tiktok);

  // ---------- WhatsApp ----------
  qsa('.js-whatsapp-link').forEach(el => el.href = waLink);

  // ---------- Mapa ----------
  const map = qs('#contactMap');
  if (map) map.src = BUSINESS.mapEmbedSrc;

  // ---------- Año actual en el footer ----------
  qsa('.js-year').forEach(el => el.textContent = new Date().getFullYear());

  // ---------- Estadísticas del hero ----------
  const statsContainer = qs('#heroStats');
  if (statsContainer) {
    statsContainer.innerHTML = BUSINESS.stats.map(stat => `
      <div class="stat">
        <div class="stat__num">
          <span data-target="${stat.value}" data-suffix="${stat.suffix}" ${stat.isDecimal ? 'data-decimal="true"' : ''}>0</span>
        </div>
        <div class="stat__label">${stat.label}</div>
      </div>
    `).join('');
  }

  // ---------- Horarios ----------
  renderHours();
}

function renderHours() {
  const todayIndex = new Date().getDay(); // 0 = domingo
  // Reordena para que coincida con el índice de getDay() (domingo = índice 6 en nuestro array)
  const order = [1, 2, 3, 4, 5, 6, 0]; // lunes..domingo → posiciones de HOURS

  qsa('.js-hours').forEach(container => {
    container.innerHTML = HOURS.map((entry, i) => {
      const dayNumber = order[i];
      const isToday = dayNumber === todayIndex;
      const closedClass = entry.closed ? ' is-closed' : '';
      const todayClass = isToday ? ' is-today' : '';
      return `
        <div class="hours-row${closedClass}${todayClass}">
          <span>${entry.day}</span>
          <span>${entry.hours}</span>
        </div>
      `;
    }).join('');
  });
}
