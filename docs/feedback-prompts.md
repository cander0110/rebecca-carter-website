# Claude Code Prompts — Rebecca's Round 1 Feedback

Run these in order. Each prompt is scoped so nothing outside its listed changes gets touched.

---

## Prompt 0 — Global sweep (run first)

```
Make ONLY the following global changes across the entire site. Do not alter layout, styling, structure, or any other copy.

1. Remove every em dash (—) from all visible text sitewide. Rewrite each affected sentence naturally using commas, periods, or restructuring. Search all pages, components, metadata, and alt text.

2. Update the site's overall tone in copy ONLY where the following prompts direct. Note for context (do not rewrite anything beyond instructed): the site should read as an artist's home and story destination, not a services business. Keep this in mind for any micro-copy you touch in later changes (button labels, CTAs).

3. Find every reference to "York, PA" or "York, Pennsylvania" as Rebecca's location and replace with "Maryland". Do NOT change references to the physical retail location in York, PA where goods are sold, if any exist, only her personal "based in" location.

Do not change anything else.
```

---

## Prompt 1 — Home page

```
Make ONLY the following changes to the home page. Everything else on this page and site stays exactly as is.

HERO / TOP SECTION:
1. In the hero category words, remove "Craft". The list should now read: Painting, Photography, [Community]. 
   (NOTE TO SELF: Rebecca is deciding between "Community" and "Collectors" — use "Community" for now and mark with an HTML comment: <!-- SWAP: may change to "Collectors" -->)
2. Delete the entire written/intro paragraph section below the hero words and replace it with this single line, verbatim: "Original work rooted in exploration of the human experience and a deep need for connection."
3. Keep the existing buttons exactly as they are.

ABOUT SECTION:
4. Keep the layout. Add a clearly marked image placeholder for a photo of Rebecca with an HTML comment: <!-- SWAP: Rebecca's photo goes here -->. Wrap the current bio text in an HTML comment marker: <!-- REWRITE PENDING: Rebecca will supply new bio copy --> so it's easy to find and replace later. Keep the "read more" link into the CV page as is.

FEATURED WORKS SECTION:
5. Keep this section and its layout. Add an HTML comment at the top of the section: <!-- DECISION PENDING: may convert from featured works to featured series for broader exposure -->. Do not change the section itself yet.

UPCOMING EXHIBITIONS SECTION:
6. Keep the section, but add a fallback state: when there are zero upcoming shows, instead of an empty section, display a short default message along the lines of "No upcoming shows right now. In the meantime, you can find my work in the shop." with links/buttons to the Shop page and to Rebecca's eBay store. Use a placeholder href for eBay with an HTML comment: <!-- SWAP: eBay store URL -->. This fallback must render automatically based on whether upcoming shows exist in the shows data.

PRINT CLUB SECTION:
7. Change the Print Club tagline. Remove "conversations with artists who make things" and replace with: "Conversations with artists about their voice, process, studio, and upcoming shows."

BE FEATURED SECTION:
8. Reword this section's copy to remove "making things" style language. Frame it around creativity and creative process instead, e.g. inviting artists to share their creative process. Keep it to a similar length and keep the layout and form/button unchanged.

Do not change anything else on this page.
```

---

## Prompt 2 — Footer

```
Make ONLY the following changes to the site footer. Everything else stays exactly as is.

1. Change the location line to say Rebecca is based in Maryland (not York, PA).
2. Rewrite the "Availability" sentence. The current one is unclear. Replace with one short, plain sentence about original work and commissions being available, no em dashes.
3. Remove the "YCP Spotlight" link/item entirely.
4. In the Connect column: add Facebook and TikTok links (placeholder hrefs with HTML comments <!-- SWAP: Facebook URL --> and <!-- SWAP: TikTok URL -->). Add the email address to Connect as well.
5. Remove the email from the "Info" column since it now lives in Connect.
6. Rename the "Info" column to something more fitting for an artist site, such as "Explore" or "Pages". Pick one and apply it.

Do not change anything else.
```

---

## Prompt 3 — Works tab (Paintings + Photography)

```
Make ONLY the following changes to the Works section. Keep the existing painting/photography toggle setup exactly as it is — it stays.

PAINTINGS:
1. In any medium filters, labels, or descriptions: remove "oil" everywhere (Rebecca does not paint in oil) and add "watercolor".
2. Add category sections/filters within Paintings for: Originals, Prints, Magnets, Ornaments, Earrings, ACEOs / Trading Cards. Each new category gets a clearly labeled placeholder grid with HTML comments marking where images go: <!-- SWAP: [category] images -->. Match the existing gallery styling exactly.

PHOTOGRAPHY:
3. Restructure the photography page to read as an art gallery, NOT a photographer-for-hire services page. Remove any copy that implies booking sessions or event photography as a primary offering.
4. Add a few example category sections showcasing types of photography, using the existing 55 images, grouped sensibly (e.g., by subject or series).
5. Add ONE small, low-key section noting that Rebecca is selectively open to: family photos, outdoor headshots (not studio), and engagement/couple photos (post-engagement). Keep the tone "open to inquiries," not "book now."
6. Add a section where visitors can buy photography prints, linking to the relevant shop category.

Do not change anything else.
```

---

## Prompt 4 — Shop + Commissions

```
Make ONLY the following changes to the Shop and Commission areas. Keep the overall shop format and the contact-to-purchase approach — Rebecca likes both.

SHOP CATEGORIES:
1. Replace the current "printing / craft and goods" category structure with these categories: Photography Prints, Painting Prints, Originals, Earrings, Hand-Painted Magnets, Hand-Painted Ornaments, Trading Cards / ACEOs. Placeholder product grids per category with HTML comments: <!-- SWAP: [category] products -->.

COMMISSIONS:
2. In the commission description/inquiry form suggestions, add a field or prompt asking what MEDIUM the client wants (watercolor, acrylic, etc. — no oil).
3. Turnaround time: remove any specific/direct timeframe. Replace with copy stating turnaround varies by piece.
4. Shipping: remove any mention of free shipping. Replace with copy stating shipping is calculated separately based on the piece, since larger works may require crating and proper shipping.
5. Delete all "starting from" price language in the commission section entirely.

Do not change anything else.
```

---

## Prompt 5 — Shows tab

```
Make ONLY the following changes to the Shows page.

1. Move all show entries into a single data file (e.g., /data/shows.json or a shows array in one clearly named file) with fields: title, venue, location, dates, status (upcoming/past), description, images (array), shopLink (optional). The page renders from this file. Add a README comment block at the top of the data file explaining, in plain language, how Rebecca/Connor adds a new show by copying an entry.
2. Past shows: each past show can include an image gallery of artwork from that show so visitors can virtually view it, and an optional link to shop available pieces from that show. Add one example past show entry with placeholder images (<!-- SWAP: past show images -->).
3. The "stay in the loop" email signup: wire the form to POST to a configurable newsletter provider endpoint (leave the endpoint as an env variable / clearly marked constant with comment <!-- SWAP: newsletter provider endpoint, e.g., Mailchimp/Buttondown -->). Below the form add: (a) a short consent line stating that by signing up the visitor agrees to receive occasional emails about shows and new work, and can unsubscribe at any time, and (b) a link to the privacy/legal disclaimer.
4. Ensure the upcoming-shows fallback from the home page (eBay/shop default when no shows) pulls from this same data file.

Do not change anything else.
```

---

## Prompt 6 — Print Club tab

```
Make ONLY the following changes to the Print Club page.

1. Wrap the current descriptive copy in a marker comment: <!-- REWRITE PENDING: Rebecca will supply copy in her own words -->. Do not delete it yet; it holds layout.
2. Update the tagline here to match the home page: "Conversations with artists about their voice, process, studio, and upcoming shows."
3. Add clearly labeled example-image placeholders with comments: <!-- SWAP: Print Club example photos -->.
4. Keep the existing "watch on Instagram" example embeds/links. Add a TikTok link alongside them (placeholder href, <!-- SWAP: TikTok URL -->).
5. Add a "Join the Club" section with: a membership benefits list (placeholder bullet items marked <!-- SWAP: benefits from Rebecca -->), a pricing line (placeholder marked <!-- SWAP: pricing -->), and a prominent join/pay button (placeholder href marked <!-- SWAP: payment link, e.g., Stripe payment link -->).
6. Add a legal/data-collection section: a short plain-language disclaimer covering what information is collected via the sign-up and artist-feature forms, how it is used, that it is not sold to third parties, and how to request removal. Link this same disclaimer from the artist sign-up form and the newsletter form.

Do not change anything else.
```

---

## Prompt 7 — CV + verification pass

```
Two final tasks:

1. CV page: keep the layout exactly as is. Wrap the CV content in a marker comment: <!-- UPDATE PENDING: Rebecca supplying artwork-specific CV content -->. No other changes. (Contact page needs no changes at all.)

2. Verification pass across the whole site. Confirm: no em dashes (—) anywhere in visible text; no remaining "oil" references as a painting medium; no "free shipping" language; no "starting from" pricing in commissions; no "YCP Spotlight" in the footer; Rebecca's location reads Maryland; the Print Club tagline is consistent on home and Print Club pages; and all <!-- SWAP --> / <!-- REWRITE PENDING --> / <!-- DECISION PENDING --> comments are present and listed. Output a summary list of every remaining SWAP/PENDING marker with its file location so we have a punch list for Rebecca.
```

---

## Prompt 8 — Migrate images off the Squarespace CDN (CRITICAL — run before cancelling Squarespace)

```
The site currently hot-links roughly 55 photography images (and possibly other assets) directly from Squarespace CDN URLs (images.squarespace-cdn.com or similar). Rebecca's Squarespace subscription will be cancelled soon, which will break every one of those URLs. Do the following:

1. Scan the entire codebase and list every external image URL pointing to Squarespace's CDN (or any squarespace.com domain).
2. Write and run a script that downloads each of those images at the highest available resolution into a local assets/images directory in the repo, with clean, descriptive filenames (e.g., photography-portrait-01.jpg). If a URL contains sizing query params, strip them to fetch the full-resolution original.
3. Replace every Squarespace CDN reference in the code with the local asset path. If the framework supports it, use its optimized image component (e.g., next/image) so the site serves responsive, compressed versions.
4. After replacement, verify: zero remaining references to any squarespace domain anywhere in the repo, and every image renders correctly in the local dev build.
5. Output a manifest listing each original URL and the local file it was saved to.

Do not change anything else — no layout, copy, or styling changes.
```

---

## Prompt 9 — Stripe payment links integration

```
Wire the site's purchase and membership actions to Stripe Payment Links. No card data is ever collected or processed on this site; all buy/join buttons are plain links out to Stripe-hosted checkout pages.

1. Create a single config file (e.g., /data/paymentLinks.js or .json) holding named Stripe Payment Link URLs, one entry per purchasable item type: printClubMembership (subscription), plus per-product or per-category links for shop items as needed. Every entry starts as a placeholder marked <!-- SWAP: Stripe payment link from dashboard -->. Add a comment block at the top explaining that links are created at dashboard.stripe.com under Payment Links and pasted here.
2. Point the Print Club "Join the Club" button (from Prompt 6) at the printClubMembership entry.
3. In the Shop, where products are purchasable directly (prints, magnets, ornaments, earrings, trading cards), render a "Buy" button that uses that product's payment link when one exists in the config; when no link exists yet, fall back to the existing contact-to-purchase flow. Originals and commissions stay contact-to-purchase (Stripe Invoicing handled off-site, no code needed).
4. All Stripe links open in a new tab. Add a short reassurance line near buy buttons: payments are processed securely by Stripe; no payment information is stored on this site.
5. Do not add any Stripe SDK, API keys, or server code. Links only.

Do not change anything else.
```

---

## Prompt 10 — Content data files + admin panel (Sveltia CMS) so Becca can update the site herself

```
Goal: Rebecca (non-technical) must be able to add new photos, artworks, products, prices, and shows through a simple admin panel at /admin, without touching code. Implement this in two parts.

PART A — Move ALL editable content into structured data files:
1. Audit the site and move every piece of content Rebecca will maintain into data files (JSON, YAML, or markdown with frontmatter — pick what fits the framework): paintings (title, category [originals/prints/magnets/ornaments/earrings/ACEOs], medium, dimensions, price, image, availability, description), photography items (title, category, image, printAvailable, printPrice), shop products (name, category, price, image, description, stripeLink [optional], available), shows (already done in Prompt 5 — reuse that file), Print Club episodes (artist name, links, image), and simple editable text blocks for the home hero line, about blurb, and footer availability sentence.
2. All pages render from these data files. No product, price, or gallery image may be hardcoded in a page or component after this change.
3. Images referenced by data files live in a single organized uploads directory in the repo.

PART B — Set up Sveltia CMS backed by the GitHub repo:
4. Add Sveltia CMS: an /admin route serving the CMS single-page app, plus a config.yml defining a collection for each data type from Part A, with human-friendly labels, field widgets (image upload widget for photos, number widget for prices with USD hint, select widgets for categories matching the site's real category lists), and sensible required fields.
5. Configure the GitHub backend for the repo, and scaffold the small OAuth handler needed for login on Cloudflare (a Cloudflare Worker or Pages Function for GitHub OAuth). Put client ID/secret as environment variable placeholders with a SETUP comment explaining: create a GitHub OAuth App, set the callback URL, paste credentials into Cloudflare environment variables.
6. Media: configure the CMS media folder to the uploads directory from Part A so image uploads land in the repo and deploy automatically.
7. Write a short PLAIN-ENGLISH guide as ADMIN-GUIDE.md at the repo root, written for Rebecca: how to log in at rebeccacarter.net/admin, how to add a new painting with a price, how to change a price, how to add a show, how to mark something sold, and the fact that changes go live automatically a minute or two after clicking Publish.
8. Verify the local build renders correctly from the data files and the /admin route loads.

Do not change any visual design, layout, or copy in this prompt — this is a pure restructuring + tooling change.
```

---

## Launch checklist — hosting + domain cutover (manual steps, not a Claude Code prompt)

Hosting is **Cloudflare Pages** — completely separate from the Soltura/Vercel setup. Consider creating the Cloudflare account (and even the GitHub repo) under Rebecca's own email so the whole stack belongs to her.

Do these in order. Do NOT cancel anything at Squarespace until step 8.

1. **Before anything else:** run Prompt 8 so all images live in the repo, not on Squarespace's CDN.
2. Create a Cloudflare account → Workers & Pages → Create → Pages → connect the GitHub repo. Set the build command and output directory for the framework (Cloudflare detects most frameworks automatically). Every push to main now auto-deploys. Free tier — commercial use is allowed.
3. Complete the CMS auth setup from Prompt 10: create the GitHub OAuth App, add the client ID/secret to Cloudflare environment variables, redeploy, and confirm Rebecca can log in at the temporary URL's /admin and publish a test change.
4. Test everything thoroughly on the temporary `*.pages.dev` URL, including all Stripe links in Stripe **test mode** first, then live mode.
5. In Cloudflare Pages: project → Custom domains → add `rebeccacarter.net` and `www.rebeccacarter.net`. Cloudflare will display the DNS records needed.
6. In Squarespace: Settings → Domains → `rebeccacarter.net` → DNS settings. Delete Squarespace's own site records and enter the records Cloudflare provided. (The domain registration and the website subscription are separate — you are only changing where the domain points.)
7. Wait for DNS to propagate (minutes to a few hours), confirm `rebeccacarter.net` loads the new site with a valid HTTPS certificate (issued automatically).
8. Only now, cancel the Squarespace **website subscription**. Keep the **domain registration** active — set it to auto-renew so the domain is never lost.
9. Optional, later: transfer the domain registration itself into the same Cloudflare account (Cloudflare is also a registrar with at-cost renewals). Everything then lives in one dashboard, but this is not needed for launch.

**Stripe setup (one-time, in the Stripe dashboard):** create an account for Rebecca (her name, her bank account), enable Payment Links, create a subscription-type link for Print Club membership and product links for shop items, then paste each URL into the config file from Prompt 9 — or, once Prompt 10 is done, Rebecca can paste new payment links into products herself through the /admin panel.

**Becca's ongoing workflow after launch:** log in at rebeccacarter.net/admin → add/edit paintings, products, prices, photos, and shows through forms → click Publish → site updates automatically within a couple of minutes. See ADMIN-GUIDE.md in the repo.
