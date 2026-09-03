# Rebecca Carter — artist portfolio and shop

Personal site for Rebecca Carter, a visual artist based in Maryland. Covers her
paintings, photography, Print Club, commissions, and shows.

The site's purpose is to bring color, connection, and community into the world.
Every design decision should serve that. This is not a services site and should
never read like one.

## Stack

- Custom static site. No client-side framework, no server-side rendering.
- Sveltia CMS with a GitHub backend. Admin at `/admin`.
- Stripe Payment Links for commerce. No card data touches the site.
- Hosted on Cloudflare Pages at `rebeccacarter.net`.

## Non-negotiables

- **American English, USD, imperial units, Maryland.** Do not introduce British
  spellings, pound sterling, or metric measurements.
- **Rebecca must be able to run this site alone.** Any feature that requires a
  developer to add a painting, change a price, or edit copy is wrong. Content
  belongs in CMS fields, never hardcoded.
- **No neutral grey in the palette.** Where a neutral is needed, use a
  desaturated tint of a palette color. The brand is an argument against grey.
- **Accessibility floor:** visible keyboard focus, `prefers-reduced-motion`
  respected, WCAG AA contrast, no horizontal overflow on mobile.
- **Progressive enhancement.** The site must be navigable and crawlable with
  JavaScript disabled. Interactive layers mount on top of working HTML, never
  in place of it.

## Design direction

The visual language is a stitched scrapbook: paper grain, pasted photos with
visible borders and tape or stitching, torn edges, handwritten captions, and a
tiled background of Rebecca's own hand-drawn motifs.

Palette derives from her actual paintings, not from reference sites. Do not
introduce a cream-and-terracotta scheme.

Spend boldness in one place per page. If everything is tilted, taped, and torn
at once it reads as a template rather than a scrapbook.

## Working agreement

- One task per commit. Never bundle unrelated changes.
- Report measured numbers, not impressions: bundle size in KB gzipped,
  Lighthouse scores before and after.
- If a change would exceed a stated budget or require a new dependency, stop and
  say so rather than proceeding.
- Do not reuse phrasing, section names, or product names from any reference site
  mentioned in planning docs. Those are structural models only.

## Reference

Full visual work sequence: `docs/visual-direction.md`
