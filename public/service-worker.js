const CACHE_NAME = 'agenda-nlg-cache-v1';
const urlsToCache = [
  '/',                  // La ruta principal que responde con HTML generado desde Pug
  '/css/style.css',     // Ajusta estas rutas a tus archivos estáticos reales
  '/js/main.js',        // Si tienes JS cliente
  '/images/logo.png',
  '/manifest.json'
];

// Instalar y cachear los recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activar y limpiar caches viejos si hay
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Interceptar fetch y responder con cache o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en cache, devolverlo, si no, hacer fetch normal
        return response || fetch(event.request);
      })
  );
});
