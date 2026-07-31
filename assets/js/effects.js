/* =========================================================
   EFFECTS.JS — Formulario de contacto, copiar email,
   glow que sigue el cursor en el hero
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
  initCopyEmail();
  initCursorGlow();
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrenwgzr";

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("cf-name");
  const emailInput = document.getElementById("cf-email");
  const messageInput = document.getElementById("cf-message");
  const submitBtn = document.getElementById("cf-submit-btn");

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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Revisa los campos marcados antes de continuar.", "error");
      return;
    }

    if (FORMSPREE_ENDPOINT.includes("TU_ID_DE_FORMSPREE")) {
      showToast(
        "El formulario aún no está conectado a Formspree. Revisa las instrucciones en effects.js.",
        "error"
      );
      return;
    }

    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="bi bi-arrow-repeat"></i> Enviando...`;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      });

      if (response.ok) {
        showToast("¡Mensaje enviado! Te responderé lo antes posible.", "ok");
        form.reset();
      } else {
        throw new Error("Formspree respondió con un error.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      showToast(
        "No se pudo enviar el mensaje. Intenta de nuevo o escribe directo a jairovaron404@gmail.com",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
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
