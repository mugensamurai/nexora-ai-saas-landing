const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

const menuButton = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });
}

const dashboard = document.querySelector(".dashboard-card");

if (dashboard && window.matchMedia("(pointer: fine)").matches) {
  dashboard.addEventListener("mousemove", (event) => {
    const rect = dashboard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    dashboard.style.transform =
      `perspective(1400px) rotateY(${(-6 + x * 5).toFixed(2)}deg) rotateX(${(2 - y * 4).toFixed(2)}deg) translateY(-2px)`;
  });

  dashboard.addEventListener("mouseleave", () => {
    dashboard.style.transform = "perspective(1400px) rotateY(-6deg) rotateX(2deg)";
  });
}


const header = document.querySelector(".site-header");
const updateHeader = () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 16
    ? "0 14px 35px rgba(0,0,0,.18)"
    : "none";
};
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
