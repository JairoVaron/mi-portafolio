# Portafolio web — Jairo de Jesús Varón Hernández

Portafolio web personal desarrollado con **HTML, CSS y JavaScript**, diseñado para mostrar mis proyectos, habilidades, experiencia y certificaciones como desarrollador de software.

## Características

* Diseño moderno y completamente responsive.
* Modo claro / oscuro con persistencia.
* Animaciones y efectos interactivos.
* Filtros dinámicos para proyectos.
* Carga de proyectos y certificaciones desde archivos JSON.
* Descarga de CV en PDF.
* Formulario de contacto conectado con **Formspree** para recibir mensajes directamente en mi correo.

## Estructura del proyecto

```text
portfolio/
│── index.html
│── netlify.toml
│── README.md
│
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── components.css
│   │   └── animations.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── effects.js
│   │   ├── projects.js
│   │   └── certifications.js
│   │
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── logo.webp
│   │   └── projects/
│   │
│   └── files/
│       ├── Jairo_Varon_CV.pdf
│       └── certificates/
│
└── data/
    ├── projects.json
    └── certifications.json
```

## Personalización

### Agregar proyectos

Edita el archivo:

```text
data/projects.json
```

Los proyectos se cargan automáticamente en la página.

### Agregar certificaciones

1. Coloca los certificados en:

```text
assets/files/certificates/
```

2. Actualiza el archivo:

```text
data/certifications.json
```

Ejemplo:

```json
{
  "title": "Fundamentos de Python",
  "issuer": "Cisco Networking Academy",
  "date": "2024",
  "file": "assets/files/certificates/python-1.pdf"
}
```

Si el campo `file` está vacío (`""`), la web mostrará **“Certificado próximamente”**.

## Configurar el formulario de contacto

El formulario utiliza **Formspree** para enviar mensajes directamente a mi correo (`jairovaron404@gmail.com`) sin necesidad de un backend propio.

1. Crear una cuenta en **Formspree**.
2. Crear un formulario y copiar el **ID** asignado.
3. Editar `assets/js/effects.js` y reemplazar:

```js
const FORMSPREE_ENDPOINT = "https://formspree.io/f/TU_ID_DE_FORMSPREE";
```

Por ejemplo:

```js
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzbqjkvd";
```

4. Publicar el sitio en Netlify, Vercel o GitHub Pages.
5. Confirmar el correo de activación que envía Formspree.

Una vez configurado, los mensajes enviados desde el formulario llegarán directamente a mi bandeja de entrada.

## Ejecutar localmente

Como el proyecto utiliza `fetch()` para cargar archivos JSON, es recomendable usar un servidor local.

Con Python:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Despliegue

Este portafolio está preparado para desplegarse fácilmente en **Netlify**, **Vercel** o **GitHub Pages**.

## Autor

**Jairo de Jesús Varón Hernández**

Desarrollador de software | Java • Spring Boot • Python • JavaScript
