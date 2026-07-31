/* =========================================================
   APP.JS — Núcleo de la interactividad del portafolio
   Tema día/noche, navbar dinámico, efecto terminal (typing),
   contadores animados, reveal on scroll, botón "volver arriba"
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initNavbarScroll();
  initScrollSpy();
  initMobileNavAutoClose();
  initTypingTerminal();
  initRevealOnScroll();
  initCounters();
  initLangBars();
  initBackToTop();
  initFooterYear();
  consoleGreeting();
});

/* ---------------------------------------------------------
   1. Tema día / noche (persistido en localStorage)
--------------------------------------------------------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  const iconEl = document.getElementById("theme-icon");
  const saved = localStorage.getItem("portfolio-theme");

  const applyTheme = (theme) => {
    if (theme === "day") {
      root.setAttribute("data-theme", "day");
      if (iconEl) iconEl.className = "bi bi-cloud-sun";
    } else {
      root.removeAttribute("data-theme");
      if (iconEl) iconEl.className = "bi bi-moon-stars";
    }
  };

  applyTheme(saved === "day" ? "day" : "night");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDay = root.getAttribute("data-theme") === "day";
      const next = isDay ? "night" : "day";
      applyTheme(next);
      localStorage.setItem("portfolio-theme", next);
    });
  }
}

/* ---------------------------------------------------------
   2. Navbar: cambia de estilo al hacer scroll
--------------------------------------------------------- */
function initNavbarScroll() {
  const nav = document.getElementById("mainNavbar");
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------------------------------------------------------
   3. Scrollspy: resalta el enlace de la sección visible
--------------------------------------------------------- */
function initScrollSpy() {
  const links = document.querySelectorAll(".nav-link-custom");
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav-link-custom[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   4. Cierra el menú móvil al hacer click en un enlace
--------------------------------------------------------- */
function initMobileNavAutoClose() {
  const collapseEl = document.getElementById("menu");
  if (!collapseEl) return;

  const links = collapseEl.querySelectorAll(".nav-link-custom");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (collapseEl.classList.contains("show") && window.bootstrap) {
        const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
        bsCollapse.hide();
      }
    });
  });
}

/* ---------------------------------------------------------
   5. Efecto de escritura tipo terminal en el hero
--------------------------------------------------------- */
function initTypingTerminal() {
  const el = document.getElementById("typing-line");
  if (!el) return;

  const messages = [
    "Jairo de Jesús Varón Hernández",
    "Backend Developer en formación",
    "Java · Python · Spring Boot · Node.js · Django",
    "Riohacha, La Guajira — Colombia"
  ];

  let msgIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = messages[msgIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
      }
    }

    const speed = deleting ? 35 : 55;
    setTimeout(tick, speed);
  }

  tick();
}

/* ---------------------------------------------------------
   6. Reveal on scroll (IntersectionObserver genérico)
--------------------------------------------------------- */
function initRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

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

/* ---------------------------------------------------------
   7. Contadores animados (estadísticas "Sobre mí")
--------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   8. Barras de idiomas animadas
--------------------------------------------------------- */
function initLangBars() {
  const bars = document.querySelectorAll("[data-lang-fill]");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = el.getAttribute("data-lang-fill") + "%";
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ---------------------------------------------------------
   9. Botón "volver arriba"
--------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 500) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   10. Año dinámico en el footer
--------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   11. Saludo en consola (detalle para colegas developers)
--------------------------------------------------------- */
function consoleGreeting() {
  console.log(
    "%c¡Hola, developer! 👋",
    "font-size:16px;font-weight:bold;color:#e8a33d;"
  );
  console.log(
    "%cSi estás revisando el código, hablemos: jairovaron404@gmail.com",
    "font-family:monospace;color:#2dd4bf;"
  );
}
