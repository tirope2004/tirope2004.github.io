/* =========================================================
   Tim Pennings Portfolio — main.js
   Path: assets/js/main.js
   ========================================================= */

// -------------------------
// Mobile navigation
// -------------------------

const body = document.body;
const menuButton = document.querySelector(".mobile-menu-button");
const navLinks = document.querySelectorAll(".main-nav a");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    body.classList.remove("nav-open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
  }
});

// -------------------------
// Fade-in scroll animations
// -------------------------

const fadeElements = document.querySelectorAll(".fade-in");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  fadeElements.forEach((element) => element.classList.add("visible"));
} else {
  const fadeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  fadeElements.forEach((element) => fadeObserver.observe(element));
}

// -------------------------
// Active navigation state
// -------------------------

const sections = document.querySelectorAll("section[id]");
const sectionLinks = document.querySelectorAll('.main-nav a[href^="#"]');

function setActiveNavLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - 160) {
      currentSection = section.getAttribute("id");
    }

    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 20) {
      currentSection = sections[sections.length - 1].getAttribute("id");
    }
  });

  sectionLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);

// -------------------------
// Header shadow on scroll
// -------------------------

const header = document.querySelector(".site-header");

function updateHeaderState() {
  if (!header) return;

  if (window.scrollY > 12) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeaderState);
window.addEventListener("load", updateHeaderState);

// -------------------------
// Smooth internal links with header offset
// -------------------------

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: targetPosition - headerHeight - 18,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
});

// -------------------------
// Optional: project card keyboard support
// -------------------------

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
  });
});
