// Minimal service worker to cache static assets and fonts for repeat visits
const CACHE_NAME = 'anchor-tools-cache-v1';

self.addEventListener('install', (event) => {
  // Activate immediately after installation
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Clean up old caches
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== 'GET') return;

  const sameOrigin = url.origin === self.location.origin;
  const isAsset = sameOrigin && url.pathname.startsWith('/assets/');
  const isFontFile = url.hostname === 'fonts.gstatic.com';
  const isFontStylesheet = url.hostname === 'fonts.googleapis.com';

  // Cache-first for immutable build assets and font files
  if (isAsset || isFontFile) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // Stale-while-revalidate for Google Fonts CSS (stylesheet indirection)
  if (isFontStylesheet) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // For navigation and other requests, let the network handle them
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const networkFetch = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => cached);
  return cached || networkFetch;
}
