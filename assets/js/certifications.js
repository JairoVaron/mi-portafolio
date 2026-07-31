/* =========================================================
   CERTIFICATIONS.JS — Carga dinámica de certificaciones
   desde data/certifications.json y agrega un botón
   "Ver certificado" que enlaza al PDF/imagen del diploma.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  loadCertifications();
});

async function loadCertifications() {
  const container = document.getElementById("certs-container");
  if (!container) return;

  container.innerHTML = `<p class="mono">Cargando certificaciones...</p>`;

  try {
    const response = await fetch("data/certifications.json");
    if (!response.ok) throw new Error("No se pudo obtener certifications.json");

    const certs = await response.json();
    renderCertifications(certs, container);
  } catch (error) {
    container.innerHTML = `
      <div class="alert alert-warning mono">
        No se pudieron cargar las certificaciones en este momento.
      </div>`;
    console.error("Error al cargar certificaciones:", error);
  }
}

function renderCertifications(certs, container) {
  if (!certs.length) {
    container.innerHTML = `<p class="mono">Aún no hay certificaciones cargadas.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="timeline">
      ${certs
        .map(
          (cert, index) => `
        <div class="timeline-item reveal reveal-delay-${(index % 4) + 1}">
          <div class="timeline-date">${cert.issuer} · ${cert.date}</div>
          <h5>${cert.title}</h5>
          ${
            cert.file
              ? `<a href="${cert.file}" target="_blank" rel="noopener" class="cert-link">
                   <i class="bi bi-file-earmark-text"></i> Ver certificado
                 </a>`
              : `<span class="cert-link cert-link-disabled">
                   <i class="bi bi-file-earmark-excel"></i> Certificado próximamente
                 </span>`
          }
        </div>`
        )
        .join("")}
    </div>
  `;

  // Activa el reveal-on-scroll para los items recién insertados
  const items = container.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => observer.observe(item));
}
