/* ========================================================================= */
/* SERVICE WORKER — ÖG PWA (GitHub Pages: /og-mobile/)                       */
/* ========================================================================= */
const CACHE_VERSION = 'og-pwa-v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== STATIC_CACHE)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;

  // 1. Solo interceptar solicitudes GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 2. NUNCA cachear ni interceptar Supabase (Auth, REST, Storage, Realtime) ni CDNs externos
  if (
    url.origin !== self.location.origin ||
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('supabase.in') ||
    request.headers.has('authorization') ||
    request.headers.has('apikey')
  ) {
    return;
  }

  // 3. Navegación HTML (Network-First con fallback a caché para evitar versiones viejas)
  if (request.mode === 'navigate' || url.pathname.endsWith('index.html') || url.pathname === '/og-mobile/') {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.ok) {
            const copy = networkResponse.clone();
            caches.open(STATIC_CACHE).then(cache => cache.put('./index.html', copy));
          }
          return networkResponse;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 4. Recursos estáticos propios (manifest e íconos): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      const fetchPromise = fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.ok && networkResponse.type === 'basic') {
            const copy = networkResponse.clone();
            caches.open(STATIC_CACHE).then(cache => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

