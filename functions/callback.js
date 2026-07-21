/* ============================================================
   GitHub OAuth: step 2 — finish the login
   ============================================================
   GitHub redirects the admin's browser here after they approve access,
   with a temporary ?code= to exchange for a real access token. See the
   SETUP comment in functions/auth.js for the one-time setup this
   depends on (GitHub OAuth App + Cloudflare environment variables).

   This exchanges that code for a token, then hands the token back to
   the Sveltia CMS tab via postMessage, using the exact message format
   Decap/Sveltia CMS's GitHub backend expects. No further changes
   should be needed here once the setup in functions/auth.js is done.
   ============================================================ */

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const cookieHeader = request.headers.get('Cookie') || '';
  const cookieState = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('oauth_state='))
    ?.split('=')[1];

  if (!code || !state || state !== cookieState) {
    return new Response('Invalid or expired login attempt. Please try again.', { status: 400 });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error || !tokenData.access_token) {
    return new Response(
      `GitHub login failed: ${tokenData.error_description || tokenData.error || 'unknown error'}`,
      { status: 400 }
    );
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });

  const html = `<!DOCTYPE html>
<html>
<body>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:${payload.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
        e.origin
      );
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
Login complete. You can close this window.
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
