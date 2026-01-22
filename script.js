const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// HTTPS redirect (GitHub Pages should already be HTTPS, but this covers edge cases)
if (
  window.location.protocol === "http:" &&
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1"
) {
  window.location.replace(window.location.href.replace("http://", "https://"));
}

// Canonical + OG URL (so it matches your GitHub Pages URL or custom domain)
try {
  const canonical = document.getElementById("canonicalLink");
  if (canonical) canonical.setAttribute("href", window.location.href.split("#")[0]);
  const ogUrl = document.getElementById("ogUrl");
  if (ogUrl) ogUrl.setAttribute("content", window.location.href.split("#")[0]);
} catch {
  // noop
}

// Sticky header state:
// Keep transparent over the hero image, then switch to solid when we reach
// the end of the hero section (like the reference site).
const header = document.querySelector(".header");
const hero = document.querySelector(".hero");

const getHeaderSwitchY = () => {
  if (!header || !hero) return 6;
  const headerH = header.getBoundingClientRect().height || 0;
  const heroH = hero.getBoundingClientRect().height || 0;
  // Switch when the hero is basically out of view.
  return Math.max(6, heroH - headerH - 12);
};

let headerSwitchY = getHeaderSwitchY();

const onScroll = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > headerSwitchY);
};

window.addEventListener("resize", () => {
  headerSwitchY = getHeaderSwitchY();
  onScroll();
});

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

