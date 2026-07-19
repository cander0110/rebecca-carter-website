# Rebecca Carter — Artist Website

Static website for Rebecca Carter. Built with plain HTML, CSS, and vanilla JavaScript — no build step, no frameworks, no dependencies.

**Live site:** https://rebecca-carter-website.vercel.app

---

## File Structure

```
rebecca-carter-website/
├── index.html              ← Home page
├── css/
│   └── styles.css          ← All styles (single file)
├── js/
│   └── main.js             ← Nav/footer injection, scroll effects, form handlers
├── pages/
│   ├── portfolio.html      ← Works with tab/filter/lightbox
│   ├── shop.html           ← Paintings, crafts, commission form
│   ├── shows.html          ← Upcoming + past exhibitions
│   ├── cv.html             ← Data-driven curriculum vitae
│   └── print-club.html     ← Interview series + artist interest form
├── assets/
│   ├── images/             ← Drop artwork images here
│   └── videos/             ← Drop video files here
├── docs/                   ← GitHub Pages deployment copy (see below)
│   ├── CNAME               ← Custom domain: rebeccacarter.net
│   ├── .nojekyll           ← Prevents GitHub Jekyll processing
│   └── (mirror of root)
├── .gitignore
└── README.md
```

---

## Running Locally

No build step. Serve the root folder with any static server:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

---

## Deployment: Vercel

The site is deployed on Vercel and served from the `/docs` folder. Vercel handles CDN, HTTPS, and instant cache invalidation automatically.

**Live URL:** https://rebecca-carter-website.vercel.app  
**Dashboard:** https://vercel.com/soltura/rebecca-carter-website

### Redeploy after changes

Edit source files at the root, sync to `/docs`, then redeploy with one command:

```bash
# 1. Sync source changes to /docs
cp index.html docs/ && cp -r css js pages assets docs/

# 2. Deploy to production (takes ~10 seconds)
vercel --prod
```

Vercel deploys instantly — no waiting for CI/CD. The live URL updates as soon as the command finishes.

### Connect the custom domain (rebeccacarter.net)

**In Vercel:**
1. Go to https://vercel.com/soltura/rebecca-carter-website → **Settings** → **Domains**
2. Click **Add** and type `rebeccacarter.net`
3. Vercel will show the DNS records needed (see below)
4. Also add `www.rebeccacarter.net` — Vercel redirects it to the apex automatically

**In Squarespace (DNS settings):**

Squarespace manages the domain registrar. To point it to Vercel:

1. Log in to Squarespace → **Domains** → click `rebeccacarter.net` → **DNS Settings**
2. Delete any existing **A records** for the `@` host
3. Add these records:

   | Type  | Host | Value                  | TTL  |
   |-------|------|------------------------|------|
   | A     | @    | 76.76.21.21            | 3600 |
   | CNAME | www  | cname.vercel-dns.com   | 3600 |

4. Save, then go back to the Vercel Domains page and click **Verify** — it checks automatically

DNS propagation takes 10 minutes to 48 hours. Once verified, `rebeccacarter.net` goes live over HTTPS and the temporary `.vercel.app` URL continues to work as well.

---

## Updating the Site

Edit source files at the root, then sync to `/docs` before committing:

```bash
# After editing any source file, sync /docs then redeploy:
cp index.html docs/ && cp -r css js pages assets docs/
vercel --prod
```

Vercel deploys in ~10 seconds. You'll see the URL printed in the terminal when it's done.

If you also want to save changes in git (recommended):

```bash
git add .
git commit -m "Describe what changed"
git push
```

---

## Swapping In Real Images

### Hero video (home page)
Replace the placeholder in `index.html`:

```html
<!-- Find this block and update the src and poster: -->
<video autoplay muted loop playsinline
       poster="assets/images/hero-poster.jpg">
  <source src="assets/videos/hero.mp4" type="video/mp4" />
</video>
```

Drop `hero.mp4` and `hero-poster.jpg` into `/assets/videos/` and `/assets/images/` respectively. Keep the video under **10 MB** — compress with HandBrake or ffmpeg if needed.

### Artwork images (all pages)
For any `.placeholder` div, swap it out like this:

```html
<!-- Before: -->
<div class="placeholder">Painting</div>

<!-- After (from root index.html): -->
<img src="assets/images/threshold-i.jpg"
     alt="Threshold I, oil on linen, 60×80 cm, 2024"
     loading="lazy" />

<!-- After (from pages/ files — note the ../): -->
<img src="../assets/images/threshold-i.jpg"
     alt="Threshold I, oil on linen, 60×80 cm, 2024"
     loading="lazy" />
```

Drop image files into `/assets/images/`. After adding images:
1. Update the `src` in the HTML
2. Sync to `/docs`: `cp -r assets docs/`

**Recommended specs:** WebP or JPG, max 2000 px wide for grids, max 3000 px for hero. Aim for files under 500 KB.

### Open Graph image (social sharing)
Update this line in `index.html` with a real image URL once the domain is live:

```html
<meta property="og:image"
      content="https://rebeccacarter.net/assets/images/og-image.jpg" />
```

---

## Connecting the Forms (Formspree)

All four forms are wired to [Formspree](https://formspree.io) — a free service that handles form submissions and emails them to you.

**Setup (do once):**

1. Go to [formspree.io](https://formspree.io) and create a free account
2. For each form below, click **+ New Form** and give it a name
3. Copy the form **endpoint** (looks like `https://formspree.io/f/xabcdefg`)
4. Find and replace `YOUR_FORM_ID` in each file with the ID from that URL

**Forms to connect:**

| Form | File | Description |
|------|------|-------------|
| Artist signup | `index.html` | Home page — Print Club interest |
| Commission inquiry | `pages/shop.html` | Commission a Painting section |
| Show notifications | `pages/shows.html` | Stay in the Loop signup |
| Print Club interest | `pages/print-club.html` | Artist interest form |

You can use one Formspree form for all (simpler) or create separate ones for each (cleaner inbox).

**After updating the form IDs**, sync to /docs:

```bash
cp index.html docs/
cp pages/shop.html pages/shows.html pages/print-club.html docs/pages/
```

**Free tier:** Formspree's free plan handles 50 submissions/month per form. For a personal artist site, this is plenty.

---

## Updating the CV

Open `pages/cv.html` and scroll to the `CV_DATA` object near the bottom in the `<script>` block. Edit the arrays:

```js
// Example: add a new solo exhibition
solo: [
  { year: '2025', title: 'New Show Title', institution: 'Gallery Name', location: 'City' },
  // existing entries below...
],
```

After saving, sync to docs: `cp pages/cv.html docs/pages/`

---

## Updating Shows

Open `pages/shows.html` and scroll to `PAST_SHOWS` in the `<script>` block:

```js
var PAST_SHOWS = [
  { name: 'Show Title', venue: 'Venue', city: 'City, PA', type: 'Solo', year: '2025' },
  // ...
];
```

To update the upcoming show card, find the `<article class="upcoming-show-card">` section and update the title, dates, venue, and description directly in the HTML.

After saving, sync: `cp pages/shows.html docs/pages/`

---

## Updating Print Club Interviews

Open `pages/print-club.html` and scroll to the `INTERVIEWS` array in the `<script>` block:

```js
var INTERVIEWS = [
  {
    name:     'Artist Name',
    initials: 'AN',          // shown in the avatar circle
    medium:   'Ceramics',
    location: 'City, PA',
    quote:    'Pull quote from the interview.',
    date:     'March 2025',
    url:      'https://www.instagram.com/p/YOUR_POST_ID/',
  },
  // ...
];
```

After saving, sync: `cp pages/print-club.html docs/pages/`

---

## Navigation

All nav links are defined in a single array in `js/main.js`:

```js
const NAV_LINKS = [
  { href: 'portfolio.html',                 label: 'Works'      },
  { href: 'shop.html',                      label: 'Shop'       },
  { href: 'shows.html',                     label: 'Shows'      },
  { href: 'print-club.html',                label: 'Print Club' },
  { href: 'cv.html',                        label: 'CV'         },
  { href: 'mailto:hello@rebeccacarter.art', label: 'Contact', absolute: true },
];
```

The nav and footer on every page update automatically from this array. To rename or reorder links, edit only this array. After any change to `main.js`, sync: `cp js/main.js docs/js/`

---

## Checklist Before Launch

- [ ] Replace all `.placeholder` divs with real images
- [ ] Drop hero video into `/assets/videos/hero.mp4`
- [ ] Update Formspree IDs in all four forms
- [ ] Confirm CV data is current in `pages/cv.html`
- [ ] Confirm upcoming show details are accurate in `pages/shows.html`
- [ ] Add real Print Club interview data in `pages/print-club.html`
- [ ] Sync `/docs` and push to GitHub
- [ ] Enable GitHub Pages in repo Settings → Pages → Branch: main, Folder: /docs
- [ ] Connect `rebeccacarter.net` DNS (A records + CNAME) in Squarespace
- [ ] Verify HTTPS is enforced in GitHub Pages settings
- [ ] Test every page and form on the live URL
