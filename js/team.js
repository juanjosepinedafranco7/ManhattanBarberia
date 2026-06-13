/* ============================================================
   TEAM.JS
   Renderiza las tarjetas del equipo de barberos.
============================================================ */

import { TEAM } from './config.js';
import { qs, qsa } from './utils.js';
import { observeReveal } from './animations.js';

const INSTAGRAM_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`;
const FACEBOOK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`;

export function initTeam() {
  const grid = qs('#teamGrid');
  if (!grid) return;

  grid.innerHTML = TEAM.map((member, i) => `
    <article class="team-card reveal reveal-scale reveal-delay-${(i % 4) + 1}">
      <div class="team-card__photo">
        <img src="${member.image}" alt="${member.name}" loading="lazy">
        <div class="team-card__social">
          <a href="${member.social.instagram}" aria-label="Instagram de ${member.name}" target="_blank" rel="noopener noreferrer">${INSTAGRAM_ICON}</a>
          <a href="${member.social.facebook}" aria-label="Facebook de ${member.name}" target="_blank" rel="noopener noreferrer">${FACEBOOK_ICON}</a>
        </div>
      </div>
      <div class="team-card__body">
        <h3 class="team-card__name">${member.name}</h3>
        <div class="team-card__role">${member.role}</div>
        <p class="team-card__bio">${member.bio}</p>
      </div>
    </article>
  `).join('');

  observeReveal(qsa('.reveal', grid));
}
