/* ============================================================
   ANIMATIONS.JS
   - Revelado de elementos al hacer scroll (IntersectionObserver)
   - Animación de contadores en las estadísticas del hero
   - Control del preloader inicial
============================================================ */

import { qs, qsa } from './utils.js';

let revealObserver = null;

function getObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  }
  return revealObserver;
}

/**
 * Observa uno o varios elementos `.reveal` para animarlos al
 * entrar en el viewport. Se puede llamar repetidamente para
 * contenido renderizado dinámicamente (servicios, galería, equipo).
 */
export function observeReveal(elements) {
  const observer = getObserver();
  const list = elements instanceof Element ? [elements] : Array.from(elements);
  list.forEach(el => observer.observe(el));
}

/** Observa todos los elementos `.reveal` presentes en el documento */
export function initScrollReveal() {
  observeReveal(qsa('.reveal'));
}

/**
 * Anima los números de estadísticas del hero cuando se hacen visibles.
 * Lee el valor objetivo desde `data-target` y un sufijo opcional
 * desde `data-suffix`.
 */
export function initCounters() {
  const counters = qsa('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const isDecimal = el.dataset.decimal === 'true';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = target * eased;

    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
    }
  }

  requestAnimationFrame(tick);
}

/** Oculta el preloader una vez la página termina de cargar */
export function initPreloader() {
  const preloader = qs('#preloader');
  if (!preloader) return;

  const hide = () => preloader.classList.add('is-hidden');

  if (document.readyState === 'complete') {
    setTimeout(hide, 300);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 300));
  }
}
