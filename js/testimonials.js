/* ============================================================
   TESTIMONIALS.JS
   Renderiza y controla el carrusel de reseñas de clientes
   (autoplay, flechas, puntos de navegación, swipe).
============================================================ */

import { TESTIMONIALS } from './config.js';
import { qs, qsa } from './utils.js';

const CHEVRON_LEFT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
const CHEVRON_RIGHT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

const AUTOPLAY_MS = 6000;

export function initTestimonials() {
  const slidesWrap = qs('#testimonialSlides');
  const dotsWrap   = qs('#testimonialDots');
  const prevBtn    = qs('#testimonialPrev');
  const nextBtn    = qs('#testimonialNext');
  const track      = qs('.testimonial-track');
  if (!slidesWrap || !dotsWrap) return;

  let index = 0;
  let autoplayTimer = null;

  // ---------- Render ----------
  slidesWrap.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-slide">
      <div class="testimonial-card">
        <div class="testimonial-card__quote-icon">&ldquo;</div>
        <p class="testimonial-card__text">${t.text}</p>
        <div class="stars" aria-label="${t.rating} de 5 estrellas">${renderStars(t.rating)}</div>
        <div class="testimonial-card__person">
          <div class="testimonial-card__avatar">${initials(t.name)}</div>
          <div>
            <div class="testimonial-card__name">${t.name}</div>
            <div class="testimonial-card__role">${t.role}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  dotsWrap.innerHTML = TESTIMONIALS.map((_, i) => `
    <button class="testimonial-dot${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-label="Ir a la reseña ${i + 1}"></button>
  `).join('');

  prevBtn.innerHTML = CHEVRON_LEFT;
  nextBtn.innerHTML = CHEVRON_RIGHT;

  // ---------- Controls ----------
  function goTo(newIndex) {
    index = (newIndex + TESTIMONIALS.length) % TESTIMONIALS.length;
    slidesWrap.style.transform = `translateX(-${index * 100}%)`;
    qsa('.testimonial-dot', dotsWrap).forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });
  nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });

  dotsWrap.addEventListener('click', (e) => {
    const dot = e.target.closest('.testimonial-dot');
    if (!dot) return;
    goTo(Number(dot.dataset.index));
    restartAutoplay();
  });

  // ---------- Autoplay ----------
  function startAutoplay() {
    autoplayTimer = setInterval(next, AUTOPLAY_MS);
  }
  function restartAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  if (TESTIMONIALS.length > 1) startAutoplay();

  // Pausa el autoplay cuando el usuario interactúa con el carrusel
  track.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  track.addEventListener('mouseleave', () => restartAutoplay());

  // ---------- Swipe (touch) ----------
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoplayTimer);
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 50) prev();
    if (delta < -50) next();
    restartAutoplay();
  }, { passive: true });

  goTo(0);
}

function renderStars(rating) {
  const full = '★'.repeat(rating);
  const empty = '☆'.repeat(5 - rating);
  return full + empty;
}

function initials(name) {
  return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}
