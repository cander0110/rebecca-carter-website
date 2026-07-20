/* ============================================================
   Rebecca Carter — Shows data
   ============================================================
   This is the single source of truth for every show on the site.
   Both the home page (index.html, "Upcoming Exhibition" section) and
   the Shows page (pages/shows.html) read from this file, so a show
   only ever needs to be entered once.

   HOW TO ADD A NEW SHOW (Rebecca / Connor):
   1. Copy one of the objects in the SHOWS_DATA array below (everything
      between one pair of matching { and }, including the comma after).
   2. Paste the copy anywhere in the array and fill in the fields:

        title       the exhibition's name
        venue       the gallery, studio, or business hosting it
        location    "City, State" (or "City, Country")
        dates       human-readable date range, e.g. "June 6-28, 2025"
                    (for past shows this can just be the year, e.g. "2024")
        startDate   the first day, in YYYY-MM-DD format. Used to sort
                    shows and to build the small date badge on the home page.
        opening     optional opening-reception line, e.g.
                    "Friday, June 6, 6:00pm to 9:00pm" (use '' if there isn't one)
        type        'Solo', 'Group', 'Duo', etc.
        status      'upcoming' or 'past'
        description a sentence or two about the show (used on the show's
                    own card/page; past shows can leave this blank)
        images      array of photo URLs from the show, for past shows only.
                    Leave as [] if there's nothing to show yet.
        shopLink    filename inside /pages/ to send visitors who want to
                    buy something from this show, e.g. 'shop.html'.
                    Use null if there's nothing to link to.

   3. Save the file. Both pages pick up the change automatically the
      next time they load (no other files need to be touched).
   ============================================================ */

var SHOWS_DATA = [

  {
    title:       'Drawn to the Skin',
    venue:       '[Tattoo Studio Name]',
    location:    'York, Pennsylvania',
    dates:       'June 6–28, 2025',
    startDate:   '2025-06-06',
    opening:     'Friday, June 6 · 6:00 pm to 9:00 pm',
    type:        'Group',
    status:      'upcoming',
    description: 'A group exhibition celebrating the intersection of tattooing, painting, and printmaking at [Tattoo Studio Name] in York, PA. Rebecca will show five new paintings alongside works by local and regional artists. Free and open to the public. [Add additional details here once confirmed.]',
    images:      [],
    shopLink:    null,
  },

  {
    title:       'Exhibition Title',
    venue:       'Gallery Name',
    location:    'Philadelphia, PA',
    dates:       '2024',
    startDate:   '2024-01-01',
    opening:     '',
    type:        'Solo',
    status:      'past',
    description: '',
    // SWAP: past show images
    images:      ['', '', ''],
    shopLink:    'shop.html',
  },

  {
    title:       'Exhibition Title',
    venue:       'Art Center Name',
    location:    'New York, NY',
    dates:       '2023',
    startDate:   '2023-01-01',
    opening:     '',
    type:        'Group',
    status:      'past',
    description: '',
    images:      [],
    shopLink:    null,
  },

  {
    title:       'Exhibition Title',
    venue:       'Gallery Name',
    location:    'York, PA',
    dates:       '2023',
    startDate:   '2023-01-01',
    opening:     '',
    type:        'Solo',
    status:      'past',
    description: '',
    images:      [],
    shopLink:    null,
  },

  {
    title:       'Exhibition Title',
    venue:       'Studio Space',
    location:    'Baltimore, MD',
    dates:       '2022',
    startDate:   '2022-01-01',
    opening:     '',
    type:        'Group',
    status:      'past',
    description: '',
    images:      [],
    shopLink:    null,
  },

  {
    title:       'Exhibition Title',
    venue:       'Community Arts',
    location:    'Harrisburg, PA',
    dates:       '2021',
    startDate:   '2021-01-01',
    opening:     '',
    type:        'Group',
    status:      'past',
    description: '',
    images:      [],
    shopLink:    null,
  },

];
