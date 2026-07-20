/* ============================================================
   Rebecca Carter — Stripe Payment Links
   ============================================================
   Every entry below is a Stripe Payment Link URL, created at
   dashboard.stripe.com under Payment Links. This file holds only
   those checkout URLs. No API keys, no Stripe SDK, no server code
   are needed, buy/join buttons on the site just link straight out
   to the URL you paste here.

   HOW TO ADD OR UPDATE A LINK:
   1. In the Stripe dashboard, go to Payment Links and create (or
      open) the link for this product, category, or the Print Club
      membership.
   2. Copy the link's URL. It looks like https://buy.stripe.com/xxxxxxxx
   3. Paste it as the value below, replacing null.
   4. Save. The relevant Buy/Join button on the site picks it up the
      next time the page loads, no other changes needed.

   Leave an entry as null if there's no link yet. In that case:
     - Shop category buttons fall back to the existing "Inquire to
       Purchase" contact flow.
     - The Print Club "Join the Club" button falls back to a contact
       email link.

   Originals and commissions are not listed here. Those stay
   contact-to-purchase, with Stripe Invoicing handled off-site.
   ============================================================ */

var PAYMENT_LINKS = {

  /* Subscription: Print Club membership */
  // SWAP: Stripe payment link from dashboard
  printClubMembership: null,

  /* Shop categories. These are per-category (not per-product) for now
     since the individual products in each category aren't priced/named
     yet — switch a category to per-product entries once real products
     exist, by replacing its single link here with an object keyed by
     product name. */
  // SWAP: Stripe payment link from dashboard
  paintingPrints: null,
  // SWAP: Stripe payment link from dashboard
  photographyPrints: null,
  // SWAP: Stripe payment link from dashboard
  earrings: null,
  // SWAP: Stripe payment link from dashboard
  handPaintedMagnets: null,
  // SWAP: Stripe payment link from dashboard
  handPaintedOrnaments: null,
  // SWAP: Stripe payment link from dashboard
  tradingCardsAceos: null,

};
