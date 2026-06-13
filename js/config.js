/* ============================================================
   CONFIG.JS
   Toda la información editable del sitio vive aquí.
   Para personalizar la barbería, edita estos datos:
   nombre, contacto, servicios, galería, equipo y horarios.
   No necesitas tocar el resto del código JS para hacer
   cambios de contenido.
============================================================ */

const IMG = 'https://images.unsplash.com';
const crop = 'auto=format&fit=crop&q=82';

export const BUSINESS = {
  name: 'IRON',
  nameAccent: 'BARBER CO.',
  tagline: 'Barbería & Grooming Masculino',
  founded: 2018,

  phoneDisplay: '+57 300 000 0000',
  phoneE164: '573000000000',
  whatsappMessage: 'Hola, quiero reservar una cita en Iron Barber Co. en Circasia.',

  email: 'reservas@ironbarber.co',
  addressLine: 'Calle 7 # 12-18, Sector Centro',
  addressCity: 'Circasia, Quindío, Colombia',

  mapEmbedSrc: 'https://maps.google.com/maps?q=Circasia+Quindio+Colombia&output=embed&hl=es&z=15',

  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
    whatsapp: null
  },

  stats: [
    { value: 8, suffix: '+', label: 'Años afinando estilo' },
    { value: 5200, suffix: '+', label: 'Servicios realizados' },
    { value: 97, suffix: '%', label: 'Clientes que vuelven' },
    { value: 4.9, suffix: '', label: 'Calificación promedio', isDecimal: true }
  ]
};

/* ---------- Horario de atención ---------- */
export const HOURS = [
  { day: 'Lunes', hours: '9:00 AM - 7:00 PM' },
  { day: 'Martes', hours: '9:00 AM - 7:00 PM' },
  { day: 'Miércoles', hours: '9:00 AM - 7:00 PM' },
  { day: 'Jueves', hours: '9:00 AM - 7:00 PM' },
  { day: 'Viernes', hours: '9:00 AM - 8:00 PM' },
  { day: 'Sábado', hours: '8:00 AM - 6:00 PM' },
  { day: 'Domingo', hours: 'Cerrado', closed: true }
];

/* ---------- Categorías de servicios (para filtros) ---------- */
export const SERVICE_CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'cortes', label: 'Cortes' },
  { id: 'barba', label: 'Barba' },
  { id: 'combos', label: 'Combos' },
  { id: 'premium', label: 'Premium' }
];

/* ---------- Catálogo de servicios ---------- */
export const SERVICES = [
  {
    id: 'corte-clasico',
    category: 'cortes',
    name: 'Corte Clásico',
    desc: 'Corte limpio a tijera y máquina, lavado express, peinado y recomendaciones para mantener la forma en casa.',
    price: 28000,
    duration: 30
  },
  {
    id: 'fade-degradado',
    category: 'cortes',
    name: 'Fade de Precisión',
    desc: 'Degradado bajo, medio o alto con transición pulida, contornos definidos y acabado con producto profesional.',
    price: 35000,
    duration: 40,
    popular: true
  },
  {
    id: 'corte-diseno',
    category: 'cortes',
    name: 'Corte + Diseño',
    desc: 'Corte personalizado con líneas, textura o diseño a navaja. Ideal para un estilo más urbano y marcado.',
    price: 42000,
    duration: 50
  },
  {
    id: 'arreglo-barba',
    category: 'barba',
    name: 'Ritual de Barba',
    desc: 'Perfilado con navaja, toalla caliente, aceite nutritivo y bálsamo para una barba cómoda y bien definida.',
    price: 26000,
    duration: 30
  },
  {
    id: 'afeitado-clasico',
    category: 'barba',
    name: 'Afeitado Clásico',
    desc: 'Afeitado tradicional con espuma caliente, preparación de piel, navaja y tratamiento post-afeitado.',
    price: 30000,
    duration: 35
  },
  {
    id: 'combo-corte-barba',
    category: 'combos',
    name: 'Combo Corte + Barba',
    desc: 'La sesión completa: corte a elección, arreglo de barba, contornos a navaja y peinado final.',
    price: 52000,
    duration: 65,
    popular: true
  },
  {
    id: 'combo-premium',
    category: 'premium',
    name: 'Experiencia Premium',
    desc: 'Corte, barba, vapor facial, mascarilla refrescante y masaje capilar. Pensado para salir renovado.',
    price: 78000,
    duration: 80
  },
  {
    id: 'dia-caballero',
    category: 'premium',
    name: 'Retoque Ejecutivo',
    desc: 'Servicio rápido para mantener cabello, barba y cejas impecables antes de una reunión o evento.',
    price: 45000,
    duration: 45
  }
];

/* ---------- Categorías de galería (para filtros) ---------- */
export const GALLERY_CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'cortes', label: 'Cortes' },
  { id: 'barba', label: 'Barba' },
  { id: 'disenos', label: 'Detalles' }
];

/* ---------- Galería de trabajos ----------
   size: 'wide' | 'tall' | null  → controla el mosaico
============================================================ */
export const GALLERY = [
  {
    id: 1,
    title: 'Fade Bajo Pulido',
    category: 'cortes',
    image: `${IMG}/photo-1599351431202-1e0f0137899a?${crop}&w=900`,
    size: null
  },
  {
    id: 2,
    title: 'Textura con Tijera',
    category: 'cortes',
    image: `${IMG}/photo-1693591936914-14645081663a?${crop}&w=900`,
    size: 'tall'
  },
  {
    id: 3,
    title: 'Barba a Navaja',
    category: 'barba',
    image: `${IMG}/photo-1517832606299-7ae9b720a186?${crop}&w=900`,
    size: null
  },
  {
    id: 4,
    title: 'Afeitado Tradicional',
    category: 'barba',
    image: `${IMG}/photo-1503951914875-452162b0f3f1?${crop}&w=900`,
    size: null
  },
  {
    id: 5,
    title: 'Silla Lista',
    category: 'disenos',
    image: `${IMG}/photo-1585747860715-2ba37e788b70?${crop}&w=1200`,
    size: 'wide'
  },
  {
    id: 6,
    title: 'Perfilado Milimétrico',
    category: 'barba',
    image: `${IMG}/photo-1647140655214-e4a2d914971f?${crop}&w=900`,
    size: null
  },
  {
    id: 7,
    title: 'Corte con Personalidad',
    category: 'cortes',
    image: `${IMG}/photo-1593702275687-f8b402bf1fb5?${crop}&w=900`,
    size: 'tall'
  },
  {
    id: 8,
    title: 'Herramientas Pro',
    category: 'disenos',
    image: `${IMG}/photo-1635273051937-a0ddef9573b6?${crop}&w=900`,
    size: null
  }
];

/* ---------- Equipo de barberos ---------- */
export const TEAM = [
  {
    id: 'andres',
    name: 'Andrés Gómez',
    role: 'Barbero Senior · Fades',
    bio: 'Especialista en degradados limpios, asesoría de estilo y cortes que conservan la forma por más tiempo.',
    image: `${IMG}/photo-1717700921740-a1440f3b89a4?${crop}&w=850`,
    social: { instagram: '#', facebook: '#' }
  },
  {
    id: 'camilo',
    name: 'Camilo Rodríguez',
    role: 'Especialista en Barba',
    bio: 'Domina el perfilado con navaja, rituales de barba y cuidado de piel sensible.',
    image: `${IMG}/photo-1517832606299-7ae9b720a186?${crop}&w=850`,
    social: { instagram: '#', facebook: '#' }
  },
  {
    id: 'santiago',
    name: 'Santiago Pérez',
    role: 'Cortes Clásicos',
    bio: 'Fuerte en tijera, pompadour, slick back y acabados sobrios para oficina o evento.',
    image: `${IMG}/photo-1590166491145-5a32942d2ebb?${crop}&w=850`,
    social: { instagram: '#', facebook: '#' }
  },
  {
    id: 'mateo',
    name: 'Mateo Londoño',
    role: 'Diseño y Textura',
    bio: 'Trabaja líneas, texturas, volumen y detalles urbanos sin perder limpieza en el acabado.',
    image: `${IMG}/photo-1693591936914-14645081663a?${crop}&w=850`,
    social: { instagram: '#', facebook: '#' }
  }
];

/* ---------- Testimonios de muestra ---------- */
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Nicolás Mejía',
    role: 'Cliente frecuente',
    rating: 5,
    text: 'Reservé por WhatsApp, llegué a la hora exacta y salí con el fade mejor trabajado que me han hecho. Se nota que escuchan antes de cortar.'
  },
  {
    id: 2,
    name: 'Sebastián Quintero',
    role: 'Cliente desde 2022',
    rating: 5,
    text: 'La barba me queda pareja, la piel no se irrita y siempre me explican qué producto usar. Es el tipo de atención que hace volver.'
  },
  {
    id: 3,
    name: 'David Ocampo',
    role: 'Cliente ejecutivo',
    rating: 5,
    text: 'Necesitaba verme impecable para una reunión y me atendieron rápido, sin correr. Corte sobrio, contornos limpios y muy buena experiencia.'
  },
  {
    id: 4,
    name: 'Mateo Valencia',
    role: 'Nuevo cliente',
    rating: 5,
    text: 'Fui por recomendación y quedé sorprendido con el detalle. La barbería se siente cómoda, organizada y con un ambiente muy bacano.'
  },
  {
    id: 5,
    name: 'Juan Esteban Toro',
    role: 'Cliente de Circasia',
    rating: 5,
    text: 'Me gustó que no improvisan: revisan la forma de la cara, preguntan el estilo y rematan con retoque de cejas y nuca. Excelente.'
  }
];

/* ---------- Horarios disponibles para reservas ---------- */
export const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];
