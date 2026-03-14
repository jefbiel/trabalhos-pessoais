const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const reservaForm = document.getElementById("reservaForm");
const formMessage = document.getElementById("formMessage");
const yearEl = document.getElementById("currentYear");
const revealItems = document.querySelectorAll(".reveal");
const navShell = document.querySelector(".nav-shell");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll("section[id], header[id]");

function closeMenu() {
  navLinks.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  navLinks.classList.toggle("show");
  const expanded = navLinks.classList.contains("show");
  menuToggle.setAttribute("aria-expanded", String(expanded));
}

menuToggle.addEventListener("click", toggleMenu);

function updateHeaderState() {
  if (!navShell) {
    return;
  }

  navShell.classList.toggle("scrolled", window.scrollY > 22);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!navLinks.classList.contains("show")) {
    return;
  }

  const clickedInsideNav = navShell && navShell.contains(event.target);
  if (!clickedInsideNav) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    closeMenu();
  }
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (reservaForm) {
  reservaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Reserva recebida! Entraremos em contato para confirmar os detalhes.";
    reservaForm.reset();
  });
}

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
