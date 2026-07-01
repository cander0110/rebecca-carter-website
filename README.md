# Rebecca Carter — Artist Website

Static website for artist Rebecca Carter. Plain HTML, CSS, and vanilla JavaScript — no build step, no frameworks.

---

## File Structure

```
rebecca-carter-website/
├── index.html              # Home page (hero + recent work grid)
├── css/
│   └── styles.css          # All site styles (single stylesheet)
├── js/
│   └── main.js             # Nav/footer injection, mobile menu, Print Club form
├── pages/
│   ├── portfolio.html      # Full portfolio with category filter
│   ├── shop.html           # Originals and prints for sale
│   ├── cv.html             # Curriculum vitae
│   ├── shows.html          # Upcoming and past exhibitions
│   └── print-club.html     # Subscription membership + signup form
├── assets/
│   ├── images/             # Drop artwork images here (jpg, png, webp)
│   │   └── .gitkeep
│   └── videos/             # Drop video files here (mp4, webm)
│       └── .gitkeep
├── .gitignore
└── README.md
```

---

## Running Locally

No build step required. Open `index.html` directly in a browser, or use any static file server:

```bash
# Python (built-in)
python3 -m http.server 8080

# Node (npx, no install required)
npx serve .
```

---

## Swapping In Real Images

### Homepage hero image
In `index.html`, find the `.hero-featured` div and replace the `.image-placeholder` with:

```html
<img src="assets/images/featured.jpg" alt="Descriptive title of work" />
```

### Portfolio and home grids
Find each `.grid-item` and replace `.image-placeholder` with:

```html
<img src="../assets/images/your-file.jpg" alt="Work title, medium, year" loading="lazy" />
```

> Note: pages inside `/pages/` use `../assets/images/` (one level up).  
> `index.html` at the root uses `assets/images/`.

### Shop items
Inside each `.shop-item-image`, replace `.image-placeholder` with:

```html
<img src="../assets/images/your-file.jpg" alt="Work title" loading="lazy" />
```

### Recommended image formats
- Use **WebP** for best compression with quality.
- Fallback to **JPG** for maximum compatibility.
- Aim for images no wider than **2000px** for grids, **3000px** for the hero.

---

## Swapping In Real Videos

In `index.html` (hero) or any page, replace an `<img>` with:

```html
<video autoplay muted loop playsinline poster="assets/images/poster.jpg">
  <source src="assets/videos/your-video.mp4" type="video/mp4" />
</video>
```

- The `poster` attribute shows a still frame before the video loads — always set it.
- Keep video files under **10 MB** for fast page loads. Use HandBrake or ffmpeg to compress.

---

## Navigation

Navigation links are defined in a single array at the top of `js/main.js`:

```js
const NAV_LINKS = [
  { href: '/pages/portfolio.html', label: 'Portfolio' },
  ...
];
```

Add, remove, or rename pages there and both the nav bar and mobile menu update automatically across all pages.

---

## Print Club Form

The signup form in `pages/print-club.html` currently logs submissions to the browser console. To wire it up to a real service, replace the `form.addEventListener('submit', ...)` handler in `js/main.js` with a `fetch()` call to your chosen provider (Mailchimp, ConvertKit, Stripe, etc.).

---

## Deployment

The site is a folder of static files — deploy to any static host:

| Host | Command / method |
|---|---|
| **Netlify** | Drag & drop the project folder onto netlify.com/drop |
| **Vercel** | `npx vercel` in the project root |
| **GitHub Pages** | Push to a `gh-pages` branch or use the Pages settings |
| **Cloudflare Pages** | Connect the repo in the Cloudflare dashboard |

No build settings are needed — the publish directory is the project root (`.`).
