var cacheName = 'zablon owino';
var filesToCache = [
  '/',
  '/index.html',

  '/js/zablon.js',
  '/js/zablon.min.js',
  '/js/contact_me.js',
  '/js/contact_me.min.js',
  '/js/jqBootstrapValidation.js',
  '/js/jqBootstrapValidation.min.js',

  '/css/zablon.css',
  '/css/zablon.min.css',


  '/images/icons/icon-72x72.png',
  '/images/icons/icon-96x96.png',
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-144x144.png',
  '/images/icons/icon-152x152.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-384x384.png',
  '/images/icons/icon-512x512.png',


   '/img/header-bg.jpg',
   '/img/team/1.jpg'
];

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
