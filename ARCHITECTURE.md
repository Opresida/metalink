# ARCHITECTURE — METALINK

## Estrutura de pastas

```
metalink/
├── public/                          Assets estáticos (servidos como /)
│   ├── logo-metalink.png            Logo completa (1254x1254)
│   ├── icon-metalink.png            Ícone/símbolo (1254x1254)
│   ├── favicon-16.png               Favicon abas
│   ├── favicon-32.png               Favicon abas modernas
│   ├── apple-touch-icon.png         iOS home screen (180x180)
│   ├── icon-192.png                 Android PWA
│   └── icon-512.png                 Android splash / PWA hi-res
│
├── src/
│   ├── main.jsx                     Entry point React
│   ├── App.jsx                      Router + rotas
│   ├── index.css                    Design system completo
│   │
│   ├── components/
│   │   ├── Header.jsx               Nav fixo com scroll-aware + drawer mobile
│   │   ├── Footer.jsx               Footer institucional 3 cols
│   │   ├── Hero.jsx                 Banner principal
│   │   ├── QuemSomos.jsx            Section #quem-somos (2 cards)
│   │   ├── Servicos.jsx             Section #servicos (3 cards)
│   │   ├── Projetos.jsx             Section #projetos (10 cards do portfólio)
│   │   ├── FAQ.jsx                  Section #faq (6 perguntas <details>)
│   │   ├── Contatos.jsx             Section #contatos (form mailto + info)
│   │   ├── WhatsAppBtn.jsx          FAB fixo bottom-right
│   │   ├── Loader.jsx               Splash inicial (500ms)
│   │   ├── ProgressBar.jsx          Barra de scroll progress no topo
│   │   └── BrandbookGate.jsx        Login wrapper pro Brandbook
│   │
│   ├── pages/
│   │   ├── Home.jsx                 Orquestra todas as seções
│   │   ├── Brandbook.jsx            Manual de identidade visual
│   │   └── Brandbook.css            Estilos isolados do Brandbook + Gate
│   │
│   ├── hooks/
│   │   └── useReveal.js             IntersectionObserver pra .reveal animations
│   │
│   └── data/
│       ├── servicos.js              3 frentes de serviço
│       ├── projetos.js              10 cards do portfólio
│       └── faq.js                   6 perguntas
│
├── index.html                       HTML root + meta tags + favicons + fontes Google
├── vite.config.js                   Vite + plugin-react, port 5000
├── netlify.toml                     Build + SPA redirect + headers
├── package.json                     Deps + scripts (pnpm)
├── .gitignore                       node_modules, dist, .env, package-lock.json
└── docs (README, CLAUDE, CONTEXT, PROJECT_CONTEXT, TODO, ARCHITECTURE)
```

## Fluxo de dados

**Estático puro.** Não tem API, banco ou backend. Tudo importado direto de `src/data/*.js`.

```
servicos.js  ─→  Servicos.jsx   ─→  <div class="serv-card">
projetos.js  ─→  Projetos.jsx   ─→  <div class="proj-card">
faq.js       ─→  FAQ.jsx        ─→  <details class="faq-item">
```

## Roteamento

`App.jsx` declara 2 rotas via React Router DOM 7:

```
/             →  <Home />                 (sempre acessível)
/brandbook    →  <BrandbookGate />        (login → <Brandbook />)
```

SPA fallback no `netlify.toml` garante que qualquer URL retorne `index.html`, e o React Router resolve client-side.

## Autenticação (client-side)

`BrandbookGate.jsx`:
1. Verifica `sessionStorage[metalink_brandbook_auth_v1]`
2. Se ok → renderiza `<Brandbook />`
3. Senão → form `usuario` + `senha`
4. Submit calcula `sha256(usuario:senha)` via Web Crypto API
5. Compara com array `VALID_HASHES`
6. Match → salva no sessionStorage + renderiza Brandbook

**Limitação conhecida:** hash fica no bundle JS. Proteção contra acesso casual, não real.

## Build pipeline

```
pnpm install         install deps via pnpm-lock.yaml frozen
pnpm dev             Vite dev server :5000 com HMR
pnpm build           Vite build → dist/
                     - index.html otimizado
                     - assets/index-[hash].js
                     - assets/index-[hash].css
                     - public/* copiado pra dist/
pnpm preview         Vite preview do build local
```

Netlify roda `pnpm build` no deploy. Publish dir: `dist/`.

## Decisões arquiteturais

### Por que CSS puro (sem Tailwind/CSS Modules)
Stack consistente com outros projetos do Humberto (GLOMAM). Design system pequeno cabe em 1 arquivo. Variáveis CSS resolvem necessidade de tema.

### Por que pnpm
Frozen lockfile no Netlify. Performance superior. Convenção em todos os projetos.

### Por que mailto no form Contatos
MVP sem backend. Mailto abre cliente de email do usuário com texto pré-preenchido. Trade-off: depende do cliente ter email config. Substituir por Resend/Netlify Forms quando entregar.

### Por que SHA-256 client-side no brandbook
Cliente pediu proteção. Sem backend disponível. SHA-256 client-side é o limite do que dá pra fazer em SPA estática. Documentado como "contra acesso casual" no código.

### Por que Cinzel + Inter
Cinzel: emula a tipografia serif elegante do PDF original (parece Trajan/Cinzel). Inter: padrão moderno corporate pra body.
