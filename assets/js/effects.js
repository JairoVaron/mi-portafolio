/* =========================================================
   EFFECTS.JS — Formulario de contacto, copiar email,
   glow que sigue el cursor en el hero
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
  initCopyEmail();
  initCursorGlow();
});

/* ---------------------------------------------------------
   1. Validación del formulario de contacto (sin backend)
   Al validar correctamente, arma un enlace mailto con los
   datos y muestra retroalimentación al usuario.
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("cf-name");
  const emailInput = document.getElementById("cf-email");
  const messageInput = document.getElementById("cf-message");

  const nameFeedback = document.getElementById("cf-name-feedback");
  const emailFeedback = document.getElementById("cf-email-feedback");
  const messageFeedback = document.getElementById("cf-message-feedback");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate() {
    let valid = true;

    if (nameInput.value.trim().length < 2) {
      nameFeedback.textContent = "Escribe tu nombre completo.";
      nameFeedback.className = "form-feedback error";
      valid = false;
    } else {
      nameFeedback.textContent = "";
    }

    if (!emailRegex.test(emailInput.value.trim())) {
      emailFeedback.textContent = "Ingresa un correo electrónico válido.";
      emailFeedback.className = "form-feedback error";
      valid = false;
    } else {
      emailFeedback.textContent = "";
    }

    if (messageInput.value.trim().length < 10) {
      messageFeedback.textContent = "Cuéntame un poco más (mínimo 10 caracteres).";
      messageFeedback.className = "form-feedback error";
      valid = false;
    } else {
      messageFeedback.textContent = "";
    }

    return valid;
  }

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", validate);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Revisa los campos marcados antes de continuar.", "error");
      return;
    }

    const subject = encodeURIComponent(`Contacto desde el portafolio — ${nameInput.value.trim()}`);
    const body = encodeURIComponent(
      `Nombre: ${nameInput.value.trim()}\nCorreo: ${emailInput.value.trim()}\n\nMensaje:\n${messageInput.value.trim()}`
    );

    window.location.href = `mailto:jairovaron404@gmail.com?subject=${subject}&body=${body}`;

    showToast("¡Listo! Se abrió tu cliente de correo con el mensaje redactado.", "ok");
    form.reset();
  });
}

/* ---------------------------------------------------------
   2. Copiar correo al portapapeles
--------------------------------------------------------- */
function initCopyEmail() {
  const btn = document.getElementById("copy-email-btn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const email = "jairovaron404@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      const original = btn.textContent;
      btn.textContent = "¡Copiado! ✔";
      showToast("Correo copiado al portapapeles.", "ok");
      setTimeout(() => (btn.textContent = original), 2000);
    } catch (err) {
      showToast("No se pudo copiar automáticamente. Cópialo manualmente.", "error");
    }
  });
}

/* ---------------------------------------------------------
   3. Glow que sigue el cursor dentro del hero (solo desktop)
--------------------------------------------------------- */
function initCursorGlow() {
  const hero = document.querySelector(".hero");
  const glow = document.getElementById("cursor-glow");
  if (!hero || !glow) return;

  hero.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* ---------------------------------------------------------
   4. Toast de notificación reutilizable
--------------------------------------------------------- */
function showToast(message, type = "ok") {
  const existing = document.querySelector(".toast-custom");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast-custom";
  toast.style.borderColor = type === "error" ? "var(--accent-coral)" : "var(--accent-teal)";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity .4s ease, transform .4s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}
