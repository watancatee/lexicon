/**
 * @file sw.js
 * Service Worker providing offline caching for IELTS Lexicon SRS.
 */

const CACHE_NAME = "ielts-lexicon-v1";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./styles/tokens.css",
  "./styles/base.css",
  "./styles/components.css",
  "./src/config.js",
  "./src/strings.js",
  "./src/model.js",
  "./src/storage.js",
  "./src/scheduler.js",
  "./src/queue.js",
  "./src/store.js",
  "./src/router.js",
  "./src/utils.js",
  "./src/seed.js",
  "./src/main.js",
  "./src/views/decks.js",
  "./src/views/study.js",
  "./src/views/browse.js",
  "./src/views/add.js",
  "./src/views/stats.js",
  "./src/views/settings.js",
  "./tests.html"
];

// Install Event: cache static shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching app shell & static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event: clean up obsolete cache versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Removing deprecated cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Stale-While-Revalidate caching strategy
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
