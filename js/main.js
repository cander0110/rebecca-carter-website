/* ============================================================
   Rebecca Carter — main.js
   ============================================================ */

/* ---------- Config ---------- */

const NAV_LINKS = [
  { href: 'portfolio.html',                   label: 'Works'       },
  { href: 'shop.html',                        label: 'Shop'        },
  { href: 'shows.html',                       label: 'Shows'       },
  { href: 'print-club.html',                  label: 'Print Club'  },
  { href: 'cv.html',                          label: 'CV'          },
  { href: 'mailto:hello@rebeccacarter.art',   label: 'Contact', absolute: true },
];

/* Resolve whether we're at root or in /pages/ */
function isInPages() {
  return window.location.pathname.includes('/pages/');
}

function rootPrefix() {
  return isInPages() ? '../' : './';
}

/* Current filename (e.g. "portfolio.html") */
function currentFile() {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1] || 'index.html';
}


/* ---------- Nav ---------- */

function buildNav() {
  const root  = rootPrefix();
  const file  = currentFile();

  const linksHtml = NAV_LINKS.map(({ href, label, absolute }) => {
    const isActive = file === href ? ' active' : '';
    // absolute links (mailto:, external) are used as-is; page links get pages/ prepended from root
    const resolvedHref = absolute ? href : (isInPages() ? href : `pages/${href}`);
    return `<a href="${resolvedHref}" class="nav-link${isActive}">${label}</a>`;
  }).join('');

  return `
<nav class="site-nav" aria-label="Main navigation">
  <div class="container">
    <div class="nav-logo">
      <a href="${root}index.html">Rebecca Carter</a>
    </div>
    <div class="nav-links" id="navLinks" role="list">
      ${linksHtml}
    </div>
    <button class="nav-toggle" id="navToggle"
            aria-label="Toggle navigation menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;
}


/* ---------- Footer ---------- */

function buildFooter() {
  const year = new Date().getFullYear();
  const root = rootPrefix();

  const navLinks = NAV_LINKS.map(({ href, label, absolute }) => {
    const resolvedHref = absolute ? href : (isInPages() ? href : `pages/${href}`);
    return `<a href="${resolvedHref}">${label}</a>`;
  }).join('');

  return `
<footer class="site-footer">
  <div class="footer-body">
    <div class="container">
      <div class="footer-grid">

        <div class="footer-brand">
          <a class="footer-brand__logo" href="${root}index.html">Rebecca Carter</a>
          <p>Painting, printmaking, and mixed media.<br/>Based in London.</p>
          <p>Available for commissions, residencies,<br/>and editorial projects.</p>
        </div>

        <div class="footer-col">
          <p class="footer-col__heading">Navigate</p>
          <nav class="footer-col__links" aria-label="Footer navigation">
            ${navLinks}
          </nav>
        </div>

        <div class="footer-col">
          <p class="footer-col__heading">Info</p>
          <div class="footer-col__links">
            <a href="mailto:hello@rebeccacarter.art">hello@rebeccacarter.art</a>
            <span>For press and gallery enquiries,<br/>please email directly.</span>
            <span>Represented by<br/>[Gallery Name], London</span>
          </div>
        </div>

        <div class="footer-col">
          <p class="footer-col__heading">Connect</p>
          <nav class="footer-col__links" aria-label="Social links">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
              Pinterest
            </a>
            <a href="https://www.artsy.net/" target="_blank" rel="noopener noreferrer">
              Artsy
            </a>
            <a href="${root}pages/print-club.html">
              Newsletter
            </a>
          </nav>
        </div>

      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container flex-between" style="flex-wrap:wrap; gap:var(--sp-4);">
      <span>&copy; ${year} Rebecca Carter. All rights reserved.</span>
      <span>London, UK</span>
    </div>
  </div>
</footer>`;
}


/* ---------- Shell injection ---------- */

function injectShell() {
  const navPlaceholder    = document.getElementById('site-nav');
  const footerPlaceholder = document.getElementById('site-footer');

  if (navPlaceholder) {
    navPlaceholder.outerHTML = buildNav();
  }
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = buildFooter();
  }
}


/* ---------- Mobile nav toggle ---------- */

function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on overlay click / outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}


/* ---------- Scroll-reveal (IntersectionObserver)
   Any element with class "reveal" fades up when it enters
   the viewport. Add "reveal-delay-1" through "reveal-delay-4"
   to stagger children.
   ---------------------------------------------------------- */

function initReveal() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


/* ---------- Portfolio filter ---------- */

function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const grid       = document.getElementById('portfolioGrid');
  if (!filterBtns.length || !grid) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      grid.querySelectorAll('[data-category]').forEach((item) => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
      });

      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
}


/* ---------- Print Club form ---------- */

function initPrintClubForm() {
  const form = document.getElementById('printClubForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    // TODO: replace with fetch() to your mailing list provider
    // e.g. Mailchimp, ConvertKit, or a serverless function
    console.log('Print Club signup:', data);
    form.innerHTML = `
      <p style="font-family: 'Cormorant Garamond', serif;
                font-style: italic;
                font-size: 1.5rem;
                color: var(--ink);
                line-height: 1.4;">
        Thank you${data.firstName ? ', ' + data.firstName : ''}.<br/>
        You&rsquo;re on the list.
      </p>`;
  });
}


/* ---------- Nav scroll behaviour (transparent → opaque)
   Watches the video hero section with IntersectionObserver.
   Adds .is-scrolled to .site-nav once the hero leaves the viewport.
   Only activates when <body class="nav-transparent"> is present.
   ---------------------------------------------------------- */

function initNavScroll() {
  if (!document.body.classList.contains('nav-transparent')) return;
  const nav  = document.querySelector('.site-nav');
  const hero = document.querySelector('.hero--video');
  if (!nav || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => nav.classList.toggle('is-scrolled', !entry.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(hero);
}


/* ---------- Lazy image swap ---------- */

function initLazyImages() {
  document.querySelectorAll('img[data-src]').forEach((img) => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
}


/* ---------- Boot ---------- */

document.addEventListener('DOMContentLoaded', () => {
  injectShell();         // Nav + footer must come first
  initNavToggle();
  initNavScroll();       // Transparent → opaque on hero scroll (home page)
  initReveal();
  initPortfolioFilter();
  initPrintClubForm();
  initLazyImages();
});
