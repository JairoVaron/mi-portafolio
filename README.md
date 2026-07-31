# Portafolio web — Jairo de Jesús Varón Hernández

Portafolio web personal desarrollado con **HTML, CSS y JavaScript**, diseñado para mostrar mis proyectos, habilidades, experiencia y certificaciones como desarrollador de software.

## Características

* Diseño moderno y responsive.
* Modo claro / oscuro con persistencia.
* Animaciones y transiciones con CSS y JavaScript.
* Efectos al hacer scroll.
* Filtros dinámicos para proyectos.
* Contadores animados.
* Formulario de contacto.
* Carga dinámica de proyectos y certificaciones desde archivos JSON.

## Estructura del proyecto

```text
portfolio/
│── index.html
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
│   │   └── projects.js
│   │
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── logo.png
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

## Archivos importantes

Estos archivos ya están referenciados en el proyecto y **deben mantener el mismo nombre y ruta**:

* `assets/images/profile.jpg`
* `assets/images/logo.png`
* `assets/files/Jairo_Varon_CV.pdf`

## Personalización

### Agregar proyectos

Edita el archivo:

```text
data/projects.json
```

Cada proyecto se carga automáticamente en la página.

### Agregar certificaciones

1. Coloca los certificados (PDF o imagen) en:

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
  "file": "assets/files/certificates/python.pdf"
}
```

Si el campo `file` está vacío (`""`), la web mostrará **“Certificado próximamente”**.

## Ejecutar localmente

Como el proyecto utiliza `fetch()` para cargar los archivos JSON, es recomendable usar un servidor local.

Con Python:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Publicación

Este portafolio puede desplegarse fácilmente en:

* GitHub Pages
* Netlify
* Vercel

## Autor

**Jairo de Jesús Varón Hernández**

Desarrollador de software | Java • Spring Boot • Python • JavaScript
