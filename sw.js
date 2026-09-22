// Service worker mínimo para habilitar PWA sin problemas de caché
self.addEventListener('install', (event) => {
    self.skipWaiting();
});


self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});


// Delega el 100% de las peticiones a la red sin guardar nada localmente
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
