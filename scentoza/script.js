const reveals = document.querySelectorAll(".reveal");

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

const form = document.getElementById("contactForm");

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

  // Dit opent het standaard mailprogramma van de gebruiker met een
  // volledig ingevulde e-mail naar bram én haris.
  window.location.href = mailto.toString();
});

// (Gallery gebruikt nu geen JS-slider meer, alleen responsive CSS)
