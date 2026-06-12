/* ============================================================
   GALLERY.JS
   Renderiza la galería de trabajos, maneja los filtros por
   categoría y controla el lightbox (vista ampliada).
============================================================ */

import { GALLERY, GALLERY_CATEGORIES } from './config.js';
import { qs, qsa } from './utils.js';
import { observeReveal } from './animations.js';

const ZOOM_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`;
const CHEVRON_LEFT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
const CHEVRON_RIGHT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
const CLOSE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

export function initGallery() {
  const grid = qs('#galleryGrid');
  const filterBar = qs('#galleryFilters');
  if (!grid || !filterBar) return;

  let currentItems = GALLERY;
  let currentIndex = 0;

  // ---------- Filtros ----------
  filterBar.innerHTML = GALLERY_CATEGORIES.map((cat, i) => `
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
    currentItems = categoryId === 'todos'
      ? GALLERY
      : GALLERY.filter(g => g.category === categoryId);

    grid.innerHTML = currentItems.map((item, i) => {
      const sizeClass = item.size === 'wide' ? ' is-wide' : item.size === 'tall' ? ' is-tall' : '';
      return `
        <figure class="gallery-item${sizeClass} reveal reveal-delay-${(i % 4) + 1}" data-index="${i}" tabindex="0" role="button" aria-label="Ver ${item.title}">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="gallery-item__overlay">
            <h4>${item.title}</h4>
            <span>${labelFor(item.category)}</span>
          </div>
          <span class="gallery-item__zoom">${ZOOM_ICON}</span>
        </figure>
      `;
    }).join('');

    observeReveal(qsa('.reveal', grid));

    qsa('.gallery-item', grid).forEach(el => {
      el.addEventListener('click', () => openLightbox(Number(el.dataset.index)));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(Number(el.dataset.index));
        }
      });
    });
  }

  function labelFor(categoryId) {
    const found = GALLERY_CATEGORIES.find(c => c.id === categoryId);
    return found ? found.label : categoryId;
  }

  // ---------- Lightbox ----------
  const lightbox  = qs('#lightbox');
  const lbImg     = qs('#lightboxImg');
  const lbTitle   = qs('#lightboxTitle');
  const lbCategory = qs('#lightboxCategory');
  const lbCounter = qs('#lightboxCounter');
  const lbClose   = qs('#lightboxClose');
  const lbPrev    = qs('#lightboxPrev');
  const lbNext    = qs('#lightboxNext');

  lbClose.innerHTML = CLOSE_ICON;
  lbPrev.innerHTML = CHEVRON_LEFT;
  lbNext.innerHTML = CHEVRON_RIGHT;

  let lastFocused = null;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('is-open');
    document.body.classList.add('menu-open');
    lastFocused = document.activeElement;
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (lastFocused) lastFocused.focus();
  }

  function updateLightbox() {
    const item = currentItems[currentIndex];
    lbImg.src = item.image;
    lbImg.alt = item.title;
    lbTitle.textContent = item.title;
    lbCategory.textContent = labelFor(item.category);
    lbCounter.textContent = `${currentIndex + 1} / ${currentItems.length}`;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentItems.length;
    updateLightbox();
  }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}
