const CACHE_NAME = 'my-pwa-cache-v1';
// Add the URLs of all the files you want to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192.png',  // <-- Make sure this path is correct
    '/icons/icon-512.png'
];

// 1. Install the service worker and cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. Serve cached files when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If the file is in the cache, return it.
                if (response) {
                    return response;
                }
                // Otherwise, try to fetch it from the network.
                return fetch(event.request);
            }
            )
    );
});