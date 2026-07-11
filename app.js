const worlds = [
  {id:1,title:"O Quarto Encantado",subtitle:"Minijogo interativo",emoji:"🛏️",image:"./assets/images/quarto.webp",star:"Estrela da Organização",intro:"Move a Ninita no cenário realista, agarra os objetos e arruma tudo nos lugares certos."},
  {id:2,title:"A Casa das Surpresas",subtitle:"Ajudar também é brincar",emoji:"🏠",image:"./assets/images/sala.webp",star:"Estrela da Ajuda",intro:"Cada divisão da casa esconde uma pequena missão para Ninita e Lama.",tasks:["Preparar um pequeno-almoço saudável","Colocar a mesa","Regar as plantas","Separar o lixo para reciclagem","Arrumar a sala"]},
  {id:3,title:"A Escola dos Sonhos",subtitle:"Descobrir e aprender",emoji:"🏫",image:"./assets/images/escola.webp",star:"Estrela do Conhecimento",intro:"As letras, os números e as cores precisam da ajuda da Ninita para regressarem aos livros.",tasks:["Preparar a mochila","Reconhecer letras","Resolver uma conta simples","Completar um puzzle","Partilhar os materiais"]},
  {id:4,title:"A Praia das Conchas",subtitle:"Proteger o oceano",emoji:"🏖️",image:"./assets/images/praia.webp",star:"Estrela do Oceano",intro:"Uma praia paradisíaca precisa de ficar limpa para que os animais marinhos voltem a sorrir.",tasks:["Recolher o lixo da areia","Separar plástico, papel e vidro","Encontrar conchas brilhantes","Ajudar uma tartaruga","Construir um castelo de areia"]},
  {id:5,title:"A Floresta Encantada",subtitle:"Cuidar da natureza",emoji:"🌳",image:"./assets/images/floresta.webp",star:"Estrela da Natureza",intro:"Na floresta, as flores brilham e os animais têm pequenas missões para Ninita e Lama.",tasks:["Plantar uma árvore","Regar as flores","Seguir as pegadas","Construir uma casa para pássaros","Encontrar a pedra mágica"]},
  {id:6,title:"A Piscina Tropical",subtitle:"Aprender com segurança",emoji:"🏊",image:"./assets/images/piscina.webp",star:"Estrela da Coragem",intro:"Lama tem algum receio da água. Ninita vai mostrar-lhe como brincar em segurança.",tasks:["Escolher o fato de banho","Colocar o colete","Tomar duche antes de entrar","Recolher bolas e boias","Ajudar Lama a brincar na água"]},
  {id:7,title:"A Quinta Feliz",subtitle:"Amigos de todas as espécies",emoji:"🐓",image:"./assets/images/floresta.webp",star:"Estrela da Amizade",intro:"Na quinta, os animais esperam por comida, carinho e uma pequena ajuda.",tasks:["Alimentar as galinhas","Dar cenouras aos coelhos","Escovar o pónei","Regar a horta","Levar os animais para os abrigos"]},
  {id:8,title:"O Parque das Aventuras",subtitle:"Brincar e explorar",emoji:"🎠",image:"./assets/images/arcoiris.webp",star:"Estrela da Diversão",intro:"Escorregas, baloiços, pequenos veículos e bilhetes mágicos enchem este parque de alegria.",tasks:["Conduzir o carrinho","Desviar dos obstáculos","Andar no carrossel","Ajudar uma personagem perdida","Encontrar os bilhetes mágicos"]},
  {id:9,title:"A Cidade Colorida",subtitle:"Viver em comunidade",emoji:"🏙️",image:"./assets/images/sala.webp",star:"Estrela da Comunidade",intro:"A cidade está cheia de pessoas, lojas e jardins onde cada boa ação conta.",tasks:["Atravessar na passadeira","Reconhecer um sinal","Fazer uma pequena compra","Ajudar uma pessoa","Encontrar um animal perdido"]},
  {id:10,title:"A Ilha do Arco-Íris",subtitle:"A grande missão final",emoji:"🌈",image:"./assets/images/arcoiris.webp",star:"Estrela da Imaginação",intro:"Na ilha final, Ninita e Lama juntam tudo o que aprenderam para devolver as cores aos Mundos da Alegria.",tasks:["Resolver o grande puzzle","Recuperar as cores","Plantar flores","Ajudar a Nuvem Triste","Encontrar a última estrela"]}
];

const story = [
  ["Era uma vez…","Ninita era uma menina de sete anos, alegre, curiosa e muito imaginativa. O seu brinquedo preferido era um peluche cor-de-rosa em forma de lama. Ninita chamava-lhe simplesmente Lama."],
  ["O despertar de Lama","Numa noite tranquila, um raio de luar entrou pela janela e tocou no tecido colorido de Lama. O peluche mexeu uma orelha, abriu os olhos e disse: «Ninita, está na hora de acordar.»"],
  ["Os Mundos da Alegria","Lama revelou um mapa mágico com praias, florestas, escolas, piscinas, casas e ilhas maravilhosas. Mas esses mundos estavam a perder as cores porque as Estrelas da Alegria tinham desaparecido."],
  ["A missão","Para recuperar cada estrela, Ninita e Lama teriam de ajudar pessoas e animais, aprender coisas novas, cuidar da natureza e completar pequenas tarefas do dia a dia."],
  ["Uma porta brilhante","Uma porta mágica apareceu no quarto. Ninita colocou os sapatos, preparou a mochila, segurou Lama pela pata e atravessou a porta. A maior aventura das suas vidas tinha começado."],
  ["A última lição","No fim, Ninita descobriu que as estrelas aparecem sempre que alguém ajuda, aprende, protege a natureza, enfrenta um medo ou faz outra pessoa feliz."]
];

const PROGRESS_KEY = "ninita-lama-progress-v2";
const AUDIO_KEY = "ninita-lama-audio-v2";
const app = document.querySelector("#app");

let activeGame = null;

// -------------------------------------------------------------
// Progresso
// -------------------------------------------------------------
function loadProgress(){
  try{
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
      highestUnlocked: 1,
      completed: []
    };
  }catch{
    return {highestUnlocked:1,completed:[]};
  }
}

function saveProgress(progress){
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function completeWorld(worldId){
  const progress = loadProgress();
  if(!progress.completed.includes(worldId)){
    progress.completed.push(worldId);
  }
  progress.highestUnlocked = Math.min(
    worlds.length,
    Math.max(progress.highestUnlocked, worldId + 1)
  );
  saveProgress(progress);
}

// -------------------------------------------------------------
// Áudio real: música executada por músicos e efeitos gravados
// -------------------------------------------------------------
const REAL_AUDIO = {
  music: {
    goodMorning: "https://opengameart.org/sites/default/files/Cakeflaps%20-%20Good%20Morning_0.ogg",
    townTheme: "https://opengameart.org/sites/default/files/TownTheme.mp3",
    happyFlutes: "https://opengameart.org/sites/default/files/tkucza-happyflutes.mp3"
  },
  effects: {
    click: "https://raw.githubusercontent.com/Calinou/kenney-ui-audio/master/addons/kenney_ui_audio/click1.wav",
    pickup: "https://raw.githubusercontent.com/Calinou/kenney-ui-audio/master/addons/kenney_ui_audio/switch10.wav",
    place: "https://raw.githubusercontent.com/Calinou/kenney-ui-audio/master/addons/kenney_ui_audio/switch20.wav",
    success: "https://opengameart.org/sites/default/files/gem-gather-stereo.wav",
    footsteps: "https://opengameart.org/sites/default/files/steps%20in%20wood%20floor.wav"
  }
};

class AudioManager{
  constructor(){
    let saved = null;

    try{
      saved = JSON.parse(localStorage.getItem(AUDIO_KEY));
    }catch{}

    this.enabled = saved?.enabled ?? true;
    this.musicVolume = saved?.musicVolume ?? 0.25;
    this.effectsVolume = saved?.effectsVolume ?? 0.70;
    this.music = null;
    this.currentTrack = "";
    this.unlocked = false;
    this.footsteps = null;
    this.footstepsPlaying = false;
  }

  persist(){
    localStorage.setItem(AUDIO_KEY, JSON.stringify({
      enabled:this.enabled,
      musicVolume:this.musicVolume,
      effectsVolume:this.effectsVolume
    }));
  }

  unlock(){
    if(this.unlocked) return;
    this.unlocked = true;
    this.refreshForRoute();
  }

  createAudio(url,loop=false){
    const media = new Audio();
    media.src = url;
    media.preload = "auto";
    media.loop = loop;
    return media;
  }

  playMusic(track){
    if(!this.enabled || !this.unlocked || !track) return;

    const url = REAL_AUDIO.music[track];
    if(!url) return;

    if(
      this.currentTrack === track
      && this.music
      && !this.music.paused
    ){
      return;
    }

    this.stopMusic();

    this.currentTrack = track;
    this.music = this.createAudio(url,true);
    this.music.volume = this.musicVolume;
    this.music.play().catch(error=>{
      console.warn("Não foi possível iniciar a música real:",error);
    });
  }

  stopMusic(){
    if(this.music){
      this.music.pause();
      this.music.currentTime = 0;
    }

    this.music = null;
    this.currentTrack = "";
  }

  effect(name){
    if(!this.enabled || !this.unlocked) return;

    const url = REAL_AUDIO.effects[name];
    if(!url) return;

    const sound = this.createAudio(url,false);
    sound.volume = this.effectsVolume;
    sound.play().catch(error=>{
      console.warn(`Não foi possível reproduzir o efeito ${name}:`,error);
    });
  }

  startFootsteps(){
    if(!this.enabled || !this.unlocked || this.footstepsPlaying) return;

    if(!this.footsteps){
      this.footsteps = this.createAudio(
        REAL_AUDIO.effects.footsteps,
        true
      );
      this.footsteps.volume = Math.min(0.48,this.effectsVolume * 0.62);
    }

    this.footsteps.volume = Math.min(0.48,this.effectsVolume * 0.62);
    this.footstepsPlaying = true;

    this.footsteps.play().catch(error=>{
      this.footstepsPlaying = false;
      console.warn("Não foi possível reproduzir os passos:",error);
    });
  }

  stopFootsteps(reset=false){
    if(!this.footsteps) return;

    this.footsteps.pause();
    this.footstepsPlaying = false;

    if(reset){
      this.footsteps.currentTime = 0;
    }
  }

  routeTrack(){
    const route = parseRoute();

    if(route.name === "home") return "goodMorning";
    if(route.name === "worlds" || route.name === "gallery") return "happyFlutes";
    if(route.name === "story") return "goodMorning";

    if(route.name === "level"){
      return {
        1:"goodMorning",
        2:"townTheme",
        3:"happyFlutes",
        4:"happyFlutes",
        5:"happyFlutes",
        6:"townTheme",
        7:"happyFlutes",
        8:"happyFlutes",
        9:"townTheme",
        10:"happyFlutes"
      }[route.param] || "goodMorning";
    }

    return "goodMorning";
  }

  refreshForRoute(){
    this.stopFootsteps(true);

    if(!this.enabled){
      this.stopMusic();
      updateAudioUi();
      return;
    }

    this.playMusic(this.routeTrack());
    updateAudioUi();
  }
}

const audio = new AudioManager();

function updateAudioUi(){
  const button = document.querySelector("#audio-button");
  const mute = document.querySelector("#mute-button");
  const music = document.querySelector("#music-volume");
  const effects = document.querySelector("#effects-volume");

  if(button) button.textContent = audio.enabled ? "🔊" : "🔇";
  if(mute) mute.textContent = audio.enabled ? "Desligar som" : "Ligar som";
  if(music) music.value = audio.musicVolume;
  if(effects) effects.value = audio.effectsVolume;
}

// -------------------------------------------------------------
// Navegação
// -------------------------------------------------------------
function routeTo(name,param=null){
  location.hash = `${name}${param ? `/${param}` : ""}`;
}

function parseRoute(){
  const hash = location.hash.replace(/^#/,"") || "home";
  const [name,param] = hash.split("/");
  return {name, param:param ? Number(param) : null};
}

function topbar(title,subtitle=""){
  return `
    <header class="topbar">
      <button class="icon-btn" data-action="back" aria-label="Voltar">←</button>
      <div>
        <h2>${title}</h2>
        ${subtitle ? `<p>${subtitle}</p>` : ""}
      </div>
    </header>
  `;
}

function destroyActiveGame(){
  if(activeGame){
    activeGame.destroy();
    activeGame = null;
  }
}

function render(name,param){
  destroyActiveGame();

  if(name === "home") renderHome();
  else if(name === "worlds") renderWorlds();
  else if(name === "story") renderStory();
  else if(name === "gallery") renderGallery();
  else if(name === "level") renderLevel(param);
  else renderHome();

  window.scrollTo(0,0);
  setTimeout(()=>audio.refreshForRoute(),0);
}

function renderHome(){
  const progress = loadProgress();

  app.innerHTML = `
    <main class="screen home-screen">
      <div class="home-overlay"></div>

      <section class="hero-panel">
        <div class="logo-badge" aria-hidden="true">🦙</div>
        <h1>Ninita e Lama</h1>
        <p class="subtitle">A Viagem dos Mundos Mágicos</p>
      </section>

      <section class="menu-card glass-card">
        <button class="btn btn-primary" data-action="play">▶ Jogar</button>
        <button class="btn btn-secondary" data-action="story">📖 Ler a história</button>
        <button class="btn btn-secondary" data-action="gallery">🖼️ Ver cenários</button>
        <div class="progress-summary">
          <strong>${progress.completed.length} de 10</strong>
          <span>mundos concluídos</span>
        </div>
        <button class="btn btn-text danger" data-action="reset">↻ Recomeçar</button>
      </section>

      <p class="footer-note">Agora com movimento, objetos, tarefas, música e efeitos.</p>
    </main>
  `;
}

function renderWorlds(){
  const progress = loadProgress();

  app.innerHTML = `
    ${topbar("Mapa dos Mundos","O primeiro mundo já é um minijogo interativo")}
    <main class="content">
      <section class="world-grid">
        ${worlds.map(world=>{
          const unlocked = world.id <= progress.highestUnlocked;
          const completed = progress.completed.includes(world.id);

          return `
            <button
              class="world-card ${unlocked ? "" : "locked"} ${completed ? "completed" : ""}"
              data-world="${world.id}"
              ${unlocked ? "" : "disabled"}
            >
              <img src="${world.image}" alt="">
              <span class="emoji">${world.emoji}</span>
              ${completed ? `<span class="star" aria-label="Concluído">⭐</span>` : ""}
              ${unlocked ? "" : `<span class="lock" aria-label="Bloqueado">🔒</span>`}
              <div class="world-info">
                <span class="world-id">Mundo ${world.id}</span>
                <h3>${world.title}</h3>
                <p>${unlocked ? world.subtitle : "Conclui o mundo anterior"}</p>
              </div>
            </button>
          `;
        }).join("")}
      </section>
    </main>
  `;
}

function renderStory(){
  app.innerHTML = `
    ${topbar("A história de Ninita e Lama")}
    <main class="content">
      <section class="story-hero">
        <img src="./assets/images/quarto.webp" alt="Ninita e Lama no quarto encantado">
        <h1>A Viagem dos Mundos Mágicos</h1>
      </section>

      ${story.map(([title,text])=>`
        <article class="card">
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `).join("")}
    </main>
  `;
}

function renderGallery(){
  app.innerHTML = `
    ${topbar("Cenários mágicos","Explora os mundos da aventura")}
    <main class="content">
      <section class="gallery-grid">
        ${worlds.map(world=>`
          <article class="gallery-card">
            <img src="${world.image}" alt="${world.title}">
            <div class="caption">
              <span class="badge">${world.emoji} Mundo ${world.id}</span>
              <h3>${world.title}</h3>
              <p>${world.subtitle}</p>
            </div>
          </article>
        `).join("")}
      </section>
    </main>
  `;
}

function renderLevel(worldId){
  const world = worlds.find(item=>item.id === worldId) || worlds[0];
  const progress = loadProgress();

  if(world.id > progress.highestUnlocked){
    routeTo("worlds");
    return;
  }

  if(world.id === 1){
    renderBedroomGame(world);
    return;
  }

  renderChecklistLevel(world);
}

// -------------------------------------------------------------
// Primeiro mundo: minijogo com movimento e objetos
// -------------------------------------------------------------
function renderBedroomGame(world){
  const interactiveTasks = [
    {id:"bed",label:"Fazer a cama"},
    {id:"toy",label:"Guardar o brinquedo na caixa"},
    {id:"books",label:"Colocar os livros na estante"},
    {id:"shoes",label:"Arrumar os sapatos no tapete"},
    {id:"backpack",label:"Arrumar a mochila"}
  ];

  app.innerHTML = `
    ${topbar("🛏️ O Quarto Encantado","Usa as setas ou os botões no ecrã")}
    <main class="game-shell">
      <section class="game-instructions">
        <span class="key-chip">↑ ↓ ← → mover</span>
        <span class="key-chip">W A S D mover</span>
        <span class="key-chip">Espaço ou E: agarrar/usar</span>
        <strong>Leva cada objeto até à zona iluminada.</strong>
      </section>

      <section class="game-layout">
        <div>
          <div class="game-stage-wrap">
            <canvas id="game-canvas" width="540" height="960" aria-label="Quarto interativo vertical da Ninita"></canvas>
            <div id="game-prompt" class="game-prompt">Explora o quarto e aproxima-te de um objeto.</div>

            <div id="game-reward" class="game-reward">
              <article class="game-reward-card">
                <div class="big-star">⭐</div>
                <h2>Conseguiste!</h2>
                <h3>${world.star}</h3>
                <p>Ninita e Lama deixaram o quarto pronto para a aventura.</p>
                <button class="btn btn-primary" data-action="finish-interactive">Receber estrela e continuar</button>
              </article>
            </div>
          </div>

          <div class="game-controls" aria-label="Controlos táteis">
            <div class="dpad">
              <button class="control-btn control-up" data-direction="up" aria-label="Cima">▲</button>
              <button class="control-btn control-left" data-direction="left" aria-label="Esquerda">◀</button>
              <button class="control-btn control-down" data-direction="down" aria-label="Baixo">▼</button>
              <button class="control-btn control-right" data-direction="right" aria-label="Direita">▶</button>
            </div>
            <button id="action-button" class="action-btn" aria-label="Agarrar ou usar">AGARRAR<br>OU USAR</button>
          </div>
        </div>

        <aside class="game-hud">
          <h3>Tarefas do quarto</h3>
          <div class="progress-track">
            <div id="interactive-progress" class="progress-fill"></div>
          </div>
          <strong><span id="interactive-count">0</span> de ${interactiveTasks.length} concluídas</strong>
          <div id="interactive-task-list">
            ${interactiveTasks.map(task=>`
              <div class="game-task" data-game-task="${task.id}">
                <span class="game-check">✓</span>
                <span>${task.label}</span>
              </div>
            `).join("")}
          </div>
          <div class="lama-tip">
            Lama segue a Ninita e ajuda a encontrar os objetos.
          </div>
        </aside>
      </section>
    </main>
  `;

  activeGame = new BedroomGame(interactiveTasks);
}

class BedroomGame{
  constructor(tasks){
    this.canvas = document.querySelector("#game-canvas");
    this.context = this.canvas.getContext("2d");
    this.prompt = document.querySelector("#game-prompt");
    this.progressElement = document.querySelector("#interactive-progress");
    this.countElement = document.querySelector("#interactive-count");
    this.rewardElement = document.querySelector("#game-reward");
    this.actionButton = document.querySelector("#action-button");
    this.tasks = tasks;

    this.roomImage = new Image();
    this.roomImage.src = "./assets/images/quarto.webp";

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = new Set();
    this.touchDirections = new Set();
    this.completed = new Set();
    this.carrying = null;
    this.lastTime = performance.now();
    this.running = true;
    this.successPlayed = false;

    this.player = {
      x:270,
      y:835,
      radius:22,
      speed:205,
      facing:1,
      walking:0
    };

    this.lama = {
      x:220,
      y:875
    };

    this.bed = {
      x:110,
      y:420,
      width:315,
      height:240,
      interactionX:270,
      interactionY:675,
      made:false
    };

    this.targets = {
      toy:{x:72,y:326,width:120,height:110,label:"CAIXA"},
      books:{x:58,y:112,width:182,height:150,label:"LIVROS"},
      shoes:{x:350,y:872,width:120,height:66,label:"SAPATOS"},
      backpack:{x:400,y:340,width:90,height:130,label:"MOCHILA"}
    };

    this.objects = [
      {id:"toy",kind:"toy",x:380,y:760,placed:false,radius:25},
      {id:"books",kind:"books",x:365,y:585,placed:false,radius:27},
      {id:"shoes",kind:"shoes",x:120,y:840,placed:false,radius:25},
      {id:"backpack",kind:"backpack",x:135,y:700,placed:false,radius:28}
    ];

    this.boundKeyDown = event=>this.onKeyDown(event);
    this.boundKeyUp = event=>this.onKeyUp(event);
    this.boundVisibility = ()=>this.onVisibilityChange();

    window.addEventListener("keydown", this.boundKeyDown);
    window.addEventListener("keyup", this.boundKeyUp);
    document.addEventListener("visibilitychange", this.boundVisibility);

    this.setupTouchControls();
    this.actionButton.addEventListener("click", ()=>{
      audio.unlock();
      this.interact();
    });

    this.animationFrame = requestAnimationFrame(time=>this.loop(time));
  }

  destroy(){
    this.running = false;
    audio.stopFootsteps(true);
    cancelAnimationFrame(this.animationFrame);
    window.removeEventListener("keydown", this.boundKeyDown);
    window.removeEventListener("keyup", this.boundKeyUp);
    document.removeEventListener("visibilitychange", this.boundVisibility);
  }

  onVisibilityChange(){
    if(document.hidden){
      this.keys.clear();
      this.touchDirections.clear();
      audio.stopFootsteps();
    }
  }

  onKeyDown(event){
    const movementKeys = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d","W","A","S","D"];
    const actionKeys = [" ","e","E","Enter"];

    if(movementKeys.includes(event.key) || actionKeys.includes(event.key)){
      event.preventDefault();
      audio.unlock();
    }

    if(actionKeys.includes(event.key) && !event.repeat){
      this.interact();
      return;
    }

    this.keys.add(event.key);
  }

  onKeyUp(event){
    this.keys.delete(event.key);
  }

  setupTouchControls(){
    document.querySelectorAll("[data-direction]").forEach(button=>{
      const direction = button.dataset.direction;

      const start = event=>{
        event.preventDefault();
        audio.unlock();
        this.touchDirections.add(direction);
        button.classList.add("active");
      };

      const stop = event=>{
        event.preventDefault();
        this.touchDirections.delete(direction);
        button.classList.remove("active");
      };

      button.addEventListener("pointerdown", start);
      button.addEventListener("pointerup", stop);
      button.addEventListener("pointercancel", stop);
      button.addEventListener("pointerleave", stop);
    });
  }

  loop(time){
    if(!this.running) return;

    const delta = Math.min(0.034, (time - this.lastTime) / 1000);
    this.lastTime = time;

    this.update(delta);
    this.draw();

    this.animationFrame = requestAnimationFrame(nextTime=>this.loop(nextTime));
  }

  update(delta){
    let horizontal = 0;
    let vertical = 0;

    if(this.keys.has("ArrowLeft") || this.keys.has("a") || this.keys.has("A") || this.touchDirections.has("left")) horizontal -= 1;
    if(this.keys.has("ArrowRight") || this.keys.has("d") || this.keys.has("D") || this.touchDirections.has("right")) horizontal += 1;
    if(this.keys.has("ArrowUp") || this.keys.has("w") || this.keys.has("W") || this.touchDirections.has("up")) vertical -= 1;
    if(this.keys.has("ArrowDown") || this.keys.has("s") || this.keys.has("S") || this.touchDirections.has("down")) vertical += 1;

    const moving = horizontal !== 0 || vertical !== 0;

    if(moving){
      audio.startFootsteps();

      const length = Math.hypot(horizontal,vertical) || 1;
      horizontal /= length;
      vertical /= length;

      this.player.x += horizontal * this.player.speed * delta;
      this.player.y += vertical * this.player.speed * delta;
      this.player.walking += delta * 11;

      if(horizontal !== 0){
        this.player.facing = Math.sign(horizontal);
      }
    }else{
      audio.stopFootsteps();
    }

    this.player.x = Math.max(35, Math.min(this.width - 35, this.player.x));
    this.player.y = Math.max(260, Math.min(this.height - 35, this.player.y));

    // Lama segue a Ninita de forma suave.
    const lamaTargetX = this.player.x - 46 * this.player.facing;
    const lamaTargetY = this.player.y + 38;
    this.lama.x += (lamaTargetX - this.lama.x) * Math.min(1, delta * 4.1);
    this.lama.y += (lamaTargetY - this.lama.y) * Math.min(1, delta * 4.1);

    if(this.carrying){
      this.carrying.x = this.player.x + 5 * this.player.facing;
      this.carrying.y = this.player.y - 74;
    }

    this.updatePrompt();
  }

  interact(){
    if(this.completed.size === this.tasks.length) return;

    if(this.carrying){
      const target = this.targets[this.carrying.id];

      if(this.distanceToRectangle(this.player.x,this.player.y,target) < 88){
        this.carrying.placed = true;
        this.carrying.x = target.x + target.width / 2;
        this.carrying.y = target.y + target.height / 2;
        this.completed.add(this.carrying.id);
        this.carrying = null;
        audio.effect("place");
        this.updateTaskHud();
        return;
      }

      // Largar no chão fora do destino.
      this.carrying.x = this.player.x + 26 * this.player.facing;
      this.carrying.y = this.player.y + 10;
      this.carrying = null;
      audio.effect("click");
      return;
    }

    const nearbyObject = this.objects
      .filter(item=>!item.placed)
      .map(item=>({
        item,
        distance:Math.hypot(this.player.x-item.x,this.player.y-item.y)
      }))
      .filter(result=>result.distance < 72)
      .sort((a,b)=>a.distance-b.distance)[0];

    if(nearbyObject){
      this.carrying = nearbyObject.item;
      audio.effect("pickup");
      return;
    }

    const bedDistance = Math.hypot(
      this.player.x - this.bed.interactionX,
      this.player.y - this.bed.interactionY
    );

    if(!this.bed.made && bedDistance < 120){
      this.bed.made = true;
      this.completed.add("bed");
      audio.effect("place");
      this.updateTaskHud();
      return;
    }

    audio.effect("click");
  }

  updateTaskHud(){
    document.querySelectorAll("[data-game-task]").forEach(element=>{
      element.classList.toggle(
        "done",
        this.completed.has(element.dataset.gameTask)
      );
    });

    this.countElement.textContent = this.completed.size;
    this.progressElement.style.width = `${(this.completed.size / this.tasks.length) * 100}%`;

    if(this.completed.size === this.tasks.length){
      this.rewardElement.classList.add("show");

      if(!this.successPlayed){
        this.successPlayed = true;
        audio.effect("success");
      }
    }
  }

  updatePrompt(){
    if(this.carrying){
      const target = this.targets[this.carrying.id];
      const nearTarget = this.distanceToRectangle(
        this.player.x,
        this.player.y,
        target
      ) < 88;

      this.prompt.textContent = nearTarget
        ? "Carrega em ESPAÇO/E ou em AGARRAR/USAR para arrumar."
        : "Leva o objeto até à zona iluminada.";
      return;
    }

    const nearObject = this.objects.some(
      item=>!item.placed && Math.hypot(this.player.x-item.x,this.player.y-item.y)<72
    );

    if(nearObject){
      this.prompt.textContent = "Carrega em ESPAÇO/E ou em AGARRAR/USAR para pegar.";
      return;
    }

    const nearBed = !this.bed.made && Math.hypot(
      this.player.x-this.bed.interactionX,
      this.player.y-this.bed.interactionY
    ) < 120;

    if(nearBed){
      this.prompt.textContent = "Carrega em ESPAÇO/E ou em AGARRAR/USAR para fazer a cama.";
      return;
    }

    this.prompt.textContent = "Explora o quarto. Lama acompanha a Ninita.";
  }

  distanceToRectangle(x,y,rectangle){
    const closestX = Math.max(rectangle.x,Math.min(x,rectangle.x+rectangle.width));
    const closestY = Math.max(rectangle.y,Math.min(y,rectangle.y+rectangle.height));
    return Math.hypot(x-closestX,y-closestY);
  }

  roundedRectangle(x,y,width,height,radius,fill,stroke=null,lineWidth=2){
    const context = this.context;
    const r = Math.min(radius,width/2,height/2);

    context.beginPath();
    context.moveTo(x+r,y);
    context.arcTo(x+width,y,x+width,y+height,r);
    context.arcTo(x+width,y+height,x,y+height,r);
    context.arcTo(x,y+height,x,y,r);
    context.arcTo(x,y,x+width,y,r);
    context.closePath();

    if(fill){
      context.fillStyle = fill;
      context.fill();
    }

    if(stroke){
      context.strokeStyle = stroke;
      context.lineWidth = lineWidth;
      context.stroke();
    }
  }

  draw(){
    const context = this.context;
    context.clearRect(0,0,this.width,this.height);

    this.drawRoom();
    this.drawTargets();

    // Ordem por profundidade.
    const drawable = [
      ...this.objects.filter(item=>!item.placed && item!==this.carrying),
      {kind:"lama-character",x:this.lama.x,y:this.lama.y},
      {kind:"ninita-character",x:this.player.x,y:this.player.y}
    ].sort((a,b)=>a.y-b.y);

    for(const item of drawable){
      if(item.kind === "lama-character") this.drawLama(item.x,item.y);
      else if(item.kind === "ninita-character") this.drawNinita(item.x,item.y);
      else this.drawObject(item);
    }

    for(const item of this.objects.filter(item=>item.placed)){
      this.drawObject(item);
    }

    if(this.carrying){
      this.drawObject(this.carrying,true);
    }

    if(this.completed.size === this.tasks.length){
      this.drawCelebration();
    }
  }

  drawRoom(){
    const context = this.context;

    if(this.roomImage.complete){
      context.drawImage(this.roomImage,0,0,this.width,this.height);
    }else{
      context.fillStyle = "#f6d7e8";
      context.fillRect(0,0,this.width,this.height);
    }

    const gradient = context.createLinearGradient(0,0,0,this.height);
    gradient.addColorStop(0,"rgba(255,255,255,.05)");
    gradient.addColorStop(.62,"rgba(0,0,0,.02)");
    gradient.addColorStop(1,"rgba(0,0,0,.10)");
    context.fillStyle = gradient;
    context.fillRect(0,0,this.width,this.height);
  }

  drawTargets(){
    const context = this.context;
    context.save();
    context.setLineDash([10,8]);
    context.lineWidth = 4;
    context.font = "bold 14px system-ui";
    context.textAlign = "center";

    for(const [id,target] of Object.entries(this.targets)){
      if(this.completed.has(id)) continue;

      context.fillStyle = "rgba(255,239,111,.23)";
      context.strokeStyle = "#ffe15b";
      this.roundedRectangle(
        target.x,
        target.y,
        target.width,
        target.height,
        14,
        context.fillStyle,
        context.strokeStyle,
        4
      );
      context.fillStyle = "#5d416f";
      context.fillText(
        target.label,
        target.x+target.width/2,
        target.y+target.height/2+5
      );
    }

    if(!this.bed.made){
      context.strokeStyle = "#ffe15b";
      context.beginPath();
      context.arc(
        this.bed.interactionX,
        this.bed.interactionY,
        50,
        0,
        Math.PI*2
      );
      context.stroke();
      context.fillStyle = "#5d416f";
      context.fillText("FAZER CAMA",this.bed.interactionX,this.bed.interactionY+5);
    }

    context.restore();
  }

  drawNinita(x,y){
    const context = this.context;
    const walk = Math.sin(this.player.walking) * 3;

    context.save();
    context.translate(x,y);

    // Sombra.
    context.fillStyle = "rgba(64,31,55,.20)";
    context.beginPath();
    context.ellipse(0,19,29,11,0,0,Math.PI*2);
    context.fill();

    // Pernas e sapatos.
    context.strokeStyle = "#f1c6a9";
    context.lineWidth = 10;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(-9,0);
    context.lineTo(-11+walk,22);
    context.moveTo(9,0);
    context.lineTo(11-walk,22);
    context.stroke();

    context.strokeStyle = "#e64e98";
    context.lineWidth = 11;
    context.beginPath();
    context.moveTo(-15+walk,23);
    context.lineTo(-5+walk,23);
    context.moveTo(5-walk,23);
    context.lineTo(15-walk,23);
    context.stroke();

    // Corpo.
    context.fillStyle = "#f05da7";
    context.beginPath();
    context.moveTo(-22,-40);
    context.quadraticCurveTo(0,-52,22,-40);
    context.lineTo(19,4);
    context.quadraticCurveTo(0,13,-19,4);
    context.closePath();
    context.fill();

    // Braços.
    context.strokeStyle = "#f1c6a9";
    context.lineWidth = 9;
    context.beginPath();
    context.moveTo(-18,-30);
    context.lineTo(-29,-4+walk);
    context.moveTo(18,-30);
    context.lineTo(29,-4-walk);
    context.stroke();

    // Cabeça.
    context.fillStyle = "#f1c6a9";
    context.beginPath();
    context.arc(0,-66,24,0,Math.PI*2);
    context.fill();

    // Cabelo.
    context.fillStyle = "#5c3527";
    context.beginPath();
    context.arc(0,-71,25,Math.PI,Math.PI*2);
    context.lineTo(22,-60);
    context.quadraticCurveTo(12,-88,-2,-92);
    context.quadraticCurveTo(-20,-88,-24,-62);
    context.closePath();
    context.fill();

    // Tranças.
    context.beginPath();
    context.arc(-28,-68,12,0,Math.PI*2);
    context.arc(28,-68,12,0,Math.PI*2);
    context.fill();

    context.fillStyle = "#ff77b6";
    context.beginPath();
    context.arc(-24,-79,5,0,Math.PI*2);
    context.arc(24,-79,5,0,Math.PI*2);
    context.fill();

    // Olhos.
    context.fillStyle = "#3d2823";
    context.beginPath();
    context.arc(-8,-66,3.2,0,Math.PI*2);
    context.arc(8,-66,3.2,0,Math.PI*2);
    context.fill();

    // Sorriso.
    context.strokeStyle = "#9c4b5b";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(0,-59,7,0.1,Math.PI-0.1);
    context.stroke();

    context.restore();
  }

  drawLama(x,y){
    const context = this.context;
    context.save();
    context.translate(x,y);

    context.fillStyle = "rgba(64,31,55,.18)";
    context.beginPath();
    context.ellipse(0,17,30,10,0,0,Math.PI*2);
    context.fill();

    // Corpo.
    context.fillStyle = "#f0a4c9";
    context.beginPath();
    context.ellipse(0,-4,32,22,0,0,Math.PI*2);
    context.fill();

    // Pescoço.
    this.roundedRectangle(-12,-55,24,50,12,"#efacd0");

    // Cabeça.
    context.beginPath();
    context.ellipse(0,-62,19,16,0,0,Math.PI*2);
    context.fill();

    // Orelhas.
    context.fillStyle = "#ec85bb";
    context.beginPath();
    context.ellipse(-11,-80,6,15,-0.35,0,Math.PI*2);
    context.ellipse(11,-80,6,15,0.35,0,Math.PI*2);
    context.fill();

    // Padrão colorido.
    const colors = ["#ff5f94","#ffd35f","#60d5cd","#8e71dc"];
    colors.forEach((color,index)=>{
      context.fillStyle = color;
      context.fillRect(-17+index*9,-10,8,15);
    });

    // Pernas.
    context.strokeStyle = "#e75ca3";
    context.lineWidth = 8;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(-18,9);
    context.lineTo(-19,25);
    context.moveTo(18,9);
    context.lineTo(19,25);
    context.stroke();

    // Cara.
    context.strokeStyle = "#6d3e58";
    context.lineWidth = 2.5;
    context.beginPath();
    context.arc(-6,-64,4,0.2,Math.PI-0.2);
    context.arc(6,-64,4,0.2,Math.PI-0.2);
    context.stroke();

    context.beginPath();
    context.arc(0,-57,5,0.1,Math.PI-0.1);
    context.stroke();

    context.restore();
  }

  drawObject(object,carried=false){
    const context = this.context;
    context.save();
    context.translate(object.x,object.y);

    if(carried){
      context.shadowColor = "rgba(255,225,91,.75)";
      context.shadowBlur = 18;
    }

    if(object.kind === "toy"){
      context.fillStyle = "#b8794a";
      context.beginPath();
      context.arc(0,0,17,0,Math.PI*2);
      context.fill();
      context.beginPath();
      context.arc(-13,-14,8,0,Math.PI*2);
      context.arc(13,-14,8,0,Math.PI*2);
      context.fill();
      context.fillStyle = "#f5c69d";
      context.beginPath();
      context.ellipse(0,5,11,8,0,0,Math.PI*2);
      context.fill();
    }

    if(object.kind === "books"){
      const colors = ["#7454b6","#f06b9c","#59b9cd"];
      colors.forEach((color,index)=>{
        this.roundedRectangle(-25+index*4,-18+index*9,48,14,4,color,"#ffffff",2);
      });
    }

    if(object.kind === "shoes"){
      context.fillStyle = "#ffffff";
      this.roundedRectangle(-28,-5,26,16,7,"#f05da7","#ffffff",3);
      this.roundedRectangle(2,-5,26,16,7,"#f05da7","#ffffff",3);
    }

    if(object.kind === "backpack"){
      this.roundedRectangle(-22,-27,44,52,13,"#e95aa3","#ffffff",3);
      context.fillStyle = "#9a4a86";
      this.roundedRectangle(-16,5,32,13,6,"#9a4a86");
      context.strokeStyle = "#9a4a86";
      context.lineWidth = 5;
      context.beginPath();
      context.arc(0,-27,10,Math.PI,Math.PI*2);
      context.stroke();
      context.fillStyle = "#ffe15b";
      context.font = "bold 17px system-ui";
      context.textAlign = "center";
      context.fillText("★",0,-3);
    }

    context.restore();
  }

  drawCelebration(){
    const context = this.context;
    context.save();
    context.globalAlpha = 0.8;

    for(let index=0;index<18;index++){
      const x = (index * 71 + 45) % this.width;
      const y = 45 + ((index * 47) % 145);
      context.fillStyle = index%2===0 ? "#ffe15b" : "#ffffff";
      context.font = `${18+(index%4)*3}px system-ui`;
      context.fillText("★",x,y);
    }

    context.restore();
  }
}

// -------------------------------------------------------------
// Restantes mundos: versão de tarefas tocáveis
// -------------------------------------------------------------
function renderChecklistLevel(world){
  app.innerHTML = `
    <main class="level-screen" style="background-image:url('${world.image}')">
      <div class="level-shade">
        ${topbar(`${world.emoji} ${world.title}`)}
        <section class="level-content">
          <div class="level-hero">
            <img src="${world.image}" alt="${world.title}">
            <div class="hero-copy">
              <span class="badge">Mundo ${world.id}</span>
              <h1>${world.title}</h1>
              <p>${world.subtitle}</p>
            </div>
          </div>

          <article class="mission-card">
            <h3>Missão</h3>
            <p>${world.intro}</p>
            <div class="lama-tip">Lama diz: «Não faz mal errar. Vamos tentar juntos!»</div>
            <div class="progress-track">
              <div class="progress-fill" id="progress-fill"></div>
            </div>
            <small><strong id="task-count">0</strong> de ${world.tasks.length} tarefas concluídas</small>
          </article>

          <section class="task-list">
            ${world.tasks.map((task,index)=>`
              <button class="task" data-task="${index}">
                <span class="check">✓</span>
                <span>${task}</span>
              </button>
            `).join("")}
          </section>

          <section class="reward" id="reward">
            <div class="big-star">⭐</div>
            <h2>Conseguiste!</h2>
            <h3>${world.star}</h3>
            <p>Ninita e Lama estão prontos para a próxima aventura.</p>
            <button class="btn btn-primary" data-action="complete" data-world="${world.id}">
              ${world.id === 10 ? "Celebrar a aventura" : "Receber estrela e continuar"}
            </button>
          </section>
        </section>
      </div>
    </main>
  `;

  const selected = new Set();
  const tasks = [...document.querySelectorAll(".task")];
  const fill = document.querySelector("#progress-fill");
  const count = document.querySelector("#task-count");
  const reward = document.querySelector("#reward");
  let successPlayed = false;

  function update(){
    tasks.forEach((task,index)=>{
      task.classList.toggle("done",selected.has(index));
    });

    count.textContent = selected.size;
    fill.style.width = `${selected.size / world.tasks.length * 100}%`;
    reward.classList.toggle("show",selected.size === world.tasks.length);

    if(selected.size === world.tasks.length && !successPlayed){
      successPlayed = true;
      audio.effect("success");
    }
  }

  tasks.forEach((task,index)=>{
    task.addEventListener("click",()=>{
      audio.unlock();

      if(selected.has(index)){
        selected.delete(index);
      }else{
        selected.add(index);
        audio.effect("place");
      }

      update();
    });
  });
}

// -------------------------------------------------------------
// Diálogo de reinício
// -------------------------------------------------------------
function showResetDialog(){
  const modal = document.createElement("div");
  modal.className = "dialog-backdrop";
  modal.innerHTML = `
    <div class="dialog" role="dialog" aria-modal="true">
      <h3>Recomeçar a aventura?</h3>
      <p>O progresso dos mundos será apagado.</p>
      <div class="dialog-actions">
        <button class="btn btn-secondary" data-dialog="cancel">Cancelar</button>
        <button class="btn btn-primary" data-dialog="confirm">Sim, recomeçar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener("click",event=>{
    if(event.target.dataset.dialog === "cancel" || event.target === modal){
      modal.remove();
    }

    if(event.target.dataset.dialog === "confirm"){
      localStorage.removeItem(PROGRESS_KEY);
      modal.remove();
      renderHome();
    }
  });
}

// -------------------------------------------------------------
// Eventos gerais
// -------------------------------------------------------------
document.addEventListener("pointerdown",()=>audio.unlock(),{once:true});
document.addEventListener("keydown",()=>audio.unlock(),{once:true});

document.addEventListener("click",event=>{
  const element = event.target.closest("[data-action],[data-world]");
  if(!element) return;

  audio.unlock();

  if(
    !element.classList.contains("task")
    && element.dataset.action !== "finish-interactive"
  ){
    audio.effect("click");
  }

  if(element.dataset.action === "play") routeTo("worlds");
  if(element.dataset.action === "story") routeTo("story");
  if(element.dataset.action === "gallery") routeTo("gallery");
  if(element.dataset.action === "reset") showResetDialog();

  if(element.dataset.action === "back"){
    history.length > 1 ? history.back() : routeTo("home");
  }

  if(element.dataset.world && !element.disabled && !element.dataset.action){
    routeTo("level",Number(element.dataset.world));
  }

  if(element.dataset.action === "complete"){
    const worldId = Number(element.dataset.world);
    completeWorld(worldId);
    audio.effect("success");
    routeTo("worlds");
  }

  if(element.dataset.action === "finish-interactive"){
    completeWorld(1);
    audio.effect("success");
    routeTo("worlds");
  }
});

// Controlos do som.
const audioButton = document.querySelector("#audio-button");
const audioPanel = document.querySelector("#audio-panel");
const musicVolume = document.querySelector("#music-volume");
const effectsVolume = document.querySelector("#effects-volume");
const muteButton = document.querySelector("#mute-button");
const closeAudio = document.querySelector("#close-audio");

audioButton.addEventListener("click",()=>{
  audio.unlock();
  audioPanel.hidden = !audioPanel.hidden;
  updateAudioUi();
});

musicVolume.addEventListener("input",()=>{
  audio.musicVolume = Number(musicVolume.value);
  if(audio.music){
    audio.music.volume = audio.musicVolume;
  }
  audio.persist();
});

effectsVolume.addEventListener("input",()=>{
  audio.effectsVolume = Number(effectsVolume.value);

  if(audio.footsteps){
    audio.footsteps.volume = Math.min(
      0.48,
      audio.effectsVolume * 0.62
    );
  }

  audio.persist();
});

muteButton.addEventListener("click",()=>{
  audio.unlock();
  audio.enabled = !audio.enabled;
  audio.persist();
  audio.refreshForRoute();
});

closeAudio.addEventListener("click",()=>{
  audioPanel.hidden = true;
});

window.addEventListener("hashchange",()=>{
  const route = parseRoute();
  render(route.name,route.param);
});

if("serviceWorker" in navigator && location.protocol.startsWith("http")){
  window.addEventListener("load",()=>{
    navigator.serviceWorker.register("./sw.js").catch(()=>{});
  });
}

updateAudioUi();
const initialRoute = parseRoute();
render(initialRoute.name,initialRoute.param);
