const CACHE = 'monastery-v2';
const FILES = ['./','./index.html','./style.css','./domain.js','./app.js','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))));
self.addEventListener('fetch', event => { if(event.request.method === 'GET' && new URL(event.request.url).origin === self.location.origin) event.respondWith(fetch(event.request).then(res => {const copy=res.clone(); caches.open(CACHE).then(cache=>cache.put(event.request,copy)); return res;}).catch(()=>caches.match(event.request))); });
