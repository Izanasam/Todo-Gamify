const CACHE_NAME = 'todo-game-v1';
const DATA_CACHE_NAME = 'todo-game-data-v1';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/maskable-icon-192x192.png',
  '/icons/maskable-icon-512x512.png',
  '/screenshots/desktop.png',
  '/screenshots/mobile.png',
  '/assets/index.css',
  '/assets/index.js',
  '/assets/vendor.js'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => {
        console.log('Cache des assets ouvert');
        return cache.addAll(ASSETS_TO_CACHE);
      }),
      caches.open(DATA_CACHE_NAME).then(cache => {
        console.log('Cache des données ouvert');
        return cache.add('/api/initial-data');
      })
    ])
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stratégie de cache : Cache First, puis Network
const cacheFirst = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Erreur de fetch:', error);
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
};

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-HTTP(S)
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Gérer les requêtes d'API différemment
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME)
        .then(cache => {
          return fetch(event.request)
            .then(response => {
              if (response.ok) {
                cache.put(event.request, response.clone());
              }
              return response;
            })
            .catch(() => {
              return cache.match(event.request);
            });
        })
    );
    return;
  }

  // Pour les autres requêtes, utiliser la stratégie Cache First
  event.respondWith(cacheFirst(event.request));
});

// Synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-tasks') {
    event.waitUntil(syncTasks());
  }
});

// Fonction de synchronisation des tâches
async function syncTasks() {
  const cache = await caches.open(DATA_CACHE_NAME);
  const requests = await cache.keys();
  
  for (const request of requests) {
    if (request.url.includes('/api/tasks')) {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response);
        }
      } catch (error) {
        console.error('Erreur de synchronisation:', error);
      }
    }
  }
} 