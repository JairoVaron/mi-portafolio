# Portafolio — Jairo de Jesús Varón Hernández

## Estructura del proyecto

```
index.html
assets/
  css/
    base.css         → variables, reset, tipografía, utilidades, modo día/noche
    components.css   → navbar, hero, botones, cards, timeline, formulario, footer
    animations.css   → keyframes, reveal on scroll, responsive
  js/
    app.js           → tema, navbar, efecto de escritura, contadores, reveal, scrollspy
    effects.js       → formulario de contacto, copiar correo, glow del cursor
    projects.js      → carga y filtra proyectos desde data/projects.json
  images/
    profile.jpg      → ⚠️ coloca aquí tu foto de perfil (ya referenciada, respeta el nombre)
    logo.png         → ⚠️ tu ícono/favicon (ya referenciado)
    projects/        → portadas de cada proyecto (se incluyeron placeholders en SVG,
                        puedes reemplazarlas por capturas reales manteniendo el mismo nombre)
  files/
    Jairo_Varon_CV.pdf → ⚠️ coloca aquí tu hoja de vida en PDF
    certificates/     → ⚠️ coloca aquí tus diplomas/certificados (PDF o imagen)
data/
  projects.json        → información de los proyectos (edítalo para añadir/quitar proyectos)
  certifications.json  → información de tus certificaciones (edítalo para añadir/quitar)
```

## Qué se mantuvo igual (rutas respetadas)

- `assets/images/profile.jpg`
- `assets/images/logo.png`
- `assets/files/Jairo_Varon_CV.pdf`

Estos tres archivos **no se generaron** porque ya los tienes en tu proyecto original: solo
asegúrate de copiarlos dentro de las carpetas indicadas arriba con esos mismos nombres y
todo funcionará sin tocar el código.

## Qué se agregó

- 4 imágenes SVG de portada para los proyectos (`assets/images/projects/`), generadas como
  marcador visual — puedes cambiarlas por capturas reales de cada proyecto cuando quieras,
  solo respeta el nombre de archivo o actualiza la ruta en `data/projects.json`.
- Modo día/noche con persistencia en `localStorage`.
- Filtros dinámicos de proyectos por categoría.
- Formulario de contacto validado en JS (abre tu cliente de correo con el mensaje redactado).
- Animaciones de scroll, contador de estadísticas, barras de idiomas, efecto de escritura
  tipo terminal en el hero.

## Cómo subir tus certificaciones

La sección "Trayectoria" ahora carga tus certificaciones dinámicamente desde
`data/certifications.json`, igual que los proyectos. Para que el botón **"Ver certificado"**
funcione:

1. Coloca el archivo de cada certificado (PDF o imagen) dentro de `assets/files/certificates/`.
2. Ábrelo `data/certifications.json` y en cada objeto ajusta el campo `"file"` con la ruta
   exacta de ese archivo. Ejemplo:

   ```json
   {
     "title": "Fundamentos de Python 1",
     "issuer": "Cisco Networking Academy (MinTIC)",
     "date": "2024",
     "file": "assets/files/certificates/python-1.pdf"
   }
   ```

3. Si todavía no tienes el archivo escaneado de alguna certificación, deja el campo `"file"`
   como cadena vacía `""` y el sitio mostrará automáticamente "Certificado próximamente" en
   lugar de un enlace roto.
4. ¿Tienes una certificación nueva que no está en la lista? Agrega un objeto más al arreglo
   del JSON con la misma estructura — no necesitas tocar el HTML ni el JS.

## Cómo verlo localmente

Al usar `fetch()` para cargar `data/projects.json`, necesitas servir el sitio con un
servidor local (no funciona abriendo el `index.html` directamente con doble clic en algunos
navegadores). Una forma sencilla:

```bash
# Desde la carpeta del proyecto
python3 -m http.server 8000
# Luego abre http://localhost:8000 en tu navegador
```

También puedes subir la carpeta completa a GitHub Pages, Netlify o Vercel para publicarla.
