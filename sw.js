const CACHE = "ninita-lama-instrucoes-header-salao-fixo-v21";
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
  "./teste-musicas.html",
  "./assets/audio/intro_to_fun_adventures.mp3",
  "./assets/audio/best_adventure_ever.mp3",
  "./assets/audio/joyful_fun_tropical_music.mp3",
  "./assets/audio/magic_world.mp3",
  "./assets/audio/effects/esponja_agua.wav",
  "./assets/audio/effects/secador.wav",
  "./assets/audio/effects/pente.wav",
  "./assets/images/activities/ninita-labirinto.jpg",
  "./assets/images/activities/lama-labirinto.jpg",
  "./assets/images/activities/fundo-labirinto.jpg",
  "./assets/images/activities/princesa-gelo.jpg",
  "./assets/images/activities/princesa-gelo-contorno.png",
  "./assets/images/activities/familia-casa-magica.jpg",
  "./assets/images/activities/familia-casa-magica-contorno.png",
  "./assets/images/activities/princesa-oceano.jpg",
  "./assets/images/activities/princesa-oceano-contorno.png",
  "./assets/images/activities/princesa-torre.jpg",
  "./assets/images/activities/princesa-torre-contorno.png",
  "./assets/images/activities/unicornio-arcoiris.jpg",
  "./assets/images/activities/unicornio-arcoiris-contorno.png",
  "./assets/images/activities/unicornio-estelar.jpg",
  "./assets/images/activities/unicornio-estelar-contorno.png",
  "./assets/images/activities/fada-arcoiris.jpg",
  "./assets/images/activities/fada-arcoiris-contorno.png",
  "./assets/images/activities/castelo-encantado.jpg",
  "./assets/images/activities/castelo-encantado-contorno.png",
  "./assets/audio/effects/aplauso_certo.wav",
  "./assets/audio/effects/aplauso_final.wav",
  "./assets/audio/effects/resposta_errada.wav",
  "./assets/images/activities/counting/ninita.webp",
  "./assets/images/activities/counting/lama.webp",
  "./assets/images/activities/counting/princesa-gelo.webp",
  "./assets/images/activities/counting/familia-magica.webp",
  "./assets/images/activities/counting/princesa-oceano.webp",
  "./assets/images/activities/counting/princesa-torre.webp",
  "./assets/images/activities/counting/unicornio-arcoiris.webp",
  "./assets/images/activities/counting/unicornio-estelar.webp",
  "./assets/images/activities/counting/castelo.webp"

  "./assets/images/activities/cozinha-ninita.webp",
  "./assets/images/activities/quadro-ninita.webp",
  "./assets/images/activities/princesa-maca.jpg",
  "./assets/images/activities/princesa-maca-contorno.png",
  "./assets/images/activities/unicornio-com-asas.jpg",
  "./assets/images/activities/unicornio-com-asas-contorno.png",
  "./assets/images/activities/unicornio-coracoes.jpg",
  "./assets/images/activities/unicornio-coracoes-contorno.png",
  "./assets/images/activities/unicornio-arcoiris-sonho.jpg",
  "./assets/images/activities/unicornio-arcoiris-sonho-contorno.png",
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