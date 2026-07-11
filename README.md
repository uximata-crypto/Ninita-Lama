# Ninita e Lama — Versão Web para Vercel

Versão web do protótipo **Ninita e Lama — A Viagem dos Mundos Mágicos**, preparada para publicação direta no Vercel.

## Funcionalidades incluídas

- Página inicial;
- história de Ninita e Lama;
- galeria dos cenários;
- mapa com 10 mundos;
- desbloqueio progressivo;
- cinco tarefas por mundo;
- estrelas como recompensa;
- progresso guardado no navegador;
- adaptação a computador, telemóvel e tablet;
- instalação como aplicação web;
- funcionamento offline depois da primeira abertura;
- configuração `vercel.json`;
- cabeçalhos de segurança e cache.

## Publicar através do GitHub

1. Crie ou abra o repositório do jogo no GitHub.
2. Carregue o conteúdo desta pasta para a raiz do repositório.
3. Entre no Vercel.
4. Escolha **Add New → Project**.
5. Importe o repositório do GitHub.
6. Na configuração do projeto use:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** deixe vazio
   - **Output Directory:** deixe vazio
   - **Install Command:** deixe vazio
7. Carregue em **Deploy**.

O Vercel publicará diretamente o `index.html`. Cada novo commit no GitHub criará uma nova publicação automática.

## Publicar sem GitHub

Com a ferramenta Vercel CLI instalada, execute na pasta do projeto:

```bash
vercel --prod
```

## Testar localmente

Pode abrir o ficheiro `index.html` diretamente.

Para testar o modo offline e a instalação como aplicação web, execute:

```bash
python -m http.server 8080
```

Depois abra:

```text
http://localhost:8080
```

## Música e efeitos

Esta versão ainda não contém música nem efeitos sonoros. O sistema de áudio será introduzido depois de aprovarmos a estrutura, o grafismo e a jogabilidade inicial.
