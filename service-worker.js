const CACHE_NAME = 'og-cache-v4';
const assetsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/actividad.html',
  '/crear.html',
  '/explorar.html',
  '/perfil.html',
  '/usuario.html'
];

// Instalación del Service Worker y caché de todas las páginas
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting();
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepción de peticiones
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request).then((response) => {
          return response || caches.match('/index.html');
        });
      })
    );
  }
});
