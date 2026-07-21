# Rebecca Carter — Artist Website

Static website for Rebecca Carter. Built with plain HTML, CSS, and vanilla JavaScript — no build step, no frameworks, no dependencies.

**Live site:** https://rebeccacarter.net

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
├── data/                   ← Structured content data files
├── admin/                  ← Sveltia CMS (GitHub backend)
├── functions/              ← Cloudflare Pages Functions (OAuth worker)
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

## Deployment: Cloudflare Pages

The site is deployed on Cloudflare Pages, served directly from the repo root on `main`. Cloudflare handles CDN, HTTPS, and cache invalidation automatically.

**Live URL:** https://rebeccacarter.net  
**Dashboard:** Cloudflare dashboard → Workers & Pages → rebecca-carter-website

**Build settings:**
- Build command: *(none)*
- Build output directory: `/`

### Redeploy after changes

There's no `/docs` sync step — push to `main` and Cloudflare Pages builds and deploys automatically:

```bash
git add .
git commit -m "Describe what changed"
git push
```

Cloudflare Pages picks up the push, deploys, and the live URL updates within a minute or two. Check deploy status in the Cloudflare dashboard.

### Connect the custom domain (rebeccacarter.net)

**In Cloudflare Pages:**
1. Go to the project in the Cloudflare dashboard → **Custom domains**
2. Click **Set up a custom domain** and type `rebeccacarter.net`
3. Also add `www.rebeccacarter.net`
4. If the domain's DNS is already on Cloudflare, records are added automatically; otherwise Cloudflare shows the records to add at your registrar

DNS propagation takes 10 minutes to 48 hours. Once verified, `rebeccacarter.net` goes live over HTTPS.

---

## Updating the Site

Edit source files at the root, then commit and push:

```bash
git add .
git commit -m "Describe what changed"
git push
```

Cloudflare Pages deploys automatically from `main` — no sync step, no separate deploy command.

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

Drop `hero.mp4` and `hero-poster.jpg` into `/assets/videos/` and `/assets/images/` respectively. Keep the video under **10 MB** — compress with HandBrake or ffmpeg if needed. Commit and push to deploy.

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

Drop image files into `/assets/images/`, then update the `src` in the HTML and push.

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

**After updating the form IDs**, commit and push to deploy.

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

After saving, commit and push to deploy.

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

After saving, commit and push to deploy.

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

After saving, commit and push to deploy.

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

The nav and footer on every page update automatically from this array. To rename or reorder links, edit only this array, then commit and push.

---

## Checklist Before Launch

- [ ] Replace all `.placeholder` divs with real images
- [ ] Drop hero video into `/assets/videos/hero.mp4`
- [ ] Update Formspree IDs in all four forms
- [ ] Confirm CV data is current in `pages/cv.html`
- [ ] Confirm upcoming show details are accurate in `pages/shows.html`
- [ ] Add real Print Club interview data in `pages/print-club.html`
- [ ] Push to GitHub `main` to trigger a Cloudflare Pages deploy
- [ ] Connect `rebeccacarter.net` custom domain in Cloudflare Pages settings
- [ ] Verify HTTPS is enforced
- [ ] Test every page and form on the live URL
