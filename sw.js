const CACHE_NAME = 'og-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/animations.css',
  '/css/base.css',
  '/css/layout.css',
  '/css/header.css',
  '/css/nav.css',
  '/css/feed.css',
  '/css/stories.css',
  '/css/chat.css',
  '/css/profile.css',
  '/css/modals.css',
  '/js/main.js',
  '/js/core/supabase.js',
  '/js/core/state.js',
  '/js/services/authService.js',
  '/js/services/profileService.js',
  '/js/services/postService.js',
  '/js/services/storyService.js',
  '/js/services/chatService.js',
  '/js/services/notificationService.js',
  '/js/utils/imageUtils.js',
  '/js/utils/dateUtils.js',
  '/js/utils/domUtils.js',
  '/js/utils/helpers.js',
  '/js/components/navigation.js',
  '/js/components/feed.js',
  '/js/components/stories.js',
  '/js/components/chat.js',
  '/js/components/profile.js',
  '/js/components/notifications.js',
  '/js/components/modals.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
