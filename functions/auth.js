/* ============================================================
   GitHub OAuth: step 1 — start the login
   ============================================================
   SETUP (Connor, one-time, before the CMS can be used):

   1. Create a GitHub OAuth App at
        https://github.com/settings/developers
      with:
        Homepage URL:              https://rebeccacarter.net
        Authorization callback URL: https://<this-site's-deployed-domain>/callback

   2. In the Cloudflare Pages project (Settings -> Environment variables),
      add these for both Production and Preview:
        GITHUB_CLIENT_ID      = the OAuth App's Client ID
        GITHUB_CLIENT_SECRET  = the OAuth App's Client Secret
      Never put these values directly in this file or commit them.

   3. Update admin/config.yml's backend.base_url to match this site's
      deployed domain.

   Once that's done, this function needs no further changes: Sveltia
   CMS opens a popup to /auth (this file), which redirects to GitHub;
   GitHub sends the user back to /callback (functions/callback.js),
   which finishes the handshake.
   ============================================================ */

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const state = crypto.randomUUID();

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
