/* ============================================================
   CONFIG.JS
   Toda la información editable del sitio vive aquí.
   Para personalizar la barbería, edita estos datos:
   nombre, contacto, servicios, galería, equipo y horarios.
   No necesitas tocar el resto del código JS para hacer
   cambios de contenido.
============================================================ */

export const BUSINESS = {
  name: 'IRON',
  nameAccent: 'BARBER CO.',
  tagline: 'Barbería & Grooming Masculino',
  founded: 2016,

  phoneDisplay: '+57 300 000 0000',
  phoneE164: '573000000000',
  whatsappMessage: 'Hola, quiero más información sobre sus servicios ✂️',

  email: 'contacto@ironbarber.co',
  addressLine: 'Cra. 14 # 21-35, Centro',
  addressCity: 'Armenia, Quindío, Colombia',

  mapEmbedSrc: 'https://maps.google.com/maps?q=Armenia+Quindio+Colombia&output=embed&hl=es&z=15',

  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
    whatsapp: null // se genera dinámicamente con phoneE164 + whatsappMessage
  },

  stats: [
    { value: 8,   suffix: '+', label: 'Años de experiencia' },
    { value: 4200, suffix: '+', label: 'Clientes atendidos' },
    { value: 4,   suffix: '',  label: 'Barberos expertos' },
    { value: 4.9, suffix: '',  label: 'Calificación promedio', isDecimal: true }
  ]
};

/* ---------- Horario de atención ---------- */
export const HOURS = [
  { day: 'Lunes',     hours: '9:00 AM – 7:00 PM' },
  { day: 'Martes',    hours: '9:00 AM – 7:00 PM' },
  { day: 'Miércoles', hours: '9:00 AM – 7:00 PM' },
  { day: 'Jueves',    hours: '9:00 AM – 7:00 PM' },
  { day: 'Viernes',   hours: '9:00 AM – 8:00 PM' },
  { day: 'Sábado',    hours: '8:00 AM – 6:00 PM' },
  { day: 'Domingo',   hours: 'Cerrado', closed: true }
];

/* ---------- Categorías de servicios (para filtros) ---------- */
export const SERVICE_CATEGORIES = [
  { id: 'todos',   label: 'Todos' },
  { id: 'cortes',  label: 'Cortes' },
  { id: 'barba',   label: 'Barba' },
  { id: 'combos',  label: 'Combos' },
  { id: 'premium', label: 'Premium' }
];

/* ---------- Catálogo de servicios ---------- */
export const SERVICES = [
  {
    id: 'corte-clasico',
    category: 'cortes',
    name: 'Corte Clásico',
    desc: 'Corte tradicional a tijera y máquina, incluye lavado con productos especializados y acabado con secador.',
    price: 25000,
    duration: 30
  },
  {
    id: 'fade-degradado',
    category: 'cortes',
    name: 'Fade / Degradado',
    desc: 'Degradado moderno de alta precisión, acabado a navaja y línea definida para un estilo impecable.',
    price: 30000,
    duration: 40,
    popular: true
  },
  {
    id: 'corte-diseno',
    category: 'cortes',
    name: 'Corte + Diseño',
    desc: 'Corte a elección con diseño personalizado a navaja: líneas, figuras o patrones únicos.',
    price: 35000,
    duration: 45
  },
  {
    id: 'arreglo-barba',
    category: 'barba',
    name: 'Arreglo de Barba',
    desc: 'Perfilado profesional con navaja, toalla caliente y aceites nutritivos para definir tu barba.',
    price: 20000,
    duration: 25
  },
  {
    id: 'afeitado-clasico',
    category: 'barba',
    name: 'Afeitado Clásico',
    desc: 'Afeitado tradicional con navaja, espuma caliente, exfoliación y bálsamo post-afeitado.',
    price: 28000,
    duration: 35
  },
  {
    id: 'combo-corte-barba',
    category: 'combos',
    name: 'Combo Corte + Barba',
    desc: 'La combinación perfecta: corte a elección más arreglo completo de barba en una sola sesión.',
    price: 42000,
    duration: 60,
    popular: true
  },
  {
    id: 'combo-premium',
    category: 'premium',
    name: 'Combo Premium',
    desc: 'Corte, barba, tratamiento facial con vapor y masaje capilar relajante. La experiencia completa.',
    price: 65000,
    duration: 75
  },
  {
    id: 'dia-caballero',
    category: 'premium',
    name: 'Día del Caballero',
    desc: 'Corte, barba, manicure básica y una bebida de cortesía. Para quienes buscan lo mejor.',
    price: 85000,
    duration: 90
  }
];

/* ---------- Categorías de galería (para filtros) ---------- */
export const GALLERY_CATEGORIES = [
  { id: 'todos',  label: 'Todos' },
  { id: 'cortes', label: 'Cortes' },
  { id: 'barba',  label: 'Barba' },
  { id: 'disenos', label: 'Diseños' }
];

/* ---------- Galería de trabajos ----------
   size: 'wide' | 'tall' | null  → controla el mosaico
============================================================ */
export const GALLERY = [
  { id: 1, title: 'Fade Bajo Clásico',     category: 'cortes',  image: 'assets/images/gallery/gallery-1.svg', size: null },
  { id: 2, title: 'Diseño Geométrico',     category: 'disenos', image: 'assets/images/gallery/gallery-2.svg', size: 'tall' },
  { id: 3, title: 'Barba Perfilada',       category: 'barba',   image: 'assets/images/gallery/gallery-3.svg', size: null },
  { id: 4, title: 'Pompadour Moderno',     category: 'cortes',  image: 'assets/images/gallery/gallery-4.svg', size: null },
  { id: 5, title: 'Degradado Alto',        category: 'cortes',  image: 'assets/images/gallery/gallery-5.svg', size: 'wide' },
  { id: 6, title: 'Afeitado a Navaja',     category: 'barba',   image: 'assets/images/gallery/gallery-6.svg', size: null },
  { id: 7, title: 'Línea de Diseño',       category: 'disenos', image: 'assets/images/gallery/gallery-7.svg', size: 'tall' },
  { id: 8, title: 'Textura y Volumen',     category: 'cortes',  image: 'assets/images/gallery/gallery-8.svg', size: null }
];

/* ---------- Equipo de barberos ---------- */
export const TEAM = [
  {
    id: 'andres',
    name: 'Andrés Gómez',
    role: 'Barbero Senior · Fades',
    bio: '8 años de experiencia. Especialista en degradados y diseños a navaja.',
    image: 'assets/images/team/barber-1.svg',
    social: { instagram: '#', facebook: '#' }
  },
  {
    id: 'camilo',
    name: 'Camilo Rodríguez',
    role: 'Especialista en Barba',
    bio: 'Maestro del afeitado clásico y el cuidado de barba con navaja.',
    image: 'assets/images/team/barber-2.svg',
    social: { instagram: '#', facebook: '#' }
  },
  {
    id: 'santiago',
    name: 'Santiago Pérez',
    role: 'Estilista · Cortes Clásicos',
    bio: 'Experto en cortes tradicionales y peinados con productos premium.',
    image: 'assets/images/team/barber-3.svg',
    social: { instagram: '#', facebook: '#' }
  },
  {
    id: 'mateo',
    name: 'Mateo Londoño',
    role: 'Barbero · Color y Diseño',
    bio: 'Apasionado por las tendencias urbanas, color y diseños personalizados.',
    image: 'assets/images/team/barber-4.svg',
    social: { instagram: '#', facebook: '#' }
  }
];

/* ---------- Testimonios ---------- */
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Juan Pablo Restrepo',
    role: 'Cliente desde 2021',
    rating: 5,
    text: 'El mejor servicio de la ciudad. Siempre salgo satisfecho con el corte y la atención es excelente. Totalmente recomendado.'
  },
  {
    id: 2,
    name: 'Carlos Andrés Ríos',
    role: 'Cliente frecuente',
    rating: 5,
    text: 'Ambiente increíble, barberos muy profesionales y puntuales. El sistema de reservas en línea me ahorra mucho tiempo.'
  },
  {
    id: 3,
    name: 'Daniel Esteban Cárdenas',
    role: 'Nuevo cliente',
    rating: 5,
    text: 'Fui por primera vez para un fade y quedé impresionado con el nivel de detalle. Definitivamente mi nueva barbería de confianza.'
  },
  {
    id: 4,
    name: 'Felipe Ortiz',
    role: 'Cliente desde 2019',
    rating: 4,
    text: 'Excelente atención al detalle en el arreglo de barba. El espacio es cómodo y siempre hay buena música ambiental.'
  }
];

/* ---------- Horarios disponibles para reservas ---------- */
export const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];
