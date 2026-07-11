const CACHE="ninita-lama-vercel-v1";
const ASSETS=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./assets/icon.svg","./robots.txt","./assets/images/quarto.webp","./assets/images/sala.webp","./assets/images/escola.webp","./assets/images/praia.webp","./assets/images/floresta.webp","./assets/images/piscina.webp","./assets/images/arcoiris.webp"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",event=>{event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)))});
