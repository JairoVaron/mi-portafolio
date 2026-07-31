/* =========================================================
   PROJECTS.JS — Carga dinámica de proyectos desde data/projects.json
   Incluye: skeleton de carga, filtros por categoría y
   renderizado de tarjetas con badges de tecnologías.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
});

let allProjects = [];

async function loadProjects() {
  const container = document.getElementById("projects-container");
  const filterBar = document.getElementById("filter-bar");
  if (!container) return;

  renderSkeletons(container);

  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error("No se pudo obtener el archivo de proyectos.");

    allProjects = await response.json();

    buildFilters(filterBar, allProjects);
    renderProjects(allProjects, container);
  } catch (error) {
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning mono">
          No se pudieron cargar los proyectos en este momento. Intenta recargar la página.
        </div>
      </div>
    `;
    console.error("Error al cargar proyectos:", error);
  }
}

/* ---------- Skeletons mientras se hace fetch ---------- */
function renderSkeletons(container) {
  container.innerHTML = Array.from({ length: 4 })
    .map(
      () => `
        <div class="col-md-6 col-lg-4">
          <div class="card-skeleton"></div>
        </div>`
    )
    .join("");
}

/* ---------- Construye botones de filtro dinámicamente ---------- */
function buildFilters(filterBar, projects) {
  if (!filterBar) return;

  const categories = ["todos", ...new Set(projects.map((p) => p.category))];

  filterBar.innerHTML = categories
    .map(
      (cat, i) => `
        <button class="filter-btn ${i === 0 ? "active" : ""}" data-filter="${cat}">
          ${cat === "todos" ? "Todos" : cat}
        </button>`
    )
    .join("");

  filterBar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      const filtered =
        filter === "todos" ? allProjects : allProjects.filter((p) => p.category === filter);

      renderProjects(filtered, document.getElementById("projects-container"));
    });
  });
}

/* ---------- Renderiza las tarjetas de proyecto ---------- */
function renderProjects(projects, container) {
  if (!projects.length) {
    container.innerHTML = `
      <div class="col-12 text-center">
        <p class="mono">No hay proyectos en esta categoría todavía.</p>
      </div>`;
    return;
  }

  container.innerHTML = projects
    .map((project, index) => {
      const techs = project.technologies
        .map((t) => `<span class="tech-badge">${t}</span>`)
        .join("");

      return `
        <div class="col-md-6 col-lg-4 reveal reveal-delay-${(index % 3) + 1}">
          <div class="card project-card h-100">
            <div class="card-img-wrap">
              <img src="${project.image}" class="card-img-top" alt="Captura del proyecto ${project.title}" loading="lazy">
            </div>
            <div class="card-body d-flex flex-column">
              <h5>${project.title}</h5>
              <p>${project.description}</p>
              <div class="mb-3">${techs}</div>
              <a href="${project.github}" target="_blank" rel="noopener" class="btn-ghost-custom mt-auto">
                <i class="bi bi-github"></i> Ver en GitHub
              </a>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  // Vuelve a activar el reveal-on-scroll para las tarjetas recién insertadas
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
