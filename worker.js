/* ============================================================
   Rebecca Carter — Worker entry
   ============================================================
   Cloudflare serves every file in the repo as a static asset on its
   own, and only calls this script for paths that don't match a file.
   The two paths that matter are the CMS login routes:

     /auth      -> functions/auth.js      (send the admin to GitHub)
     /callback  -> functions/callback.js  (finish the login)

   Everything else is handed back to the static assets, so a mistyped
   URL still gets the normal 404.

   The GitHub OAuth client ID and secret reach those two handlers
   through `env`, from the Worker's secrets in the Cloudflare
   dashboard. They are never written in this repo.
   ============================================================ */

import { onRequestGet as auth } from './functions/auth.js';
import { onRequestGet as callback } from './functions/callback.js';

const ROUTES = {
  '/auth': auth,
  '/callback': callback,
};

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const handler = ROUTES[pathname.replace(/\/+$/, '')];

    if (!handler) return env.ASSETS.fetch(request);

    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET' } });
    }
    if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
      return new Response(
        'CMS login is not set up yet: GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are missing from this Worker\'s secrets.',
        { status: 500 }
      );
    }
    return handler({ request, env });
  },
};
