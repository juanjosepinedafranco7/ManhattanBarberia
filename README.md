# Iron Barber Co. — Sitio Web

Sitio web completo para una barbería: presentación del negocio, catálogo de
servicios, galería de trabajos, equipo, testimonios, sistema de reservas e
información de contacto con integración a WhatsApp.

Construido con **HTML, CSS y JavaScript puro** (sin frameworks ni build
tools), organizado en una arquitectura modular fácil de mantener y de
entregar a un cliente.

---

## 1. Estructura del proyecto

```
├── index.html              ← Único archivo HTML (estructura de toda la página)
├── css/
│   ├── variables.css       ← Colores, tipografías, espaciados (tokens de diseño)
│   ├── reset.css            ← Reset y estilos base
│   ├── layout.css            ← Contenedores, encabezados de sección, grids
│   ├── components.css        ← Botones, badges, filtros, preloader, toast...
│   ├── navbar.css             ← Barra de navegación + menú móvil
│   ├── hero.css                ← Sección principal (portada)
│   ├── about.css                ← Sección "Nosotros"
│   ├── services.css              ← Catálogo de servicios
│   ├── gallery.css                ← Galería + lightbox
│   ├── team.css                    ← Tarjetas del equipo
│   ├── testimonials.css             ← Carrusel de testimonios
│   ├── booking.css                   ← Formulario de reservas
│   ├── contact.css                    ← Sección de contacto + mapa
│   ├── footer.css                      ← Pie de página + botón WhatsApp
│   ├── animations.css                   ← Keyframes y clases de animación
│   └── responsive.css                    ← Breakpoints transversales
├── js/
│   ├── config.js            ← 🔧 TODA la información editable del negocio
│   ├── utils.js              ← Funciones auxiliares compartidas
│   ├── navigation.js          ← Navbar, menú móvil, scrollspy, volver arriba
│   ├── services.js             ← Renderiza y filtra el catálogo de servicios
│   ├── gallery.js                ← Renderiza la galería + lightbox
│   ├── team.js                    ← Renderiza las tarjetas del equipo
│   ├── testimonials.js             ← Carrusel de reseñas
│   ├── booking.js                   ← Formulario de reservas (validación,
│   │                                   horarios, confirmación)
│   ├── animations.js                 ← Scroll-reveal, contadores, preloader
│   └── main.js                        ← Punto de entrada: inicializa todo
└── assets/
    └── images/
        ├── hero/        ← Imagen principal de la portada
        ├── about/        ← Imágenes de la sección "Nosotros"
        ├── gallery/        ← Fotos de trabajos realizados (8 espacios)
        └── team/            ← Fotos de los barberos (4 espacios)
```

---

## 2. Cómo personalizar el contenido

### 2.1 Información del negocio (lo más importante)

Edita **`js/config.js`**. Ahí se centraliza:

- Nombre, eslogan, teléfono, correo, dirección, redes sociales
- Estadísticas del hero (años de experiencia, clientes, etc.)
- Horario de atención (`HOURS`)
- Catálogo de **servicios** (`SERVICES`) con nombre, descripción, precio y duración
- **Galería** de trabajos (`GALLERY`)
- **Equipo** de barberos (`TEAM`)
- **Testimonios** (`TESTIMONIALS`)
- Horarios disponibles para reservas (`TIME_SLOTS`)

Gracias a `main.js`, cambiar el teléfono, correo, dirección o redes en
`config.js` actualiza automáticamente **todos** los lugares donde aparecen
(navbar, menú móvil, footer, sección de contacto, botón flotante de
WhatsApp y barra inferior móvil).

> 📌 **Importante:** actualiza `BUSINESS.phoneE164` (sin signos, ej.
> `573001234567`) y `BUSINESS.mapEmbedSrc` (el `src` del iframe que te da
> Google Maps al usar "Compartir → Insertar mapa").

### 2.2 Imágenes

Todas las imágenes son **placeholders en SVG** que indican qué foto va en
cada lugar y el tamaño recomendado. Para reemplazarlas:

1. Coloca tu foto en la misma carpeta (puede ser `.jpg`, `.png` o `.webp`).
2. Actualiza la ruta correspondiente:
   - Hero: en `index.html`, la etiqueta `<img>` dentro de `.hero__bg`.
   - About: en `index.html`, `.about__img-main` y `.about__img-float`.
   - Galería y equipo: en `js/config.js`, dentro de `GALLERY` y `TEAM`
     (campo `image`).

Tamaños recomendados (ya indicados en cada placeholder):

| Sección   | Tamaño sugerido |
|-----------|-----------------|
| Hero      | 1920 × 1080 px |
| About     | 900 × 1100 px / 640 × 480 px |
| Galería   | 800 × 800 px (algunas 800×1000 o 1000×800 para el mosaico) |
| Equipo    | 700 × 850 px |

### 2.3 Textos generales

Los textos de cada sección (títulos, descripciones, "Sobre nosotros", etc.)
están directamente en `index.html`, marcados con comentarios por sección
para ubicarlos fácilmente.

---

## 3. Cómo ejecutar el proyecto localmente

Como el sitio usa **módulos ES (`type="module"`)**, los navegadores no
permiten abrir `index.html` directamente con doble clic (`file://`) por
restricciones de seguridad (CORS). Debes servirlo con un servidor local:

```bash
# Opción 1: Python (ya viene instalado en la mayoría de sistemas)
python3 -m http.server 8080

# Opción 2: Node.js
npx serve .
```

Luego abre `http://localhost:8080` en tu navegador.

Para producción, simplemente sube toda la carpeta a tu hosting (cualquier
hosting estático: GitHub Pages, Netlify, Vercel, hosting compartido, etc.).
No requiere build ni instalación de dependencias.

---

## 4. Sistema de reservas

El formulario de reservas (`js/booking.js`) funciona completamente en el
navegador:

- Valida nombre, apellido, teléfono, correo (opcional), servicio y fecha.
- Genera horarios disponibles de forma **simulada y determinista** según
  la fecha y el barbero elegido (para que el sitio se vea funcional sin
  backend).
- Al confirmar, genera un código de referencia y muestra una pantalla de
  éxito con un botón para avisar por WhatsApp.

### Conectarlo a un backend real

Para producción, lo recomendable es reemplazar la función `handleSubmit`
en `js/booking.js` por una petición real, por ejemplo:

```js
const response = await fetch('https://tu-api.com/reservas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...datosDelFormulario })
});
```

Y la disponibilidad de horarios (`getAvailableSlots`) debería consultarse
al backend en lugar de calcularse con el hash simulado.

---

## 5. Accesibilidad y SEO

- Etiquetas semánticas (`header`, `main`, `nav`, `section`, `footer`).
- Atributos `alt` descriptivos en todas las imágenes.
- Roles ARIA en el menú móvil, lightbox y botones de control.
- Meta etiquetas `description`, `keywords` y Open Graph en `<head>`.
- Soporte para `prefers-reduced-motion` (desactiva animaciones si el
  usuario lo prefiere).
- Diseño responsive probado para móvil, tablet y escritorio.

---

## 6. Navegadores soportados

Navegadores modernos con soporte de ES Modules, CSS Custom Properties,
Grid y `IntersectionObserver` (Chrome, Edge, Firefox, Safari — versiones
de los últimos ~5 años).
