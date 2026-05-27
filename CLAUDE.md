# CLAUDE.md — METALINK

Instruções pro Claude Code ao trabalhar neste repositório.

---

## 👤 Quem é o usuário

**Humberto** (humbertodeassuncao@gmail.com). Product/strategy da META LINK CONSULTORIA, plano Claude Max. Usa **Antigravity IDE** no Windows.

### Preferências fortes
- **Nunca abrir Simple Browser** nem qualquer browser embutido. Subir dev server → informar `http://localhost:5000` e parar.
- PT-BR direto, vocativo "meu amigo" OK
- Respostas curtas e objetivas
- Trade-offs explícitos em decisões técnicas

---

## 🎨 Paleta oficial (OBRIGATÓRIA)

```css
:root {
  --navy:        #0E1729;   /* fundo principal */
  --navy-2:      #131D33;   /* cards e elementos secundários */
  --navy-3:      #1A2640;   /* hover, gradientes */
  --mint:        #2EE5A5;   /* accent primário */
  --blue:        #3B9DFF;   /* accent secundário */
  --white:       #FFFFFF;
  --gray:        #A0AEC4;
  --gray-2:      #5A6478;
  --gray-3:      #3A445A;
  --border:      rgba(255, 255, 255, .08);
}
```

Tipografia: **Cinzel** (display) + **Inter** (body). Nunca introduzir outras fontes sem aprovação.

---

## 📚 Stack

- React 19 + Vite 8 + React Router DOM 7
- Framer Motion 12, html2canvas + jsPDF (pro brandbook quando gerador for adicionado)
- CSS puro com variáveis (sem Tailwind, sem CSS Modules)
- Netlify estático

---

## 🚀 Como rodar

```bash
pnpm install
pnpm dev    # http://localhost:5000
```

⚠️ **NUNCA** `npm install` aqui — gera package-lock.json que conflita com pnpm-lock.yaml usado pelo Netlify (frozen-lockfile no build).

Não abrir Simple Browser. Avisar URL ao Humberto.

---

## 🔒 Regras invioláveis

- ❌ Nunca criar backend, API, banco — projeto 100% estático
- ❌ Nunca abrir Simple Browser
- ❌ Nunca introduzir Tailwind ou CSS-in-JS
- ❌ Nunca usar fontes fora do par Cinzel + Inter
- ❌ Nunca commitar sem `Co-Authored-By` em commits feitos por IA

---

## 📝 Docs canônicos (atualizar após cada feature aprovada)

- `README.md` — instalação, comandos, rotas
- `CONTEXT.md` — regras, stack, design system
- `PROJECT_CONTEXT.md` — visão geral + status
- `ARCHITECTURE.md` — pastas, fluxo, decisões
- `TODO.md` — concluído + pendente

---

## ✅ Princípios

- Mapear features antes de criar do zero
- Reutilizar > duplicar
- Atualizar docs ao aprovar feature
- Commits em PT-BR descritivos
- Usar `var(--ease)` em transitions/animations
- Adicionar `.reveal` em elementos novos de seção pública pra scroll animation

---

## 🎯 Estado atual (2026-05-27)

### Concluído (base inicial)
- Stack instalada e funcional
- Home com 6 seções (Hero, Quem Somos, Serviços, Projetos, FAQ, Contatos)
- Header com scroll-aware azul + drawer mobile
- Footer institucional
- WhatsApp button flutuante
- Brandbook completo (Logo + Cores + Tipografia + Diretrizes) protegido por login client-side SHA-256
- Favicons gerados (16/32/180/192/512)
- Deploy Netlify configurado via netlify.toml

### Pendente
- Número oficial do WhatsApp (placeholder em WhatsAppBtn.jsx)
- Foto/asset definitivo do Hero (atualmente texto puro, sem imagem)
- Email institucional definitivo (`contato@metalinkconsultoria.com.br` é palpite)
- OG image
- Integração de form Contatos com Resend/serviço real (atualmente mailto)
- Gerador de cartão de visita + assinatura email (replicar do GLOMAM)
