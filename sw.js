const CACHE_NAME = 'warm-call-ai-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data/seniors_dataset.json',
  './data/k_mmse_mapping.json',
  './data/pilot_test_protocol.json',
  './audio/opening_grandson.mp3',
  './audio/scenario_lonely.mp3',
  './audio/scenario_orientation_ok.mp3',
  './audio/scenario_memory_ok.mp3',
  './audio/scenario_cognitive_decline.mp3',
  './audio/scenario_emergency.mp3',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
