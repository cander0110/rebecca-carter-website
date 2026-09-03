# Rebecca Carter — Visual Direction Prompt Sequence (V-series)

**Project path:** `/Users/connoranderson/rebecca-carter-website`
**Confirm Claude Code has loaded this project, not Soltura, before running anything.**

## Run order

```
Prompt 8   — Squarespace CDN image migration   (TIME-SENSITIVE, run first)
Prompt 10  — Data restructuring + CMS          (flip engine depends on this shape)
V1 → V8    — this file
Prompt 9   — Stripe Payment Links
0–7        — audit first; anything touching layout/CSS is likely superseded
```

Commit after each prompt. One prompt per commit, no exceptions — V4 and V5 in
particular need to be independently revertible.

## Standing constraints (repeat in every prompt if Claude Code drifts)

- American English, USD, imperial units, Maryland.
- Static site. No build-time server dependencies, no client-side framework added.
- Every visual feature must survive Rebecca adding content through Sveltia
  without Connor touching code.
- Respect `prefers-reduced-motion`. Visible keyboard focus everywhere.

## Content still needed from Rebecca (blocking parts of this sequence)

Existing list (bio, Print Club copy, CV, painting photos, pricing, tier
decision, featured-works decision, social URLs, Stripe account), plus three new
asks from this direction:

1. **Motif drawings** — 12–20 small standalone objects, drawn in her own hand,
   on white, photographed or scanned flat. These become the tiled background
   pattern. Blocks V2.
2. **Handwriting sample** — the full alphabet, numbers, and basic punctuation on
   unlined paper. Run through Calligraphr to generate a real webfont in her
   handwriting. Blocks the caption layer in V3. This is the single most ownable
   thing on the site; a licensed handwriting font is a fallback, not an equal.
3. **Tagline decision** — see V8.

---

## V1 — Palette and type tokens

> Read the painting images in the repo (the real ones, post-migration — not the
> placeholders). Sample the recurring colors across her strongest 8 works and
> build a palette from her actual paintings rather than inventing one.
>
> Produce a token system in CSS custom properties: one paper/ground color, one
> ink color for body text, one loud accent that carries CTAs and links, and 3–4
> supporting colors pulled from the work. Name them semantically
> (`--color-ground`, `--color-accent`) not literally (`--color-pink`).
>
> Hard constraint: no neutral grey anywhere in the palette. Where you currently
> have grey text, borders, or backgrounds, replace with a desaturated tint of a
> palette color so the "grey" still reads as part of her world. This is the
> entire point of the brand direction — grey is the thing we are arguing
> against.
>
> Avoid the cream-plus-terracotta combination; it is a generic default and reads
> as templated. Her ground should be a color choice, not a beige.
>
> Type: two families maximum plus the handwriting face. Set a real type scale
> with intentional weights and spacing. Body line length under 75 characters.
> Do not use all-caps labels or tracked-out eyebrow text above headings.
>
> Before writing code, output the proposed palette and type plan for review.
> Do not apply it site-wide until I approve.

## V2 — Motif pattern system

> Build a tiled illustrated background system.
>
> Create a `<PatternBackground>` (or equivalent for this codebase) that tiles a
> seamless SVG motif sheet as a full-bleed background layer behind page content.
> It must accept props for tile scale, opacity, and base color so different
> pages can use the same pattern at different intensities.
>
> Use placeholder motifs for now — simple line drawings of objects that are
> clearly stand-ins. Mark every placeholder with an HTML comment giving the exact
> swap instructions, matching the convention already used for the painting
> photo placeholders.
>
> Requirements: the SVG tile must be seamless at its edges, must not exceed
> 100KB, must render behind content without hurting text contrast (verify WCAG
> AA against the ground color), and must be a single request — no per-motif
> image loads.
>
> Apply it to the home hero at full intensity and to interior pages at reduced
> opacity. Do not apply it behind long-form body text.

## V3 — Scrapbook material pass

> Apply scrapbook materiality to the existing flat components. This is texture
> only — no navigation changes yet.
>
> - Paper grain on the ground, as a CSS-generated or tiny tiled texture, not a
>   large image.
> - Torn or deckled edges on section boundaries, built as SVG masks so they
>   scale.
> - Photo treatment: images sit on the page like pasted prints — visible white
>   border, tape corners or stitch borders, and a small deterministic rotation
>   derived from the item's slug so it is stable across rebuilds rather than
>   random on every load.
> - Stitched divider components between sections, as SVG dashed paths.
> - Captions set in the handwriting face, at a size that stays legible.
>
> Restraint: pick two of these to be prominent and keep the rest quiet. If every
> element is tilted, taped, torn, and stitched at once it reads as a template,
> not a scrapbook. My preference is that the photo treatment and the stitching
> carry it.
>
> All rotations must be disabled under `prefers-reduced-motion` if animated, and
> must never cause horizontal overflow on mobile.

## V4 — Flat spread pages (the safety net)

> Before building any flip interaction, restructure the site's pages into
> "spreads" as plain, static, crawlable HTML.
>
> A spread is a left page and a right page. Each spread is a real route with its
> own URL, its own `<title>` and meta description, and content rendered at build
> time. With JavaScript disabled, the site must be fully navigable as a normal
> vertical site — spreads stacked one after another, previous/next links between
> them.
>
> Spreads are generated from the CMS collections restructured in Prompt 10.
> Adding a painting in Sveltia must flow into the spread sequence automatically.
> Never hand-compose a spread.
>
> Deliver a spread-ordering rule that is deterministic and explainable: I need to
> be able to tell Rebecca "new paintings appear here" and have it be true.
>
> Do not add any flip behavior in this prompt. This layer must be complete and
> correct on its own. Verify with JS disabled before committing.

## V5 — Flip layer (desktop only)

> Mount a page-flip interaction on top of the flat spreads from V4, as
> progressive enhancement.
>
> - Desktop widths only. Below the breakpoint, the flat vertical spreads from V4
>   remain, unchanged. Do not attempt a mobile flip.
> - If the flip layer fails to initialize for any reason, the flat pages must
>   still be there and usable. Build the failure path explicitly and test it.
> - URL must update per spread so links, back button, and refresh all work.
> - Keyboard: left/right arrows turn pages, focus stays trapped correctly within
>   the visible spread, all links reachable by tab.
> - `prefers-reduced-motion`: no page-turn animation, instant spread swap.
> - Bundle budget: the flip implementation adds no more than 40KB gzipped. If a
>   library exceeds that, tell me before adding it rather than adding it anyway.
> - Lazy-load spread images beyond the current and adjacent spreads.
>
> Report the measured Lighthouse performance score before and after this prompt.

## V6 — Print Club popup (Kit)

> Build the email capture modal. Kit (formerly ConvertKit) is the provider —
> use their embeddable form endpoint, no third-party popup script.
>
> Layout mirrors the reference: image on the left, form on the right, close
> button top right. Name field, email field, one submit button. Accent-colored
> button.
>
> Behavior:
> - Desktop: modal, triggered on exit intent or after 30 seconds, whichever is
>   first.
> - Mobile: no modal. Use a dismissible bottom bar instead. Google penalizes
>   intrusive mobile interstitials and most of her traffic will arrive from
>   Instagram.
> - Dismissal persists in `localStorage` for 30 days. Successful signup
>   suppresses it permanently.
> - Never fires on first paint, never blocks content before it is triggered.
> - Focus moves into the modal on open, returns to trigger on close, Escape
>   closes it, focus is trapped while open.
> - Handle the error state: if the Kit request fails, say what happened and what
>   to do, in the site's voice. Do not fail silently and do not apologize.
>
> All copy, including the offer, must be editable in Sveltia — do not hardcode
> the discount percentage.

## V7 — Commissions and Print Club as narrative pages

> Rewrite the structure (not yet the final copy) of the commissions and Print
> Club pages so they read as stories about the work rather than service
> descriptions.
>
> Commissions currently reads as a process/pricing page. Restructure it into a
> sequence of moments: what a person brings her, how she translates it, what
> they end up with. Image-led, one idea per spread.
>
> Print Club becomes a page about belonging to something, not subscribing to
> something — early access, the people who own the work, what arrives and when.
>
> Use clearly-marked placeholder copy that Rebecca will replace. Mark every
> placeholder block with an HTML comment describing what should go there and
> roughly how long it should be, so she has a brief rather than a blank page.
>
> Do not reuse phrasing, section names, or product names from any reference site.

## V8 — Voice and microcopy pass

> Replace generic interface copy throughout with copy in her voice.
>
> - Buttons say what happens: "Join the Print Club," not "Submit."
> - Section headings and page names get personality where it fits, staying
>   legible to a first-time visitor.
> - Empty states are invitations, not notices.
> - 404 page becomes something worth landing on.
>
> Tagline goes in the hero. Do not use "Where Moments Become Paintings" or any
> near-variant — that is a live tagline on another artist's site.
>
> Put the tagline in a single CMS field so it can be changed without a deploy.
