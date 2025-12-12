// Enhanced service worker for aggressive caching and offline support
const CACHE_VERSION = 'v2';
const STATIC_CACHE = `laangar-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `laangar-dynamic-${CACHE_VERSION}`;
const FONT_CACHE = `laangar-fonts-${CACHE_VERSION}`;

// Assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/assets/laangar-logo-128.png',
  '/assets/laangar-logo.png',
  '/favicon.png',
];

// Install: precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(k => k.startsWith('laangar-') && 
            k !== STATIC_CACHE && 
            k !== DYNAMIC_CACHE && 
            k !== FONT_CACHE)
          .map(k => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// Fetch: intelligent caching strategies
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // Skip Supabase API calls - always network
  if (url.hostname.includes('supabase')) return;

  const sameOrigin = url.origin === self.location.origin;

  // Strategy 1: Cache-first for static assets (JS, CSS, images)
  if (sameOrigin && (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg')
  )) {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }

  // Strategy 2: Cache-first for fonts (long-lived)
  if (url.hostname === 'fonts.gstatic.com' || 
      url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(cacheFirst(req, FONT_CACHE));
    return;
  }

  // Strategy 3: Stale-while-revalidate for Google Fonts CSS
  if (url.hostname === 'fonts.googleapis.com') {
    event.respondWith(staleWhileRevalidate(req, FONT_CACHE));
    return;
  }

  // Strategy 4: Network-first for HTML pages (SPA navigation)
  if (sameOrigin && req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(req, DYNAMIC_CACHE));
    return;
  }

  // Default: network only
});

// Cache-first: try cache, fallback to network
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

// Stale-while-revalidate: return cache immediately, update in background
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then(response => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

// Network-first: try network, fallback to cache
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    
    // Fallback to index for SPA routing
    const indexCached = await cache.match('/');
    if (indexCached) return indexCached;
    
    return new Response('Offline', { status: 503 });
  }
}
