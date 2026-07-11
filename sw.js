const CACHE = "ninita-lama-aventura-musical-v10";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./vercel.json",
  "./creditos-audio.html",
  "./CREDITOS_AUDIO.md",
  "./assets/icon.svg",
  "./assets/images/quarto.webp",
  "./assets/images/sala.webp",
  "./assets/images/escola.webp",
  "./assets/images/praia.webp",
  "./assets/images/floresta.webp",
  "./assets/images/piscina.webp",
  "./assets/images/arcoiris.webp",
  "./assets/audio/intro_mundos_em_festa.mp3",
  "./assets/audio/quarto_sonho_da_lua.mp3",
  "./assets/audio/casa_manha_de_alegria.mp3",
  "./assets/audio/escola_vamos_descobrir.mp3",
  "./assets/audio/praia_oceano_livre.mp3",
  "./assets/audio/floresta_coracao_da_natureza.mp3",
  "./assets/audio/piscina_splash_feliz.mp3",
  "./assets/audio/quinta_amigos_da_natureza.mp3",
  "./assets/audio/parque_dia_de_festa.mp3",
  "./assets/audio/cidade_juntos_brillhamos.mp3",
  "./assets/audio/arcoiris_somos_luz.mp3",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});