const navItems = [
  ["home", "Home", "index.html"],
  ["architecture", "Architecture", "architecture.html"],
  ["l0", "L0 / Level 0", "l0.html"],
  ["l1", "L1 / Level 1", "l1.html"],
  ["l2", "L2 / Level 2", "l2.html"],
  ["builders", "Builders", "builders.html"],
  ["network", "Network", "network.html"],
  ["boundaries", "Sovereignty", "boundaries.html"],
  ["sources", "Sources", "sources.html"]
];

const currentPage = document.body.dataset.page || "home";

function renderHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const links = navItems.map(([key, label, href]) => {
    const current = key === currentPage ? ' aria-current="page"' : "";
    return `<a href="${href}"${current}>${label}</a>`;
  }).join("");

  header.innerHTML = `
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="index.html" aria-label="Straddie Digital Twin Builders home">
        <span class="brand-mark">DT</span>
        <span class="brand-text"><strong>Digital Twin Builders</strong><span>Strange But True family</span></span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <div class="nav-links" id="site-nav">${links}</div>
    </nav>
  `;

  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".nav-links");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function renderFooter() {
  const footer = document.querySelector("[data-site-footer]");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-inner">
      <p>Straddie Digital Twin Builders. Plain-English prompt questionnaires for Level 0 (L0) to Level 2 (L2) scenes, spaces, islands and outside world-building tools.</p>
      <nav class="footer-links" aria-label="Footer links">
        <a href="sources.html">Sources</a>
        <a href="boundaries.html">Sovereignty</a>
        <a href="https://auraofintelligence.github.io/straddie-digital-twin-builders/" target="_blank" rel="noopener noreferrer">Live site</a>
        <a href="https://github.com/auraofintelligence/straddie-digital-twin-builders" target="_blank" rel="noopener noreferrer">Source repo</a>
      </nav>
    </div>
  `;
}

function renderSequenceNav() {
  const container = document.querySelector("[data-sequence-nav]");
  if (!container) return;

  const index = navItems.findIndex(([key]) => key === currentPage);
  if (index === -1) return;

  const previous = navItems[(index - 1 + navItems.length) % navItems.length];
  const next = navItems[(index + 1) % navItems.length];

  container.innerHTML = `
    <nav class="sequence-nav" aria-label="Previous and next pages">
      <a href="${previous[2]}"><span>Previous</span><strong>${previous[1]}</strong></a>
      <a href="${next[2]}"><span>Next</span><strong>${next[1]}</strong></a>
    </nav>
  `;
}

function setupToTop() {
  const button = document.querySelector("[data-to-top]");
  if (!button) return;

  const sync = () => button.classList.toggle("visible", window.scrollY > 520);
  window.addEventListener("scroll", sync, { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  sync();
}

function setupExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

renderHeader();
renderFooter();
renderSequenceNav();
setupToTop();
setupExternalLinks();
