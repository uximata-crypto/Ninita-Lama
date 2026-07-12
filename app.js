const worlds = [
  {id:1,title:"O Quarto Encantado",subtitle:"Minijogo interativo",emoji:"🛏️",image:"./assets/images/quarto.webp",star:"Estrela da Organização",intro:"Move a Ninita no cenário realista, agarra os objetos e arruma tudo nos lugares certos."},
  {id:2,title:"A Casa das Surpresas",subtitle:"Ajudar também é brincar",emoji:"🏠",image:"./assets/images/sala.webp",star:"Estrela da Ajuda",intro:"Cada divisão da casa esconde uma pequena missão para Ninita e Lama.",tasks:["Preparar um pequeno-almoço saudável","Colocar a mesa","Regar as plantas","Separar o lixo para reciclagem","Arrumar a sala"]},
  {id:3,title:"A Escola dos Sonhos",subtitle:"Descobrir e aprender",emoji:"🏫",image:"./assets/images/escola.webp",star:"Estrela do Conhecimento",intro:"As letras, os números e as cores precisam da ajuda da Ninita para regressarem aos livros.",tasks:["Preparar a mochila","Reconhecer letras","Resolver uma conta simples","Completar um puzzle","Partilhar os materiais"]},
  {id:4,title:"A Praia das Conchas",subtitle:"Proteger o oceano",emoji:"🏖️",image:"./assets/images/praia.webp",star:"Estrela do Oceano",intro:"Uma praia paradisíaca precisa de ficar limpa para que os animais marinhos voltem a sorrir.",tasks:["Recolher o lixo da areia","Separar plástico, papel e vidro","Encontrar conchas brilhantes","Ajudar uma tartaruga","Construir um castelo de areia"]},
  {id:5,title:"A Floresta Encantada",subtitle:"Cuidar da natureza",emoji:"🌳",image:"./assets/images/floresta.webp",star:"Estrela da Natureza",intro:"Na floresta, as flores brilham e os animais têm pequenas missões para Ninita e Lama.",tasks:["Plantar uma árvore","Regar as flores","Seguir as pegadas","Construir uma casa para pássaros","Encontrar a pedra mágica"]},
  {id:6,title:"A Piscina Tropical",subtitle:"Aprender com segurança",emoji:"🏊",image:"./assets/images/piscina.webp",star:"Estrela da Coragem",intro:"Lama tem algum receio da água. Ninita vai mostrar-lhe como brincar em segurança.",tasks:["Escolher o fato de banho","Colocar o colete","Tomar duche antes de entrar","Recolher bolas e boias","Ajudar Lama a brincar na água"]},
  {id:7,title:"A Quinta Pedagógica",subtitle:"Conhecer, cuidar e alimentar os animais",emoji:"🐘",image:"./assets/images/floresta.webp",star:"Estrela da Amizade",intro:"A quinta pedagógica reúne animais da quinta e de diferentes habitats. Ninita e Lama vão aprender a alimentá-los com cuidado.",tasks:["Alimentar as galinhas","Dar cenouras aos coelhos","Escovar o pónei","Regar a horta","Levar os animais para os abrigos"]},
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
const AUDIO_KEY = "ninita-lama-audio-aprovado-v4";
const app = document.querySelector("#app");

let activeGame = null;

let activeActivityModal = null;
const ACTIVITY_PROGRESS_KEY = "ninita-lama-activities-v3";

const LEVEL_ACTIVITIES = {
  1:[
    {id:"care",type:"care",icon:"🧴",title:"Salão da Ninita e de Lama",description:"Arrasta o balde, o secador e o pente para lavar, secar e pentear as duas personagens."},
    {id:"maze-room",type:"maze",icon:"🌀",title:"Labirinto do Sonho",description:"Ajuda Ninita a encontrar a lua mágica no quarto."},
    {id:"letter-room",type:"letter",icon:"🔠",title:"Caça às Letras",description:"Escolhe a letra inicial correta para cada objeto do quarto."},
    {id:"number-room",type:"number",icon:"🔢",title:"Contar Brinquedos",description:"Conta estrelas, livros e brinquedos e escolhe o número certo."},
    {id:"word-room",type:"word",icon:"🔤",title:"Palavras do Quarto",description:"Constrói palavras simples, letra a letra."},
    {id:"math-room",type:"math",icon:"➕",title:"Contas das Estrelas",description:"Resolve adições e subtrações simples."},
    {id:"color-room",type:"coloring",icon:"🦄",title:"Princesas e Unicórnios",description:"Pinta princesas de contos de fadas, castelos e unicórnios com uma paleta completa."},
    {id:"memory-room",type:"memory",icon:"🧠",title:"Memória do Quarto",description:"Encontra os pares escondidos no quarto encantado."}
  ],
  2:[
    {id:"cooking",type:"cooking",icon:"👩‍🍳",title:"Cozinhar na Casa das Surpresas",description:"Escolhe uma receita e junta os ingredientes pela ordem certa."},
    {id:"maze-home",type:"maze",icon:"🌀",title:"Labirinto da Casa",description:"Leva Lama da sala até à cozinha."},
    {id:"letter-home",type:"letter",icon:"🔠",title:"Letras da Casa",description:"Descobre as letras iniciais de objetos domésticos."},
    {id:"number-home",type:"number",icon:"🔢",title:"Contar na Cozinha",description:"Conta pratos, frutas e copos."},
    {id:"word-home",type:"word",icon:"🔤",title:"Palavras de Casa",description:"Constrói palavras letra a letra."},
    {id:"math-home",type:"math",icon:"➕",title:"Contas da Cozinha",description:"Soma e subtrai frutas, pratos e copos."},
    {id:"color-home",type:"coloring",icon:"🎨",title:"Ateliê dos Contos",description:"Pinta princesas, fadas e unicórnios."},
    {id:"memory-home",type:"memory",icon:"🧠",title:"Memória da Casa",description:"Encontra os pares de objetos da casa."},
    {id:"puzzle-home",type:"puzzle",icon:"🧩",title:"Puzzle da Sala",description:"Organiza as peças da casa."}
  ],
  3:[
    {id:"letter-school",type:"letter",icon:"🔠",title:"ABC da Escola",description:"Reconhece a primeira letra de cada palavra."},
    {id:"number-school",type:"number",icon:"🔢",title:"Contar Materiais",description:"Conta lápis, livros e réguas."},
    {id:"word-school",type:"word",icon:"✏️",title:"Letras da Escola",description:"Forma palavras, letra a letra."},
    {id:"math-school",type:"math",icon:"➕",title:"Adição e Subtração",description:"Resolve contas simples e ganha estrelas."},
    {id:"maze-school",type:"maze",icon:"🌀",title:"Labirinto da Biblioteca",description:"Encontra o caminho até ao livro mágico."},
    {id:"memory-school",type:"memory",icon:"🎒",title:"Memória Escolar",description:"Combina materiais iguais."},
    {id:"puzzle-school",type:"puzzle",icon:"🧩",title:"Puzzle da Escola",description:"Completa o quadro escolar em peças."},
    {id:"color-school",type:"coloring",icon:"🎨",title:"Desenhos Mágicos",description:"Pinta princesas, fadas, castelos e unicórnios."}
  ],
  4:[
    {id:"maze-beach",type:"maze",icon:"🌀",title:"Labirinto das Conchas",description:"Leva a tartaruga até ao mar."},
    {id:"letter-beach",type:"letter",icon:"🔠",title:"Letras da Praia",description:"Descobre a letra inicial de palavras do mar."},
    {id:"number-beach",type:"number",icon:"🔢",title:"Contar Conchas",description:"Conta conchas, peixes e estrelas-do-mar."},
    {id:"word-beach",type:"word",icon:"🔤",title:"Palavras da Praia",description:"Forma palavras sobre o mar, a areia e as férias."},
    {id:"math-beach",type:"math",icon:"➕",title:"Contas do Oceano",description:"Soma e subtrai conchas e peixes."},
    {id:"puzzle-beach",type:"puzzle",icon:"🧩",title:"Puzzle da Praia",description:"Ordena as peças do cenário tropical."},
    {id:"color-beach",type:"coloring",icon:"🎨",title:"Princesas do Mar e Unicórnios",description:"Pinta páginas mágicas com a paleta de cores."},
    {id:"memory-beach",type:"memory",icon:"🧠",title:"Memória do Oceano",description:"Encontra pares de animais e objetos marinhos."}
  ],
  5:[
    {id:"maze-forest",type:"maze",icon:"🌿",title:"Labirinto da Floresta",description:"Encontra o caminho até à árvore brilhante."},
    {id:"letter-forest",type:"letter",icon:"🔠",title:"Letras da Natureza",description:"Escolhe a letra inicial de plantas e animais."},
    {id:"number-forest",type:"number",icon:"🔢",title:"Contar na Floresta",description:"Conta flores, folhas e borboletas."},
    {id:"word-forest",type:"word",icon:"🔤",title:"Palavras da Floresta",description:"Constrói palavras ligadas à natureza."},
    {id:"math-forest",type:"math",icon:"➕",title:"Contas da Floresta",description:"Soma e subtrai elementos da natureza."},
    {id:"memory-forest",type:"memory",icon:"🦋",title:"Memória da Natureza",description:"Descobre pares de plantas e animais."},
    {id:"color-forest",type:"coloring",icon:"🖍️",title:"Ateliê Encantado",description:"Pinta páginas de magia gelada, fadas e unicórnios."}
  ],
  6:[
    {id:"maze-pool",type:"maze",icon:"🏊",title:"Percurso Seguro",description:"Ajuda Lama a chegar à boia pelo caminho correto."},
    {id:"letter-pool",type:"letter",icon:"🔠",title:"Letras da Piscina",description:"Descobre as letras de objetos de água e verão."},
    {id:"number-pool",type:"number",icon:"🔢",title:"Contar Boias",description:"Conta boias, bolas e chapéus."},
    {id:"word-pool",type:"word",icon:"🔤",title:"Palavras da Piscina",description:"Forma palavras do mundo aquático."},
    {id:"math-pool",type:"math",icon:"➖",title:"Contas da Piscina",description:"Soma e subtrai boias, bolas e conchas."},
    {id:"puzzle-pool",type:"puzzle",icon:"🧩",title:"Puzzle Tropical",description:"Desliza as peças até ficarem ordenadas."},
    {id:"color-pool",type:"coloring",icon:"🎨",title:"Colorir o Verão Mágico",description:"Pinta princesas do mar, castelos e unicórnios."},
    {id:"memory-pool",type:"memory",icon:"💦",title:"Memória da Piscina",description:"Encontra pares de objetos de água e verão."}
  ],
  7:[
    {id:"farm-feed",type:"farm",icon:"🐘",title:"Alimentar a Quinta Pedagógica",description:"Alimenta elefantes, macacos, aves, répteis e animais da quinta."},
    {id:"maze-farm",type:"maze",icon:"🌀",title:"Labirinto dos Animais",description:"Ajuda Ninita a chegar ao celeiro."},
    {id:"letter-farm",type:"letter",icon:"🔠",title:"Letras dos Animais",description:"Escolhe a letra inicial de cada animal."},
    {id:"number-farm",type:"number",icon:"🔢",title:"Contar Animais",description:"Conta aves, coelhos, macacos e tartarugas."},
    {id:"word-farm",type:"word",icon:"🔤",title:"Nomes dos Animais",description:"Constrói os nomes letra a letra."},
    {id:"math-farm",type:"math",icon:"➕",title:"Contar na Quinta",description:"Faz contas simples com ovos, cenouras e frutos."},
    {id:"memory-farm",type:"memory",icon:"🐢",title:"Memória dos Animais",description:"Encontra pares de mamíferos, aves e répteis."},
    {id:"color-farm",type:"coloring",icon:"🎨",title:"Animais e Unicórnios",description:"Pinta animais, princesas e unicórnios."}
  ],
  8:[
    {id:"maze-park",type:"maze",icon:"🎠",title:"Labirinto do Parque",description:"Chega ao carrossel sem tocar nos caminhos fechados."},
    {id:"letter-park",type:"letter",icon:"🔠",title:"Letras do Parque",description:"Reconhece as letras dos brinquedos."},
    {id:"number-park",type:"number",icon:"🔢",title:"Contar Brinquedos",description:"Conta bolas, bilhetes e balões."},
    {id:"word-park",type:"word",icon:"🔤",title:"Palavras da Diversão",description:"Forma palavras do parque."},
    {id:"math-park",type:"math",icon:"🎟️",title:"Contar Bilhetes",description:"Resolve contas com bilhetes e brinquedos."},
    {id:"puzzle-park",type:"puzzle",icon:"🧩",title:"Puzzle da Diversão",description:"Organiza as peças do parque."},
    {id:"memory-park",type:"memory",icon:"🎡",title:"Memória do Parque",description:"Encontra os pares dos brinquedos e atrações."},
    {id:"color-park",type:"coloring",icon:"🎨",title:"Festa de Princesas e Unicórnios",description:"Pinta páginas de fantasia e diversão."}
  ],
  9:[
    {id:"maze-city",type:"maze",icon:"🌀",title:"Labirinto da Cidade",description:"Ajuda Ninita a chegar à praça colorida."},
    {id:"letter-city",type:"letter",icon:"🔠",title:"Letras da Cidade",description:"Escolhe a letra inicial de lojas e transportes."},
    {id:"number-city",type:"number",icon:"🔢",title:"Contar na Cidade",description:"Conta carros, sinais e edifícios."},
    {id:"word-city",type:"word",icon:"🏙️",title:"Palavras da Cidade",description:"Constrói palavras ligadas à comunidade."},
    {id:"math-city",type:"math",icon:"🛍️",title:"Compras e Trocos",description:"Resolve pequenas adições e subtrações."},
    {id:"memory-city",type:"memory",icon:"🚦",title:"Memória da Cidade",description:"Encontra pares de sinais, lojas e meios de transporte."},
    {id:"color-city",type:"coloring",icon:"🎨",title:"Galeria Mágica",description:"Escolhe uma princesa, uma fada ou um unicórnio e pinta livremente."}
  ],
  10:[
    {id:"maze-rainbow",type:"maze",icon:"🌀",title:"Labirinto do Arco-Íris",description:"Encontra a última estrela da aventura."},
    {id:"letter-rainbow",type:"letter",icon:"🔠",title:"Letras Mágicas",description:"Descobre as letras iniciais do mundo final."},
    {id:"number-rainbow",type:"number",icon:"🔢",title:"Contar Estrelas",description:"Conta estrelas, nuvens, cristais e unicórnios."},
    {id:"word-rainbow",type:"word",icon:"🔤",title:"Palavras Mágicas",description:"Constrói palavras do mundo final."},
    {id:"math-rainbow",type:"math",icon:"➕",title:"Números do Arco-Íris",description:"Resolve contas finais com estrelas, nuvens e cristais."},
    {id:"color-rainbow",type:"coloring",icon:"🌈",title:"Grande Tela do Arco-Íris",description:"Pinta princesas, castelos e dois unicórnios diferentes."},
    {id:"memory-rainbow",type:"memory",icon:"⭐",title:"Memória das Estrelas",description:"Encontra todos os pares mágicos."},
    {id:"puzzle-rainbow",type:"puzzle",icon:"🧩",title:"Puzzle Final",description:"Completa o último desafio da aventura."}
  ]
};

function loadActivityProgress(){
  try{
    return JSON.parse(localStorage.getItem(ACTIVITY_PROGRESS_KEY)) || {};
  }catch{
    return {};
  }
}

function markActivityComplete(worldId,activityId){
  const progress = loadActivityProgress();
  const key = String(worldId);
  progress[key] = Array.isArray(progress[key]) ? progress[key] : [];
  if(!progress[key].includes(activityId)) progress[key].push(activityId);
  localStorage.setItem(ACTIVITY_PROGRESS_KEY,JSON.stringify(progress));
}

function completedActivitiesFor(worldId){
  const progress = loadActivityProgress();
  return progress[String(worldId)] || [];
}

function shuffleItems(items){
  const copy = [...items];
  for(let index=copy.length-1;index>0;index--){
    const swap = Math.floor(Math.random()*(index+1));
    [copy[index],copy[swap]] = [copy[swap],copy[index]];
  }
  return copy;
}

function renderActivityHub(worldId){
  const world = worlds.find(item=>item.id === worldId) || worlds[0];
  const activities = LEVEL_ACTIVITIES[world.id] || [];
  const completed = completedActivitiesFor(world.id);

  app.innerHTML = `
    ${topbar(`🎮 Atividades — ${world.title}`,"Os desafios originais continuam disponíveis no cenário principal")}
    <main class="content activity-hub">
      <section class="activity-hero" style="background-image:url('${world.image}')">
        <div class="activity-hero-shade">
          <span class="badge">Mundo ${world.id}</span>
          <h1>${world.emoji} ${world.title}</h1>
          <p>Escolhe uma atividade educativa. Podes repetir cada jogo sempre que quiseres.</p>
          <div class="activity-progress-summary">
            <strong>${completed.length} de ${activities.length}</strong>
            <span>atividades concluídas</span>
          </div>
        </div>
      </section>

      <section class="activity-grid">
        ${activities.map(activity=>{
          const done = completed.includes(activity.id);
          return `
            <button class="activity-card ${done ? "completed" : ""}" data-activity="${activity.id}" data-world="${world.id}">
              <span class="activity-icon">${activity.icon}</span>
              ${done ? '<span class="activity-done">⭐</span>' : ''}
              <h3>${activity.title}</h3>
              <p>${activity.description}</p>
              <span class="activity-play">${done ? "Jogar novamente" : "Começar"} →</span>
            </button>
          `;
        }).join("")}
      </section>

      <section class="activity-note card">
        <h3>Desenhos para colorir</h3>
        <p>As páginas de pintura incluem personagens originais inspiradas em contos mágicos de gelo, aventuras do mar, fadas, unicórnios e castelos encantados. Não usam personagens oficiais da Disney, mas mantêm um ambiente semelhante de fantasia infantil.</p>
      </section>

      <button class="btn btn-primary activity-return" data-action="return-level" data-world="${world.id}">
        ← Voltar ao desafio principal
      </button>
    </main>
  `;
}

function closeActivityModal(){
  if(!activeActivityModal) return;
  if(typeof activeActivityModal._cleanup === "function") activeActivityModal._cleanup();
  activeActivityModal.remove();
  activeActivityModal = null;
}

function createActivityModal(world,activity){
  closeActivityModal();
  const modal = document.createElement("div");
  modal.className = "activity-overlay";
  modal.innerHTML = `
    <section class="activity-modal" role="dialog" aria-modal="true" aria-label="${activity.title}">
      <header class="activity-modal-header">
        <div>
          <span class="badge">${world.emoji} Mundo ${world.id}</span>
          <h2>${activity.icon} ${activity.title}</h2>
          <p>${activity.description}</p>
        </div>
        <button class="activity-close" data-close-activity aria-label="Fechar atividade">×</button>
      </header>
      <div id="activity-root" class="activity-root"></div>
    </section>
  `;
  document.body.appendChild(modal);
  activeActivityModal = modal;
  modal.addEventListener("click",event=>{
    if(event.target === modal || event.target.closest("[data-close-activity]")){
      closeActivityModal();
      renderActivityHub(world.id);
    }
  });
  return modal.querySelector("#activity-root");
}

function finishActivity(world,activity,message){
  markActivityComplete(world.id,activity.id);
  audio.effect("success");
  const root = document.querySelector("#activity-root");
  if(!root || root.dataset.finished === "true") return;
  root.dataset.finished = "true";
  root.insertAdjacentHTML("beforeend",`
    <div class="mini-success">
      <div class="big-star">⭐</div>
      <h2>Muito bem!</h2>
      <p>${message}</p>
      <button class="btn btn-primary" data-finish-activity>Voltar às atividades</button>
    </div>
  `);
  root.querySelector("[data-finish-activity]").addEventListener("click",()=>{
    closeActivityModal();
    renderActivityHub(world.id);
  });
}

function openActivity(worldId,activityId){
  const world = worlds.find(item=>item.id === worldId) || worlds[0];
  const activity = (LEVEL_ACTIVITIES[world.id] || []).find(item=>item.id === activityId);
  if(!activity) return;
  const root = createActivityModal(world,activity);
  const finish = message=>finishActivity(world,activity,message);

  if(activity.type === "memory") startMemoryActivity(root,world,finish);
  if(activity.type === "letter") startLetterActivity(root,world,finish);
  if(activity.type === "number") startNumberActivity(root,world,finish);
  if(activity.type === "word") startWordActivity(root,world,finish);
  if(activity.type === "math") startMathActivity(root,world,finish);
  if(activity.type === "maze") startMazeActivity(root,world,finish);
  if(activity.type === "puzzle") startPuzzleActivity(root,world,finish);
  if(activity.type === "coloring") startColoringActivity(root,world,finish);
  if(activity.type === "care") startCareActivity(root,world,finish);
  if(activity.type === "cooking") startCookingActivity(root,world,finish);
  if(activity.type === "farm") startFarmActivity(root,world,finish);
}

function memorySymbolsFor(worldId){
  return ({
    1:["🛏️","🧸","📚","🎒","👟","🌙"],
    3:["✏️","📘","🔢","🎨","🎒","📏"],
    5:["🌳","🦋","🐦","🌸","🍄","🐿️"],
    6:["🩱","🛟","🏖️","🩴","💦","🐠"],
    7:["🐘","🐒","🦜","🐢","🦎","🐇"],
    8:["🎠","🎡","🎟️","🚗","🎈","🍭"],
    9:["🚦","🏪","🚌","🌳","👫","🛍️"],
    10:["⭐","🌈","☁️","🦄","💎","🪄"]
  })[worldId] || ["🦙","👧🏻","⭐","🌸","🎈","💖"];
}

function startMemoryActivity(root,world,finish){
  const symbols = memorySymbolsFor(world.id);
  const cards = shuffleItems(symbols.flatMap((symbol,pair)=>[
    {symbol,pair,id:`${pair}-a`},{symbol,pair,id:`${pair}-b`}
  ]));
  let first = null;
  let locked = false;
  const matched = new Set();

  root.innerHTML = `
    <div class="mini-instruction">Toca em duas cartas para encontrar os pares.</div>
    <div class="memory-grid">
      ${cards.map((card,index)=>`<button class="memory-card" data-card="${index}" aria-label="Carta escondida"><span>?</span></button>`).join("")}
    </div>
    <p class="mini-feedback" id="memory-feedback">Encontra ${symbols.length} pares.</p>
  `;

  const buttons = [...root.querySelectorAll(".memory-card")];
  buttons.forEach((button,index)=>button.addEventListener("click",()=>{
    if(locked || matched.has(index) || first === index) return;
    audio.effect("click");
    button.classList.add("flipped");
    button.querySelector("span").textContent = cards[index].symbol;
    if(first === null){
      first = index;
      return;
    }
    if(cards[first].pair === cards[index].pair){
      matched.add(first);
      matched.add(index);
      buttons[first].classList.add("matched");
      button.classList.add("matched");
      first = null;
      audio.effect("place");
      root.querySelector("#memory-feedback").textContent = `${matched.size/2} pares encontrados.`;
      if(matched.size === cards.length) finish("Encontraste todos os pares do jogo da memória!");
    }else{
      locked = true;
      const previous = first;
      first = null;
      setTimeout(()=>{
        [previous,index].forEach(position=>{
          buttons[position].classList.remove("flipped");
          buttons[position].querySelector("span").textContent = "?";
        });
        locked = false;
      },650);
    }
  }));
}

function wordsFor(worldId){
  return ({
    1:[{word:"CAMA",emoji:"🛏️"},{word:"LIVRO",emoji:"📘"},{word:"LAMA",emoji:"🦙"}],
    2:[{word:"CASA",emoji:"🏠"},{word:"MESA",emoji:"🍽️"},{word:"SOPA",emoji:"🥣"}],
    3:[{word:"LIVRO",emoji:"📘"},{word:"LETRA",emoji:"🔤"},{word:"ESCOLA",emoji:"🏫"}],
    4:[{word:"PRAIA",emoji:"🏖️"},{word:"MAR",emoji:"🌊"},{word:"CONCHA",emoji:"🐚"}],
    5:[{word:"ARVORE",emoji:"🌳"},{word:"FLOR",emoji:"🌸"},{word:"BOSQUE",emoji:"🌲"}],
    6:[{word:"BOIA",emoji:"🛟"},{word:"AGUA",emoji:"💧"},{word:"PISCINA",emoji:"🏊"}],
    7:[{word:"LAMA",emoji:"🦙"},{word:"MACACO",emoji:"🐒"},{word:"ELEFANTE",emoji:"🐘"}],
    8:[{word:"PARQUE",emoji:"🎠"},{word:"BOLA",emoji:"⚽"},{word:"BILHETE",emoji:"🎟️"}],
    9:[{word:"CIDADE",emoji:"🏙️"},{word:"LOJA",emoji:"🏪"},{word:"AMIGO",emoji:"🤝"}],
    10:[{word:"MAGIA",emoji:"🪄"},{word:"ESTRELA",emoji:"⭐"},{word:"UNICORNIO",emoji:"🦄"}]
  })[worldId] || [{word:"NINITA",emoji:"👧🏻"},{word:"ESTRELA",emoji:"⭐"},{word:"ARCOIRIS",emoji:"🌈"}];
}

function letterItemsFor(worldId){
  return ({
    1:[{word:"CAMA",emoji:"🛏️"},{word:"LAMA",emoji:"🦙"},{word:"LIVRO",emoji:"📘"},{word:"SAPATO",emoji:"👟"},{word:"ESTRELA",emoji:"⭐"},{word:"BONECA",emoji:"🪆"}],
    2:[{word:"CASA",emoji:"🏠"},{word:"MESA",emoji:"🍽️"},{word:"SOPA",emoji:"🥣"},{word:"PLANTA",emoji:"🪴"},{word:"COPO",emoji:"🥛"},{word:"FRUTA",emoji:"🍎"}],
    3:[{word:"ESCOLA",emoji:"🏫"},{word:"LIVRO",emoji:"📘"},{word:"REGUA",emoji:"📏"},{word:"LAPIS",emoji:"✏️"},{word:"MOCHILA",emoji:"🎒"},{word:"NUMERO",emoji:"🔢"}],
    4:[{word:"PRAIA",emoji:"🏖️"},{word:"MAR",emoji:"🌊"},{word:"CONCHA",emoji:"🐚"},{word:"PEIXE",emoji:"🐟"},{word:"AREIA",emoji:"🏝️"},{word:"TARTARUGA",emoji:"🐢"}],
    5:[{word:"ARVORE",emoji:"🌳"},{word:"FLOR",emoji:"🌸"},{word:"BORBOLETA",emoji:"🦋"},{word:"COGUMELO",emoji:"🍄"},{word:"PASSARO",emoji:"🐦"},{word:"FOLHA",emoji:"🍃"}],
    6:[{word:"AGUA",emoji:"💧"},{word:"BOIA",emoji:"🛟"},{word:"BOLA",emoji:"🏐"},{word:"CHAPEU",emoji:"👒"},{word:"PISCINA",emoji:"🏊"},{word:"TOALHA",emoji:"🏖️"}],
    7:[{word:"ELEFANTE",emoji:"🐘"},{word:"MACACO",emoji:"🐒"},{word:"PAPAGAIO",emoji:"🦜"},{word:"TARTARUGA",emoji:"🐢"},{word:"COELHO",emoji:"🐇"},{word:"GALINHA",emoji:"🐔"}],
    8:[{word:"PARQUE",emoji:"🎠"},{word:"BOLA",emoji:"⚽"},{word:"BILHETE",emoji:"🎟️"},{word:"CARROSSEL",emoji:"🎠"},{word:"BALAO",emoji:"🎈"},{word:"RODA",emoji:"🎡"}],
    9:[{word:"CIDADE",emoji:"🏙️"},{word:"LOJA",emoji:"🏪"},{word:"CARRO",emoji:"🚗"},{word:"SINAL",emoji:"🚦"},{word:"AUTOCARRO",emoji:"🚌"},{word:"PRACA",emoji:"⛲"}],
    10:[{word:"ARCOIRIS",emoji:"🌈"},{word:"ESTRELA",emoji:"⭐"},{word:"MAGIA",emoji:"🪄"},{word:"UNICORNIO",emoji:"🦄"},{word:"NUVEM",emoji:"☁️"},{word:"CRISTAL",emoji:"💎"}]
  })[worldId] || [{word:"NINITA",emoji:"👧🏻"},{word:"LAMA",emoji:"🦙"},{word:"MAGIA",emoji:"🪄"}];
}

function startLetterActivity(root,world,finish){
  const items = letterItemsFor(world.id);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let round = 0;
  let score = 0;

  root.innerHTML = `
    <div class="learning-score">⭐ <span id="letter-score">0</span> de ${items.length}</div>
    <div class="letter-challenge">
      <div class="letter-picture" id="letter-picture"></div>
      <div class="letter-word-display"><span class="letter-drop-zone" id="letter-drop-zone">?</span><span id="letter-word-tail"></span></div>
      <p class="mini-feedback" id="letter-feedback">Escolhe a primeira letra da palavra.</p>
      <div class="letter-choice-grid" id="letter-choice-grid"></div>
    </div>
  `;

  function next(){
    if(round >= items.length){
      finish("Reconheceste todas as letras iniciais!");
      return;
    }
    const item = items[round];
    const correct = item.word[0];
    const distractors = shuffleItems(alphabet.filter(letter=>letter!==correct)).slice(0,3);
    const options = shuffleItems([correct,...distractors]);
    root.querySelector("#letter-picture").textContent = item.emoji;
    root.querySelector("#letter-drop-zone").textContent = "?";
    root.querySelector("#letter-word-tail").textContent = item.word.slice(1);
    root.querySelector("#letter-feedback").textContent = `Qual é a primeira letra de ${item.word}? Podes clicar ou arrastar.`;
    root.querySelector("#letter-choice-grid").innerHTML = options.map(letter=>`<button class="letter-choice" draggable="true" data-letter-choice="${letter}">${letter}</button>`).join("");
    bind();
  }

  function choose(letter){
    const item = items[round];
    if(letter === item.word[0]){
      score++;
      root.querySelector("#letter-score").textContent = score;
      root.querySelector("#letter-drop-zone").textContent = letter;
      root.querySelector("#letter-drop-zone").classList.add("correct");
      root.querySelector("#letter-feedback").textContent = `Muito bem: ${item.word} começa por ${letter}.`;
      audio.effect("place");
      root.querySelectorAll(".letter-choice").forEach(button=>button.disabled=true);
      setTimeout(()=>{
        round++;
        root.querySelector("#letter-drop-zone")?.classList.remove("correct");
        next();
      },650);
    }else{
      root.querySelector("#letter-feedback").textContent = `Essa não é a primeira letra. Observa a palavra ${item.word}.`;
      const wrong = root.querySelector(`[data-letter-choice="${letter}"]`);
      wrong?.classList.add("wrong");
      setTimeout(()=>wrong?.classList.remove("wrong"),350);
    }
  }

  function bind(){
    root.querySelectorAll("[data-letter-choice]").forEach(button=>{
      button.addEventListener("click",()=>choose(button.dataset.letterChoice));
      button.addEventListener("dragstart",event=>event.dataTransfer.setData("text/plain",button.dataset.letterChoice));
    });
  }

  const drop = root.querySelector("#letter-drop-zone");
  drop.addEventListener("dragover",event=>{event.preventDefault();drop.classList.add("drop-ready");});
  drop.addEventListener("dragleave",()=>drop.classList.remove("drop-ready"));
  drop.addEventListener("drop",event=>{
    event.preventDefault();
    drop.classList.remove("drop-ready");
    choose(event.dataTransfer.getData("text/plain"));
  });
  next();
}

function numberIconFor(worldId){
  return ({1:"⭐",2:"🍎",3:"✏️",4:"🐚",5:"🌸",6:"🛟",7:"🐇",8:"🎟️",9:"🚗",10:"🦄"})[worldId] || "⭐";
}

function startNumberActivity(root,world,finish){
  const rounds = 6;
  const icon = numberIconFor(world.id);
  let round = 0;
  let score = 0;

  root.innerHTML = `
    <div class="learning-score">⭐ <span id="number-score">0</span> de ${rounds}</div>
    <div class="number-challenge">
      <p class="mini-instruction">Conta os objetos e escolhe ou arrasta o número correto.</p>
      <div class="counting-objects" id="counting-objects"></div>
      <div class="number-drop-zone" id="number-drop-zone">?</div>
      <div class="number-choice-grid" id="number-choice-grid"></div>
      <p class="mini-feedback" id="number-feedback">Quantos objetos estão no quadro?</p>
    </div>
  `;

  let answer = 1;
  function next(){
    if(round >= rounds){
      finish("Contaste corretamente todos os grupos de objetos!");
      return;
    }
    answer = 1 + Math.floor(Math.random()*10);
    const choices = new Set([answer]);
    while(choices.size < 4){
      choices.add(1 + Math.floor(Math.random()*10));
    }
    root.querySelector("#counting-objects").innerHTML = Array.from({length:answer},(_,index)=>`<span style="--delay:${index}">${icon}</span>`).join("");
    root.querySelector("#number-drop-zone").textContent = "?";
    root.querySelector("#number-choice-grid").innerHTML = shuffleItems([...choices]).map(value=>`<button class="number-choice" draggable="true" data-number-choice="${value}">${value}</button>`).join("");
    root.querySelector("#number-feedback").textContent = "Quantos objetos estão no quadro?";
    bind();
  }

  function choose(value){
    const number = Number(value);
    if(number === answer){
      score++;
      root.querySelector("#number-score").textContent = score;
      root.querySelector("#number-drop-zone").textContent = number;
      root.querySelector("#number-drop-zone").classList.add("correct");
      root.querySelector("#number-feedback").textContent = `Certo! Há ${answer} ${answer===1 ? "objeto" : "objetos"}.`;
      audio.effect("place");
      root.querySelectorAll(".number-choice").forEach(button=>button.disabled=true);
      setTimeout(()=>{
        round++;
        root.querySelector("#number-drop-zone")?.classList.remove("correct");
        next();
      },650);
    }else{
      root.querySelector("#number-feedback").textContent = "Conta novamente, devagar, um objeto de cada vez.";
      const wrong = root.querySelector(`[data-number-choice="${number}"]`);
      wrong?.classList.add("wrong");
      setTimeout(()=>wrong?.classList.remove("wrong"),350);
    }
  }

  function bind(){
    root.querySelectorAll("[data-number-choice]").forEach(button=>{
      button.addEventListener("click",()=>choose(button.dataset.numberChoice));
      button.addEventListener("dragstart",event=>event.dataTransfer.setData("text/plain",button.dataset.numberChoice));
    });
  }

  const drop = root.querySelector("#number-drop-zone");
  drop.addEventListener("dragover",event=>{event.preventDefault();drop.classList.add("drop-ready");});
  drop.addEventListener("dragleave",()=>drop.classList.remove("drop-ready"));
  drop.addEventListener("drop",event=>{
    event.preventDefault();
    drop.classList.remove("drop-ready");
    choose(event.dataTransfer.getData("text/plain"));
  });
  next();
}

function startWordActivity(root,world,finish){
  const words = wordsFor(world.id);
  let round = 0;
  let built = [];

  root.innerHTML = `
    <div class="word-game">
      <div class="word-picture" id="word-picture"></div>
      <div class="word-slots" id="word-slots"></div>
      <div class="letter-bank" id="letter-bank"></div>
      <p class="mini-feedback" id="word-feedback">Constrói a palavra letra a letra.</p>
    </div>
  `;

  function drawRound(){
    const current = words[round];
    built = [];
    root.querySelector("#word-picture").textContent = current.emoji;
    root.querySelector("#word-slots").innerHTML = Array.from(current.word).map((_,index)=>`<span data-slot="${index}">_</span>`).join("");
    const letters = shuffleItems(Array.from(current.word).map((letter,index)=>({letter,index})));
    root.querySelector("#letter-bank").innerHTML = letters.map((item,index)=>`<button class="letter-tile" data-letter-index="${index}" data-letter="${item.letter}">${item.letter}</button>`).join("");
    root.querySelector("#word-feedback").textContent = `Palavra ${round+1} de ${words.length}`;

    root.querySelectorAll(".letter-tile").forEach(button=>button.addEventListener("click",()=>{
      const expected = Array.from(current.word)[built.length];
      if(button.dataset.letter === expected){
        built.push(button.dataset.letter);
        button.disabled = true;
        button.classList.add("used");
        root.querySelector(`[data-slot="${built.length-1}"]`).textContent = button.dataset.letter;
        audio.effect("place");
        if(built.length === current.word.length){
          root.querySelector("#word-feedback").textContent = `Muito bem: ${current.word}!`;
          setTimeout(()=>{
            round++;
            if(round >= words.length) finish("Construíste todas as palavras, uma letra de cada vez!");
            else drawRound();
          },700);
        }
      }else{
        button.classList.add("wrong");
        root.querySelector("#word-feedback").textContent = `Procura a letra ${expected}.`;
        setTimeout(()=>button.classList.remove("wrong"),350);
      }
    }));
  }
  drawRound();
}

function startMathActivity(root,world,finish){
  const max = world.id >= 8 ? 20 : 10;
  let correct = 0;

  root.innerHTML = `
    <div class="math-score">⭐ <span id="math-score">0</span> de 5</div>
    <div class="math-question" id="math-question"></div>
    <div class="math-answers" id="math-answers"></div>
    <p class="mini-feedback" id="math-feedback">Escolhe a resposta certa.</p>
  `;

  function nextQuestion(){
    const subtraction = Math.random() < .5;
    let a = 1 + Math.floor(Math.random()*max);
    let b = 1 + Math.floor(Math.random()*max);
    if(subtraction && b > a) [a,b] = [b,a];
    const answer = subtraction ? a-b : a+b;
    const symbol = subtraction ? "−" : "+";
    const options = new Set([answer]);
    while(options.size < 4){
      const candidate = Math.max(0,answer + Math.floor(Math.random()*9)-4);
      options.add(candidate);
    }
    root.querySelector("#math-question").textContent = `${a} ${symbol} ${b} = ?`;
    root.querySelector("#math-answers").innerHTML = shuffleItems([...options]).map(value=>`<button class="math-answer" data-answer="${value}">${value}</button>`).join("");
    root.querySelector("#math-feedback").textContent = "Escolhe a resposta certa.";
    root.querySelectorAll(".math-answer").forEach(button=>button.addEventListener("click",()=>{
      if(Number(button.dataset.answer) === answer){
        correct++;
        root.querySelector("#math-score").textContent = correct;
        root.querySelector("#math-feedback").textContent = "Resposta certa!";
        audio.effect("place");
        root.querySelectorAll(".math-answer").forEach(item=>item.disabled=true);
        setTimeout(()=>{
          if(correct >= 5) finish("Resolveste cinco contas de adição e subtração!");
          else nextQuestion();
        },550);
      }else{
        button.classList.add("wrong");
        root.querySelector("#math-feedback").textContent = "Vamos tentar outra resposta.";
        setTimeout(()=>button.classList.remove("wrong"),350);
      }
    }));
  }
  nextQuestion();
}

function makeMaze(size){
  const cells = Array.from({length:size*size},()=>({visited:false,walls:[true,true,true,true]}));
  const stack = [0];
  cells[0].visited = true;
  const directions = [[-1,0,0,2],[0,1,1,3],[1,0,2,0],[0,-1,3,1]];
  while(stack.length){
    const current = stack[stack.length-1];
    const row = Math.floor(current/size);
    const col = current%size;
    const neighbours = shuffleItems(directions).map(([dr,dc,wall,opposite])=>({
      row:row+dr,col:col+dc,wall,opposite
    })).filter(item=>item.row>=0 && item.row<size && item.col>=0 && item.col<size && !cells[item.row*size+item.col].visited);
    if(!neighbours.length){
      stack.pop();
      continue;
    }
    const next = neighbours[0];
    const nextIndex = next.row*size+next.col;
    cells[current].walls[next.wall] = false;
    cells[nextIndex].walls[next.opposite] = false;
    cells[nextIndex].visited = true;
    stack.push(nextIndex);
  }
  return cells;
}

function startMazeActivity(root,world,finish){
  const size = 7;
  const cells = makeMaze(size);
  let player = 0;
  const goal = size*size-1;
  const hero = world.id === 4 ? "🐢" : world.id === 6 ? "🦙" : world.id === 7 ? "🐇" : "👧🏻";
  const destination = ({1:"🌙",2:"🍳",3:"📘",4:"🌊",5:"🌳",6:"🛟",7:"🏡",8:"🎠",9:"⛲",10:"⭐"})[world.id] || "⭐";

  root.innerHTML = `
    <div class="mini-instruction">Usa as setas para chegar ao destino.</div>
    <div class="maze-board" id="maze-board" style="--maze-size:${size}"></div>
    <div class="maze-controls">
      <button data-maze="up">↑</button>
      <div><button data-maze="left">←</button><button data-maze="down">↓</button><button data-maze="right">→</button></div>
    </div>
  `;

  function draw(){
    root.querySelector("#maze-board").innerHTML = cells.map((cell,index)=>{
      const [top,right,bottom,left] = cell.walls;
      const content = index === player ? hero : index === goal ? destination : "";
      return `<div class="maze-cell" style="border-top:${top?'3px':'0'} solid #6b3d7d;border-right:${right?'3px':'0'} solid #6b3d7d;border-bottom:${bottom?'3px':'0'} solid #6b3d7d;border-left:${left?'3px':'0'} solid #6b3d7d">${content}</div>`;
    }).join("");
  }

  function move(direction){
    const map = {up:0,right:1,down:2,left:3};
    const wallIndex = map[direction];
    if(cells[player].walls[wallIndex]){
      audio.effect("click");
      return;
    }
    if(direction === "up") player -= size;
    if(direction === "right") player += 1;
    if(direction === "down") player += size;
    if(direction === "left") player -= 1;
    draw();
    audio.effect("place");
    if(player === goal) finish("Encontraste a saída do labirinto!");
  }

  root.querySelectorAll("[data-maze]").forEach(button=>button.addEventListener("click",()=>move(button.dataset.maze)));
  const keyHandler = event=>{
    const direction = {ArrowUp:"up",ArrowRight:"right",ArrowDown:"down",ArrowLeft:"left"}[event.key];
    if(direction){
      event.preventDefault();
      move(direction);
    }
  };
  window.addEventListener("keydown",keyHandler);
  activeActivityModal._cleanup = ()=>window.removeEventListener("keydown",keyHandler);
  draw();
}

function startPuzzleActivity(root,world,finish){
  let tiles = [1,2,3,4,5,6,7,8,0];
  const neighbours = index=>{
    const row = Math.floor(index/3), col=index%3;
    return [[row-1,col],[row+1,col],[row,col-1],[row,col+1]].filter(([r,c])=>r>=0&&r<3&&c>=0&&c<3).map(([r,c])=>r*3+c);
  };
  for(let step=0;step<120;step++){
    const blank = tiles.indexOf(0);
    const move = neighbours(blank)[Math.floor(Math.random()*neighbours(blank).length)];
    [tiles[blank],tiles[move]]=[tiles[move],tiles[blank]];
  }
  if(tiles.every((value,index)=>value === [1,2,3,4,5,6,7,8,0][index])) [tiles[7],tiles[8]]=[tiles[8],tiles[7]];
  const theme = world.id === 4 ? "🏖️" : world.id === 6 ? "🏊" : world.id === 8 ? "🎠" : "🌈";

  root.innerHTML = `
    <div class="mini-instruction">Desliza uma peça para o espaço vazio e ordena os números.</div>
    <div class="puzzle-theme">${theme}</div>
    <div class="sliding-puzzle" id="sliding-puzzle"></div>
    <p class="mini-feedback">Objetivo: 1 · 2 · 3 / 4 · 5 · 6 / 7 · 8</p>
  `;

  function draw(){
    root.querySelector("#sliding-puzzle").innerHTML = tiles.map((tile,index)=>tile ? `<button class="puzzle-tile" data-tile-index="${index}"><span>${tile}</span></button>` : `<div class="puzzle-tile empty"></div>`).join("");
    root.querySelectorAll("[data-tile-index]").forEach(button=>button.addEventListener("click",()=>{
      const index = Number(button.dataset.tileIndex);
      const blank = tiles.indexOf(0);
      if(!neighbours(blank).includes(index)) return;
      [tiles[blank],tiles[index]]=[tiles[index],tiles[blank]];
      audio.effect("place");
      draw();
      if(tiles.every((value,position)=>value === [1,2,3,4,5,6,7,8,0][position])) finish("Completaste o puzzle e colocaste todas as peças no lugar!");
    }));
  }
  draw();
}

function drawIcePrincess(context){
  context.lineWidth=5; context.strokeStyle="#34243d"; context.lineCap="round"; context.lineJoin="round";
  context.beginPath(); context.arc(280,150,62,0,Math.PI*2); context.stroke();
  context.beginPath(); context.moveTo(230,130); context.quadraticCurveTo(280,70,335,130); context.quadraticCurveTo(315,105,280,110); context.quadraticCurveTo(245,105,230,130); context.stroke();
  context.beginPath(); context.moveTo(245,90); context.lineTo(255,55); context.lineTo(280,82); context.lineTo(305,55); context.lineTo(318,92); context.stroke();
  context.beginPath(); context.moveTo(250,205); context.lineTo(205,500); context.lineTo(355,500); context.lineTo(310,205); context.closePath(); context.stroke();
  [[105,115],[450,120],[120,420],[445,425]].forEach(([x,y])=>{context.beginPath();context.moveTo(x-18,y);context.lineTo(x+18,y);context.moveTo(x,y-18);context.lineTo(x,y+18);context.moveTo(x-13,y-13);context.lineTo(x+13,y+13);context.moveTo(x+13,y-13);context.lineTo(x-13,y+13);context.stroke();});
}

function drawSeaPrincess(context){
  context.lineWidth=5; context.strokeStyle="#34243d"; context.lineCap="round"; context.lineJoin="round";
  context.beginPath(); context.arc(280,150,60,0,Math.PI*2); context.stroke();
  context.beginPath(); context.moveTo(225,145); context.quadraticCurveTo(215,70,280,80); context.quadraticCurveTo(350,75,340,165); context.stroke();
  context.beginPath(); context.moveTo(245,210); context.lineTo(220,405); context.lineTo(340,405); context.lineTo(315,210); context.closePath(); context.stroke();
  context.beginPath(); context.moveTo(265,405); context.quadraticCurveTo(280,485,200,535); context.moveTo(295,405); context.quadraticCurveTo(280,485,360,535); context.stroke();
  context.beginPath(); context.moveTo(200,535); context.quadraticCurveTo(280,575,360,535); context.stroke();
  context.beginPath(); context.moveTo(85,490); context.quadraticCurveTo(150,445,215,490); context.quadraticCurveTo(280,535,345,490); context.quadraticCurveTo(410,445,475,490); context.stroke();
}

function drawBraveLion(context){
  context.lineWidth=5; context.strokeStyle="#34243d"; context.lineCap="round"; context.lineJoin="round";
  context.beginPath(); context.arc(280,275,145,0,Math.PI*2); context.stroke();
  context.beginPath(); context.arc(280,275,93,0,Math.PI*2); context.stroke();
  context.beginPath(); context.arc(245,255,8,0,Math.PI*2); context.arc(315,255,8,0,Math.PI*2); context.stroke();
  context.beginPath(); context.moveTo(260,295); context.quadraticCurveTo(280,315,300,295); context.quadraticCurveTo(280,275,260,295); context.stroke();
  context.beginPath(); context.moveTo(280,315); context.lineTo(280,345); context.quadraticCurveTo(250,365,225,340); context.moveTo(280,345); context.quadraticCurveTo(310,365,335,340); context.stroke();
  context.beginPath(); context.moveTo(220,190); context.lineTo(190,145); context.lineTo(250,165); context.moveTo(340,190); context.lineTo(370,145); context.lineTo(310,165); context.stroke();
}

function drawRainbowFairy(context){
  context.lineWidth=5; context.strokeStyle="#34243d"; context.lineCap="round"; context.lineJoin="round";
  context.beginPath(); context.arc(280,145,58,0,Math.PI*2); context.stroke();
  context.beginPath(); context.moveTo(235,115); context.quadraticCurveTo(280,55,330,115); context.stroke();
  context.beginPath(); context.moveTo(250,205); context.lineTo(210,445); context.lineTo(350,445); context.lineTo(310,205); context.closePath(); context.stroke();
  context.beginPath(); context.ellipse(185,270,70,115,-.55,0,Math.PI*2); context.ellipse(375,270,70,115,.55,0,Math.PI*2); context.stroke();
  context.beginPath(); context.moveTo(335,235); context.lineTo(440,125); context.stroke();
  context.beginPath(); context.arc(450,115,18,0,Math.PI*2); context.stroke();
  for(let radius=70;radius<=140;radius+=24){context.beginPath();context.arc(280,540,radius,Math.PI,Math.PI*2);context.stroke();}
}

function drawUnicorn(context){
  context.lineWidth=5; context.strokeStyle="#34243d"; context.lineCap="round"; context.lineJoin="round";
  context.beginPath(); context.ellipse(275,320,135,105,0,0,Math.PI*2); context.stroke();
  context.beginPath(); context.moveTo(190,290); context.quadraticCurveTo(150,215,195,170); context.quadraticCurveTo(250,120,325,150); context.quadraticCurveTo(360,170,370,215); context.stroke();
  context.beginPath(); context.moveTo(308,135); context.lineTo(334,55); context.lineTo(352,140); context.stroke();
  context.beginPath(); context.arc(328,210,48,0,Math.PI*2); context.stroke();
  context.beginPath(); context.arc(345,205,6,0,Math.PI*2); context.stroke();
  context.beginPath(); context.moveTo(315,225); context.quadraticCurveTo(332,238,347,225); context.stroke();
  [220,260,310,350].forEach(x=>{context.beginPath();context.moveTo(x,410);context.lineTo(x-10,560);context.stroke();});
  context.beginPath(); context.moveTo(145,325); context.quadraticCurveTo(100,280,90,240); context.quadraticCurveTo(130,280,150,350); context.stroke();
  context.beginPath(); context.moveTo(390,300); context.quadraticCurveTo(455,270,465,215); context.quadraticCurveTo(490,295,450,345); context.stroke();
  context.beginPath(); context.arc(450,125,18,0,Math.PI*2); context.stroke();
}

function drawCastle(context){
  context.lineWidth=5; context.strokeStyle="#34243d"; context.lineCap="round"; context.lineJoin="round";
  context.strokeRect(175,250,210,230);
  context.strokeRect(130,190,60,290);
  context.strokeRect(370,190,60,290);
  context.beginPath(); context.moveTo(130,190); context.lineTo(160,145); context.lineTo(190,190); context.moveTo(370,190); context.lineTo(400,145); context.lineTo(430,190); context.stroke();
  context.beginPath(); context.moveTo(240,250); context.lineTo(240,205); context.lineTo(280,160); context.lineTo(320,205); context.lineTo(320,250); context.stroke();
  context.beginPath(); context.arc(280,395,52,Math.PI,0); context.stroke();
  context.strokeRect(195,315,40,52); context.strokeRect(325,315,40,52); context.strokeRect(258,290,44,55);
  for(let x=115;x<=445;x+=55){context.beginPath();context.arc(x,520,18,0,Math.PI*2);context.stroke();}
}


function drawTowerPrincess(context){
  context.lineWidth=5;context.strokeStyle="#34243d";context.lineCap="round";context.lineJoin="round";
  context.beginPath();context.arc(280,145,58,0,Math.PI*2);context.stroke();
  context.beginPath();context.moveTo(225,135);context.quadraticCurveTo(205,40,280,62);context.quadraticCurveTo(370,55,350,190);context.quadraticCurveTo(380,300,330,405);context.stroke();
  context.beginPath();context.moveTo(250,205);context.lineTo(205,500);context.lineTo(355,500);context.lineTo(310,205);context.closePath();context.stroke();
  context.beginPath();context.moveTo(245,245);context.lineTo(170,335);context.moveTo(315,245);context.lineTo(390,335);context.stroke();
  context.beginPath();context.moveTo(82,520);context.lineTo(82,180);context.lineTo(155,125);context.lineTo(155,520);context.stroke();
  context.strokeRect(98,235,42,75);context.beginPath();context.arc(119,235,21,Math.PI,0);context.stroke();
  context.beginPath();context.moveTo(235,93);context.lineTo(250,55);context.lineTo(280,83);context.lineTo(310,55);context.lineTo(325,95);context.stroke();
}

function drawBallPrincess(context){
  context.lineWidth=5;context.strokeStyle="#34243d";context.lineCap="round";context.lineJoin="round";
  context.beginPath();context.arc(280,135,55,0,Math.PI*2);context.stroke();
  context.beginPath();context.arc(280,75,28,0,Math.PI*2);context.stroke();
  context.beginPath();context.moveTo(230,125);context.quadraticCurveTo(245,75,280,85);context.quadraticCurveTo(330,75,338,145);context.stroke();
  context.beginPath();context.moveTo(245,200);context.quadraticCurveTo(160,315,125,515);context.lineTo(435,515);context.quadraticCurveTo(400,315,315,200);context.closePath();context.stroke();
  context.beginPath();context.moveTo(245,235);context.lineTo(165,325);context.moveTo(315,235);context.lineTo(395,325);context.stroke();
  context.beginPath();context.arc(455,430,42,0,Math.PI*2);context.arc(385,430,42,0,Math.PI*2);context.stroke();
  context.beginPath();context.moveTo(345,430);context.quadraticCurveTo(420,340,495,430);context.stroke();
  context.beginPath();context.moveTo(450,505);context.quadraticCurveTo(475,490,500,505);context.quadraticCurveTo(475,530,450,505);context.stroke();
}

function drawStarUnicorn(context){
  context.lineWidth=5;context.strokeStyle="#34243d";context.lineCap="round";context.lineJoin="round";
  context.beginPath();context.ellipse(270,335,145,95,-.05,0,Math.PI*2);context.stroke();
  context.beginPath();context.moveTo(165,310);context.quadraticCurveTo(135,220,200,165);context.quadraticCurveTo(255,115,330,160);context.stroke();
  context.beginPath();context.arc(330,205,52,0,Math.PI*2);context.stroke();
  context.beginPath();context.moveTo(315,152);context.lineTo(342,55);context.lineTo(360,158);context.stroke();
  context.beginPath();context.arc(347,198,6,0,Math.PI*2);context.stroke();
  [205,255,315,365].forEach(x=>{context.beginPath();context.moveTo(x,415);context.lineTo(x-8,555);context.stroke();});
  context.beginPath();context.moveTo(120,335);context.quadraticCurveTo(75,285,85,220);context.quadraticCurveTo(145,270,150,355);context.stroke();
  context.beginPath();context.ellipse(225,315,72,118,-.75,0,Math.PI*2);context.ellipse(325,315,72,118,.75,0,Math.PI*2);context.stroke();
  [[90,105],[470,115],[455,390],[105,455],[430,535]].forEach(([x,y])=>{
    context.beginPath();for(let i=0;i<10;i++){const angle=-Math.PI/2+i*Math.PI/5;const radius=i%2===0?18:7;const px=x+Math.cos(angle)*radius;const py=y+Math.sin(angle)*radius;i===0?context.moveTo(px,py):context.lineTo(px,py);}context.closePath();context.stroke();
  });
}

function startColoringActivity(root,world,finish){
  const pages = [
    {id:"ice-princess",label:"Princesa do Gelo",draw:drawIcePrincess},
    {id:"sea-princess",label:"Princesa do Mar",draw:drawSeaPrincess},
    {id:"tower-princess",label:"Princesa da Torre",draw:drawTowerPrincess},
    {id:"ball-princess",label:"Princesa do Baile",draw:drawBallPrincess},
    {id:"fairy",label:"Fada do Arco-Íris",draw:drawRainbowFairy},
    {id:"unicorn",label:"Unicórnio Arco-Íris",draw:drawUnicorn},
    {id:"star-unicorn",label:"Unicórnio Estelar",draw:drawStarUnicorn},
    {id:"lion",label:"Leão Corajoso",draw:drawBraveLion},
    {id:"castle",label:"Castelo Mágico",draw:drawCastle}
  ];
  let page = pages[0];
  let color = "#f062b2";
  let brush = 20;
  let drawing = false;
  let strokes = 0;

  root.innerHTML = `
    <div class="coloring-toolbar">
      <div class="page-buttons">${pages.map(item=>`<button data-color-page="${item.id}">${item.label}</button>`).join("")}</div>
      <div class="color-palette">
        ${["#f062b2","#8b5cf6","#3b82f6","#22c55e","#facc15","#f97316","#ef4444","#6b4423","#111827","#ffffff"].map(value=>`<button class="color-swatch" data-color="${value}" style="background:${value}" aria-label="Cor ${value}"></button>`).join("")}
      </div>
      <label class="brush-control">Tamanho do pincel <input id="brush-size" type="range" min="8" max="42" value="20"></label>
      <button class="btn btn-secondary" id="clear-coloring">Limpar tela</button>
    </div>
    <div class="coloring-stage">
      <canvas id="paint-canvas" width="560" height="620"></canvas>
      <canvas id="outline-canvas" width="560" height="620"></canvas>
    </div>
    <button class="btn btn-primary" id="finish-coloring">Terminar desenho</button>
  `;

  const paint = root.querySelector("#paint-canvas");
  const outline = root.querySelector("#outline-canvas");
  const pctx = paint.getContext("2d");
  const octx = outline.getContext("2d");

  function resetPaint(){
    pctx.fillStyle="#fff";
    pctx.fillRect(0,0,paint.width,paint.height);
    strokes = 0;
  }
  function drawOutline(){
    octx.clearRect(0,0,outline.width,outline.height);
    page.draw(octx);
  }
  function position(event){
    const rect = paint.getBoundingClientRect();
    return {x:(event.clientX-rect.left)*paint.width/rect.width,y:(event.clientY-rect.top)*paint.height/rect.height};
  }
  function drawPoint(event){
    const point = position(event);
    pctx.fillStyle=color;
    pctx.beginPath();
    pctx.arc(point.x,point.y,brush/2,0,Math.PI*2);
    pctx.fill();
    strokes++;
  }
  paint.addEventListener("pointerdown",event=>{drawing=true;paint.setPointerCapture(event.pointerId);drawPoint(event);});
  paint.addEventListener("pointermove",event=>{if(drawing) drawPoint(event);});
  paint.addEventListener("pointerup",()=>drawing=false);
  paint.addEventListener("pointercancel",()=>drawing=false);
  root.querySelectorAll("[data-color]").forEach(button=>button.addEventListener("click",()=>{
    color=button.dataset.color;
    root.querySelectorAll(".color-swatch").forEach(item=>item.classList.toggle("selected",item===button));
  }));
  root.querySelectorAll("[data-color-page]").forEach(button=>button.addEventListener("click",()=>{
    page=pages.find(item=>item.id===button.dataset.colorPage) || pages[0];
    resetPaint();
    drawOutline();
  }));
  root.querySelector("#brush-size").addEventListener("input",event=>brush=Number(event.target.value));
  root.querySelector("#clear-coloring").addEventListener("click",resetPaint);
  root.querySelector("#finish-coloring").addEventListener("click",()=>{
    if(strokes < 6){
      root.querySelector("#finish-coloring").textContent="Pinta um pouco mais ✨";
      setTimeout(()=>root.querySelector("#finish-coloring").textContent="Terminar desenho",800);
      return;
    }
    finish(`Terminaste o desenho da ${page.label}!`);
  });
  resetPaint();
  drawOutline();
}

function careBucketSvg(){
  return `<svg viewBox="0 0 180 150" aria-hidden="true"><defs><linearGradient id="bucketMetal" x1="0" x2="1"><stop stop-color="#eef7ff"/><stop offset=".45" stop-color="#93b4cc"/><stop offset="1" stop-color="#dbeeff"/></linearGradient><linearGradient id="waterBlue" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#58d6ff"/><stop offset="1" stop-color="#148ac8"/></linearGradient></defs><path d="M42 48h96l-11 82H53z" fill="url(#bucketMetal)" stroke="#42687d" stroke-width="5"/><ellipse cx="90" cy="49" rx="49" ry="15" fill="url(#waterBlue)" stroke="#42687d" stroke-width="5"/><path d="M48 48C50 4 130 4 132 48" fill="none" stroke="#526f80" stroke-width="7"/><circle cx="61" cy="38" r="10" fill="#fff" opacity=".85"/><circle cx="83" cy="31" r="13" fill="#fff" opacity=".82"/><circle cx="107" cy="38" r="9" fill="#fff" opacity=".9"/><path d="M56 87h68" stroke="#fff" stroke-width="7" opacity=".45"/></svg>`;
}

function careDryerSvg(){
  return `<svg viewBox="0 0 190 150" aria-hidden="true"><defs><linearGradient id="dryerBody" x1="0" x2="1"><stop stop-color="#ff94c8"/><stop offset=".55" stop-color="#d84594"/><stop offset="1" stop-color="#a92772"/></linearGradient></defs><path d="M38 48c0-18 15-33 33-33h52c20 0 36 16 36 36v20c0 15-12 27-27 27H72c-19 0-34-15-34-34z" fill="url(#dryerBody)" stroke="#732151" stroke-width="5"/><path d="M145 42h35v37h-35z" fill="#54354e" stroke="#2c1c2b" stroke-width="5"/><path d="M82 92l34 4-16 49H70z" fill="#c73682" stroke="#732151" stroke-width="5"/><circle cx="74" cy="57" r="24" fill="#ffe5f2" stroke="#732151" stroke-width="5"/><path d="M61 57h26M74 44v26M65 48l18 18M83 48L65 66" stroke="#b34481" stroke-width="4"/><path d="M181 52h8M181 65h8M181 78h8" stroke="#74d8ff" stroke-width="5" stroke-linecap="round"/></svg>`;
}

function careCombSvg(){
  return `<svg viewBox="0 0 190 150" aria-hidden="true"><defs><linearGradient id="combPurple" x1="0" x2="1"><stop stop-color="#a889ff"/><stop offset="1" stop-color="#5b35b4"/></linearGradient></defs><path d="M20 34h150v36H20z" rx="12" fill="url(#combPurple)" stroke="#39206e" stroke-width="5"/><path d="M32 70v61M48 70v54M64 70v61M80 70v54M96 70v61M112 70v54M128 70v61M144 70v54M160 70v61" stroke="#5b35b4" stroke-width="8" stroke-linecap="round"/><circle cx="43" cy="52" r="9" fill="#d8cbff"/><path d="M62 52h90" stroke="#d8cbff" stroke-width="7" stroke-linecap="round"/></svg>`;
}

function careLamaSvg(){
  return `<svg viewBox="0 0 320 330" aria-label="Lama cor-de-rosa"><defs><linearGradient id="lamaPink" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffd6eb"/><stop offset="1" stop-color="#ef87bd"/></linearGradient></defs><ellipse cx="160" cy="260" rx="92" ry="48" fill="url(#lamaPink)" stroke="#8e3b6b" stroke-width="5"/><path d="M110 258v56M145 270v48M195 270v48M225 254v60" stroke="#b8578b" stroke-width="17" stroke-linecap="round"/><path d="M205 248c-8-70-8-120 11-153" fill="none" stroke="#f3a7ca" stroke-width="62" stroke-linecap="round"/><ellipse cx="220" cy="78" rx="58" ry="50" fill="url(#lamaPink)" stroke="#8e3b6b" stroke-width="5"/><path d="M182 43l-18-39 42 25M248 35l20-34 11 47" fill="#f59ac4" stroke="#8e3b6b" stroke-width="5"/><path d="M178 35l-7-17 19 12M255 30l10-15 4 22" stroke="#62c9e8" stroke-width="8"/><circle cx="202" cy="70" r="6" fill="#34243d"/><circle cx="239" cy="70" r="6" fill="#34243d"/><path d="M207 91q14 13 28 0" fill="none" stroke="#5c2b4b" stroke-width="5" stroke-linecap="round"/><circle cx="191" cy="88" r="9" fill="#ff8daf" opacity=".7"/><circle cx="248" cy="88" r="9" fill="#ff8daf" opacity=".7"/><g fill="#ffddea" stroke="#8e3b6b" stroke-width="3"><circle cx="190" cy="121" r="22"/><circle cx="219" cy="126" r="23"/><circle cx="204" cy="151" r="24"/><circle cx="226" cy="170" r="20"/></g><path d="M85 235q-38-34-54 3q35-2 49 27" fill="#f59ac4" stroke="#8e3b6b" stroke-width="5"/></svg>`;
}

function careNinitaSvg(){
  return `<svg viewBox="0 0 320 330" aria-label="Ninita"><defs><linearGradient id="dressPink" x1="0" x2="1"><stop stop-color="#ff8fc4"/><stop offset="1" stop-color="#d94a99"/></linearGradient></defs><circle cx="160" cy="92" r="62" fill="#f4c7a5" stroke="#7b4938" stroke-width="5"/><path d="M103 90q0-78 57-78q58 0 58 80q-22-35-58-30q-37-5-57 28" fill="#6b3e2b" stroke="#3f241b" stroke-width="5"/><circle cx="82" cy="83" r="34" fill="#6b3e2b" stroke="#3f241b" stroke-width="5"/><circle cx="238" cy="83" r="34" fill="#6b3e2b" stroke="#3f241b" stroke-width="5"/><path d="M94 68l-21-22M226 67l23-22" stroke="#ff78b3" stroke-width="11" stroke-linecap="round"/><circle cx="138" cy="92" r="6" fill="#3b2a26"/><circle cx="183" cy="92" r="6" fill="#3b2a26"/><path d="M142 119q18 14 36 0" fill="none" stroke="#b85465" stroke-width="5" stroke-linecap="round"/><circle cx="121" cy="112" r="10" fill="#f18da2" opacity=".45"/><circle cx="199" cy="112" r="10" fill="#f18da2" opacity=".45"/><path d="M110 168q50-35 100 0l38 146H72z" fill="url(#dressPink)" stroke="#7d2e66" stroke-width="5"/><path d="M111 184l-52 82M209 184l52 82" stroke="#f4c7a5" stroke-width="22" stroke-linecap="round"/><path d="M120 165q40 24 80 0" fill="none" stroke="#fff" stroke-width="13"/><path d="M113 286v34M207 286v34" stroke="#f4c7a5" stroke-width="22" stroke-linecap="round"/></svg>`;
}

function startCareActivity(root,world,finish){
  const progress = {
    lamaWash:0,lamaDry:0,lamaComb:0,
    ninitaWash:0,ninitaDry:0,ninitaComb:0
  };
  let selectedTool = "bucket";
  let dragCleanup = null;
  let completed = false;

  const tools = [
    {id:"bucket",name:"Balde com água",svg:careBucketSvg(),instruction:"Arrasta o balde para lavar."},
    {id:"dryer",name:"Secador",svg:careDryerSvg(),instruction:"Depois de lavar, arrasta o secador para secar."},
    {id:"comb",name:"Pente",svg:careCombSvg(),instruction:"Depois de secar, arrasta o pente para pentear."}
  ];

  root.innerHTML = `
    <div class="care-salon">
      <div class="care-tool-shelf" aria-label="Utensílios para cuidar das personagens">
        ${tools.map(tool=>`<button class="care-tool-object ${tool.id==="bucket"?"selected":""}" data-care-tool="${tool.id}" aria-label="${tool.name}"><span class="care-tool-art">${tool.svg}</span><strong>${tool.name}</strong><small>Arrastar</small></button>`).join("")}
      </div>
      <p class="mini-feedback" id="care-feedback">Arrasta primeiro o balde para Lama ou Ninita. Também podes selecionar o utensílio e tocar na personagem.</p>
      <div class="care-stage">
        <article class="care-person" data-care-target="lama">
          <div class="care-figure">${careLamaSvg()}<span class="care-water-effect">💦</span><span class="care-bubble-effect">🫧</span><span class="care-shine-effect">✨</span></div>
          <h3>Lama</h3>
          <div class="care-progress-list">
            <label><span>🪣 Lavar</span><progress id="lama-wash" max="3" value="0"></progress></label>
            <label><span>💨 Secar</span><progress id="lama-dry" max="3" value="0"></progress></label>
            <label><span>🪮 Pentear</span><progress id="lama-comb" max="3" value="0"></progress></label>
          </div>
        </article>
        <article class="care-person" data-care-target="ninita">
          <div class="care-figure">${careNinitaSvg()}<span class="care-water-effect">💦</span><span class="care-bubble-effect">🫧</span><span class="care-shine-effect">✨</span></div>
          <h3>Ninita</h3>
          <div class="care-progress-list">
            <label><span>🪣 Lavar</span><progress id="ninita-wash" max="3" value="0"></progress></label>
            <label><span>💨 Secar</span><progress id="ninita-dry" max="3" value="0"></progress></label>
            <label><span>🪮 Pentear</span><progress id="ninita-comb" max="3" value="0"></progress></label>
          </div>
        </article>
      </div>
    </div>
  `;

  function keysFor(target){
    return target === "lama"
      ? {wash:"lamaWash",dry:"lamaDry",comb:"lamaComb"}
      : {wash:"ninitaWash",dry:"ninitaDry",comb:"ninitaComb"};
  }

  function update(){
    for(const target of ["lama","ninita"]){
      const keys = keysFor(target);
      root.querySelector(`#${target}-wash`).value = progress[keys.wash];
      root.querySelector(`#${target}-dry`).value = progress[keys.dry];
      root.querySelector(`#${target}-comb`).value = progress[keys.comb];
      const card = root.querySelector(`[data-care-target="${target}"]`);
      card.classList.toggle("is-wet",progress[keys.wash]>0 && progress[keys.dry]<3);
      card.classList.toggle("is-washed",progress[keys.wash]>=3);
      card.classList.toggle("is-dry",progress[keys.dry]>=3);
      card.classList.toggle("is-combed",progress[keys.comb]>=3);
    }
    if(!completed && Object.values(progress).every(value=>value>=3)){
      completed = true;
      finish("Arrastaste o balde, o secador e o pente. Lama e Ninita ficaram lavadas, secas e muito bem penteadas!");
    }
  }

  function applyTool(target,tool){
    if(!target || !tool || completed) return;
    const keys = keysFor(target);
    const name = target === "lama" ? "Lama" : "Ninita";
    const feedback = root.querySelector("#care-feedback");

    if(tool === "bucket"){
      if(progress[keys.wash] < 3){
        progress[keys.wash]++;
        feedback.textContent = `A lavar ${name} com o balde e água. Passagem ${progress[keys.wash]} de 3.`;
      }else{
        feedback.textContent = `${name} já está lavada. Agora usa o secador.`;
      }
    }else if(tool === "dryer"){
      if(progress[keys.wash] < 3){
        feedback.textContent = `Primeiro lava ${name} três vezes com o balde.`;
        return;
      }
      if(progress[keys.dry] < 3){
        progress[keys.dry]++;
        feedback.textContent = `A secar ${name}. Passagem ${progress[keys.dry]} de 3.`;
      }else{
        feedback.textContent = `${name} já está seca. Agora usa o pente.`;
      }
    }else if(tool === "comb"){
      if(progress[keys.dry] < 3){
        feedback.textContent = `Primeiro seca ${name} com o secador.`;
        return;
      }
      if(progress[keys.comb] < 3){
        progress[keys.comb]++;
        feedback.textContent = `A pentear ${name}. Passagem ${progress[keys.comb]} de 3.`;
      }else{
        feedback.textContent = `${name} já está muito bem penteada.`;
      }
    }
    audio.effect("place");
    update();
  }

  function selectTool(button){
    selectedTool = button.dataset.careTool;
    root.querySelectorAll(".care-tool-object").forEach(item=>item.classList.toggle("selected",item===button));
    const info = tools.find(item=>item.id===selectedTool);
    root.querySelector("#care-feedback").textContent = info.instruction;
  }

  function startDrag(event,button){
    if(event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    selectTool(button);
    const ghost = button.cloneNode(true);
    ghost.classList.add("care-tool-ghost");
    document.body.appendChild(ghost);

    function move(pointerEvent){
      ghost.style.left = `${pointerEvent.clientX}px`;
      ghost.style.top = `${pointerEvent.clientY}px`;
      root.querySelectorAll("[data-care-target]").forEach(card=>{
        const rect = card.getBoundingClientRect();
        const over = pointerEvent.clientX>=rect.left && pointerEvent.clientX<=rect.right && pointerEvent.clientY>=rect.top && pointerEvent.clientY<=rect.bottom;
        card.classList.toggle("drop-ready",over);
      });
    }

    function end(pointerEvent){
      window.removeEventListener("pointermove",move);
      window.removeEventListener("pointerup",end);
      window.removeEventListener("pointercancel",cancel);
      root.querySelectorAll("[data-care-target]").forEach(card=>card.classList.remove("drop-ready"));
      ghost.remove();
      const element = document.elementFromPoint(pointerEvent.clientX,pointerEvent.clientY);
      const targetCard = element?.closest?.("[data-care-target]");
      if(targetCard && root.contains(targetCard)) applyTool(targetCard.dataset.careTarget,selectedTool);
      dragCleanup = null;
    }

    function cancel(){
      window.removeEventListener("pointermove",move);
      window.removeEventListener("pointerup",end);
      window.removeEventListener("pointercancel",cancel);
      root.querySelectorAll("[data-care-target]").forEach(card=>card.classList.remove("drop-ready"));
      ghost.remove();
      dragCleanup = null;
    }

    dragCleanup = cancel;
    window.addEventListener("pointermove",move,{passive:false});
    window.addEventListener("pointerup",end,{once:true});
    window.addEventListener("pointercancel",cancel,{once:true});
    move(event);
  }

  root.querySelectorAll(".care-tool-object").forEach(button=>{
    button.addEventListener("click",()=>selectTool(button));
    button.addEventListener("pointerdown",event=>startDrag(event,button));
  });
  root.querySelectorAll("[data-care-target]").forEach(card=>{
    card.addEventListener("click",()=>applyTool(card.dataset.careTarget,selectedTool));
  });

  activeActivityModal._cleanup = ()=>{
    if(dragCleanup) dragCleanup();
  };
  update();
}

function startCookingActivity(root,world,finish){
  const recipes = [
    {id:"fruit",title:"Salada de fruta",emoji:"🍓",steps:["🍎","🍌","🍓","🥝"]},
    {id:"soup",title:"Sopa de legumes",emoji:"🥣",steps:["🥕","🥔","🧅","💧"]},
    {id:"sandwich",title:"Sanduíche saudável",emoji:"🥪",steps:["🍞","🧀","🥬","🍅","🍞"]}
  ];
  let recipe = recipes[0];
  let step = 0;

  root.innerHTML = `
    <div class="recipe-choice">${recipes.map(item=>`<button data-recipe="${item.id}">${item.emoji} ${item.title}</button>`).join("")}</div>
    <div class="cooking-counter">
      <div class="cooking-bowl" id="cooking-bowl">🥣</div>
      <h3 id="recipe-title"></h3>
      <div class="recipe-steps" id="recipe-steps"></div>
      <div class="ingredients" id="ingredients"></div>
      <p class="mini-feedback" id="cooking-feedback"></p>
    </div>
  `;

  function drawRecipe(){
    step=0;
    root.querySelector("#recipe-title").textContent=recipe.title;
    root.querySelector("#recipe-steps").innerHTML=recipe.steps.map((item,index)=>`<span data-recipe-step="${index}">${index+1}. ${item}</span>`).join("");
    root.querySelector("#ingredients").innerHTML=shuffleItems([...new Set(recipe.steps)]).map(item=>`<button class="ingredient" data-ingredient="${item}">${item}</button>`).join("");
    root.querySelector("#cooking-feedback").textContent="Junta os ingredientes pela ordem apresentada.";
    bindIngredients();
  }
  function bindIngredients(){
    root.querySelectorAll("[data-ingredient]").forEach(button=>button.addEventListener("click",()=>{
      const expected=recipe.steps[step];
      if(button.dataset.ingredient===expected){
        root.querySelector(`[data-recipe-step="${step}"]`).classList.add("done");
        step++;
        root.querySelector("#cooking-bowl").textContent=step===recipe.steps.length ? recipe.emoji : "🥣✨";
        audio.effect("place");
        if(step===recipe.steps.length){
          root.querySelector("#ingredients").innerHTML='<button class="btn btn-primary" id="mix-recipe">Misturar e servir</button>';
          root.querySelector("#mix-recipe").addEventListener("click",()=>finish(`Preparaste uma deliciosa ${recipe.title.toLowerCase()}!`));
        }
      }else{
        button.classList.add("wrong");
        root.querySelector("#cooking-feedback").textContent=`Agora precisamos de ${expected}.`;
        setTimeout(()=>button.classList.remove("wrong"),350);
      }
    }));
  }
  root.querySelectorAll("[data-recipe]").forEach(button=>button.addEventListener("click",()=>{
    recipe=recipes.find(item=>item.id===button.dataset.recipe) || recipes[0];
    root.querySelectorAll("[data-recipe]").forEach(item=>item.classList.toggle("selected",item===button));
    drawRecipe();
  }));
  drawRecipe();
}

function startFarmActivity(root,world,finish){
  const animals = [
    {id:"elephant",icon:"🐘",name:"Elefante",group:"Mamífero",food:"leaves",fact:"Os elefantes usam a tromba para agarrar folhas e beber água."},
    {id:"monkey",icon:"🐒",name:"Macaco",group:"Mamífero",food:"banana",fact:"Os macacos comem frutos, folhas e outros alimentos variados."},
    {id:"parrot",icon:"🦜",name:"Papagaio",group:"Ave",food:"seeds",fact:"Muitas aves usam o bico para partir sementes e frutos."},
    {id:"flamingo",icon:"🦩",name:"Flamingo",group:"Ave",food:"shrimp",fact:"Os flamingos filtram pequenos animais e algas da água."},
    {id:"tortoise",icon:"🐢",name:"Tartaruga",group:"Réptil",food:"lettuce",fact:"As tartarugas terrestres gostam de folhas e legumes adequados."},
    {id:"lizard",icon:"🦎",name:"Lagarto",group:"Réptil",food:"insects",fact:"Muitos lagartos comem insetos e ajudam a controlar pequenas pragas."},
    {id:"hen",icon:"🐔",name:"Galinha",group:"Ave",food:"corn",fact:"As galinhas debicam grãos no chão."},
    {id:"rabbit",icon:"🐇",name:"Coelho",group:"Mamífero",food:"carrot",fact:"Os coelhos precisam sobretudo de feno e folhas; a cenoura é apenas um petisco."}
  ];
  const foods = [
    {id:"leaves",icon:"🌿",name:"Folhas"},{id:"banana",icon:"🍌",name:"Banana"},
    {id:"seeds",icon:"🌻",name:"Sementes"},{id:"shrimp",icon:"🦐",name:"Pequenos crustáceos"},
    {id:"lettuce",icon:"🥬",name:"Folhas verdes"},{id:"insects",icon:"🪱",name:"Insetos"},
    {id:"corn",icon:"🌽",name:"Grãos"},{id:"carrot",icon:"🥕",name:"Cenoura"}
  ];
  let selectedFood = null;
  const fed = new Set();

  root.innerHTML = `
    <div class="mini-instruction">Primeiro escolhe a comida. Depois toca no animal certo.</div>
    <div class="farm-foods">${foods.map(food=>`<button data-food="${food.id}"><span>${food.icon}</span>${food.name}</button>`).join("")}</div>
    <p class="mini-feedback" id="farm-feedback">Escolhe um alimento.</p>
    <div class="farm-animals">${animals.map(animal=>`
      <button class="farm-animal" data-animal="${animal.id}">
        <span class="farm-animal-icon">${animal.icon}</span>
        <strong>${animal.name}</strong>
        <small>${animal.group}</small>
        <span class="fed-badge">Alimentado ✓</span>
      </button>
    `).join("")}</div>
    <article class="animal-fact" id="animal-fact">Aqui vais aprender uma curiosidade sobre cada animal.</article>
  `;

  root.querySelectorAll("[data-food]").forEach(button=>button.addEventListener("click",()=>{
    selectedFood=button.dataset.food;
    root.querySelectorAll("[data-food]").forEach(item=>item.classList.toggle("selected",item===button));
    root.querySelector("#farm-feedback").textContent=`Selecionaste ${foods.find(food=>food.id===selectedFood).name}. Agora escolhe o animal.`;
  }));
  root.querySelectorAll("[data-animal]").forEach(button=>button.addEventListener("click",()=>{
    const animal=animals.find(item=>item.id===button.dataset.animal);
    if(fed.has(animal.id)) return;
    if(!selectedFood){
      root.querySelector("#farm-feedback").textContent="Escolhe primeiro a comida.";
      return;
    }
    if(selectedFood===animal.food){
      fed.add(animal.id);
      button.classList.add("fed");
      root.querySelector("#animal-fact").innerHTML=`<strong>${animal.icon} ${animal.name}</strong><p>${animal.fact}</p>`;
      root.querySelector("#farm-feedback").textContent=`Muito bem! Alimentaste ${animal.name}.`;
      audio.effect("place");
      if(fed.size===animals.length) finish("Alimentaste mamíferos, aves e répteis da quinta pedagógica!");
    }else{
      root.querySelector("#farm-feedback").textContent=`Esse alimento não é o indicado para ${animal.name}. Tenta outro.`;
      button.classList.add("wrong");
      setTimeout(()=>button.classList.remove("wrong"),400);
    }
  }));
}


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
    introAbertura: {url: "./assets/audio/intro_to_fun_adventures.mp3", loop: true},
    aventuraLivre: {url: "./assets/audio/best_adventure_ever.mp3", loop: true},
    tropicalLivre: {url: "./assets/audio/joyful_fun_tropical_music.mp3", loop: true},
    naturezaLivre: {url: "https://opengameart.org/sites/default/files/fato_shadow_-_wild_land.mp3", loop: true},
    cidadeLivre: {url: "https://opengameart.org/sites/default/files/bossa_nova_raw.mp3", loop: true},
    magicoLivre: {url: "./assets/audio/magic_world.mp3", loop: true}
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
    this.musicVolume = saved?.musicVolume ?? 0.30;
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

    const configuration = REAL_AUDIO.music[track];
    if(!configuration) return;

    const url = typeof configuration === "string"
      ? configuration
      : configuration.url;

    const loop = typeof configuration === "string"
      ? true
      : configuration.loop !== false;

    const nextTrack = typeof configuration === "string"
      ? ""
      : configuration.next || "";

    if(
      this.currentTrack === track
      && this.music
      && !this.music.paused
    ){
      return;
    }

    this.stopMusic();

    this.currentTrack = track;
    this.music = this.createAudio(url,loop);
    this.music.volume = this.musicVolume;

    if(nextTrack){
      this.music.addEventListener("ended",()=>{
        if(this.enabled && this.unlocked && this.currentTrack === track){
          this.playMusic(nextTrack);
        }
      },{once:true});
    }

    this.music.play().catch(error=>{
      console.warn("Não foi possível iniciar a banda sonora licenciada:",error);
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

    if(route.name === "home") return "introAbertura";
    if(route.name === "worlds" || route.name === "gallery") return "magicoLivre";
    if(route.name === "story") return "aventuraLivre";

    if(route.name === "activities"){
      return {
        1:"magicoLivre",2:"cidadeLivre",3:"aventuraLivre",4:"tropicalLivre",5:"naturezaLivre",
        6:"tropicalLivre",7:"naturezaLivre",8:"aventuraLivre",9:"cidadeLivre",10:"magicoLivre"
      }[route.param] || "introAbertura";
    }

    if(route.name === "level"){
      return {
        1:"magicoLivre",
        2:"cidadeLivre",
        3:"aventuraLivre",
        4:"tropicalLivre",
        5:"naturezaLivre",
        6:"tropicalLivre",
        7:"naturezaLivre",
        8:"aventuraLivre",
        9:"cidadeLivre",
        10:"magicoLivre"
      }[route.param] || "introAbertura";
    }

    return "introAbertura";
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
  closeActivityModal();
}

function render(name,param){
  destroyActiveGame();

  if(name === "home") renderHome();
  else if(name === "worlds") renderWorlds();
  else if(name === "story") renderStory();
  else if(name === "gallery") renderGallery();
  else if(name === "level") renderLevel(param);
  else if(name === "activities") renderActivityHub(param);
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
          <strong>${progress.completed.length} de ${worlds.length}</strong>
          <span>mundos concluídos</span>
        </div>
        <button class="btn btn-text danger" data-action="reset">↻ Recomeçar</button>
      </section>

      <p class="footer-note">Dez mundos interativos com desafios, atividades educativas, música e efeitos.</p>
    </main>
  `;
}

function renderWorlds(){
  const progress = loadProgress();

  app.innerHTML = `
    ${topbar("Mapa dos Mundos","10 mundos interativos com novas atividades educativas")}
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

  const configuration = INTERACTIVE_LEVELS[world.id];

  if(!configuration){
    routeTo("worlds");
    return;
  }

  renderInteractiveWorld(world,configuration);
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
// Configuração dos dez mundos interativos
// -------------------------------------------------------------
const INTERACTIVE_LEVELS = {
  1: {
    instruction:"Arruma o quarto. Aproxima-te, agarra os objetos e leva-os às zonas iluminadas.",
    start:{x:270,y:835},
    tasks:[
      {
        id:"bed",
        label:"Fazer a cama",
        type:"use",
        icon:"🛏️",
        target:{x:115,y:470,width:310,height:185,label:"FAZER A CAMA"}
      },
      {
        id:"toy",
        label:"Guardar o brinquedo na caixa",
        type:"place",
        icon:"🧸",
        start:{x:390,y:780},
        target:{x:55,y:340,width:125,height:105,label:"CAIXA"}
      },
      {
        id:"books",
        label:"Colocar os livros na estante",
        type:"place",
        icon:"📚",
        start:{x:350,y:660},
        target:{x:55,y:155,width:170,height:130,label:"ESTANTE"}
      },
      {
        id:"shoes",
        label:"Arrumar os sapatos",
        type:"place",
        icon:"👟",
        start:{x:115,y:845},
        target:{x:360,y:855,width:125,height:70,label:"SAPATOS"}
      },
      {
        id:"backpack",
        label:"Arrumar a mochila",
        type:"place",
        icon:"🎒",
        start:{x:145,y:720},
        target:{x:395,y:335,width:95,height:135,label:"MOCHILA"}
      }
    ]
  },

  2: {
    instruction:"Ajuda em casa: prepara a mesa, cuida das plantas, recicla e arruma a sala.",
    start:{x:270,y:840},
    tasks:[
      {
        id:"fruit",
        label:"Levar a fruta para a mesa",
        type:"place",
        icon:"🍎",
        start:{x:105,y:790},
        target:{x:55,y:330,width:150,height:100,label:"MESA"}
      },
      {
        id:"plate",
        label:"Colocar o prato na mesa",
        type:"place",
        icon:"🍽️",
        start:{x:425,y:810},
        target:{x:335,y:330,width:150,height:100,label:"MESA"}
      },
      {
        id:"plant",
        label:"Regar as plantas",
        type:"use",
        icon:"🪴",
        target:{x:55,y:535,width:145,height:120,label:"REGAR"}
      },
      {
        id:"recycle",
        label:"Separar a embalagem para reciclagem",
        type:"place",
        icon:"🧴",
        start:{x:365,y:675},
        target:{x:365,y:535,width:125,height:115,label:"RECICLAR"}
      },
      {
        id:"cushion",
        label:"Arrumar a almofada no sofá",
        type:"place",
        icon:"🛋️",
        start:{x:145,y:700},
        target:{x:190,y:720,width:165,height:100,label:"SOFÁ"}
      }
    ]
  },

  3: {
    instruction:"Organiza a sala de aula e leva cada material ao lugar certo.",
    start:{x:270,y:850},
    tasks:[
      {
        id:"schoolbook",
        label:"Guardar o livro na mochila",
        type:"place",
        icon:"📘",
        start:{x:105,y:760},
        target:{x:55,y:330,width:125,height:110,label:"MOCHILA"}
      },
      {
        id:"letter",
        label:"Colocar a letra no quadro",
        type:"place",
        icon:"🔤",
        start:{x:425,y:760},
        target:{x:335,y:290,width:150,height:110,label:"LETRAS"}
      },
      {
        id:"number",
        label:"Colocar o número no quadro",
        type:"place",
        icon:"🔢",
        start:{x:360,y:625},
        target:{x:335,y:435,width:150,height:105,label:"NÚMEROS"}
      },
      {
        id:"puzzle",
        label:"Completar o puzzle",
        type:"place",
        icon:"🧩",
        start:{x:125,y:625},
        target:{x:55,y:485,width:145,height:105,label:"PUZZLE"}
      },
      {
        id:"pencils",
        label:"Arrumar os lápis",
        type:"place",
        icon:"✏️",
        start:{x:270,y:720},
        target:{x:200,y:355,width:140,height:100,label:"LÁPIS"}
      }
    ]
  },

  4: {
    instruction:"Limpa a praia, protege os animais e constrói um castelo de areia.",
    start:{x:270,y:850},
    tasks:[
      {
        id:"litter",
        label:"Colocar o lixo no caixote",
        type:"place",
        icon:"🗑️",
        start:{x:115,y:800},
        target:{x:55,y:390,width:130,height:110,label:"LIXO"}
      },
      {
        id:"plastic",
        label:"Reciclar a garrafa de plástico",
        type:"place",
        icon:"🧴",
        start:{x:420,y:815},
        target:{x:355,y:390,width:130,height:110,label:"PLÁSTICO"}
      },
      {
        id:"shell",
        label:"Guardar a concha no cesto",
        type:"place",
        icon:"🐚",
        start:{x:150,y:660},
        target:{x:55,y:555,width:130,height:105,label:"CONCHAS"}
      },
      {
        id:"turtle",
        label:"Ajudar a tartaruga a chegar ao mar",
        type:"place",
        icon:"🐢",
        start:{x:385,y:665},
        target:{x:350,y:270,width:145,height:120,label:"MAR"}
      },
      {
        id:"castle",
        label:"Construir o castelo de areia",
        type:"use",
        icon:"🏰",
        target:{x:200,y:520,width:145,height:125,label:"CONSTRUIR"}
      }
    ]
  },

  5: {
    instruction:"Cuida da floresta: planta, rega, segue as pistas e ajuda os animais.",
    start:{x:270,y:850},
    tasks:[
      {
        id:"seedling",
        label:"Plantar uma árvore",
        type:"place",
        icon:"🌱",
        start:{x:120,y:790},
        target:{x:55,y:390,width:140,height:115,label:"PLANTAR"}
      },
      {
        id:"flowers",
        label:"Regar as flores",
        type:"use",
        icon:"💧",
        target:{x:350,y:390,width:140,height:115,label:"REGAR"}
      },
      {
        id:"tracks",
        label:"Seguir e marcar as pegadas",
        type:"place",
        icon:"🐾",
        start:{x:420,y:700},
        target:{x:350,y:555,width:140,height:105,label:"PEGADAS"}
      },
      {
        id:"birdhouse",
        label:"Colocar a casa dos pássaros na árvore",
        type:"place",
        icon:"🏠",
        start:{x:120,y:665},
        target:{x:55,y:540,width:140,height:125,label:"ÁRVORE"}
      },
      {
        id:"stone",
        label:"Encontrar a pedra mágica",
        type:"place",
        icon:"💎",
        start:{x:270,y:760},
        target:{x:205,y:300,width:130,height:110,label:"PEDRA"}
      }
    ]
  },

  6: {
    instruction:"Prepara a piscina com segurança e ajuda Lama a brincar junto da água.",
    start:{x:270,y:850},
    tasks:[
      {
        id:"swimsuit",
        label:"Levar o fato de banho ao balneário",
        type:"place",
        icon:"🩱",
        start:{x:115,y:800},
        target:{x:55,y:380,width:140,height:115,label:"BALNEÁRIO"}
      },
      {
        id:"vest",
        label:"Colocar o colete de segurança",
        type:"place",
        icon:"🦺",
        start:{x:420,y:805},
        target:{x:350,y:380,width:140,height:115,label:"COLETE"}
      },
      {
        id:"shower",
        label:"Tomar duche antes de entrar",
        type:"use",
        icon:"🚿",
        target:{x:55,y:550,width:140,height:115,label:"DUCHE"}
      },
      {
        id:"ball",
        label:"Guardar a bola no cesto",
        type:"place",
        icon:"🏐",
        start:{x:390,y:665},
        target:{x:350,y:555,width:140,height:110,label:"BRINQUEDOS"}
      },
      {
        id:"float",
        label:"Levar a boia para Lama",
        type:"place",
        icon:"🛟",
        start:{x:140,y:680},
        target:{x:205,y:320,width:135,height:115,label:"LAMA"}
      }
    ]
  },

  7: {
    instruction:"Alimenta os animais, cuida da horta e ajuda a quinta a ficar organizada.",
    start:{x:270,y:850},
    tasks:[
      {
        id:"grain",
        label:"Dar comida às galinhas",
        type:"place",
        icon:"🌾",
        start:{x:110,y:795},
        target:{x:55,y:380,width:145,height:115,label:"GALINHAS"}
      },
      {
        id:"carrot",
        label:"Dar cenoura aos coelhos",
        type:"place",
        icon:"🥕",
        start:{x:425,y:805},
        target:{x:345,y:380,width:145,height:115,label:"COELHOS"}
      },
      {
        id:"pony",
        label:"Escovar o pónei",
        type:"use",
        icon:"🐴",
        target:{x:55,y:555,width:145,height:120,label:"ESCOVAR"}
      },
      {
        id:"garden",
        label:"Regar a horta",
        type:"use",
        icon:"🥬",
        target:{x:345,y:555,width:145,height:120,label:"HORTA"}
      },
      {
        id:"shelter",
        label:"Levar o sino para o abrigo",
        type:"place",
        icon:"🔔",
        start:{x:270,y:700},
        target:{x:205,y:305,width:130,height:115,label:"ABRIGO"}
      }
    ]
  },

  8: {
    instruction:"Explora o parque, conduz, encontra os bilhetes e ajuda quem está perdido.",
    start:{x:270,y:850},
    tasks:[
      {
        id:"car",
        label:"Conduzir o carrinho",
        type:"use",
        icon:"🚗",
        target:{x:55,y:360,width:145,height:120,label:"CARRINHO"}
      },
      {
        id:"track",
        label:"Completar o percurso de obstáculos",
        type:"use",
        icon:"🚧",
        target:{x:345,y:360,width:145,height:120,label:"PERCURSO"}
      },
      {
        id:"carousel",
        label:"Andar no carrossel",
        type:"use",
        icon:"🎠",
        target:{x:55,y:550,width:145,height:120,label:"CARROSSEL"}
      },
      {
        id:"map",
        label:"Entregar o mapa à personagem perdida",
        type:"place",
        icon:"🗺️",
        start:{x:410,y:730},
        target:{x:345,y:550,width:145,height:120,label:"AJUDAR"}
      },
      {
        id:"tickets",
        label:"Levar os bilhetes à entrada",
        type:"place",
        icon:"🎟️",
        start:{x:135,y:730},
        target:{x:205,y:300,width:130,height:115,label:"ENTRADA"}
      }
    ]
  },

  9: {
    instruction:"Ajuda na cidade, atravessa em segurança, faz compras e encontra o animal perdido.",
    start:{x:270,y:850},
    tasks:[
      {
        id:"crossing",
        label:"Atravessar na passadeira",
        type:"use",
        icon:"🚸",
        target:{x:55,y:370,width:145,height:115,label:"PASSADEIRA"}
      },
      {
        id:"sign",
        label:"Colocar o sinal no poste",
        type:"place",
        icon:"🛑",
        start:{x:415,y:790},
        target:{x:345,y:370,width:145,height:115,label:"SINAL"}
      },
      {
        id:"coin",
        label:"Fazer uma pequena compra",
        type:"place",
        icon:"🪙",
        start:{x:120,y:790},
        target:{x:55,y:550,width:145,height:115,label:"LOJA"}
      },
      {
        id:"help",
        label:"Levar o saco à pessoa que precisa",
        type:"place",
        icon:"🛍️",
        start:{x:390,y:680},
        target:{x:345,y:550,width:145,height:115,label:"AJUDAR"}
      },
      {
        id:"pet",
        label:"Levar o animal perdido para casa",
        type:"place",
        icon:"🐶",
        start:{x:145,y:685},
        target:{x:205,y:300,width:130,height:115,label:"CASA"}
      }
    ]
  },

  10: {
    instruction:"Conclui a grande missão, devolve as cores à ilha e encontra a última estrela.",
    start:{x:270,y:850},
    tasks:[
      {
        id:"finalPuzzle",
        label:"Completar o grande puzzle",
        type:"place",
        icon:"🧩",
        start:{x:110,y:800},
        target:{x:55,y:380,width:145,height:115,label:"PUZZLE"}
      },
      {
        id:"colors",
        label:"Recuperar as cores do arco-íris",
        type:"place",
        icon:"🎨",
        start:{x:425,y:805},
        target:{x:345,y:380,width:145,height:115,label:"CORES"}
      },
      {
        id:"gardenFlowers",
        label:"Plantar flores na ilha",
        type:"place",
        icon:"🌸",
        start:{x:130,y:675},
        target:{x:55,y:555,width:145,height:115,label:"JARDIM"}
      },
      {
        id:"cloud",
        label:"Ajudar a Nuvem Triste",
        type:"place",
        icon:"💖",
        start:{x:405,y:685},
        target:{x:345,y:555,width:145,height:115,label:"NUVEM"}
      },
      {
        id:"finalStar",
        label:"Encontrar a última estrela",
        type:"place",
        icon:"⭐",
        start:{x:270,y:745},
        target:{x:205,y:295,width:130,height:115,label:"ESTRELA"}
      }
    ]
  }
};

// -------------------------------------------------------------
// Ecrã comum para todos os minijogos
// -------------------------------------------------------------
function renderInteractiveWorld(world,configuration){
  const tasks = configuration.tasks;

  app.innerHTML = `
    ${topbar(`${world.emoji} ${world.title}`,"Usa as setas, toca nos botões ou arrasta o dedo no cenário")}
    <main class="game-shell">
      <section class="game-instructions">
        <span class="key-chip">↑ ↓ ← → mover</span>
        <span class="key-chip">W A S D mover</span>
        <span class="key-chip">Espaço ou E: agarrar/usar</span>
        <span class="key-chip">Joystick ou arrastar no cenário: mover</span>
        <strong>${configuration.instruction}</strong>
      </section>

      <section class="game-layout">
        <div>
          <div class="game-stage-wrap">
            <canvas
              id="game-canvas"
              width="540"
              height="960"
              aria-label="${world.title} — nível interativo"
            ></canvas>

            <div id="game-prompt" class="game-prompt">
              Usa o joystick ou arrasta o dedo para mover. Arrasta diretamente os objetos para os destinos.
            </div>

            <div class="game-controls-overlay" aria-label="Controlos táteis sobre o cenário">
              <div
                id="virtual-joystick"
                class="virtual-joystick"
                aria-label="Joystick para mover a Ninita"
              >
                <div class="joystick-ring">
                  <div id="joystick-knob" class="joystick-knob"></div>
                </div>
              </div>

              <button id="action-button" class="action-btn overlay-action" aria-label="Agarrar ou usar">
                AGARRAR<br>USAR
              </button>
            </div>

            <div id="game-reward" class="game-reward">
              <article class="game-reward-card">
                <div class="big-star">⭐</div>
                <h2>Conseguiste!</h2>
                <h3>${world.star}</h3>
                <p>Ninita e Lama concluíram todas as tarefas deste mundo.</p>
                <button
                  class="btn btn-primary"
                  data-action="finish-interactive"
                  data-world="${world.id}"
                >
                  ${world.id === 10 ? "Celebrar a aventura" : "Receber estrela e continuar"}
                </button>
              </article>
            </div>
          </div>
        </div>

        <aside class="game-hud">
          <h3>Tarefas — ${world.title}</h3>

          <div class="progress-track">
            <div id="interactive-progress" class="progress-fill"></div>
          </div>

          <strong>
            <span id="interactive-count">0</span> de ${tasks.length} concluídas
          </strong>

          <div id="interactive-task-list">
            ${tasks.map(task=>`
              <div class="game-task" data-game-task="${task.id}">
                <span class="game-check">✓</span>
                <span>${task.label}</span>
              </div>
            `).join("")}
          </div>

          <div class="lama-tip">
            Lama segue a Ninita e ajuda a encontrar cada missão.
          </div>

          <button class="btn btn-activity-level" data-action="activities" data-world="${world.id}">
            🎮 Atividades educativas deste nível
          </button>
        </aside>
      </section>
    </main>
  `;

  activeGame = new InteractiveWorldGame(world,configuration);
}

// -------------------------------------------------------------
// Motor comum de movimento, objetos e tarefas
// -------------------------------------------------------------
class InteractiveWorldGame{
  constructor(world,configuration){
    this.world = world;
    this.configuration = configuration;
    this.tasks = configuration.tasks;

    this.canvas = document.querySelector("#game-canvas");
    this.context = this.canvas.getContext("2d");
    this.prompt = document.querySelector("#game-prompt");
    this.progressElement = document.querySelector("#interactive-progress");
    this.countElement = document.querySelector("#interactive-count");
    this.rewardElement = document.querySelector("#game-reward");
    this.actionButton = document.querySelector("#action-button");
    this.joystick = document.querySelector("#virtual-joystick");
    this.joystickKnob = document.querySelector("#joystick-knob");

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = new Set();
    this.completed = new Set();
    this.carrying = null;
    this.draggingObject = null;
    this.lastTime = performance.now();
    this.running = true;
    this.successPlayed = false;

    this.pointerTarget = null;
    this.pointerActive = false;
    this.pointerId = null;
    this.pointerStart = null;
    this.pointerMoved = false;

    this.joystickPointerId = null;
    this.joystickVector = {x:0,y:0};

    this.background = new Image();
    this.background.src = world.image;

    this.player = {
      x:configuration.start?.x ?? 270,
      y:configuration.start?.y ?? 840,
      radius:22,
      speed:205,
      facing:1,
      walking:0
    };

    this.lama = {
      x:this.player.x - 48,
      y:this.player.y + 38
    };

    this.objects = this.tasks
      .filter(task=>task.type === "place")
      .map(task=>({
        id:task.id,
        icon:task.icon,
        x:task.start.x,
        y:task.start.y,
        placed:false,
        target:task.target
      }));

    this.boundKeyDown = event=>this.onKeyDown(event);
    this.boundKeyUp = event=>this.onKeyUp(event);
    this.boundVisibility = ()=>this.onVisibilityChange();

    this.boundPointerDown = event=>this.onCanvasPointerDown(event);
    this.boundPointerMove = event=>this.onCanvasPointerMove(event);
    this.boundPointerUp = event=>this.onCanvasPointerUp(event);

    this.boundJoystickDown = event=>this.onJoystickPointerDown(event);
    this.boundJoystickMove = event=>this.onJoystickPointerMove(event);
    this.boundJoystickUp = event=>this.onJoystickPointerUp(event);

    window.addEventListener("keydown",this.boundKeyDown);
    window.addEventListener("keyup",this.boundKeyUp);
    document.addEventListener("visibilitychange",this.boundVisibility);

    this.canvas.addEventListener("pointerdown",this.boundPointerDown);
    this.canvas.addEventListener("pointermove",this.boundPointerMove);
    this.canvas.addEventListener("pointerup",this.boundPointerUp);
    this.canvas.addEventListener("pointercancel",this.boundPointerUp);
    this.canvas.addEventListener("pointerleave",this.boundPointerUp);

    this.joystick.addEventListener("pointerdown",this.boundJoystickDown);
    this.joystick.addEventListener("pointermove",this.boundJoystickMove);
    this.joystick.addEventListener("pointerup",this.boundJoystickUp);
    this.joystick.addEventListener("pointercancel",this.boundJoystickUp);
    this.joystick.addEventListener("pointerleave",this.boundJoystickUp);

    this.actionButton.addEventListener("click",event=>{
      event.preventDefault();
      event.stopPropagation();
      audio.unlock();
      this.interact();
    });

    this.animationFrame = requestAnimationFrame(time=>this.loop(time));
  }

  destroy(){
    this.running = false;
    cancelAnimationFrame(this.animationFrame);
    audio.stopFootsteps(true);

    window.removeEventListener("keydown",this.boundKeyDown);
    window.removeEventListener("keyup",this.boundKeyUp);
    document.removeEventListener("visibilitychange",this.boundVisibility);

    this.canvas.removeEventListener("pointerdown",this.boundPointerDown);
    this.canvas.removeEventListener("pointermove",this.boundPointerMove);
    this.canvas.removeEventListener("pointerup",this.boundPointerUp);
    this.canvas.removeEventListener("pointercancel",this.boundPointerUp);
    this.canvas.removeEventListener("pointerleave",this.boundPointerUp);

    this.joystick.removeEventListener("pointerdown",this.boundJoystickDown);
    this.joystick.removeEventListener("pointermove",this.boundJoystickMove);
    this.joystick.removeEventListener("pointerup",this.boundJoystickUp);
    this.joystick.removeEventListener("pointercancel",this.boundJoystickUp);
    this.joystick.removeEventListener("pointerleave",this.boundJoystickUp);
  }

  onVisibilityChange(){
    if(document.hidden){
      this.keys.clear();
      this.pointerActive = false;
      this.pointerTarget = null;
      this.draggingObject = null;
      this.resetJoystick();
      audio.stopFootsteps();
    }
  }

  onKeyDown(event){
    const movementKeys = [
      "ArrowUp","ArrowDown","ArrowLeft","ArrowRight",
      "w","a","s","d","W","A","S","D"
    ];

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

  onJoystickPointerDown(event){
    event.preventDefault();
    event.stopPropagation();
    audio.unlock();

    this.joystickPointerId = event.pointerId;

    if(this.joystick.setPointerCapture){
      try{ this.joystick.setPointerCapture(event.pointerId); }catch{}
    }

    this.updateJoystick(event);
  }

  onJoystickPointerMove(event){
    if(this.joystickPointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();
    this.updateJoystick(event);
  }

  onJoystickPointerUp(event){
    if(this.joystickPointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();

    if(this.joystick.releasePointerCapture){
      try{ this.joystick.releasePointerCapture(event.pointerId); }catch{}
    }

    this.resetJoystick();
  }

  updateJoystick(event){
    const rectangle = this.joystick.getBoundingClientRect();
    const centerX = rectangle.left + rectangle.width / 2;
    const centerY = rectangle.top + rectangle.height / 2;
    const maximum = rectangle.width * 0.29;

    let deltaX = event.clientX - centerX;
    let deltaY = event.clientY - centerY;
    const distance = Math.hypot(deltaX,deltaY);

    if(distance > maximum){
      deltaX = deltaX / distance * maximum;
      deltaY = deltaY / distance * maximum;
    }

    this.joystickVector.x = deltaX / maximum;
    this.joystickVector.y = deltaY / maximum;

    this.joystickKnob.style.transform =
      `translate(${deltaX}px,${deltaY}px)`;
  }

  resetJoystick(){
    this.joystickPointerId = null;
    this.joystickVector.x = 0;
    this.joystickVector.y = 0;

    if(this.joystickKnob){
      this.joystickKnob.style.transform = "translate(0,0)";
    }
  }

  canvasPoint(event){
    const rectangle = this.canvas.getBoundingClientRect();
    const scaleX = this.width / rectangle.width;
    const scaleY = this.height / rectangle.height;

    return {
      x:(event.clientX - rectangle.left) * scaleX,
      y:(event.clientY - rectangle.top) * scaleY
    };
  }

  objectAtPoint(point){
    return this.objects
      .filter(item=>!item.placed)
      .map(item=>({
        item,
        distance:Math.hypot(point.x-item.x,point.y-item.y)
      }))
      .filter(result=>result.distance < 48)
      .sort((a,b)=>a.distance-b.distance)[0]?.item || null;
  }

  onCanvasPointerDown(event){
    event.preventDefault();
    audio.unlock();

    const point = this.canvasPoint(event);
    const object = this.objectAtPoint(point);

    this.pointerId = event.pointerId;
    this.pointerStart = point;
    this.pointerMoved = false;

    if(object){
      this.draggingObject = object;
      this.pointerActive = false;
      this.pointerTarget = null;

      object.x = point.x;
      object.y = point.y;

      audio.effect("pickup");
      this.prompt.textContent =
        `Arrasta ${object.icon} até à zona iluminada.`;
    }else{
      this.pointerActive = true;
      this.pointerTarget = point;
    }

    if(this.canvas.setPointerCapture){
      try{ this.canvas.setPointerCapture(event.pointerId); }catch{}
    }
  }

  onCanvasPointerMove(event){
    if(this.pointerId !== event.pointerId) return;

    event.preventDefault();
    const point = this.canvasPoint(event);

    if(this.pointerStart){
      const distance = Math.hypot(
        point.x-this.pointerStart.x,
        point.y-this.pointerStart.y
      );

      if(distance > 12){
        this.pointerMoved = true;
      }
    }

    if(this.draggingObject){
      this.draggingObject.x = Math.max(
        30,
        Math.min(this.width-30,point.x)
      );

      this.draggingObject.y = Math.max(
        250,
        Math.min(this.height-30,point.y)
      );
    }else if(this.pointerActive){
      this.pointerTarget = point;
    }
  }

  onCanvasPointerUp(event){
    if(this.pointerId !== event.pointerId) return;

    event.preventDefault();
    const point = this.canvasPoint(event);

    if(this.draggingObject){
      const object = this.draggingObject;
      const closeToTarget = this.distanceToRectangle(
        object.x,
        object.y,
        object.target
      ) < 42;

      if(closeToTarget){
        object.placed = true;
        object.x = object.target.x + object.target.width / 2;
        object.y = object.target.y + object.target.height / 2;

        this.completed.add(object.id);
        audio.effect("place");
        this.updateTaskHud();
      }else{
        audio.effect("click");
      }

      this.draggingObject = null;
    }else if(!this.pointerMoved){
      this.touchInteractAt(point);
    }

    this.pointerActive = false;
    this.pointerId = null;
    this.pointerStart = null;
    this.pointerMoved = false;
    this.pointerTarget = null;

    if(this.canvas.releasePointerCapture){
      try{ this.canvas.releasePointerCapture(event.pointerId); }catch{}
    }
  }

  touchInteractAt(point){
    if(this.completed.size === this.tasks.length) return;

    if(this.carrying){
      const closeToTarget = this.distanceToRectangle(
        point.x,
        point.y,
        this.carrying.target
      ) < 52;

      if(closeToTarget){
        this.carrying.placed = true;
        this.carrying.x =
          this.carrying.target.x + this.carrying.target.width / 2;
        this.carrying.y =
          this.carrying.target.y + this.carrying.target.height / 2;

        this.completed.add(this.carrying.id);
        this.carrying = null;
        audio.effect("place");
        this.updateTaskHud();
        return;
      }
    }

    const touchedAction = this.tasks
      .filter(task=>task.type === "use" && !this.completed.has(task.id))
      .map(task=>({
        task,
        distance:this.distanceToRectangle(
          point.x,
          point.y,
          task.target
        )
      }))
      .filter(result=>result.distance < 40)
      .sort((a,b)=>a.distance-b.distance)[0];

    if(touchedAction){
      const playerNearAction = this.distanceToRectangle(
        this.player.x,
        this.player.y,
        touchedAction.task.target
      ) < 100;

      if(playerNearAction){
        this.completed.add(touchedAction.task.id);
        audio.effect("place");
        this.updateTaskHud();
      }
    }
  }

  loop(time){
    if(!this.running) return;

    const delta = Math.min(0.034,(time-this.lastTime)/1000);
    this.lastTime = time;

    this.update(delta);
    this.draw();

    this.animationFrame = requestAnimationFrame(nextTime=>this.loop(nextTime));
  }

  update(delta){
    let horizontal = 0;
    let vertical = 0;

    if(this.keys.has("ArrowLeft") || this.keys.has("a") || this.keys.has("A")) horizontal -= 1;
    if(this.keys.has("ArrowRight") || this.keys.has("d") || this.keys.has("D")) horizontal += 1;
    if(this.keys.has("ArrowUp") || this.keys.has("w") || this.keys.has("W")) vertical -= 1;
    if(this.keys.has("ArrowDown") || this.keys.has("s") || this.keys.has("S")) vertical += 1;

    if(horizontal === 0 && vertical === 0){
      horizontal = this.joystickVector.x;
      vertical = this.joystickVector.y;
    }

    if(
      horizontal === 0
      && vertical === 0
      && this.pointerActive
      && this.pointerTarget
      && !this.draggingObject
    ){
      const deltaX = this.pointerTarget.x - this.player.x;
      const deltaY = this.pointerTarget.y - this.player.y;
      const distance = Math.hypot(deltaX,deltaY);

      if(distance > 12){
        horizontal = deltaX / distance;
        vertical = deltaY / distance;
      }
    }

    const moving = Math.abs(horizontal) > 0.03 || Math.abs(vertical) > 0.03;

    if(moving){
      audio.startFootsteps();

      const length = Math.hypot(horizontal,vertical) || 1;

      if(length > 1){
        horizontal /= length;
        vertical /= length;
      }

      this.player.x += horizontal * this.player.speed * delta;
      this.player.y += vertical * this.player.speed * delta;
      this.player.walking += delta * 11;

      if(Math.abs(horizontal) > 0.05){
        this.player.facing = Math.sign(horizontal);
      }
    }else{
      audio.stopFootsteps();
    }

    this.player.x = Math.max(35,Math.min(this.width-35,this.player.x));
    this.player.y = Math.max(255,Math.min(this.height-35,this.player.y));

    const lamaTargetX = this.player.x - 46 * this.player.facing;
    const lamaTargetY = this.player.y + 38;

    this.lama.x += (lamaTargetX-this.lama.x) * Math.min(1,delta*4.1);
    this.lama.y += (lamaTargetY-this.lama.y) * Math.min(1,delta*4.1);

    if(this.carrying){
      this.carrying.x = this.player.x + 5 * this.player.facing;
      this.carrying.y = this.player.y - 76;
    }

    this.updatePrompt();
  }

  interact(){
    if(this.completed.size === this.tasks.length) return;

    if(this.carrying){
      if(this.distanceToRectangle(
        this.player.x,
        this.player.y,
        this.carrying.target
      ) < 92){
        this.carrying.placed = true;
        this.carrying.x =
          this.carrying.target.x + this.carrying.target.width / 2;
        this.carrying.y =
          this.carrying.target.y + this.carrying.target.height / 2;

        this.completed.add(this.carrying.id);
        this.carrying = null;

        audio.effect("place");
        this.updateTaskHud();
        return;
      }

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
        distance:Math.hypot(
          this.player.x-item.x,
          this.player.y-item.y
        )
      }))
      .filter(result=>result.distance < 74)
      .sort((a,b)=>a.distance-b.distance)[0];

    if(nearbyObject){
      this.carrying = nearbyObject.item;
      audio.effect("pickup");
      return;
    }

    const nearbyAction = this.tasks
      .filter(task=>task.type === "use" && !this.completed.has(task.id))
      .map(task=>({
        task,
        distance:this.distanceToRectangle(
          this.player.x,
          this.player.y,
          task.target
        )
      }))
      .filter(result=>result.distance < 92)
      .sort((a,b)=>a.distance-b.distance)[0];

    if(nearbyAction){
      this.completed.add(nearbyAction.task.id);
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
    this.progressElement.style.width =
      `${(this.completed.size/this.tasks.length)*100}%`;

    if(this.completed.size === this.tasks.length){
      this.rewardElement.classList.add("show");

      if(!this.successPlayed){
        this.successPlayed = true;
        audio.effect("success");
      }
    }
  }

  updatePrompt(){
    if(this.draggingObject){
      this.prompt.textContent =
        `Arrasta ${this.draggingObject.icon} até à zona iluminada.`;
      return;
    }

    if(this.carrying){
      const nearTarget = this.distanceToRectangle(
        this.player.x,
        this.player.y,
        this.carrying.target
      ) < 92;

      this.prompt.textContent = nearTarget
        ? "Toca no alvo ou usa AGARRAR/USAR para colocar."
        : `Leva ${this.carrying.icon} até à zona iluminada.`;
      return;
    }

    const nearObject = this.objects.some(item=>
      !item.placed
      && Math.hypot(
        this.player.x-item.x,
        this.player.y-item.y
      ) < 74
    );

    if(nearObject){
      this.prompt.textContent =
        "Arrasta diretamente o objeto ou usa AGARRAR/USAR.";
      return;
    }

    const nearAction = this.tasks.some(task=>
      task.type === "use"
      && !this.completed.has(task.id)
      && this.distanceToRectangle(
        this.player.x,
        this.player.y,
        task.target
      ) < 92
    );

    if(nearAction){
      this.prompt.textContent =
        "Toca na zona destacada ou usa AGARRAR/USAR.";
      return;
    }

    this.prompt.textContent =
      "Usa o joystick ou arrasta o dedo no cenário para mover.";
  }

  distanceToRectangle(x,y,rectangle){
    const closestX = Math.max(
      rectangle.x,
      Math.min(x,rectangle.x+rectangle.width)
    );

    const closestY = Math.max(
      rectangle.y,
      Math.min(y,rectangle.y+rectangle.height)
    );

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

    this.drawBackground();
    this.drawTargets();

    const drawable = [
      ...this.objects.filter(item=>
        !item.placed
        && item !== this.carrying
        && item !== this.draggingObject
      ),
      {kind:"lama-character",x:this.lama.x,y:this.lama.y},
      {kind:"ninita-character",x:this.player.x,y:this.player.y}
    ].sort((a,b)=>a.y-b.y);

    for(const item of drawable){
      if(item.kind === "lama-character"){
        this.drawLama(item.x,item.y);
      }else if(item.kind === "ninita-character"){
        this.drawNinita(item.x,item.y);
      }else{
        this.drawObject(item);
      }
    }

    for(const item of this.objects.filter(item=>item.placed)){
      this.drawObject(item);
    }

    if(this.carrying){
      this.drawObject(this.carrying,true);
    }

    if(this.draggingObject){
      this.drawObject(this.draggingObject,true);
    }

    if(this.completed.size === this.tasks.length){
      this.drawCelebration();
    }
  }

  drawBackground(){
    const context = this.context;

    if(this.background.complete && this.background.naturalWidth){
      context.drawImage(
        this.background,
        0,
        0,
        this.width,
        this.height
      );
    }else{
      context.fillStyle = "#f6d7e8";
      context.fillRect(0,0,this.width,this.height);
    }

    const gradient = context.createLinearGradient(0,0,0,this.height);
    gradient.addColorStop(0,"rgba(255,255,255,.03)");
    gradient.addColorStop(.56,"rgba(0,0,0,.02)");
    gradient.addColorStop(1,"rgba(0,0,0,.14)");

    context.fillStyle = gradient;
    context.fillRect(0,0,this.width,this.height);
  }

  drawTargets(){
    const context = this.context;
    context.save();

    context.setLineDash([10,8]);
    context.lineWidth = 4;
    context.font = "900 14px system-ui";
    context.textAlign = "center";

    for(const task of this.tasks){
      if(this.completed.has(task.id)) continue;

      context.fillStyle = "rgba(255,239,111,.20)";
      context.strokeStyle = "#ffe15b";

      this.roundedRectangle(
        task.target.x,
        task.target.y,
        task.target.width,
        task.target.height,
        15,
        context.fillStyle,
        context.strokeStyle,
        4
      );

      context.fillStyle = "#40224f";
      context.shadowColor = "rgba(255,255,255,.95)";
      context.shadowBlur = 7;

      context.fillText(
        task.target.label,
        task.target.x + task.target.width / 2,
        task.target.y + task.target.height / 2 + 5
      );

      context.shadowBlur = 0;

      if(task.type === "use"){
        context.font = "30px system-ui";
        context.fillText(
          task.icon,
          task.target.x + task.target.width / 2,
          task.target.y + task.target.height / 2 - 20
        );
        context.font = "900 14px system-ui";
      }
    }

    context.restore();
  }

  drawObject(object,carried=false){
    const context = this.context;

    context.save();
    context.translate(object.x,object.y);

    if(carried){
      context.shadowColor = "rgba(255,225,91,.95)";
      context.shadowBlur = 24;
    }else{
      context.shadowColor = "rgba(25,10,30,.35)";
      context.shadowBlur = 10;
    }

    context.fillStyle = "rgba(255,255,255,.94)";
    context.beginPath();
    context.arc(0,0,27,0,Math.PI*2);
    context.fill();

    context.strokeStyle = "#ff6faf";
    context.lineWidth = 4;
    context.stroke();

    context.shadowBlur = 0;
    context.font = "32px system-ui";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(object.icon,0,1);

    context.restore();
  }

  drawNinita(x,y){
    return BedroomGame.prototype.drawNinita.call(this,x,y);
  }

  drawLama(x,y){
    return BedroomGame.prototype.drawLama.call(this,x,y);
  }

  drawCelebration(){
    return BedroomGame.prototype.drawCelebration.call(this);
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
  if(element.dataset.action === "activities") routeTo("activities",Number(element.dataset.world));
  if(element.dataset.action === "return-level") routeTo("level",Number(element.dataset.world));

  if(element.dataset.activity){
    openActivity(Number(element.dataset.world),element.dataset.activity);
  }

  if(element.dataset.action === "back"){
    history.length > 1 ? history.back() : routeTo("home");
  }

  if(element.dataset.world && !element.disabled && !element.dataset.action && !element.dataset.activity){
    routeTo("level",Number(element.dataset.world));
  }

  if(element.dataset.action === "complete"){
    const worldId = Number(element.dataset.world);
    completeWorld(worldId);
    audio.effect("success");
    routeTo("worlds");
  }

  if(element.dataset.action === "finish-interactive"){
    const worldId = Number(element.dataset.world) || 1;
    completeWorld(worldId);
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
