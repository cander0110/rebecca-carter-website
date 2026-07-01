/* ===================================================
   Rebecca Carter — main.js
   =================================================== */

/* ---------- Nav injection ----------
   Injects consistent nav and footer into every page.
   The nav-links and footer-links arrays are the single
   source of truth for site navigation.
   --------------------------------------------------- */

const NAV_LINKS = [
  { href: '/pages/portfolio.html', label: 'Portfolio' },
  { href: '/pages/shop.html',      label: 'Shop' },
  { href: '/pages/cv.html',        label: 'CV' },
  { href: '/pages/shows.html',     label: 'Shows' },
  { href: '/pages/print-club.html',label: 'Print Club' },
];

function buildNav() {
  const currentPath = window.location.pathname;

  const linksHtml = NAV_LINKS.map(({ href, label }) => {
    const isActive = currentPath.endsWith(href.replace(/^\//, '')) ? ' active' : '';
    return `<a href="${href}"class="${'nav-link' + isActive}">${label}</a>`;
  }).join('');

  const rootPrefix = currentPath.includes('/pages/') ? '../' : './';

  return `
    <nav class="site-nav" aria-label="Main navigation">
      <div class="container">
        <div class="nav-logo">
          <a href="${rootPrefix}index.html">Rebecca Carter</a>
        </div>
        <div class="nav-links" id="navLinks">
          ${NAV_LINKS.map(({ href, label }) => {
            const resolvedHref = currentPath.includes('/pages/')
              ? href.replace('/pages/', '')
              : href;
            const isActive = currentPath.endsWith(href.replace(/^\/pages\//, '')) ? ' active' : '';
            return `<a href="${resolvedHref}" class="nav-link${isActive}">${label}</a>`;
          }).join('')}
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`;
}

function buildFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container">
        <span>&copy; ${year} Rebecca Carter. All rights reserved.</span>
        <nav class="footer-links" aria-label="Footer navigation">
          <a href="mailto:hello@rebeccacarter.art">Contact</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a>
        </nav>
      </div>
    </footer>`;
}

function injectShell() {
  const navEl = document.getElementById('site-nav');
  const footerEl = document.getElementById('site-footer');
  if (navEl) navEl.outerHTML = buildNav();
  if (footerEl) footerEl.outerHTML = buildFooter();
}

/* ---------- Mobile nav toggle ---------- */

function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- Print Club form ---------- */

function initPrintClubForm() {
  const form = document.getElementById('printClubForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    // TODO: wire up to a real mailing list service (e.g. Mailchimp, ConvertKit)
    console.log('Print Club signup:', data);
    form.innerHTML = `<p style="font-size:1.125rem; font-family: Georgia, serif;">
      Thank you, ${data.firstName || 'friend'}! You're on the list.
    </p>`;
  });
}

/* ---------- Lazy-load placeholder swap ----------
   When you add real images, they will load automatically.
   Placeholders are shown only when no src is set.
   --------------------------------------------------- */

function initPlaceholders() {
  document.querySelectorAll('img[data-src]').forEach((img) => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
}

/* ---------- Boot ---------- */

document.addEventListener('DOMContentLoaded', () => {
  injectShell();
  initNavToggle();
  initPrintClubForm();
  initPlaceholders();
});
