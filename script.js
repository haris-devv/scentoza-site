const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Sticky header state
const header = document.querySelector(".header");
const onScroll = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 6);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Scroll reveals
const reveals = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  reveals.forEach((el) => el.classList.add("visible"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

// Contact form -> open mail client with prefilled message
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const message = `
Naam: ${data.get("name")}
Bedrijf: ${data.get("company")}
E-mail: ${data.get("email")}
Telefoon: ${data.get("phone")}
    `.trim();

    const mailto = new URL("mailto:bram@scentoza.nl,haris@scentoza.nl");
    mailto.searchParams.set("subject", "Samenwerken met Scentoza");
    mailto.searchParams.set("body", message);

    window.location.href = mailto.toString();
  });
}

