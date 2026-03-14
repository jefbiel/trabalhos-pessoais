// Aqui eu pego os elementos principais que vou usar no JavaScript.
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const reservaForm = document.getElementById("reservaForm");
const formMessage = document.getElementById("formMessage");
const yearEl = document.getElementById("currentYear");
const revealItems = document.querySelectorAll(".reveal");
const navShell = document.querySelector(".nav-shell");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll("section[id], header[id]");

// Fecha o menu do mobile quando precisar.
function closeMenu() {
  navLinks.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
}

// Abre e fecha o menu do mobile.
function toggleMenu() {
  navLinks.classList.toggle("show");
  const expanded = navLinks.classList.contains("show");
  menuToggle.setAttribute("aria-expanded", String(expanded));
}

menuToggle.addEventListener("click", toggleMenu);

// Muda o visual do header quando a página desce um pouco.
function updateHeaderState() {
  if (!navShell) {
    return;
  }

  navShell.classList.toggle("scrolled", window.scrollY > 22);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

// Quando clicar em um link do menu, ele fecha no mobile.
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// Se clicar fora do menu aberto no mobile, ele fecha.
document.addEventListener("click", (event) => {
  if (!navLinks.classList.contains("show")) {
    return;
  }

  const clickedInsideNav = navShell && navShell.contains(event.target);
  if (!clickedInsideNav) {
    closeMenu();
  }
});

// Se voltar para o tamanho de desktop, o menu mobile é fechado.
window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    closeMenu();
  }
});

// Coloca o ano atual automaticamente no rodapé.
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Faz uma simulação simples de envio do formulário.
if (reservaForm) {
  reservaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Reserva recebida! Entraremos em contato para confirmar os detalhes.";
    reservaForm.reset();
  });
}

// Esse observer serve para mostrar os blocos aos poucos quando aparecem na tela.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Aqui eu marco no menu qual seção está visível no momento.
if ("IntersectionObserver" in window && navAnchors.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const currentId = entry.target.getAttribute("id");
        navAnchors.forEach((anchor) => {
          const isCurrent = anchor.getAttribute("href") === `#${currentId}`;
          anchor.classList.toggle("active", isCurrent);
        });
      });
    },
    { threshold: 0.45, rootMargin: "-18% 0px -38% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
