const CACHE = "ninita-lama-pack-completo-desenhos-v25";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./creditos-audio.html",
  "./CREDITOS_AUDIO.md",
  "./teste-musicas.html",
  "./teste-imagens.html",
  "./assets/audio/best_adventure_ever.mp3",
  "./assets/audio/effects/aplauso_certo.wav",
  "./assets/audio/effects/aplauso_final.wav",
  "./assets/audio/effects/esponja_agua.wav",
  "./assets/audio/effects/pente.wav",
  "./assets/audio/effects/resposta_errada.wav",
  "./assets/audio/effects/secador.wav",
  "./assets/audio/intro_to_fun_adventures.mp3",
  "./assets/audio/joyful_fun_tropical_music.mp3",
  "./assets/audio/magic_world.mp3",
  "./assets/icon.svg",
  "./assets/images/activities/castelo-encantado-contorno.png",
  "./assets/images/activities/castelo-encantado.jpg",
  "./assets/images/activities/counting/castelo.webp",
  "./assets/images/activities/counting/familia-magica.webp",
  "./assets/images/activities/counting/lama.webp",
  "./assets/images/activities/counting/ninita.webp",
  "./assets/images/activities/counting/princesa-gelo.webp",
  "./assets/images/activities/counting/princesa-oceano.webp",
  "./assets/images/activities/counting/princesa-torre.webp",
  "./assets/images/activities/counting/unicornio-arcoiris.webp",
  "./assets/images/activities/counting/unicornio-estelar.webp",
  "./assets/images/activities/cozinha-ninita.webp",
  "./assets/images/activities/fada-arcoiris-contorno.png",
  "./assets/images/activities/fada-arcoiris.jpg",
  "./assets/images/activities/familia-casa-magica-contorno.png",
  "./assets/images/activities/familia-casa-magica.jpg",
  "./assets/images/activities/fundo-labirinto.jpg",
  "./assets/images/activities/lama-labirinto.jpg",
  "./assets/images/activities/ninita-labirinto.jpg",
  "./assets/images/activities/princesa-gelo-contorno.png",
  "./assets/images/activities/princesa-gelo.jpg",
  "./assets/images/activities/princesa-maca-contorno.png",
  "./assets/images/activities/princesa-maca.jpg",
  "./assets/images/activities/princesa-oceano-contorno.png",
  "./assets/images/activities/princesa-oceano.jpg",
  "./assets/images/activities/princesa-torre-contorno.png",
  "./assets/images/activities/princesa-torre.jpg",
  "./assets/images/activities/quadro-ninita.webp",
  "./assets/images/activities/unicornio-arcoiris-contorno.png",
  "./assets/images/activities/unicornio-arcoiris-sonho-contorno.png",
  "./assets/images/activities/unicornio-arcoiris-sonho.jpg",
  "./assets/images/activities/unicornio-arcoiris.jpg",
  "./assets/images/activities/unicornio-com-asas-contorno.png",
  "./assets/images/activities/unicornio-com-asas.jpg",
  "./assets/images/activities/unicornio-coracoes-contorno.png",
  "./assets/images/activities/unicornio-coracoes.jpg",
  "./assets/images/activities/unicornio-estelar-contorno.png",
  "./assets/images/activities/unicornio-estelar.jpg",
  "./assets/images/arcoiris.webp",
  "./assets/images/escola.webp",
  "./assets/images/floresta.webp",
  "./assets/images/piscina.webp",
  "./assets/images/praia.webp",
  "./assets/images/quarto.webp",
  "./assets/images/sala.webp",
  "./teste-sons.html",
  "./assets/audio/effects/aplauso_certo_forte.wav",
  "./assets/audio/effects/aplauso_final_forte.wav",
  "./assets/audio/effects/tenta_outra_vez.wav",
  "./assets/audio/effects/resposta_errada_com_voz.wav",
];

async function cacheAssetsIndividually(){
  const cache = await caches.open(CACHE);

  await Promise.allSettled(
    ASSETS.map(async asset=>{
      const request = new Request(asset,{cache:"reload"});
      const response = await fetch(request);

      if(!response.ok){
        throw new Error(`Falha ao carregar ${asset}: ${response.status}`);
      }

      await cache.put(request,response);
    })
  );
}

self.addEventListener("install",event=>{
  event.waitUntil(cacheAssetsIndividually());
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>
      Promise.all(
        keys
          .filter(key=>key!==CACHE)
          .map(key=>caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch",event=>{
  const request=event.request;
  const url=new URL(request.url);

  if(request.mode==="navigate"){
    event.respondWith(
      fetch(request)
        .then(response=>{
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put("./index.html",copy));
          return response;
        })
        .catch(()=>caches.match("./index.html"))
    );
    return;
  }

  if(url.origin!==self.location.origin){
    return;
  }

  event.respondWith(
    caches.match(request).then(cached=>{
      const network=fetch(request)
        .then(response=>{
          if(response.ok){
            const copy=response.clone();
            caches.open(CACHE).then(cache=>cache.put(request,copy));
          }
          return response;
        })
        .catch(()=>cached);

      return cached || network;
    })
  );
});
