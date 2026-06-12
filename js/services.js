/* ============================================================
   SERVICES.JS
   Renderiza el catálogo de servicios y maneja los filtros
   por categoría.
============================================================ */

import { SERVICES, SERVICE_CATEGORIES } from './config.js';
import { qs, qsa, formatCOP } from './utils.js';
import { observeReveal } from './animations.js';

const ICONS = {
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`
};

export function initServices() {
  const grid = qs('#servicesGrid');
  const filterBar = qs('#serviceFilters');
  if (!grid || !filterBar) return;

  // Construye los botones de filtro a partir de la configuración
  filterBar.innerHTML = SERVICE_CATEGORIES.map((cat, i) => `
    <button class="filter-btn${i === 0 ? ' is-active' : ''}" data-filter="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  render('todos');

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    qsa('.filter-btn', filterBar).forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    render(btn.dataset.filter);
  });

  function render(categoryId) {
    const items = categoryId === 'todos'
      ? SERVICES
      : SERVICES.filter(s => s.category === categoryId);

    grid.innerHTML = items.map((s, i) => `
      <article class="service-card reveal reveal-delay-${(i % 3) + 1}${s.popular ? ' is-popular' : ''}">
        ${s.popular ? '<span class="tag service-card__popular-tag">Más solicitado</span>' : ''}
        <div class="service-card__top">
          <h3 class="service-card__name">${s.name}</h3>
        </div>
        <p class="service-card__desc">${s.desc}</p>
        <div class="service-card__footer">
          <div class="service-card__price">${formatCOP(s.price)} <small>COP</small></div>
          <div class="service-card__duration">
            ${ICONS.clock}
            <span>${s.duration} min</span>
          </div>
        </div>
      </article>
    `).join('');

    observeReveal(qsa('.reveal', grid));
  }
}
