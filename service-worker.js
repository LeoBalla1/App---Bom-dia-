const CACHE_NAME = 'bomdia-app-v2';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './mensagens.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
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
