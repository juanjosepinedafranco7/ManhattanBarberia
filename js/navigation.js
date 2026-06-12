/* ============================================================
   NAVIGATION.JS
   Navbar fijo con sombra al hacer scroll, menú móvil,
   resaltado de sección activa (scrollspy) y botón
   "volver arriba".
============================================================ */

import { qs, qsa } from './utils.js';

export function initNavigation() {
  const navbar  = qs('#navbar');
  const toggle  = qs('#navToggle');
  const mobile  = qs('#mobileMenu');
  const overlay = qs('#menuOverlay');
  const backTop = qs('#backToTop');

  const allNavLinks = [
    ...qsa('.nav-links a'),
    ...qsa('.mobile-menu a[href^="#"]')
  ];

  /* ---------- Sticky navbar shadow/background ---------- */
  const onScroll = () => {
    const scrolled = window.scrollY > 20;
    navbar.classList.toggle('is-scrolled', scrolled);
    backTop.classList.toggle('is-visible', window.scrollY > 480);
    updateActiveLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  function openMenu() {
    toggle.classList.add('is-open');
    mobile.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    toggle.classList.remove('is-open');
    mobile.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    toggle.classList.contains('is-open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);

  qsa('.mobile-menu a, .mobile-menu button').forEach(el => {
    el.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Back to top ---------- */
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scrollspy: resalta el link de la sección visible ---------- */
  const sections = qsa('section[id]');

  function updateActiveLink() {
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + (navbar.offsetHeight + 40);

    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        current = section.id;
      }
    }

    allNavLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('is-active', isActive);
    });
  }
}
