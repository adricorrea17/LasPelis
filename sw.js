const cacheName = 'cache-parcial';
const assets = [
    '/',
    'img/x-men.jpg',
    'js/main.js',
    'img/joker.jpg',
    'img/mk.jpg',
    'index.html',
    'css/estilos.css',
    'css/bootstrap.css',
    'img/cine.png',
    'img/icon-192x192.png',
    'img/icon-256x256.png',
    'img/icon-384x384.png',
    'img/icon-512x512.png',
    'js/bootstrap.js',
    'api/api.js',
    'manifest.webmanifest',

];
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            cache.addAll(assets);
        })
    )
})
self.addEventListener('fetch', event => {
    event.respondWith(
        caches
        .match(event.request)
        .then(res => {
            if (res) {
                console.log(event.request, 'En cache')
                return res;
            }
            console.log(event.request, 'no esta en cache')
            let cacherequerido = event.request.clone();
            return fetch(cacherequerido)
                .then(res => {
                    if (!res || res.status !== 200) {

                        return res;
                    }
                    let respuestacache = res.clone();
                    caches
                        .open(cacheName)
                        .then(cache => {
                            cache.put(cacherequerido, respuestacache);
                        })
                    return res;
                })
        })
    )
})

self.addEventListener('push', function(pushEvent) {
    let titulo = pushEvent.data.text();
    let opciones = {
        body: 'Se a agregado una nueva pelicula a PelisARG',
        icon: 'img/icon-192x192.png',
        vibrate: [300, 100, 300],
        data: { id: 1 },
        actions: [

            { 'action': '1', 'title': 'ver ahora', 'icon': 'img/icon-192x192.png' },
            { 'action': '2', 'title': 'ver despues', 'icon': 'img/icon-192x192.png' }
        ]
    }
    pushEvent.waitUntil(self.registration.showNotification(titulo, opciones))
})

self.addEventListener('notificationclick', function(eventoNotificacion) {

    if (eventoNotificacion.action === '1') {
        clients.openWindow('http://localhost/parcial/index.html')
    } else if (eventoNotificacion.action === '2') {
        console.log('Nos vemos mas tarde')
    }

})