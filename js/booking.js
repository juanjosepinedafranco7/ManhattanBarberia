/* ============================================================
   BOOKING.JS
   Maneja todo el flujo de reservas:
   - Llena los selects de servicio y barbero desde config.js
   - Genera horarios disponibles (simulados) según fecha/barbero
   - Valida el formulario en tiempo real
   - Muestra un resumen dinámico de la reserva
   - Simula el envío y muestra confirmación con código
============================================================ */

import { SERVICES, TEAM, TIME_SLOTS, BUSINESS } from './config.js';
import { qs, qsa, formatCOP, todayISO, parseISODate, generateBookingRef, hashString, showToast, buildWhatsAppLink } from './utils.js';

export function initBooking() {
  const form = qs('#bookingForm');
  if (!form) return;

  const els = {
    firstName: qs('#bookingFirstName'),
    lastName:  qs('#bookingLastName'),
    phone:     qs('#bookingPhone'),
    email:     qs('#bookingEmail'),
    service:   qs('#bookingService'),
    barber:    qs('#bookingBarber'),
    date:      qs('#bookingDate'),
    notes:     qs('#bookingNotes'),
    slotsGrid: qs('#slotsGrid'),
    slotsEmpty: qs('#slotsEmpty'),
    summary:   qs('#bookingSummary'),
    submitBtn: qs('#bookingSubmit'),
    formCard:  qs('#bookingFormCard'),
    success:   qs('#bookingSuccess'),
    successRef: qs('#bookingRef'),
    successWa: qs('#bookingWhatsApp'),
    resetBtn:  qs('#bookingReset')
  };

  let selectedSlot = null;

  // ---------- Poblar select de servicios ----------
  els.service.innerHTML = '<option value="">Selecciona un servicio</option>' +
    SERVICES.map(s => `<option value="${s.id}">${s.name} — ${formatCOP(s.price)} (${s.duration} min)</option>`).join('');

  // ---------- Poblar select de barberos ----------
  els.barber.innerHTML = '<option value="">Sin preferencia</option>' +
    TEAM.map(b => `<option value="${b.id}">${b.name} — ${b.role}</option>`).join('');

  // ---------- Configurar input de fecha ----------
  els.date.min = todayISO();

  // ---------- Listeners ----------
  els.date.addEventListener('change', () => {
    clearError(els.date);
    selectedSlot = null;

    const picked = parseISODate(els.date.value);
    if (picked.getDay() === 0) {
      setError(els.date, 'Cerrado los domingos. Elige otro día.');
      renderSlots([]);
    } else {
      renderSlots(getAvailableSlots(els.date.value, els.barber.value));
    }
    updateSummary();
  });

  els.barber.addEventListener('change', () => {
    selectedSlot = null;
    if (els.date.value) {
      renderSlots(getAvailableSlots(els.date.value, els.barber.value));
    }
    updateSummary();
  });

  els.service.addEventListener('change', () => {
    clearError(els.service);
    updateSummary();
  });

  [els.firstName, els.lastName, els.phone, els.email].forEach(input => {
    input.addEventListener('input', () => clearError(input));
    input.addEventListener('blur', () => validateField(input));
  });

  form.addEventListener('submit', handleSubmit);
  els.resetBtn.addEventListener('click', resetForm);

  // ====================================================
  // Renderiza la cuadrícula de horarios disponibles
  // ====================================================
  function renderSlots(slots) {
    if (!els.date.value || els.date.value === '') {
      els.slotsGrid.innerHTML = '';
      els.slotsGrid.hidden = true;
      els.slotsEmpty.hidden = false;
      els.slotsEmpty.textContent = 'Selecciona primero una fecha para ver los horarios disponibles.';
      return;
    }

    const picked = parseISODate(els.date.value);
    if (picked.getDay() === 0) {
      els.slotsGrid.innerHTML = '';
      els.slotsGrid.hidden = true;
      els.slotsEmpty.hidden = false;
      els.slotsEmpty.textContent = 'No abrimos los domingos. Por favor elige otro día.';
      return;
    }

    if (slots.every(s => !s.available)) {
      els.slotsGrid.innerHTML = '';
      els.slotsGrid.hidden = true;
      els.slotsEmpty.hidden = false;
      els.slotsEmpty.textContent = 'No quedan horarios disponibles ese día. Intenta con otra fecha o barbero.';
      return;
    }

    els.slotsEmpty.hidden = true;
    els.slotsGrid.hidden = false;
    els.slotsGrid.innerHTML = slots.map(s => `
      <button type="button" class="slot-btn" data-time="${s.time}" ${s.available ? '' : 'disabled'}>
        ${s.time}
      </button>
    `).join('');

    qsa('.slot-btn', els.slotsGrid).forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        qsa('.slot-btn', els.slotsGrid).forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        selectedSlot = btn.dataset.time;
        clearError(els.slotsGrid);
        updateSummary();
      });
    });
  }

  // ====================================================
  // Simula disponibilidad determinista según fecha+barbero
  // (en un sistema real esto vendría de un backend)
  // ====================================================
  function getAvailableSlots(dateStr, barberId) {
    const seed = hashString(dateStr + '|' + (barberId || 'any'));
    return TIME_SLOTS.map((time, i) => ({
      time,
      available: (seed + i * 7) % 5 !== 0 // ~20% ocupados, patrón estable
    }));
  }

  // ====================================================
  // Resumen dinámico de la reserva
  // ====================================================
  function updateSummary() {
    const service = SERVICES.find(s => s.id === els.service.value);
    const barber = TEAM.find(b => b.id === els.barber.value);
    const hasAny = service || els.date.value || selectedSlot || barber;

    if (!hasAny) {
      els.summary.classList.remove('is-visible');
      els.summary.innerHTML = '';
      return;
    }

    const items = [];
    if (service) items.push(item('Servicio', `${service.name} · ${formatCOP(service.price)}`));
    items.push(item('Barbero', barber ? barber.name : 'Sin preferencia'));
    if (els.date.value) items.push(item('Fecha', formatDateEs(els.date.value)));
    items.push(item('Hora', selectedSlot || 'Por elegir'));

    els.summary.innerHTML = items.join('');
    els.summary.classList.add('is-visible');
  }

  function item(label, value) {
    return `<div class="booking-summary__item"><span>${label}</span><span>${value}</span></div>`;
  }

  function formatDateEs(isoString) {
    const date = parseISODate(isoString);
    return date.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  // ====================================================
  // Validación
  // ====================================================
  function validateField(input) {
    const value = input.value.trim();

    if (input === els.firstName || input === els.lastName) {
      if (!value) return setError(input, 'Este campo es obligatorio.');
      if (value.length < 2) return setError(input, 'Ingresa un nombre válido.');
    }

    if (input === els.phone) {
      const digits = value.replace(/[^\d]/g, '');
      if (!value) return setError(input, 'Ingresa un número de contacto.');
      if (digits.length < 7) return setError(input, 'Ingresa un teléfono válido.');
    }

    if (input === els.email && value) {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!valid) return setError(input, 'Ingresa un correo válido.');
    }

    clearError(input);
    return true;
  }

  function setError(input, message) {
    input.classList.add('is-invalid');
    const err = qs(`#${input.id}Error`);
    if (err) err.textContent = message;
    return false;
  }

  function clearError(input) {
    input.classList.remove('is-invalid');
    const err = qs(`#${input.id}Error`);
    if (err) err.textContent = '';
  }

  function validateForm() {
    let valid = true;

    [els.firstName, els.lastName, els.phone, els.email].forEach(input => {
      if (!validateField(input)) valid = false;
    });

    if (!els.service.value) {
      setError(els.service, 'Selecciona un servicio.');
      valid = false;
    } else {
      clearError(els.service);
    }

    if (!els.date.value) {
      setError(els.date, 'Selecciona una fecha.');
      valid = false;
    } else if (parseISODate(els.date.value).getDay() === 0) {
      setError(els.date, 'Cerrado los domingos. Elige otro día.');
      valid = false;
    }

    if (!selectedSlot) {
      setError(els.slotsGrid, 'Selecciona un horario disponible.');
      valid = false;
    } else {
      clearError(els.slotsGrid);
    }

    return valid;
  }

  // ====================================================
  // Envío del formulario (simulado)
  // ====================================================
  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Por favor revisa los campos marcados.', 'error');
      return;
    }

    els.submitBtn.classList.add('is-loading');
    els.submitBtn.disabled = true;

    // Simula latencia de red / procesamiento del servidor
    setTimeout(() => {
      els.submitBtn.classList.remove('is-loading');
      els.submitBtn.disabled = false;
      showSuccess();
    }, 1100);
  }

  function showSuccess() {
    const ref = generateBookingRef();
    const service = SERVICES.find(s => s.id === els.service.value);
    const barber = TEAM.find(b => b.id === els.barber.value);

    els.successRef.textContent = ref;

    const waText =
      `Hola, soy ${els.firstName.value} ${els.lastName.value}. ` +
      `Acabo de reservar "${service.name}" para el ${formatDateEs(els.date.value)} a las ${selectedSlot}` +
      (barber ? ` con ${barber.name}` : '') +
      `. Código de referencia: ${ref}.`;

    els.successWa.href = buildWhatsAppLink(BUSINESS.phoneE164, waText);

    els.formCard.style.display = 'none';
    els.success.classList.add('is-visible');
    els.success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function resetForm() {
    form.reset();
    selectedSlot = null;
    els.summary.classList.remove('is-visible');
    els.summary.innerHTML = '';
    renderSlots([]);
    [els.firstName, els.lastName, els.phone, els.email, els.service, els.date].forEach(clearError);
    clearError(els.slotsGrid);
    els.success.classList.remove('is-visible');
    els.formCard.style.display = '';
  }

  // Estado inicial
  renderSlots([]);
}
