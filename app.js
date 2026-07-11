const worlds = [
  {id:1,title:"O Quarto Encantado",subtitle:"Começa a aventura",emoji:"🛏️",image:"./assets/images/quarto.webp",star:"Estrela da Organização",intro:"A porta mágica só abre quando o quarto da Ninita estiver pronto para uma grande aventura.",tasks:["Fazer a cama","Guardar os brinquedos","Organizar os livros","Escovar os dentes","Preparar a mochila"]},
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
  ["Era uma vez…","Ninita era uma menina de sete anos, alegre, curiosa e muito imaginativa. O seu brinquedo preferido era um peluche cor-de-rosa em forma de lama, muito macio e com tecidos coloridos nas orelhas e nas costas. Ninita chamava-lhe simplesmente Lama."],
  ["O despertar de Lama","Numa noite tranquila, um raio de luar entrou pela janela e tocou no tecido colorido de Lama. O peluche mexeu uma orelha, abriu os olhos e disse: «Ninita, está na hora de acordar.»"],
  ["Os Mundos da Alegria","Lama revelou um mapa mágico com praias, florestas, escolas, piscinas, casas e ilhas maravilhosas. Mas esses mundos estavam a perder as cores porque as Estrelas da Alegria tinham desaparecido."],
  ["A missão","Para recuperar cada estrela, Ninita e Lama teriam de ajudar pessoas e animais, aprender coisas novas, cuidar da natureza e completar pequenas tarefas do dia a dia."],
  ["Uma porta brilhante","Uma porta mágica apareceu no quarto. Ninita colocou os sapatos, preparou a mochila, segurou Lama pela pata e atravessou a porta. A maior aventura das suas vidas tinha começado."],
  ["A última lição","No fim, Ninita descobriu que as estrelas aparecem sempre que alguém ajuda, aprende, protege a natureza, enfrenta um medo ou faz outra pessoa feliz. A aventura terminava, mas uma nova porta já estava à espera."]
];

const KEY="ninita-lama-progress-v1";
const app=document.querySelector("#app");

function loadProgress(){
  try{return JSON.parse(localStorage.getItem(KEY))||{highestUnlocked:1,completed:[]}}
  catch{return{highestUnlocked:1,completed:[]}}
}
function saveProgress(progress){localStorage.setItem(KEY,JSON.stringify(progress))}
function topbar(title,subtitle=""){
  return `<header class="topbar"><button class="icon-btn" data-action="back" aria-label="Voltar">←</button><div><h2>${title}</h2>${subtitle?`<p>${subtitle}</p>`:""}</div></header>`;
}
function routeTo(name,param=null){
  location.hash=`${name}${param?`/${param}`:""}`;
}
function parseRoute(){
  const hash=location.hash.replace(/^#/,"")||"home";
  const [name,param]=hash.split("/");
  return{name,param:param?Number(param):null};
}
function renderHome(){
  const p=loadProgress();
  app.innerHTML=`<main class="screen home-screen">
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
      <div class="progress-summary"><strong>${p.completed.length} de 10</strong><span>mundos concluídos</span></div>
      <button class="btn btn-text danger" data-action="reset">↻ Recomeçar</button>
    </section>
    <p class="footer-note">Uma aventura educativa, tranquila e sem derrotas.</p>
  </main>`;
}
function renderWorlds(){
  const p=loadProgress();
  app.innerHTML=`${topbar("Mapa dos Mundos","Escolhe a próxima aventura")}
  <main class="content"><section class="world-grid">
  ${worlds.map(w=>{
    const unlocked=w.id<=p.highestUnlocked;
    const completed=p.completed.includes(w.id);
    return `<button class="world-card ${unlocked?"":"locked"} ${completed?"completed":""}" data-world="${w.id}" ${unlocked?"":"disabled"}>
      <img src="${w.image}" alt="">
      <span class="emoji">${w.emoji}</span>
      ${completed?`<span class="star" aria-label="Concluído">⭐</span>`:""}
      ${unlocked?"":`<span class="lock" aria-label="Bloqueado">🔒</span>`}
      <div class="world-info"><span class="world-id">Mundo ${w.id}</span><h3>${w.title}</h3><p>${unlocked?w.subtitle:"Conclui o mundo anterior"}</p></div>
    </button>`;
  }).join("")}
  </section><div class="empty-space"></div></main>`;
}
function renderStory(){
  app.innerHTML=`${topbar("A história de Ninita e Lama")}
  <main class="content">
    <section class="story-hero"><img src="./assets/images/quarto.webp" alt="Ninita e Lama no quarto encantado"><h1>A Viagem dos Mundos Mágicos</h1></section>
    ${story.map(([title,text])=>`<article class="card"><h3>${title}</h3><p>${text}</p></article>`).join("")}
  </main>`;
}
function renderGallery(){
  app.innerHTML=`${topbar("Cenários mágicos","Explora os mundos da aventura")}
  <main class="content"><section class="gallery-grid">
    ${worlds.map(w=>`<article class="gallery-card"><img src="${w.image}" alt="${w.title}"><div class="caption"><span class="badge">${w.emoji} Mundo ${w.id}</span><h3>${w.title}</h3><p>${w.subtitle}</p></div></article>`).join("")}
  </section></main>`;
}
function renderLevel(id){
  const w=worlds.find(x=>x.id===id)||worlds[0];
  const p=loadProgress();
  if(w.id>p.highestUnlocked){routeTo("worlds");return}
  app.innerHTML=`<main class="level-screen" style="background-image:url('${w.image}')"><div class="level-shade">
    ${topbar(`${w.emoji} ${w.title}`)}
    <section class="level-content">
      <div class="level-hero"><img src="${w.image}" alt="${w.title}"><div class="hero-copy"><span class="badge">Mundo ${w.id}</span><h1>${w.title}</h1><p>${w.subtitle}</p></div></div>
      <article class="mission-card"><h3>Missão</h3><p>${w.intro}</p><div class="lama-tip">Lama diz: «Não faz mal errar. Vamos tentar juntos!»</div><div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div><small><strong id="task-count">0</strong> de ${w.tasks.length} tarefas concluídas</small></article>
      <section class="task-list">${w.tasks.map((t,i)=>`<button class="task" data-task="${i}"><span class="check">✓</span><span>${t}</span></button>`).join("")}</section>
      <section class="reward" id="reward"><div class="big-star">⭐</div><h2>Conseguiste!</h2><h3>${w.star}</h3><p>Ninita e Lama estão prontos para a próxima aventura.</p><button class="btn btn-primary" data-action="complete" data-world="${w.id}">${w.id===10?"Celebrar a aventura":"Receber estrela e continuar"}</button></section>
      <div class="empty-space"></div>
    </section>
  </div></main>`;
  const selected=new Set();
  const tasks=[...document.querySelectorAll(".task")];
  const fill=document.querySelector("#progress-fill");
  const count=document.querySelector("#task-count");
  const reward=document.querySelector("#reward");
  function update(){
    tasks.forEach((task,i)=>task.classList.toggle("done",selected.has(i)));
    count.textContent=selected.size;
    fill.style.width=`${selected.size/w.tasks.length*100}%`;
    reward.classList.toggle("show",selected.size===w.tasks.length);
  }
  tasks.forEach((task,i)=>task.addEventListener("click",()=>{selected.has(i)?selected.delete(i):selected.add(i);update()}));
}
function render(name,param){
  if(name==="home")renderHome();
  else if(name==="worlds")renderWorlds();
  else if(name==="story")renderStory();
  else if(name==="gallery")renderGallery();
  else if(name==="level")renderLevel(param);
  else renderHome();
}
function showResetDialog(){
  const modal=document.createElement("div");
  modal.className="dialog-backdrop";
  modal.innerHTML=`<div class="dialog" role="dialog" aria-modal="true"><h3>Recomeçar a aventura?</h3><p>O progresso dos mundos será apagado.</p><div class="dialog-actions"><button class="btn btn-secondary" data-dialog="cancel">Cancelar</button><button class="btn btn-primary" data-dialog="confirm">Sim, recomeçar</button></div></div>`;
  document.body.appendChild(modal);
  modal.addEventListener("click",e=>{
    if(e.target.dataset.dialog==="cancel"||e.target===modal)modal.remove();
    if(e.target.dataset.dialog==="confirm"){localStorage.removeItem(KEY);modal.remove();renderHome()}
  });
}
document.addEventListener("click",e=>{
  const el=e.target.closest("[data-action],[data-world]");
  if(!el)return;
  if(el.dataset.action==="play")routeTo("worlds");
  if(el.dataset.action==="story")routeTo("story");
  if(el.dataset.action==="gallery")routeTo("gallery");
  if(el.dataset.action==="back")history.length>1?history.back():routeTo("home");
  if(el.dataset.action==="reset")showResetDialog();
  if(el.dataset.world&&!el.disabled&&!el.dataset.action)routeTo("level",Number(el.dataset.world));
  if(el.dataset.action==="complete"){
    const id=Number(el.dataset.world);
    const p=loadProgress();
    if(!p.completed.includes(id))p.completed.push(id);
    p.highestUnlocked=Math.min(worlds.length,Math.max(p.highestUnlocked,id+1));
    saveProgress(p);
    routeTo("worlds");
  }
});
window.addEventListener("hashchange",()=>{const r=parseRoute();render(r.name,r.param);window.scrollTo(0,0)});
if("serviceWorker"in navigator&&location.protocol.startsWith("http")){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
const initial=parseRoute();
render(initial.name,initial.param);
